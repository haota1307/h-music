"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  AlbumCard,
  PlaylistCard,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainLayout } from "@/components/layout/main-layout";

// Mock data cho nhạc Việt
const featuredAlbums = [
  {
    id: "1",
    title: "Những Bản Hit Vpop",
    artist: "Sơn Tùng M-TP",
    imageUrl: undefined,
    isPlaying: false,
  },
  {
    id: "2",
    title: "Tình Yêu Màu Nắng",
    artist: "Đen Vâu ft. Phương Ly",
    imageUrl: undefined,
    isPlaying: true,
  },
  {
    id: "3",
    title: "Ballad Việt Hay Nhất",
    artist: "Mỹ Tâm",
    imageUrl: undefined,
    isPlaying: false,
  },
  {
    id: "4",
    title: "Rap Việt Underground",
    artist: "16 Typh",
    imageUrl: undefined,
    isPlaying: false,
  },
  {
    id: "5",
    title: "Acoustic Cover Việt",
    artist: "Bích Phương",
    imageUrl: undefined,
    isPlaying: false,
  },
  {
    id: "6",
    title: "Nhạc Trẻ Remix",
    artist: "DJ Various",
    imageUrl: undefined,
    isPlaying: false,
  },
];

const recentlyPlayed = [
  {
    id: "1",
    title: "Nhạc Chill Việt",
    description: "Thư giãn cùng nhạc Việt",
    songCount: 45,
  },
  {
    id: "2",
    title: "Vpop Hits 2024",
    description: "Top hits Việt mới nhất",
    songCount: 32,
  },
  {
    id: "3",
    title: "Nhạc Lái Xe",
    description: "Playlist cho chuyến đi",
    songCount: 68,
  },
  {
    id: "4",
    title: "Ballad Buồn",
    description: "Những ca khúc grunge tâm trạng",
    songCount: 41,
  },
];

const genres = [
  {
    name: "V-Pop",
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
    icon: "🎵",
  },
  {
    name: "Ballad",
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    icon: "💙",
  },
  {
    name: "Rap Việt",
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
    icon: "🎤",
  },
  {
    name: "Nhạc Trẻ",
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    icon: "🌟",
  },
  {
    name: "Bolero",
    color: "bg-gradient-to-br from-orange-500 to-red-600",
    icon: "🌹",
  },
  {
    name: "Acoustic",
    color: "bg-gradient-to-br from-yellow-500 to-orange-600",
    icon: "🎸",
  },
];

const topCharts = [
  {
    rank: 1,
    title: "Chúng Ta Của Tương Lai",
    artist: "Sơn Tùng M-TP",
    plays: "50M",
  },
  { rank: 2, title: "Thật Bất Ngờ", artist: "Trúc Nhân", plays: "45M" },
  { rank: 3, title: "Từng Quen", artist: "Wren Evans", plays: "42M" },
  { rank: 4, title: "Ngủ Một Mình", artist: "Hieuthuhai", plays: "38M" },
  { rank: 5, title: "Đông Phai Mờ Dần", artist: "Quân A.P", plays: "35M" },
];

const moodCategories = [
  {
    title: "Năng Lượng Tích Cực",
    description: "Bắt đầu ngày mới penuh nhiệt huyết",
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    icon: "☀️",
  },
  {
    title: "Thư Giãn Tâm Hồn",
    description: "Những giai điệu nhẹ nhàng, an lành",
    gradient: "from-blue-400 via-purple-500 to-pink-500",
    icon: "🌙",
  },
  {
    title: "Tập Trung Làm Việc",
    description: "Nhạc nền không lời cho công việc",
    gradient: "from-green-400 via-teal-500 to-blue-500",
    icon: "💻",
  },
  {
    title: "Tình Yêu Lãng Mạn",
    description: "Cảm xúc yêu thương ngọt ngào",
    gradient: "from-pink-400 via-red-500 to-rose-600",
    icon: "💕",
  },
];

export default function HomePage() {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Chào buổi sáng"
      : currentHour < 18
      ? "Chào buổi chiều"
      : "Chào buổi tối";

  return (
    <MainLayout>
      <div className="space-y-10">
        {/* Hero Section - Redesigned */}
        <section className="relative">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-pink-600 to-purple-700 p-8 md:p-12">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16" />
            </div>

            <div className="relative z-10 max-w-4xl">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                  🎵 H-Music Vietnam
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {greeting}! <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Khám phá âm nhạc Việt
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                Thưởng thức những giai điệu Việt Nam hay nhất, từ V-Pop hiện đại
                đến những ca khúc ballad bất hủ. Trải nghiệm âm nhạc không giới
                hạn cùng H-Music.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Bắt Đầu Nghe Nhạc
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/50 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Khám Phá Thư Viện
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mood Categories */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            Tâm Trạng Hôm Nay
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moodCategories.map((mood, index) => (
              <Card
                key={index}
                className="group cursor-pointer border-0 overflow-hidden"
              >
                <div
                  className={`h-32 bg-gradient-to-br ${mood.gradient} p-6 relative`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="relative z-10">
                    <span className="text-3xl mb-2 block">{mood.icon}</span>
                    <h3 className="text-white font-bold text-lg">
                      {mood.title}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">
                    {mood.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Access - Improved */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            Nghe Gần Đây
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentlyPlayed.map((playlist) => (
              <Card
                key={playlist.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border hover:border-primary/20"
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground truncate">
                      {playlist.title}
                    </h3>
                    <p className="text-muted-foreground truncate">
                      {playlist.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {playlist.songCount} bài hát
                    </p>
                  </div>
                  <Button
                    variant="default"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary hover:bg-primary/90"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Browse by Genre - Enhanced */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            Thể Loại Âm Nhạc
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre) => (
              <Card
                key={genre.name}
                className="group cursor-pointer border-0 overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`${genre.color} h-24 flex flex-col items-center justify-center relative`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <span className="text-2xl mb-1 relative z-10">
                    {genre.icon}
                  </span>
                  <h3 className="text-white font-bold text-sm relative z-10">
                    {genre.name}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Albums - Redesigned */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Album Nổi Bật
            </h2>
            <Button
              variant="link"
              className="text-primary hover:text-primary/80"
            >
              Xem tất cả →
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                title={album.title}
                artist={album.artist}
                imageUrl={album.imageUrl}
                isPlaying={album.isPlaying}
                onPlay={() => console.log("Play album:", album.id)}
                className="hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </section>

        {/* Top Charts - Enhanced */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            Bảng Xếp Hạng Việt
          </h2>
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
              <CardTitle className="text-2xl">🏆 Top 50 Việt Nam</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {topCharts.map((track, index) => (
                  <div
                    key={track.rank}
                    className={`flex items-center gap-6 p-4 hover:bg-accent transition-colors cursor-pointer group ${
                      index < 3
                        ? "bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-950/10 dark:to-orange-950/10"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-center w-10 h-10">
                      {index < 3 ? (
                        <span className="text-2xl">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                        </span>
                      ) : (
                        <span className="text-lg font-bold text-muted-foreground">
                          {track.rank}
                        </span>
                      )}
        </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground truncate">
                        {track.title}
                      </h4>
                      <p className="text-muted-foreground truncate">
                        {track.artist}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-muted-foreground">
                        {track.plays} lượt nghe
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
    </div>
    </MainLayout>
  );
}
