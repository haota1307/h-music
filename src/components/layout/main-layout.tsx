"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";
import { MusicPlayer } from "./music-player";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTokenRefresh } from "@/hooks/use-token-refresh";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  // Enable automatic token refresh
  useTokenRefresh();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 pb-24 md:pb-32 lg:pb-36 min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] relative overflow-auto",
            className
          )}
        >
          <div className="w-full mx-auto px-3 md:px-4 py-4 md:py-6 max-w-7xl">
            {children}
          </div>
        </main>
      </SidebarInset>

      {/* Music Player - Fixed globally outside SidebarInset */}
      <MusicPlayer />
    </SidebarProvider>
  );
}
