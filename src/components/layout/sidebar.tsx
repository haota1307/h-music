"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sidebarItems = [
  {
    title: "Trang Chủ",
    href: "/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    title: "Khám Phá",
    href: "/browse",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    title: "Thư Viện",
    href: "/library",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
      </svg>
    ),
  },
];

const playlistItems = [
  { name: "Bài Hát Yêu Thích", href: "/playlist/liked", count: 247 },
  { name: "Nghe Gần Đây", href: "/playlist/recent", count: 50 },
  { name: "Playlist Của Tôi #1", href: "/playlist/mix1", count: 85 },
  { name: "Nhạc Tập Thể Dục", href: "/playlist/workout", count: 32 },
  { name: "Nhạc Chill", href: "/playlist/chill", count: 128 },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function Sidebar({
  isCollapsed = false,
  onToggle,
  className,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-music-surface-light bg-music-surface transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center p-4 border-b border-music-surface-light">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-music-gradient rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gradient">H-Music</h1>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  isCollapsed && "justify-center px-0 w-12 h-12 rounded-xl"
                )}
              >
                {item.icon}
                {!isCollapsed && <span>{item.title}</span>}
              </Button>
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-6 border-t border-music-surface-light" />

        {/* Playlists Section */}
        {!isCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-music-text-secondary uppercase tracking-wide">
                Playlist
              </h3>
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </Button>
            </div>

            <div className="space-y-1 max-h-64 overflow-y-auto music-app">
              {playlistItems.map((playlist) => (
                <Link key={playlist.href} href={playlist.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-10 px-3"
                  >
                    <span className="truncate text-left">{playlist.name}</span>
                    <span className="text-xs text-music-text-muted">
                      {playlist.count}
                    </span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-music-surface-light">
        {!isCollapsed ? (
          <Card variant="glass" padding="sm" className="cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-music-gradient flex items-center justify-center">
                <span className="text-sm font-medium text-white">H</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-music-text-primary truncate">
                  Hao Dev
                </p>
                <p className="text-xs text-music-text-secondary truncate">
                  Premium
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Button variant="glass" size="icon" className="w-12 h-12 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-music-gradient flex items-center justify-center">
              <span className="text-xs font-medium text-white">H</span>
            </div>
          </Button>
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-music-surface border border-music-surface-light"
        onClick={onToggle}
      >
        <svg
          className={cn(
            "w-3 h-3 transition-transform",
            isCollapsed && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Button>
    </aside>
  );
}
