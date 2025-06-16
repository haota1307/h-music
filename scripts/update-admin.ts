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
  console.log("🔄 Updating admin account...");

  try {
    // Find existing admin
    const existingAdmin = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
      include: {
        userPermissions: {
          include: {
            permission: true,
          },
        },
        profile: true,
        preferences: true,
        subscription: true,
      },
    });

    if (!existingAdmin) {
      console.log("❌ Admin account not found!");
      return;
    }

    console.log(
      `✅ Found admin: ${existingAdmin.email} (ID: ${existingAdmin.id})`
    );

    // Hash new password
    const hashedPassword = await bcryptjs.hash(ADMIN_PASSWORD, 12);

    // Update admin in transaction
    const updatedAdmin = await prisma.$transaction(async (tx) => {
      // Update user details
      const updated = await tx.user.update({
        where: { id: existingAdmin.id },
        data: {
          password: hashedPassword,
          role: UserRole.ADMIN,
          status: UserStatus.ACTIVE,
          subscriptionTier: SubscriptionTier.PREMIUM,
          isVerified: true,
          displayName: "H-Music Admin",
        },
      });

      console.log(`✅ Updated admin user details`);

      // Get current permissions
      const currentPermissions = existingAdmin.userPermissions.map(
        (up) => up.permission.name
      );
      console.log(`📋 Current permissions: ${currentPermissions.length}`);

      // Grant missing permissions
      let permissionsGranted = 0;
      for (const permissionName of ADMIN_PERMISSIONS) {
        if (!currentPermissions.includes(permissionName)) {
          try {
            const permission = await tx.permission.findUnique({
              where: { name: permissionName },
            });

            if (permission) {
              await tx.userPermission.create({
                data: {
                  userId: existingAdmin.id,
                  permissionId: permission.id,
                  granted: true,
                  grantedBy: null,
                  reason: "Admin account update - ensure full access",
                },
              });
              permissionsGranted++;
              console.log(`  ✅ Granted: ${permissionName}`);
            } else {
              console.log(`  ⚠️ Permission not found: ${permissionName}`);
            }
          } catch (error) {
            console.error(`  ❌ Error granting ${permissionName}:`, error);
          }
        }
      }

      if (permissionsGranted > 0) {
        console.log(`✅ Granted ${permissionsGranted} new permissions`);
      } else {
        console.log(`✅ All permissions already granted`);
      }

      // Ensure profile exists
      if (!existingAdmin.profile) {
        await tx.userProfile.create({
          data: {
            userId: existingAdmin.id,
            firstName: "Admin",
            lastName: "H-Music",
            language: "vi",
            isPrivate: false,
          },
        });
        console.log(`✅ Created admin profile`);
      }

      // Ensure preferences exist
      if (!existingAdmin.preferences) {
        await tx.userPreferences.create({
          data: {
            userId: existingAdmin.id,
            theme: "dark",
            audioQuality: "high",
            autoPlay: true,
            showExplicitContent: true,
            enableNotifications: true,
            emailNotifications: true,
            pushNotifications: true,
            shareListeningData: false,
            crossfadeEnabled: false,
            crossfadeDuration: 5,
            volumeLevel: 0.8,
          },
        });
        console.log(`✅ Created admin preferences`);
      }

      // Ensure subscription exists
      if (!existingAdmin.subscription) {
        await tx.userSubscription.create({
          data: {
            userId: existingAdmin.id,
            tier: SubscriptionTier.PREMIUM,
            status: "ACTIVE",
            startDate: new Date(),
            autoRenew: false,
          },
        });
        console.log(`✅ Created admin subscription`);
      }

      // Log audit event
      await tx.auditLog.create({
        data: {
          userId: existingAdmin.id,
          action: "UPDATE_ADMIN",
          entityType: "User",
          entityId: existingAdmin.id,
          metadata: {
            email: existingAdmin.email,
            username: existingAdmin.username,
            role: "ADMIN",
            newPermissions: permissionsGranted,
            updatedBy: "update-script",
          },
        },
      });

      return updated;
    });

    console.log("🎉 Admin update completed successfully!");
    console.log("\n📋 Updated Admin Account Details:");
    console.log(`📧 Email: ${ADMIN_EMAIL}`);
    console.log(`👤 Username: ${existingAdmin.username}`);
    console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
    console.log(`🆔 User ID: ${existingAdmin.id}`);
    console.log(`👑 Role: ADMIN`);
    console.log(`✅ Status: ACTIVE`);
    console.log(`💎 Subscription: PREMIUM`);
    console.log(`\n✅ Admin account is now ready to use!`);
  } catch (error) {
    console.error("❌ Admin update failed:", error);
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
