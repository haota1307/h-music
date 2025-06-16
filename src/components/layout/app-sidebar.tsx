"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, Search, Library, Plus, User, Heart, Clock } from "lucide-react";
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

const quickAccessItems = [
  {
    name: "Bài Hát Yêu Thích",
    href: "/playlist/liked",
    count: 247,
    icon: Heart,
  },
  {
    name: "Nghe Gần Đây",
    href: "/playlist/recent",
    count: 50,
    icon: Clock,
  },
];

const playlistItems = [
  { name: "Playlist Của Tôi #1", href: "/playlist/mix1", count: 85 },
  { name: "Nhạc Tập Thể Dục", href: "/playlist/workout", count: 32 },
  { name: "Nhạc Chill", href: "/playlist/chill", count: 128 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
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
                  <span className="truncate text-xs">Vietnam</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickAccessItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <span>Playlist</span>
            <Button variant="ghost" size="icon">
              <Plus />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {playlistItems.map((playlist) => (
                <SidebarMenuItem key={playlist.href}>
                  <SidebarMenuButton asChild>
                    <Link href={playlist.href}>
                      <div className="flex aspect-square size-6 items-center justify-center rounded bg-muted">
                        <svg
                          className="size-3"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                      </div>
                      <span>{playlist.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {status === "loading" ? (
          <div className="flex items-center justify-center p-2">
            <div className="size-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
          </div>
        ) : status === "authenticated" && session?.user ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/profile">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="size-8 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {(session.user.name || session.user.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session.user.name || "Người dùng"}
                    </span>
                    <span className="truncate text-xs">Miễn phí</span>
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
                  <User />
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
