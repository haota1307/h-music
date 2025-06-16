import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Mock recently played data
const mockRecentlyPlayed = [
  {
    id: "2",
    title: "Cả Một Trời Thương Nhớ",
    artist: "Sơn Tùng M-TP",
    album: "Sky Tour",
    duration: 244,
    imageUrl:
      "https://avatar-ex-swe.nixcdn.com/song/2023/01/10/1/a/8/d/1673335935122_640.jpg",
    audioUrl: "/audio/sample.mp3",
    playCount: 1987654,
    isLiked: false,
    playedAt: "2024-01-16T14:30:00Z",
  },
  {
    id: "3",
    title: "Người Anh Em",
    artist: "Karik, OnlyC",
    album: "Single",
    duration: 223,
    imageUrl:
      "https://avatar-ex-swe.nixcdn.com/song/2023/08/15/3/2/1/5/1692087421987_640.jpg",
    audioUrl: "/audio/sample.mp3",
    playCount: 1654321,
    isLiked: false,
    playedAt: "2024-01-16T13:15:00Z",
  },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    // Sort by playedAt descending and limit
    const recentTracks = mockRecentlyPlayed
      .sort(
        (a, b) =>
          new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime()
      )
      .slice(0, limit);

    return NextResponse.json(recentTracks);
  } catch (error) {
    console.error("Recently played API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
