"use client";

import { useSession } from "next-auth/react";
import { useEffect, useCallback } from "react";

export function useTokenRefresh() {
  const { data: session, update, status } = useSession();

  const refreshToken = useCallback(async () => {
    if (status === "authenticated") {
      try {
        console.log("Refreshing token...");
        await update(); // This triggers the JWT callback with trigger: "update"
        console.log("Token refreshed successfully");
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }
  }, [update, status]);

  useEffect(() => {
    if (status !== "authenticated" || !session) return;

    // Check if we need to refresh token
    const checkTokenExpiration = () => {
      const now = Math.floor(Date.now() / 1000);

      // If token expires in less than 1 day, refresh it
      const tokenExp = (session as any)?.exp;
      const refreshAt = (session as any)?.refreshAt;

      if (refreshAt && now >= refreshAt) {
        console.log("Token needs refresh based on refreshAt time");
        refreshToken();
      } else if (tokenExp && tokenExp - now < 24 * 60 * 60) {
        console.log("Token expires in less than 24 hours, refreshing...");
        refreshToken();
      }
    };

    // Check immediately
    checkTokenExpiration();

    // Set up interval to check every 30 minutes
    const interval = setInterval(checkTokenExpiration, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [session, status, refreshToken]);

  // Auto-refresh when user becomes active after being idle
  useEffect(() => {
    if (status !== "authenticated") return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // User came back to the tab, refresh token if needed
        const now = Math.floor(Date.now() / 1000);
        const refreshAt = (session as any)?.refreshAt;

        if (refreshAt && now >= refreshAt) {
          console.log("User returned, refreshing expired token");
          refreshToken();
        }
      }
    };

    const handleFocus = () => {
      // Similar logic for window focus
      const now = Math.floor(Date.now() / 1000);
      const refreshAt = (session as any)?.refreshAt;

      if (refreshAt && now >= refreshAt) {
        console.log("Window focused, refreshing expired token");
        refreshToken();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [session, status, refreshToken]);

  return {
    refreshToken,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
