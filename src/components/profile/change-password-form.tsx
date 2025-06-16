"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import {
  useChangePassword,
  type ChangePasswordData,
} from "@/hooks/use-profile";

interface ChangePasswordFormProps {
  className?: string;
}

export function ChangePasswordForm({ className }: ChangePasswordFormProps) {
  const changePassword = useChangePassword();

  const [formData, setFormData] = useState<ChangePasswordData>({
    currentPassword: "",
    newPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleInputChange = (
    field: keyof ChangePasswordData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation
    if (!formData.currentPassword) {
      return;
    }

    if (formData.newPassword.length < 6) {
      return;
    }

    if (formData.newPassword !== confirmPassword) {
      return;
    }

    changePassword.mutate(formData, {
      onSuccess: () => {
        // Reset form on success
        setFormData({
          currentPassword: "",
          newPassword: "",
        });
        setConfirmPassword("");
      },
    });
  };

  const isFormValid =
    formData.currentPassword &&
    formData.newPassword.length >= 6 &&
    formData.newPassword === confirmPassword;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Đổi mật khẩu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                placeholder="Nhập mật khẩu hiện tại"
                disabled={changePassword.isPending}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility("current")}
                disabled={changePassword.isPending}
              >
                {showPasswords.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                placeholder="Nhập mật khẩu mới"
                disabled={changePassword.isPending}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility("new")}
                disabled={changePassword.isPending}
              >
                {showPasswords.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {formData.newPassword && formData.newPassword.length < 6 && (
              <p className="text-xs text-destructive">
                Mật khẩu phải có ít nhất 6 ký tự
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận mật khẩu mới"
                disabled={changePassword.isPending}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility("confirm")}
                disabled={changePassword.isPending}
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {confirmPassword && formData.newPassword !== confirmPassword && (
              <p className="text-xs text-destructive">Mật khẩu không khớp</p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">Yêu cầu mật khẩu:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Ít nhất 6 ký tự</li>
              <li>Phải khác với mật khẩu hiện tại</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || changePassword.isPending}
            className="w-full"
          >
            {changePassword.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang đổi mật khẩu...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Đổi mật khẩu
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
