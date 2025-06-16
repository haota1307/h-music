"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const errorMessages: Record<string, string> = {
  Configuration: "Có lỗi cấu hình máy chủ. Vui lòng thử lại sau.",
  AccessDenied: "Bạn không có quyền truy cập. Vui lòng liên hệ quản trị viên.",
  Verification: "Token xác thực không hợp lệ hoặc đã hết hạn.",
  Default: "Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.",
  OAuthSignin: "Lỗi khi đăng nhập bằng mạng xã hội.",
  OAuthCallback: "Lỗi callback từ nhà cung cấp OAuth.",
  OAuthCreateAccount: "Không thể tạo tài khoản OAuth.",
  EmailCreateAccount: "Không thể tạo tài khoản email.",
  Callback: "Lỗi callback.",
  OAuthAccountNotLinked:
    "Tài khoản OAuth chưa được liên kết. Vui lòng đăng nhập bằng phương thức ban đầu.",
  EmailSignin: "Không thể gửi email đăng nhập.",
  CredentialsSignin: "Thông tin đăng nhập không chính xác.",
  SessionRequired: "Bạn cần đăng nhập để truy cập trang này.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";

  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-secondary">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-destructive/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-chart-4/10 rounded-full blur-3xl" />
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
            <h1 className="text-3xl font-bold text-foreground">H-Music</h1>
          </div>
        </div>

        {/* Error Card */}
        <Card className="bg-card/50 backdrop-blur-xl border-border">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L3.098 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl text-foreground">
              Đăng Nhập Thất Bại
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-6">{errorMessage}</p>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="/auth/signin">Thử Đăng Nhập Lại</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-border text-muted-foreground hover:bg-accent"
                >
                  <Link href="/">Về Trang Chủ</Link>
                </Button>
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Nếu vấn đề vẫn tiếp tục, vui lòng{" "}
                <Link
                  href="/contact"
                  className="text-primary hover:text-primary/80"
                >
                  liên hệ hỗ trợ
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground text-sm">
          <p>© 2024 H-Music. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
}
