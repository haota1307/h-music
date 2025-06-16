import { PrismaClient, PermissionType } from "@prisma/client";

const prisma = new PrismaClient();

const permissions = [
  // Content Management
  {
    name: "CREATE_SONG" as PermissionType,
    description: "Tạo bài hát mới",
    category: "Content",
  },
  {
    name: "EDIT_SONG" as PermissionType,
    description: "Chỉnh sửa bài hát",
    category: "Content",
  },
  {
    name: "DELETE_SONG" as PermissionType,
    description: "Xóa bài hát",
    category: "Content",
  },
  {
    name: "PUBLISH_SONG" as PermissionType,
    description: "Xuất bản bài hát",
    category: "Content",
  },

  // Album Management
  {
    name: "CREATE_ALBUM" as PermissionType,
    description: "Tạo album mới",
    category: "Content",
  },
  {
    name: "EDIT_ALBUM" as PermissionType,
    description: "Chỉnh sửa album",
    category: "Content",
  },
  {
    name: "DELETE_ALBUM" as PermissionType,
    description: "Xóa album",
    category: "Content",
  },
  {
    name: "PUBLISH_ALBUM" as PermissionType,
    description: "Xuất bản album",
    category: "Content",
  },

  // Playlist Management
  {
    name: "CREATE_PLAYLIST" as PermissionType,
    description: "Tạo playlist",
    category: "Content",
  },
  {
    name: "EDIT_PLAYLIST" as PermissionType,
    description: "Chỉnh sửa playlist",
    category: "Content",
  },
  {
    name: "DELETE_PLAYLIST" as PermissionType,
    description: "Xóa playlist",
    category: "Content",
  },
  {
    name: "SHARE_PLAYLIST" as PermissionType,
    description: "Chia sẻ playlist",
    category: "Content",
  },

  // User Management
  {
    name: "VIEW_USERS" as PermissionType,
    description: "Xem danh sách người dùng",
    category: "User",
  },
  {
    name: "EDIT_USERS" as PermissionType,
    description: "Chỉnh sửa thông tin người dùng",
    category: "User",
  },
  {
    name: "DELETE_USERS" as PermissionType,
    description: "Xóa người dùng",
    category: "User",
  },
  {
    name: "SUSPEND_USERS" as PermissionType,
    description: "Tạm khóa người dùng",
    category: "User",
  },

  // Content Moderation
  {
    name: "MODERATE_CONTENT" as PermissionType,
    description: "Kiểm duyệt nội dung",
    category: "Moderation",
  },
  {
    name: "MODERATE_COMMENTS" as PermissionType,
    description: "Kiểm duyệt bình luận",
    category: "Moderation",
  },
  {
    name: "HANDLE_REPORTS" as PermissionType,
    description: "Xử lý báo cáo",
    category: "Moderation",
  },

  // Analytics & Reports
  {
    name: "VIEW_ANALYTICS" as PermissionType,
    description: "Xem thống kê",
    category: "Analytics",
  },
  {
    name: "VIEW_REPORTS" as PermissionType,
    description: "Xem báo cáo",
    category: "Analytics",
  },
  {
    name: "EXPORT_DATA" as PermissionType,
    description: "Xuất dữ liệu",
    category: "Analytics",
  },

  // System Admin
  {
    name: "MANAGE_SYSTEM" as PermissionType,
    description: "Quản lý hệ thống",
    category: "System",
  },
  {
    name: "MANAGE_PERMISSIONS" as PermissionType,
    description: "Quản lý quyền hạn",
    category: "System",
  },
  {
    name: "MANAGE_SUBSCRIPTIONS" as PermissionType,
    description: "Quản lý gói đăng ký",
    category: "System",
  },

  // Artist Features
  {
    name: "UPLOAD_CONTENT" as PermissionType,
    description: "Tải lên nội dung",
    category: "Artist",
  },
  {
    name: "MONETIZE_CONTENT" as PermissionType,
    description: "Kiếm tiền từ nội dung",
    category: "Artist",
  },
  {
    name: "VIEW_ARTIST_ANALYTICS" as PermissionType,
    description: "Xem thống kê nghệ sĩ",
    category: "Artist",
  },

  // Premium Features
  {
    name: "DOWNLOAD_SONGS" as PermissionType,
    description: "Tải xuống bài hát",
    category: "Premium",
  },
  {
    name: "HIGH_QUALITY_AUDIO" as PermissionType,
    description: "Nghe chất lượng cao",
    category: "Premium",
  },
  {
    name: "AD_FREE_LISTENING" as PermissionType,
    description: "Nghe nhạc không quảng cáo",
    category: "Premium",
  },
  {
    name: "UNLIMITED_SKIPS" as PermissionType,
    description: "Bỏ qua không giới hạn",
    category: "Premium",
  },
];

async function main() {
  console.log("🌱 Seeding permissions...");

  for (const permission of permissions) {
    try {
      await prisma.permission.upsert({
        where: { name: permission.name },
        update: {
          description: permission.description,
          category: permission.category,
          isActive: true,
        },
        create: {
          name: permission.name,
          description: permission.description,
          category: permission.category,
          isActive: true,
        },
      });

      console.log(`✅ Created/updated permission: ${permission.name}`);
    } catch (error) {
      console.error(`❌ Error creating permission ${permission.name}:`, error);
    }
  }

  console.log("🎉 Permission seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Permission seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
