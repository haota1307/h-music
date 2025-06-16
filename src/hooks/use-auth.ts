import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import apiClient, { ApiError, ApiResponse } from "@/lib/axios";
import { AUTH_ENDPOINTS } from "@/constants/api-endpoints";

// Types
export interface SignupData {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

export interface SigninData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  token: string;
}

// Query Keys
export const AUTH_QUERY_KEYS = {
  SESSION: ["auth", "session"],
  PROFILE: ["auth", "profile"],
} as const;

// Hook: Get current session
export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isAuthenticated: !!session?.user,
    isLoading: status === "loading",
    session,
  };
}

// Hook: Signup mutation
export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignupData): Promise<ApiResponse> => {
      const response = await apiClient.post(AUTH_ENDPOINTS.SIGNUP, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(
        data.message ||
          "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản."
      );
      router.push("/auth/signin?message=signup-success");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Đăng ký thất bại. Vui lòng thử lại.");
    },
  });
}

// Hook: Signin mutation
export function useSignin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SigninData) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      toast.success("Đăng nhập thành công!");
      router.push("/");
      router.refresh();
    },
    onError: (error: any) => {
      const errorMessage =
        error.message === "CredentialsSignin"
          ? "Email hoặc mật khẩu không chính xác"
          : error.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    },
  });
}

// Hook: Signout mutation
export function useSignout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      toast.success("Đăng xuất thành công!");
      router.push("/auth/signin");
      router.refresh();
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Đăng xuất thất bại. Vui lòng thử lại.");
    },
  });
}

// Hook: Forgot password mutation
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (data: ForgotPasswordData): Promise<ApiResponse> => {
      const response = await apiClient.post(
        AUTH_ENDPOINTS.FORGOT_PASSWORD,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Email khôi phục mật khẩu đã được gửi!");
    },
    onError: (error: ApiError) => {
      toast.error(
        error.message || "Gửi email khôi phục thất bại. Vui lòng thử lại."
      );
    },
  });
}

// Hook: Reset password mutation
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ResetPasswordData): Promise<ApiResponse> => {
      const response = await apiClient.post(
        AUTH_ENDPOINTS.RESET_PASSWORD,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Đặt lại mật khẩu thành công!");
      router.push("/auth/signin?message=password-reset-success");
    },
    onError: (error: ApiError) => {
      toast.error(
        error.message || "Đặt lại mật khẩu thất bại. Vui lòng thử lại."
      );
    },
  });
}

// Hook: Verify email mutation
export function useVerifyEmail() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: VerifyEmailData): Promise<ApiResponse> => {
      const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_EMAIL, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Xác nhận email thành công!");
      router.push("/auth/signin?message=email-verified");
    },
    onError: (error: ApiError) => {
      toast.error(
        error.message || "Xác nhận email thất bại. Vui lòng thử lại."
      );
    },
  });
}

// Hook: Check if user has specific permissions
export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    // Add your permission logic here based on user data structure
    return (user as any).permissions?.includes(permission) || false;
  };

  const hasRole = (role: string): boolean => {
    if (!user) return false;
    return (user as any).role === role;
  };

  const isPremium = (): boolean => {
    if (!user) return false;
    return (user as any).subscriptionTier === "PREMIUM";
  };

  return {
    hasPermission,
    hasRole,
    isPremium,
    isAdmin: hasRole("ADMIN"),
    isModerator: hasRole("MODERATOR"),
  };
}
