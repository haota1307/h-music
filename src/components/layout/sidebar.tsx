"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
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
  const { data: session, status } = useSession();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-chart-5 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          {!isCollapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-chart-5 bg-clip-text text-transparent">
              H-Music
            </h1>
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
        <div className="my-6 border-t border-border" />

        {/* Playlists Section */}
        {!isCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Playlist
              </h3>
              <Button variant="ghost" size="icon" className="w-6 h-6">
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

            <div className="max-h-64 overflow-y-auto">
              {playlistItems.map((playlist) => (
                <Link key={playlist.href} href={playlist.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-10 px-3 text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    <span className="truncate text-left">{playlist.name}</span>
                    <span className="text-xs text-muted-foreground/70">
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
      <div className="p-4 border-t border-border">
        {status === "loading" ? (
          <div className="flex items-center justify-center p-4">
            <div className="w-6 h-6 border-2 border-muted border-t-primary rounded-full animate-spin" />
          </div>
        ) : status === "authenticated" && session?.user ? (
          !isCollapsed ? (
            <div className="space-y-3">
              <Card className="bg-card/50 backdrop-blur-sm border-border cursor-pointer hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center">
                    {session.user.avatar ? (
                      <img
                        src={session.user.avatar}
                        alt={session.user.displayName || session.user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white">
                        {(
                          session.user.displayName ||
                          session.user.username ||
                          session.user.email ||
                          "U"
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {session.user.displayName || session.user.username}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.user.subscriptionTier === "FREE"
                        ? "Miễn phí"
                        : "Premium"}
                    </p>
                  </div>
                  {session.user.isVerified && (
                    <div className="text-blue-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                  )}
                </div>
              </Card>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground hover:bg-destructive/10 justify-start"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Đăng xuất
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-chart-5 hover:bg-primary/90"
                size="icon"
              >
                {session.user.avatar ? (
                  <img
                    src={session.user.avatar}
                    alt={session.user.displayName || session.user.username}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium text-white">
                    {(
                      session.user.displayName ||
                      session.user.username ||
                      session.user.email ||
                      "U"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 text-muted-foreground hover:text-foreground hover:bg-destructive/10"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </Button>
            </div>
          )
        ) : !isCollapsed ? (
          <div className="space-y-2">
            <Link href="/auth/signin" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/auth/signup" className="block">
              <Button
                variant="outline"
                className="w-full border-border text-muted-foreground hover:bg-accent"
              >
                Đăng ký
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            <Link href="/auth/signin">
              <Button
                size="icon"
                className="w-12 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border"
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
