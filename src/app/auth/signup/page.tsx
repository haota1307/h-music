"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useSignup } from "@/hooks/use-auth";

const signUpSchema = z
  .object({
    email: z.string().email("Email không hợp lệ"),
    username: z
      .string()
      .min(3, "Username phải có ít nhất 3 ký tự")
      .max(20, "Username không được quá 20 ký tự")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username chỉ được chứa chữ cái, số và dấu gạch dưới"
      ),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"
      ),
    confirmPassword: z.string(),
    displayName: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    agreedToTerms: z
      .boolean()
      .refine((val) => val === true, "Bạn phải đồng ý với điều khoản sử dụng"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const signup = useSignup();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      displayName: "",
      firstName: "",
      lastName: "",
      agreedToTerms: false,
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    // Transform form data to match API expectations
    const signupData = {
      username: data.username,
      email: data.email,
      password: data.password,
      displayName: data.displayName,
    };

    signup.mutate(signupData, {
      onSuccess: () => {
        setSuccess(true);
        // Auto sign in after successful registration
        setTimeout(async () => {
          const signInResult = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });

          if (signInResult?.ok) {
            router.push("/");
          }
        }, 2000);
      },
    });
  };

  const handleOAuthSignIn = async (provider: "google" | "facebook") => {
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error("OAuth sign in error:", error);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-muted">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Đăng Ký Thành Công!
          </h2>
          <p className="text-gray-300 mb-4">Đang tự động đăng nhập...</p>
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-muted py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-chart-5 rounded-xl flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">H-Music</h1>
          </div>
          <p className="text-gray-300">
            Tạo tài khoản để khám phá âm nhạc Việt.
          </p>
        </div>

        {/* Sign Up Form */}
        <Card className="bg-black/40 backdrop-blur-xl border-gray-800/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Đăng Ký</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {signup.error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">
                  {signup.error.message}
                </p>
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    type="text"
                    placeholder="Tên"
                    {...form.register("firstName")}
                    className="bg-white/5 border-gray-700 text-white placeholder:text-gray-400"
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-destructive text-xs mt-1">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Họ"
                    {...form.register("lastName")}
                    className="bg-white/5 border-gray-700 text-white placeholder:text-gray-400"
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-destructive text-xs mt-1">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Tên hiển thị"
                  {...form.register("displayName")}
                  className="bg-white/5 border-gray-700 text-white placeholder:text-gray-400"
                />
                {form.formState.errors.displayName && (
                  <p className="text-destructive text-sm mt-1">
                    {form.formState.errors.displayName.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...form.register("email")}
                  className="bg-white/5 border-gray-700 text-white placeholder:text-gray-400"
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  {...form.register("username")}
                  className="bg-white/5 border-gray-700 text-white placeholder:text-gray-400"
                />
                {form.formState.errors.username && (
                  <p className="text-destructive text-sm mt-1">
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  {...form.register("password")}
                  className="bg-white/5 border-gray-700 text-white placeholder:text-gray-400"
                />
                {form.formState.errors.password && (
                  <p className="text-destructive text-sm mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  {...form.register("confirmPassword")}
                  className="bg-white/5 border-gray-700 text-white placeholder:text-gray-400"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-destructive text-sm mt-1">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-start space-x-3 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    {...form.register("agreedToTerms")}
                    className="mt-1 rounded border-gray-700 bg-white/5 text-red-500 focus:ring-destructive focus:ring-offset-0"
                  />
                  <span className="leading-relaxed">
                    Tôi đồng ý với{" "}
                    <Link
                      href="/terms"
                      className="text-destructive hover:text-destructive/80"
                    >
                      Điều khoản sử dụng
                    </Link>{" "}
                    và{" "}
                    <Link
                      href="/privacy"
                      className="text-destructive hover:text-destructive/80"
                    >
                      Chính sách bảo mật
                    </Link>
                  </span>
                </label>
                {form.formState.errors.agreedToTerms && (
                  <p className="text-destructive text-sm mt-1">
                    {form.formState.errors.agreedToTerms.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-chart-5 hover:from-primary/90 hover:to-chart-5/90 text-white font-semibold py-3"
                disabled={signup.isPending}
              >
                {signup.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Đang tạo tài khoản...
                  </div>
                ) : (
                  "Tạo Tài Khoản"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black/40 px-2 text-gray-400">
                  Hoặc đăng ký bằng
                </span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
                onClick={() => handleOAuthSignIn("google")}
                disabled={signup.isPending}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Tiếp tục với Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white border-[#1877F2]"
                onClick={() => handleOAuthSignIn("facebook")}
                disabled={signup.isPending}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Tiếp tục với Facebook
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-400">
                Đã có tài khoản?{" "}
                <Link
                  href="/auth/signin"
                  className="text-destructive hover:text-destructive/80 font-medium"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2024 H-Music. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
}
