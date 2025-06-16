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
import { SearchInput } from "@/components/ui/input";
import { MainLayout } from "@/components/layout/main-layout";

// Mock data
const newReleases = [
  {
    id: "1",
    title: "Midnight Album",
    artist: "Dream Walker",
    imageUrl: undefined,
    isPlaying: false,
  },
  {
    id: "2",
    title: "Electric Soul",
    artist: "Neon Dreams",
    imageUrl: undefined,
    isPlaying: false,
  },
  {
    id: "3",
    title: "Acoustic Heart",
    artist: "River Song",
    imageUrl: undefined,
    isPlaying: false,
  },
  {
    id: "4",
    title: "Digital Love",
    artist: "Cyber Wave",
    imageUrl: undefined,
    isPlaying: false,
  },
  {
    id: "5",
    title: "Jazz Night",
    artist: "Blue Note",
    imageUrl: undefined,
    isPlaying: false,
  },
  {
    id: "6",
    title: "Rock Spirit",
    artist: "Thunder Road",
    imageUrl: undefined,
    isPlaying: false,
  },
];

const featuredPlaylists = [
  {
    id: "1",
    title: "Today's Top Hits",
    description: "The most played songs today",
    songCount: 50,
  },
  {
    id: "2",
    title: "Chill Indie",
    description: "Relaxing indie songs",
    songCount: 75,
  },
  {
    id: "3",
    title: "Party Mix",
    description: "Get the party started",
    songCount: 100,
  },
  {
    id: "4",
    title: "Workout Beats",
    description: "High energy workout music",
    songCount: 45,
  },
  {
    id: "5",
    title: "Sleep Sounds",
    description: "Peaceful music for sleep",
    songCount: 30,
  },
  {
    id: "6",
    title: "Road Trip",
    description: "Perfect for long drives",
    songCount: 80,
  },
];

const genreCategories = [
  {
    name: "Pop",
    color: "from-pink-500 to-red-500",
    description: "The biggest hits",
  },
  {
    name: "Hip Hop",
    color: "from-purple-500 to-pink-500",
    description: "Beats and rhymes",
  },
  {
    name: "Rock",
    color: "from-red-500 to-orange-500",
    description: "Electric energy",
  },
  {
    name: "Electronic",
    color: "from-blue-500 to-purple-500",
    description: "Digital sounds",
  },
  {
    name: "Jazz",
    color: "from-yellow-500 to-orange-500",
    description: "Smooth classics",
  },
  {
    name: "Classical",
    color: "from-green-500 to-blue-500",
    description: "Timeless pieces",
  },
  {
    name: "Country",
    color: "from-orange-500 to-red-500",
    description: "Stories and strings",
  },
  {
    name: "R&B",
    color: "from-purple-500 to-blue-500",
    description: "Soul and rhythm",
  },
];

const moodCategories = [
  { title: "Happy", emoji: "😊", color: "bg-yellow-500" },
  { title: "Chill", emoji: "😌", color: "bg-blue-500" },
  { title: "Energetic", emoji: "⚡", color: "bg-red-500" },
  { title: "Sad", emoji: "😢", color: "bg-gray-500" },
  { title: "Romantic", emoji: "💕", color: "bg-pink-500" },
  { title: "Focus", emoji: "🎯", color: "bg-green-500" },
];

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <section>
          <h1 className="text-heading-1 mb-6">Browse Music</h1>
          <div className="max-w-2xl">
            <SearchInput
              variant="default"
              size="lg"
              placeholder="Search for artists, songs, albums..."
              onSearch={(query) => setSearchQuery(query)}
              onClear={() => setSearchQuery("")}
            />
          </div>
        </section>

        {/* Mood & Activity */}
        <section>
          <h2 className="text-heading-3 mb-6">Browse by Mood</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {moodCategories.map((mood) => (
              <Card
                key={mood.title}
                variant="flat"
                hover="scale"
                padding="lg"
                className={`${mood.color} cursor-pointer relative overflow-hidden`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <h3 className="font-semibold text-white">{mood.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Genres */}
        <section>
          <h2 className="text-heading-3 mb-6">Genres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {genreCategories.map((genre) => (
              <Card
                key={genre.name}
                variant="flat"
                hover="lift"
                padding="lg"
                className={`bg-gradient-to-br ${genre.color} cursor-pointer relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {genre.name}
                  </h3>
                  <p className="text-white/80 text-sm">{genre.description}</p>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/10 rounded-full" />
              </Card>
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-heading-3">New Releases</h2>
            <Button variant="link">Show all</Button>
          </div>
          <div className="grid grid-auto-fill gap-6">
            {newReleases.map((album) => (
              <AlbumCard
                key={album.id}
                title={album.title}
                artist={album.artist}
                imageUrl={album.imageUrl}
                isPlaying={album.isPlaying}
                onPlay={() => console.log("Play album:", album.id)}
              />
            ))}
          </div>
        </section>

        {/* Featured Playlists */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-heading-3">Featured Playlists</h2>
            <Button variant="link">Show all</Button>
          </div>
          <div className="grid grid-auto-fill gap-6">
            {featuredPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                title={playlist.title}
                description={playlist.description}
                songCount={playlist.songCount}
              />
            ))}
          </div>
        </section>

        {/* Made For You */}
        <section>
          <h2 className="text-heading-3 mb-6">Made For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              variant="gradient"
              padding="xl"
              className="relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">
                  Discover Weekly
                </h3>
                <p className="text-white/80 mb-4">
                  Your weekly mixtape of fresh music
                </p>
                <Button variant="secondary" size="sm">
                  Play
                </Button>
              </div>
              <div className="absolute top-4 right-4">
                <svg
                  className="w-12 h-12 text-white/20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </Card>

            <Card
              variant="glass"
              padding="xl"
              className="relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-music-text-primary mb-2">
                  Release Radar
                </h3>
                <p className="text-music-text-secondary mb-4">
                  Catch all the latest music from artists you follow
                </p>
                <Button variant="outline" size="sm">
                  Play
                </Button>
              </div>
              <div className="absolute top-4 right-4">
                <svg
                  className="w-12 h-12 text-music-primary/20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </Card>

            <Card
              variant="secondary"
              padding="xl"
              className="relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-music-text-primary mb-2">
                  Daily Mix
                </h3>
                <p className="text-music-text-secondary mb-4">
                  Songs you love right now
                </p>
                <Button variant="default" size="sm">
                  Play
                </Button>
              </div>
              <div className="absolute bottom-4 right-4 opacity-20">
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-music-primary rounded-full wave-animation"
                      style={{ height: "20px" }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
