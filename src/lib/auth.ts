import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

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
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // JWT expires in 7 days
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      const now = Math.floor(Date.now() / 1000);

      if (user) {
        // New login - set all user data with expiration
        token.id = user.id;
        token.username = user.username;
        token.displayName = user.displayName;
        token.avatar = user.avatar;
        token.role = user.role;
        token.subscriptionTier = user.subscriptionTier;
        token.isVerified = user.isVerified;
        token.isArtist = user.isArtist;
        token.iat = now;
        token.exp = now + 7 * 24 * 60 * 60; // 7 days from now
        token.refreshAt = now + 6 * 24 * 60 * 60; // Refresh after 6 days
      } else if (token.id) {
        // Check if token needs refresh (within 1 day of expiration)
        const shouldRefresh =
          trigger === "update" ||
          (token.refreshAt && now >= (token.refreshAt as number));

        if (shouldRefresh) {
          try {
            // Refresh user data from database
            const userData = await prisma.user.findUnique({
              where: { id: token.id as string },
              select: {
                id: true,
                email: true,
                username: true,
                displayName: true,
                avatar: true,
                role: true,
                subscriptionTier: true,
                isVerified: true,
                isArtist: true,
                status: true,
              },
            });

            if (!userData) {
              // User no longer exists, mark token as invalid but don't return null
              token.id = "";
              token.username = "";
              token.role = "USER" as any;
              return token;
            }

            if (
              userData.status === "SUSPENDED" ||
              userData.status === "BANNED"
            ) {
              // User is suspended/banned, mark in token
              token.userStatus = userData.status;
              return token;
            }

            // Update token with fresh data
            token.email = userData.email;
            token.username = userData.username;
            token.displayName = userData.displayName || undefined;
            token.avatar = userData.avatar || undefined;
            token.role = userData.role;
            token.subscriptionTier = userData.subscriptionTier;
            token.isVerified = userData.isVerified;
            token.isArtist = userData.isArtist;
            token.userStatus = userData.status;

            // Update token expiration times
            token.iat = now;
            token.exp = now + 7 * 24 * 60 * 60; // Extend for another 7 days
            token.refreshAt = now + 6 * 24 * 60 * 60; // Next refresh in 6 days

            // Update user's last active time
            await prisma.user.update({
              where: { id: token.id as string },
              data: { lastActiveAt: new Date() },
            });

            console.log(`Token refreshed for user ${userData.email}`);
          } catch (error) {
            console.error("Error refreshing token:", error);
            // Don't fail the session, just keep existing token
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Check if user is suspended/banned
        if (token.userStatus === "SUSPENDED" || token.userStatus === "BANNED") {
          // Return minimal session for suspended users
          return {
            ...session,
            user: {
              ...session.user,
              id: "",
              role: "USER" as any,
            },
          };
        }

        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.displayName = token.displayName as string;
        session.user.avatar = token.avatar as string;
        session.user.role = token.role as any;
        session.user.subscriptionTier = token.subscriptionTier as any;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isArtist = token.isArtist as boolean;
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
            await prisma.user.create({
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
