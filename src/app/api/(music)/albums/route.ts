import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const mockAlbums = [
  {
    id: "1",
    title: "99%",
    artist: "MCK",
    imageUrl:
      "https://avatar-ex-swe.nixcdn.com/playlist/2023/10/20/9/5/3/8/1697805229686_500.jpg",
    tracks: [
      {
        id: "1",
        title: "Intro",
        artist: "MCK",
        duration: 120,
        audioUrl: "/audio/sample.mp3",
      },
    ],
    releaseDate: "2023-10-20",
    genre: "Rap Việt",
    trackCount: 12,
  },
  {
    id: "2",
    title: "Sky Tour",
    artist: "Sơn Tùng M-TP",
    imageUrl: "https://avatar-ex-swe.nixcdn.com/album/2023/sky-tour.jpg",
    tracks: [
      {
        id: "2",
        title: "Cả Một Trời Thương Nhớ",
        artist: "Sơn Tùng M-TP",
        duration: 244,
        audioUrl: "/audio/sample.mp3",
      },
    ],
    releaseDate: "2023-01-10",
    genre: "V-Pop",
    trackCount: 8,
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
    const offset = parseInt(searchParams.get("offset") || "0");
    const genre = searchParams.get("genre");

    let albums = [...mockAlbums];

    // Filter by genre if specified
    if (genre) {
      albums = albums.filter((album) => album.genre === genre);
    }

    // Apply pagination
    const total = albums.length;
    const paginatedAlbums = albums.slice(offset, offset + limit);

    return NextResponse.json({
      albums: paginatedAlbums,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Albums API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
