"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, Search, Library, Plus, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Trang Chủ",
    href: "/",
    icon: Home,
  },
  {
    title: "Khám Phá",
    href: "/browse",
    icon: Search,
  },
  {
    title: "Thư Viện",
    href: "/library",
    icon: Library,
  },
];

const playlistItems = [
  { name: "Bài Hát Yêu Thích", href: "/playlist/liked", count: 247 },
  { name: "Nghe Gần Đây", href: "/playlist/recent", count: 50 },
  { name: "Playlist Của Tôi #1", href: "/playlist/mix1", count: 85 },
  { name: "Nhạc Tập Thể Dục", href: "/playlist/workout", count: 32 },
  { name: "Nhạc Chill", href: "/playlist/chill", count: 128 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-5 text-sidebar-primary-foreground">
                  <svg
                    className="size-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">H-Music</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Vietnam
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "w-full px-3 py-2 rounded-md font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="flex items-center justify-between px-1 py-2 mb-2">
            <span className="text-sm font-semibold text-foreground">
              Playlist
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 hover:bg-accent rounded-sm"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {playlistItems.map((playlist) => (
                <SidebarMenuItem key={playlist.href}>
                  <SidebarMenuButton
                    asChild
                    className="px-3 py-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <Link href={playlist.href}>
                      <div className="flex items-center justify-between w-full min-w-0">
                        <span className="truncate text-sm text-foreground">
                          {playlist.name}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2 flex-shrink-0 font-medium">
                          {playlist.count}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        {status === "loading" ? (
          <div className="flex items-center justify-center p-2">
            <div className="size-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
          </div>
        ) : status === "authenticated" && session?.user ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/profile">
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-5 text-sidebar-primary-foreground">
                      {session.user.avatar ? (
                        <img
                          src={session.user.avatar}
                          alt={
                            session.user.displayName || session.user.username
                          }
                          className="size-8 rounded-lg object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium">
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
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {session.user.displayName || session.user.username}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {session.user.subscriptionTier === "FREE"
                          ? "Miễn phí"
                          : "Premium"}
                      </span>
                    </div>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/auth/signin">
                  <User className="size-4" />
                  <span>Đăng nhập</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
