import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const mockTracks = [
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
    isLiked: false,
  },
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
  },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const genre = searchParams.get("genre");

    let tracks = [...mockTracks];

    // Filter by genre if specified
    if (genre) {
      // tracks = tracks.filter(track => track.genre === genre)
    }

    // Apply pagination
    const total = tracks.length;
    const paginatedTracks = tracks.slice(offset, offset + limit);

    return NextResponse.json({
      tracks: paginatedTracks,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Tracks API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
