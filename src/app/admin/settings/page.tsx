import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Settings, Save, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Cài đặt hệ thống - Admin - H-Music",
  description: "Cấu hình và quản lý hệ thống H-Music",
};

export default function AdminSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Cài đặt hệ thống</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive">Admin</Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cài đặt chung
            </CardTitle>
            <CardDescription>Cấu hình cơ bản của hệ thống</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="site-name">Tên website</Label>
              <Input id="site-name" defaultValue="H-Music Vietnam" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="site-description">Mô tả website</Label>
              <Textarea
                id="site-description"
                defaultValue="Nền tảng nghe nhạc trực tuyến hàng đầu Việt Nam"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact-email">Email liên hệ</Label>
              <Input
                id="contact-email"
                type="email"
                defaultValue="support@h-music.vn"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bảo trì hệ thống</Label>
                <div className="text-sm text-muted-foreground">
                  Kích hoạt chế độ bảo trì
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Music Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt âm nhạc</CardTitle>
            <CardDescription>
              Cấu hình liên quan đến nội dung âm nhạc
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="max-upload-size">
                Kích thước file tối đa (MB)
              </Label>
              <Input id="max-upload-size" type="number" defaultValue="50" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="supported-formats">Định dạng file hỗ trợ</Label>
              <Input
                id="supported-formats"
                defaultValue="mp3, wav, flac, m4a"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tự động kiểm duyệt</Label>
                <div className="text-sm text-muted-foreground">
                  Tự động phê duyệt nội dung từ nghệ sĩ đã xác minh
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cho phép tải xuống</Label>
                <div className="text-sm text-muted-foreground">
                  Người dùng Premium có thể tải nhạc
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* User Management Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Quản lý người dùng</CardTitle>
            <CardDescription>Cài đặt về tài khoản và quyền hạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="trial-period">
                Thời gian dùng thử Premium (ngày)
              </Label>
              <Input id="trial-period" type="number" defaultValue="30" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cho phép đăng ký</Label>
                <div className="text-sm text-muted-foreground">
                  Người dùng mới có thể tạo tài khoản
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Xác minh email bắt buộc</Label>
                <div className="text-sm text-muted-foreground">
                  Yêu cầu xác minh email khi đăng ký
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cho phép đăng nhập mạng xã hội</Label>
                <div className="text-sm text-muted-foreground">
                  Google, Facebook, Apple
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt thanh toán</CardTitle>
            <CardDescription>
              Cấu hình cổng thanh toán và gói Premium
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="premium-price">Giá gói Premium (VND/tháng)</Label>
              <Input id="premium-price" type="number" defaultValue="59000" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="family-price">Giá gói Family (VND/tháng)</Label>
              <Input id="family-price" type="number" defaultValue="99000" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="student-price">Giá gói Student (VND/tháng)</Label>
              <Input id="student-price" type="number" defaultValue="29000" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Kích hoạt thanh toán</Label>
                <div className="text-sm text-muted-foreground">
                  Cho phép người dùng nâng cấp Premium
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Bảo mật</CardTitle>
            <CardDescription>Cài đặt bảo mật và an toàn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="session-timeout">
                Thời gian hết hạn phiên (phút)
              </Label>
              <Input id="session-timeout" type="number" defaultValue="120" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Yêu cầu 2FA cho Admin</Label>
                <div className="text-sm text-muted-foreground">
                  Bắt buộc xác thực 2 yếu tố cho quản trị viên
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Ghi log hoạt động</Label>
                <div className="text-sm text-muted-foreground">
                  Lưu trữ nhật ký hoạt động của người dùng
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Chặn IP đáng ngờ</Label>
                <div className="text-sm text-muted-foreground">
                  Tự động chặn IP có hoạt động bất thường
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Khôi phục mặc định
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
}
