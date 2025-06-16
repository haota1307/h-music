import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Mock data cho charts (sau này sẽ thay bằng database)
const mockChartTracks = [
  {
    id: "1",
    title: "Đếm Cừu",
    artist: "HIEUTHUHAI, Kimmese",
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
    duration: 223,
    imageUrl:
      "https://avatar-ex-swe.nixcdn.com/song/2023/08/15/3/2/1/5/1692087421987_640.jpg",
    audioUrl: "/audio/sample.mp3",
    playCount: 1654321,
    isLiked: false,
  },
  {
    id: "4",
    title: "Chúng Ta Của Tương Lai",
    artist: "Sơn Tùng M-TP",
    duration: 267,
    imageUrl:
      "https://avatar-ex-swe.nixcdn.com/song/2022/11/24/b/3/a/c/1669280912203_640.jpg",
    audioUrl: "/audio/sample.mp3",
    playCount: 1432109,
    isLiked: false,
  },
  {
    id: "5",
    title: "See Tình",
    artist: "Hoàng Thùy Linh",
    duration: 201,
    imageUrl:
      "https://avatar-ex-swe.nixcdn.com/song/2023/05/18/d/4/e/8/1684389123456_640.jpg",
    audioUrl: "/audio/sample.mp3",
    playCount: 1298765,
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
    const period = searchParams.get("period") || "weekly";

    // Validate period parameter
    if (!["daily", "weekly", "monthly"].includes(period)) {
      return NextResponse.json(
        { error: "Invalid period parameter" },
        { status: 400 }
      );
    }

    // Simulate different chart data based on period
    let tracks = [...mockChartTracks];

    // Shuffle and limit based on period
    if (period === "daily") {
      tracks = tracks.slice(0, 20);
    } else if (period === "weekly") {
      tracks = tracks.slice(0, 50);
    } else {
      tracks = tracks.slice(0, 100);
    }

    const chartData = {
      tracks,
      period,
      country: "VN",
    };

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Charts API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
