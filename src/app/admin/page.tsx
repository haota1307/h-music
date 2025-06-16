"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Music,
  TrendingUp,
  Shield,
  Settings,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session } = useSession();

  const stats = [
    {
      title: "Tổng người dùng",
      value: "12,483",
      description: "+180 tuần này",
      icon: Users,
      trend: "+12%",
    },
    {
      title: "Bài hát",
      value: "3,421",
      description: "+23 bài mới",
      icon: Music,
      trend: "+7%",
    },
    {
      title: "Lượt nghe",
      value: "1.2M",
      description: "+89K hôm qua",
      icon: TrendingUp,
      trend: "+15%",
    },
    {
      title: "Báo cáo chờ xử lý",
      value: "12",
      description: "Cần xem xét",
      icon: Shield,
      trend: "-2",
    },
  ];

  const quickActions = [
    {
      title: "Quản lý người dùng",
      description: "Xem và quản lý tài khoản người dùng",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Kiểm duyệt nội dung",
      description: "Xử lý báo cáo và kiểm duyệt",
      href: "/admin/moderation",
      icon: Shield,
    },
    {
      title: "Cài đặt hệ thống",
      description: "Cấu hình và thiết lập hệ thống",
      href: "/admin/settings",
      icon: Settings,
    },
    {
      title: "Thống kê chi tiết",
      description: "Xem báo cáo và phân tích dữ liệu",
      href: "/admin/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Chào mừng, {session?.user?.name}! Quản lý hệ thống H-Music.
          </p>
        </div>
        <Badge variant="destructive" className="text-sm">
          {session?.user?.role}
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{stat.description}</span>
                <span
                  className={
                    stat.trend.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Hành động nhanh</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card
              key={action.href}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <action.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{action.title}</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={action.href}>Truy cập</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt động gần đây</CardTitle>
          <CardDescription>
            Những thay đổi và hoạt động mới nhất trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm">
                  Người dùng mới đăng ký: user123@email.com
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                5 phút trước
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Music className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Bài hát mới được tải lên: "Summer Vibes"
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                15 phút trước
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span className="text-sm">
                  Báo cáo mới cần xử lý: Nội dung không phù hợp
                </span>
              </div>
              <span className="text-xs text-muted-foreground">1 giờ trước</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
