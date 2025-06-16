"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MusicPlayerProps {
  className?: string;
  sidebarCollapsed?: boolean;
}

interface CurrentSong {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl?: string;
  duration: number;
}

export function MusicPlayer({
  className,
  sidebarCollapsed = false,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [volume, setVolume] = React.useState(75);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isRepeat, setIsRepeat] = React.useState(false);
  const [isShuffle, setIsShuffle] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  // Mock current song
  const currentSong: CurrentSong = {
    id: "1",
    title: "Sample Song Title",
    artist: "Sample Artist",
    album: "Sample Album",
    imageUrl: undefined,
    duration: 210, // 3:30 in seconds
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = (currentTime / currentSong.duration) * 100;

  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 z-40 bg-music-surface/95 backdrop-blur-md border-t border-music-surface-light transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-64",
        "h-20 px-6",
        className
      )}
    >
      <div className="flex items-center justify-between h-full">
        {/* Current Song Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-music-surface-light flex-shrink-0">
            {currentSong.imageUrl ? (
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className={cn(
                  "w-full h-full object-cover",
                  isPlaying && "spin-slow"
                )}
              />
            ) : (
              <div className="w-full h-full bg-music-gradient flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-music-text-primary truncate">
              {currentSong.title}
            </h4>
            <p className="text-xs text-music-text-secondary truncate">
              {currentSong.artist}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsLiked(!isLiked)}
            className="flex-shrink-0"
          >
            <svg
              className={cn(
                "w-4 h-4 transition-colors",
                isLiked
                  ? "text-music-primary fill-current"
                  : "text-music-text-muted"
              )}
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Button>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          {/* Control Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsShuffle(!isShuffle)}
              className={cn(
                "transition-colors",
                isShuffle && "text-music-primary"
              )}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
              </svg>
            </Button>

            <Button variant="ghost" size="icon-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </Button>

            <Button
              variant="play"
              size="icon-lg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10"
            >
              {isPlaying ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </Button>

            <Button variant="ghost" size="icon-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsRepeat(!isRepeat)}
              className={cn(
                "transition-colors",
                isRepeat && "text-music-primary"
              )}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
              </svg>
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-music-text-muted min-w-0">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-1 bg-music-surface-light rounded-full cursor-pointer relative group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percentage = (e.clientX - rect.left) / rect.width;
                setCurrentTime(Math.floor(percentage * currentSong.duration));
              }}
            >
              <div
                className="h-full bg-music-gradient rounded-full relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-music-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-xs text-music-text-muted min-w-0">
              {formatTime(currentSong.duration)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <Button variant="ghost" size="icon-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 14h14L17 4m-5 5v6m-2-6v6m6-6v6"
              />
            </svg>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted || volume === 0 ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : volume < 30 ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                </svg>
              ) : volume < 70 ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </Button>

            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const newVolume = parseInt(e.target.value);
                setVolume(newVolume);
                if (newVolume > 0) setIsMuted(false);
              }}
              className="w-20 h-1 bg-music-surface-light rounded-full appearance-none cursor-pointer"
            />
          </div>

          <Button variant="ghost" size="icon-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
