import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { PermissionType } from "@prisma/client";

// Permission helper functions
export async function getUserPermissions(
  userId: string
): Promise<PermissionType[]> {
  const userPermissions = await prisma.userPermission.findMany({
    where: {
      userId,
      granted: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    include: {
      permission: true,
    },
  });

  return userPermissions.map((up) => up.permission.name);
}

export async function hasPermission(
  userId: string,
  permission: PermissionType
): Promise<boolean> {
  const userPermissions = await getUserPermissions(userId);
  return userPermissions.includes(permission);
}

export async function grantPermission(
  userId: string,
  permission: PermissionType,
  grantedBy?: string,
  expiresAt?: Date,
  reason?: string
) {
  const permissionRecord = await prisma.permission.findUnique({
    where: { name: permission },
  });

  if (!permissionRecord) {
    throw new Error(`Permission ${permission} not found`);
  }

  // Handle grantedBy field - only pass valid ObjectId or null
  const grantedByObjectId =
    grantedBy && grantedBy !== "system" && grantedBy.length === 24
      ? grantedBy
      : null;

  return await prisma.userPermission.upsert({
    where: {
      userId_permissionId: {
        userId,
        permissionId: permissionRecord.id,
      },
    },
    update: {
      granted: true,
      grantedBy: grantedByObjectId,
      expiresAt,
      reason,
      updatedAt: new Date(),
    },
    create: {
      userId,
      permissionId: permissionRecord.id,
      granted: true,
      grantedBy: grantedByObjectId,
      expiresAt,
      reason,
    },
  });
}

export async function revokePermission(
  userId: string,
  permission: PermissionType,
  reason?: string
) {
  const permissionRecord = await prisma.permission.findUnique({
    where: { name: permission },
  });

  if (!permissionRecord) {
    throw new Error(`Permission ${permission} not found`);
  }

  return await prisma.userPermission.upsert({
    where: {
      userId_permissionId: {
        userId,
        permissionId: permissionRecord.id,
      },
    },
    update: {
      granted: false,
      reason,
      updatedAt: new Date(),
    },
    create: {
      userId,
      permissionId: permissionRecord.id,
      granted: false,
      reason,
    },
  });
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret:
    process.env.NEXTAUTH_SECRET ||
    "development-secret-key-change-in-production",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email và mật khẩu không được để trống");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          include: {
            profile: true,
            userPermissions: {
              where: {
                granted: true,
                OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
              },
              include: {
                permission: true,
              },
            },
          },
        });

        if (!user) {
          throw new Error("Không tìm thấy tài khoản với email này");
        }

        // For OAuth users, password might be null
        if (!user.password) {
          throw new Error(
            "Tài khoản này được tạo bằng mạng xã hội. Vui lòng đăng nhập bằng Google hoặc Facebook"
          );
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Mật khẩu không chính xác");
        }

        if (user.status === "SUSPENDED") {
          throw new Error("Tài khoản của bạn đã bị tạm khóa");
        }

        if (user.status === "BANNED") {
          throw new Error("Tài khoản của bạn đã bị cấm");
        }

        // Update last active
        await prisma.user.update({
          where: { id: user.id },
          data: { lastActiveAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          displayName: user.displayName || undefined,
          avatar: user.avatar || undefined,
          role: user.role,
          subscriptionTier: user.subscriptionTier,
          isVerified: user.isVerified,
          isArtist: user.isArtist,
          permissions: user.userPermissions.map((up) => up.permission.name),
        };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    ...(process.env.FACEBOOK_CLIENT_ID
      ? [
          FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.displayName = user.displayName;
        token.avatar = user.avatar;
        token.role = user.role;
        token.subscriptionTier = user.subscriptionTier;
        token.isVerified = user.isVerified;
        token.isArtist = user.isArtist;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.displayName = token.displayName as string;
        session.user.avatar = token.avatar as string;
        session.user.role = token.role as any;
        session.user.subscriptionTier = token.subscriptionTier as any;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isArtist = token.isArtist as boolean;
        session.user.permissions = token.permissions as PermissionType[];
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Create new user from OAuth
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                username:
                  user.email!.split("@")[0] +
                  Math.random().toString(36).substr(2, 4),
                displayName: user.name || user.email!.split("@")[0],
                avatar: user.image,
                isVerified: true, // OAuth accounts are considered verified
                profile: {
                  create: {
                    firstName:
                      (profile as any)?.given_name || user.name?.split(" ")[0],
                    lastName:
                      (profile as any)?.family_name ||
                      user.name?.split(" ").slice(1).join(" "),
                  },
                },
              },
            });

            // Grant basic permissions to new users
            const basicPermissions: PermissionType[] = [
              "CREATE_PLAYLIST",
              "EDIT_PLAYLIST",
              "SHARE_PLAYLIST",
            ];

            for (const permission of basicPermissions) {
              await grantPermission(
                newUser.id,
                permission,
                "system",
                undefined,
                "New user default permissions"
              );
            }
          }
          return true;
        } catch (error) {
          console.error("OAuth sign in error:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      // Log audit event
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "LOGIN",
          entityType: "User",
          entityId: user.id,
          metadata: {
            provider: account?.provider,
            isNewUser,
          },
        },
      });
    },
  },
};

// Default permissions for new users by role
export const DEFAULT_PERMISSIONS = {
  USER: [
    "CREATE_PLAYLIST",
    "EDIT_PLAYLIST",
    "SHARE_PLAYLIST",
  ] as PermissionType[],
  ARTIST: [
    "CREATE_PLAYLIST",
    "EDIT_PLAYLIST",
    "SHARE_PLAYLIST",
    "UPLOAD_CONTENT",
    "CREATE_ALBUM",
    "EDIT_ALBUM",
    "VIEW_ARTIST_ANALYTICS",
  ] as PermissionType[],
  PREMIUM: [
    "CREATE_PLAYLIST",
    "EDIT_PLAYLIST",
    "SHARE_PLAYLIST",
    "DOWNLOAD_SONGS",
    "HIGH_QUALITY_AUDIO",
    "AD_FREE_LISTENING",
    "UNLIMITED_SKIPS",
  ] as PermissionType[],
};
