import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { updateAvatar, updateUser } from "@/store/slices/authSlice";
import apiClient, { ApiError } from "@/lib/axios";
import { USER_ENDPOINTS } from "@/constants/api-endpoints";
import {
  UserProfileData,
  UpdateProfileData,
  ChangePasswordData,
} from "@/types/user";

// Re-export types for convenience
export type UserProfile = UserProfileData;
export type { UpdateProfileData, ChangePasswordData };

// Query keys
const PROFILE_QUERY_KEYS = {
  PROFILE: ["profile"] as const,
};

// Hook: Get user profile
export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.PROFILE,
    queryFn: async (): Promise<UserProfile> => {
      const response = await apiClient.get(USER_ENDPOINTS.PROFILE);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook: Update profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { update, data: session } = useSession();

  return useMutation({
    mutationFn: async (data: UpdateProfileData): Promise<any> => {
      const response = await apiClient.put(USER_ENDPOINTS.UPDATE_PROFILE, data);
      return response.data;
    },
    onSuccess: async (data) => {
      // Update profile cache
      queryClient.setQueryData(
        PROFILE_QUERY_KEYS.PROFILE,
        (old: UserProfile | undefined) => {
          if (old) {
            return {
              ...old,
              displayName: data.user.displayName,
              profile: data.user.profile,
            };
          }
          return old;
        }
      );

      // Update Redux state with new profile data
      dispatch(
        updateUser({
          displayName: data.user.displayName,
        })
      );

      // Update NextAuth session with new profile data
      try {
        await update({
          user: {
            ...session?.user,
            displayName: data.user.displayName,
          },
        });
      } catch (error) {
        console.error("Failed to update NextAuth session:", error);
      }

      toast.success("Cập nhật hồ sơ thành công!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Không thể cập nhật hồ sơ");
    },
  });
}

// Hook: Change password
export function useChangePassword() {
  return useMutation({
    mutationFn: async (data: ChangePasswordData): Promise<any> => {
      const response = await apiClient.put(
        USER_ENDPOINTS.CHANGE_PASSWORD,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Không thể đổi mật khẩu");
    },
  });
}

// Hook: Update avatar (using existing upload endpoint)
export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { update, data: session } = useSession();

  return useMutation({
    mutationFn: async (file: File): Promise<any> => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post(
        USER_ENDPOINTS.UPLOAD_AVATAR,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: async (data) => {
      // Update profile cache with new avatar
      queryClient.setQueryData(
        PROFILE_QUERY_KEYS.PROFILE,
        (old: UserProfile | undefined) => {
          if (old) {
            return {
              ...old,
              avatar: data.url,
            };
          }
          return old;
        }
      );

      // Update Redux state with new avatar
      dispatch(updateAvatar(data.url));

      // Update NextAuth session with new avatar
      try {
        await update({
          user: {
            ...session?.user,
            avatar: data.url,
          },
        });
      } catch (error) {
        console.error("Failed to update NextAuth session:", error);
        // Fallback: Force a session refresh
        window.location.reload();
      }

      toast.success("Cập nhật ảnh đại diện thành công!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Không thể cập nhật ảnh đại diện");
    },
  });
}
