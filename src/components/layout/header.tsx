"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/components/providers/theme-provider";

interface HeaderProps {
  className?: string;
  sidebarCollapsed?: boolean;
}

export function Header({ className, sidebarCollapsed = false }: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 flex items-center justify-between bg-music-surface/80 backdrop-blur-md border-b border-music-surface-light transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-64",
        "h-16 px-6",
        className
      )}
    >
      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
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
        <Button variant="outline" size="sm" className="hidden md:flex">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Upgrade
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-full">
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
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-music-primary rounded-full flex items-center justify-center">
            <span className="text-2xs text-white font-medium">3</span>
          </div>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
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
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center gap-3 px-3 h-10 rounded-full"
          >
            <div className="w-7 h-7 rounded-full bg-music-gradient flex items-center justify-center">
              <span className="text-xs font-medium text-white">H</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-music-text-primary">
                Hao Dev
              </p>
            </div>
            <svg
              className="w-4 h-4 text-music-text-secondary"
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
          </Button>
        </div>
      </div>
    </header>
  );
}
