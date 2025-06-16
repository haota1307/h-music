import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Mock favorites data - in real app this would be from database
let mockFavorites = [
  {
    id: "1",
    title: "Đếm Cừu",
    artist: "HIEUTHUHAI, Kimmese",
    album: "Album Demo",
    duration: 186,
    imageUrl:
      "https://avatar-ex-swe.nixcdn.com/song/2023/12/21/4/8/8/7/1703152233872_640.jpg",
    audioUrl: "/audio/sample.mp3",
    playCount: 2543891,
    isLiked: true,
    addedAt: "2024-01-15T10:30:00Z",
  },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(mockFavorites);
  } catch (error) {
    console.error("Favorites API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { trackId } = await request.json();

    if (!trackId) {
      return NextResponse.json(
        { error: "Track ID is required" },
        { status: 400 }
      );
    }

    // In real app, add to database
    // For mock, just return success
    return NextResponse.json({
      message: "Track added to favorites",
      success: true,
    });
  } catch (error) {
    console.error("Add favorites API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
