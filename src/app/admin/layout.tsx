"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Shield,
  Settings,
  BarChart3,
  ArrowLeft,
  Music,
  Disc,
  User,
  Tag,
  Library,
} from "lucide-react";
import Link from "next/link";
import { useTokenRefresh } from "@/hooks/use-token-refresh";

const adminMenuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Quản lý người dùng",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Quản lý bài hát",
    href: "/admin/songs",
    icon: Music,
  },
  {
    title: "Quản lý nghệ sĩ",
    href: "/admin/artists",
    icon: User,
  },
  {
    title: "Quản lý album",
    href: "/admin/albums",
    icon: Disc,
  },
  {
    title: "Quản lý thể loại",
    href: "/admin/genres",
    icon: Tag,
  },
  {
    title: "Kiểm duyệt nội dung",
    href: "/admin/moderation",
    icon: Shield,
  },
  {
    title: "Cài đặt hệ thống",
    href: "/admin/settings",
    icon: Settings,
  },
];

function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-destructive text-destructive-foreground">
                  <Shield className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin Panel</span>
                  <span className="truncate text-xs">H-Music</span>
                </div>
                <ArrowLeft className="size-4" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span>Quản trị hệ thống</span>
            <Badge variant="destructive" className="text-xs">
              Admin
            </Badge>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => {
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
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Music className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Quay về H-Music
                  </span>
                  <span className="truncate text-xs">Trang chủ</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Enable automatic token refresh for admin panel
  useTokenRefresh();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    // Only ADMIN role can access admin pages
    if (session?.user?.role !== "ADMIN") {
      router.push("/");
      return;
    }
  }, [session, status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show nothing if not authenticated or not admin
  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1">
          <div className="flex items-center gap-2 border-b px-4 py-2">
            <SidebarTrigger />
            <div className="h-4 w-px bg-border" />
            <div className="text-sm text-muted-foreground">Admin Panel</div>
          </div>
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
