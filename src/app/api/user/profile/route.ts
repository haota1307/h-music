import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    // Get user profile from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true,
        _count: {
          select: {
            uploadedSongs: true,
            albums: true,
            playlists: true,
            followers: true,
            followedUsers: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    // Format response
    const profileData = {
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      avatar: user.avatar,
      role: user.role,
      subscriptionTier: user.subscriptionTier,
      isVerified: user.isVerified,
      isArtist: user.isArtist,
      status: user.status,
      createdAt: user.createdAt.toISOString(),
      lastActiveAt: user.lastActiveAt?.toISOString() || null,
      profile: {
        bio: user.bio,
        location: user.country,
        website: user.profile?.website || null,
        socialLinks: user.profile?.socialLinks || {},
        preferences: {},
      },
      stats: {
        tracks: user._count.uploadedSongs,
        albums: user._count.albums,
        playlists: user._count.playlists,
        followers: user._count.followers,
        following: user._count.followedUsers,
      },
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const body = await request.json();
    const { displayName, bio, location, website, socialLinks, preferences } =
      body;

    // Validate input
    if (displayName && displayName.length > 50) {
      return NextResponse.json(
        { error: "Tên hiển thị phải ít hơn 50 ký tự" },
        { status: 400 }
      );
    }

    if (bio && bio.length > 500) {
      return NextResponse.json(
        { error: "Tiểu sử phải ít hơn 500 ký tự" },
        { status: 400 }
      );
    }

    // Update user and profile in transaction
    const updatedUser = await prisma.$transaction(async (tx) => {
      // Update user basic info
      const user = await tx.user.update({
        where: { id: session.user.id },
        data: {
          displayName: displayName || undefined,
          bio: bio || undefined,
          country: location || undefined,
          lastActiveAt: new Date(),
        },
      });

      // Upsert profile for additional fields
      const profile = await tx.userProfile.upsert({
        where: { userId: session.user.id },
        create: {
          userId: session.user.id,
          website: website || null,
          socialLinks: socialLinks || {},
        },
        update: {
          website: website !== undefined ? website : undefined,
          socialLinks: socialLinks !== undefined ? socialLinks : undefined,
        },
      });

      return { user, profile };
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật hồ sơ thành công",
      user: {
        id: updatedUser.user.id,
        displayName: updatedUser.user.displayName,
        profile: {
          bio: updatedUser.user.bio,
          location: updatedUser.user.country,
          website: updatedUser.profile.website,
          socialLinks: updatedUser.profile.socialLinks,
        },
      },
    });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
