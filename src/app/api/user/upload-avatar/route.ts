import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary, uploadOptions } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Chưa chọn file" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "File phải là hình ảnh" },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Kích thước file phải nhỏ hơn 5MB" },
        { status: 400 }
      );
    }

    // Convert file to base64 for Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Generate unique public ID
    const publicId = `avatar_${session.user.id}_${Date.now()}`;

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(
      base64,
      uploadOptions.avatar,
      publicId
    );

    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, error: uploadResult.error || "Tải lên thất bại" },
        { status: 500 }
      );
    }

    // Update user avatar in database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { avatar: uploadResult.url },
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      message: "Tải lên ảnh đại diện thành công",
    });
  } catch (error) {
    console.error("Avatar upload error:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}
