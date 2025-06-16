import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const mockGenres = [
  "V-Pop",
  "Ballad Việt",
  "Rap Việt",
  "Nhạc Trẻ",
  "Bolero",
  "Acoustic",
  "Rock Việt",
  "Indie Việt",
  "Nhạc Dân Gian",
  "Cải Lương",
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(mockGenres);
  } catch (error) {
    console.error("Genres API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
