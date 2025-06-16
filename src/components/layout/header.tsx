"use client";

import * as React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/input";
import { useTheme } from "@/components/providers/theme-provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  className?: string;
}

// Updated header with beautiful dropdown - 20:50
export function Header({ className }: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-14 md:h-16 items-center justify-between bg-background/95 backdrop-blur-lg border-b border-border/50 px-3 md:px-6",
        className
      )}
    >
      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="h-8 w-8" />
        <Button variant="ghost" size="icon" className="rounded-full">
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-6">
        <div
          className={cn(
            "relative transition-all duration-300",
            isSearchFocused && "scale-105"
          )}
        >
          <SearchInput
            variant="glass"
            size="lg"
            placeholder="What do you want to listen to?"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Upgrade Button */}
        <Button variant="outline" size="sm" className="hidden lg:flex">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Upgrade
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hidden md:flex"
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
              d="M15 17h5l-5 5v-5zM15 17H9a4 4 0 01-4-4V5a4 4 0 014-4h6a4 4 0 014 4v8a4 4 0 01-4 4z"
            />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
            <span className="text-2xs text-white font-medium">3</span>
          </div>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hidden md:flex"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
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
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
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
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </Button>

        {/* User Menu */}
        {status === "authenticated" && session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 md:px-3 h-10 rounded-full hover:bg-accent"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center">
                    {session.user.avatar ? (
                      <img
                        src={session.user.avatar}
                        alt={session.user.displayName || session.user.username}
                        className="w-8 h-8 rounded-full object-cover"
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
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-foreground truncate max-w-24">
                      {session.user.displayName || session.user.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.user.subscriptionTier === "FREE"
                        ? "Miễn phí"
                        : "Premium"}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 text-muted-foreground hidden md:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 p-2"
              align="end"
              side="bottom"
              sideOffset={8}
            >
              {/* User Info Header */}
              <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg mb-2">
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
                  <p className="font-semibold text-foreground truncate">
                    {session.user.displayName || session.user.username}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {session.user.email}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      {session.user.subscriptionTier === "FREE"
                        ? "Miễn phí"
                        : "Premium"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Hồ sơ cá nhân</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  <span>Cài đặt</span>
                </Link>
              </DropdownMenuItem>

              {session.user.subscriptionTier === "FREE" && (
                <DropdownMenuItem asChild>
                  <Link
                    href="/upgrade"
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer text-primary"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>Nâng cấp Premium</span>
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator className="my-2" />

              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="default" size="sm">
            <Link href="/auth/signin" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Đăng nhập</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
