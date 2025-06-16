import {
  PrismaClient,
  UserRole,
  UserStatus,
  SubscriptionTier,
  PermissionType,
} from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "haodev1307@gmail.com";
const ADMIN_PASSWORD = "@Bc123123";
const ADMIN_USERNAME = "haodev1307";

// All admin permissions
const ADMIN_PERMISSIONS: PermissionType[] = [
  // Content Management
  "CREATE_SONG",
  "EDIT_SONG",
  "DELETE_SONG",
  "PUBLISH_SONG",

  // Album Management
  "CREATE_ALBUM",
  "EDIT_ALBUM",
  "DELETE_ALBUM",
  "PUBLISH_ALBUM",

  // Playlist Management
  "CREATE_PLAYLIST",
  "EDIT_PLAYLIST",
  "DELETE_PLAYLIST",
  "SHARE_PLAYLIST",

  // User Management
  "VIEW_USERS",
  "EDIT_USERS",
  "DELETE_USERS",
  "SUSPEND_USERS",

  // Content Moderation
  "MODERATE_CONTENT",
  "MODERATE_COMMENTS",
  "HANDLE_REPORTS",

  // Analytics & Reports
  "VIEW_ANALYTICS",
  "VIEW_REPORTS",
  "EXPORT_DATA",

  // System Admin
  "MANAGE_SYSTEM",
  "MANAGE_PERMISSIONS",
  "MANAGE_SUBSCRIPTIONS",

  // Artist Features
  "UPLOAD_CONTENT",
  "MONETIZE_CONTENT",
  "VIEW_ARTIST_ANALYTICS",

  // Premium Features
  "DOWNLOAD_SONGS",
  "HIGH_QUALITY_AUDIO",
  "AD_FREE_LISTENING",
  "UNLIMITED_SKIPS",
];

async function main() {
  console.log("🌱 Seeding admin account...");

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    });

    if (existingAdmin) {
      console.log("⚠️ Admin account already exists!");
      console.log(`Admin ID: ${existingAdmin.id}`);
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Username: ${existingAdmin.username}`);
      return;
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(ADMIN_PASSWORD, 12);

    // Create admin user with all data
    const adminUser = await prisma.$transaction(async (tx) => {
      // Create user
      const newAdmin = await tx.user.create({
        data: {
          email: ADMIN_EMAIL,
          username: ADMIN_USERNAME,
          password: hashedPassword,
          displayName: "H-Music Admin",
          role: UserRole.ADMIN,
          status: UserStatus.ACTIVE,
          subscriptionTier: SubscriptionTier.PREMIUM,
          isVerified: true,
          isArtist: false,
          profile: {
            create: {
              firstName: "Admin",
              lastName: "H-Music",
              language: "vi",
              isPrivate: false,
            },
          },
          preferences: {
            create: {
              theme: "dark",
              audioQuality: "high",
              autoPlay: true,
              showExplicitContent: true,
              enableNotifications: true,
              emailNotifications: true,
              pushNotifications: true,
              shareListeningData: false, // Admin privacy
              crossfadeEnabled: false,
              crossfadeDuration: 5,
              volumeLevel: 0.8,
            },
          },
          subscription: {
            create: {
              tier: SubscriptionTier.PREMIUM,
              status: "ACTIVE",
              startDate: new Date(),
              autoRenew: false, // Admin doesn't need auto-renew
            },
          },
        },
        include: {
          profile: true,
          preferences: true,
          subscription: true,
        },
      });

      console.log(`✅ Created admin user: ${newAdmin.email}`);

      // Grant all admin permissions
      let permissionsGranted = 0;
      for (const permissionName of ADMIN_PERMISSIONS) {
        try {
          const permission = await tx.permission.findUnique({
            where: { name: permissionName },
          });

          if (permission) {
            await tx.userPermission.create({
              data: {
                userId: newAdmin.id,
                permissionId: permission.id,
                granted: true,
                grantedBy: null, // System grant
                reason: "Admin account - full system access",
              },
            });
            permissionsGranted++;
          } else {
            console.log(`⚠️ Permission not found: ${permissionName}`);
          }
        } catch (error) {
          console.error(
            `❌ Error granting permission ${permissionName}:`,
            error
          );
        }
      }

      console.log(`✅ Granted ${permissionsGranted} permissions to admin`);

      // Log audit event
      await tx.auditLog.create({
        data: {
          userId: newAdmin.id,
          action: "CREATE_ADMIN",
          entityType: "User",
          entityId: newAdmin.id,
          metadata: {
            email: newAdmin.email,
            username: newAdmin.username,
            role: newAdmin.role,
            permissionsGranted,
            createdBy: "seed-script",
          },
        },
      });

      console.log(`✅ Created audit log for admin account`);

      return newAdmin;
    });

    console.log("🎉 Admin seeding completed successfully!");
    console.log("\n📋 Admin Account Details:");
    console.log(`📧 Email: ${adminUser.email}`);
    console.log(`👤 Username: ${adminUser.username}`);
    console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
    console.log(`🆔 User ID: ${adminUser.id}`);
    console.log(`👑 Role: ${adminUser.role}`);
    console.log(`✅ Status: ${adminUser.status}`);
    console.log(`💎 Subscription: ${adminUser.subscriptionTier}`);
    console.log(
      `\n⚠️  IMPORTANT: Change the admin password after first login!`
    );
  } catch (error) {
    console.error("❌ Admin seeding failed:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("❌ Script failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
