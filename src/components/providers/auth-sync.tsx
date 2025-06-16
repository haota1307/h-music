"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser, clearUser, updateUser } from "@/store/slices/authSlice";

export function AuthSync() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Sync NextAuth session to Redux
      dispatch(
        setUser({
          id: session.user.id,
          email: session.user.email!,
          username: session.user.username,
          displayName: session.user.displayName,
          avatar: session.user.avatar,
          isVerified: session.user.isVerified,
          accountProvider: "email", // Default, could be enhanced
          createdAt: new Date().toISOString(), // Fallback
          updatedAt: new Date().toISOString(), // Fallback
          isActive: true,
          role: session.user.role as "user" | "artist" | "admin" | "premium",
        })
      );
    } else if (status === "unauthenticated") {
      dispatch(clearUser());
    }
  }, [session, status, dispatch]);

  // Additional effect to handle session updates (like avatar changes)
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        updateUser({
          displayName: session.user.displayName,
          avatar: session.user.avatar,
        })
      );
    }
  }, [session?.user?.avatar, session?.user?.displayName, status, dispatch]);

  return null; // This component doesn't render anything
}
