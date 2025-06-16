import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Mock search data
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
];

const mockAlbums = [
  {
    id: "1",
    title: "99%",
    artist: "MCK",
    imageUrl:
      "https://avatar-ex-swe.nixcdn.com/playlist/2023/10/20/9/5/3/8/1697805229686_500.jpg",
    tracks: mockTracks,
    releaseDate: "2023-10-20",
    genre: "Rap Việt",
  },
];

const mockArtists = [
  {
    id: "1",
    name: "Sơn Tùng M-TP",
    imageUrl:
      "https://avatar-ex-swe.nixcdn.com/singer/avatar/2023/10/18/9/c/6/4/1697620766969_600.jpg",
    bio: "Ca sĩ, rapper, nhạc sĩ, nhà sản xuất âm nhạc người Việt Nam",
    followers: 5200000,
    genres: ["V-Pop", "Hip-hop"],
  },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const type = searchParams.get("type") || "all";
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!query.trim()) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    // Simple mock search logic
    const searchTerm = query.toLowerCase();

    let tracks = mockTracks.filter(
      (track) =>
        track.title.toLowerCase().includes(searchTerm) ||
        track.artist.toLowerCase().includes(searchTerm)
    );

    let albums = mockAlbums.filter(
      (album) =>
        album.title.toLowerCase().includes(searchTerm) ||
        album.artist.toLowerCase().includes(searchTerm)
    );

    let artists = mockArtists.filter((artist) =>
      artist.name.toLowerCase().includes(searchTerm)
    );

    // Apply pagination
    const startIndex = offset;
    const endIndex = offset + limit;

    const result = {
      tracks:
        type === "all" || type === "tracks"
          ? tracks.slice(startIndex, endIndex)
          : [],
      albums:
        type === "all" || type === "albums"
          ? albums.slice(startIndex, endIndex)
          : [],
      artists:
        type === "all" || type === "artists"
          ? artists.slice(startIndex, endIndex)
          : [],
      playlists: [], // TODO: Add playlists search
      total: {
        tracks: tracks.length,
        albums: albums.length,
        artists: artists.length,
        playlists: 0,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
