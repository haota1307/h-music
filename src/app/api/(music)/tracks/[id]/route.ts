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
    lyrics: "Đếm cừu đếm cừu đếm cừu...",
    releaseDate: "2023-12-21",
    genre: "V-Pop",
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
    lyrics: "Cả một trời thương nhớ...",
    releaseDate: "2023-01-10",
    genre: "V-Pop",
  },
];

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const track = mockTracks.find((t) => t.id === id);

    if (!track) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    return NextResponse.json(track);
  } catch (error) {
    console.error("Track detail API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
