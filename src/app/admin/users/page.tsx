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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Ban,
  Shield,
  Crown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const metadata: Metadata = {
  title: "Quản lý người dùng - Admin - H-Music",
  description: "Quản lý người dùng trong hệ thống H-Music",
};

// Mock user data - Replace with real data from API
const users = [
  {
    id: "1",
    username: "nguyenvana",
    email: "nguyenvana@gmail.com",
    displayName: "Nguyễn Văn A",
    role: "USER",
    status: "ACTIVE",
    subscriptionTier: "FREE",
    createdAt: "2024-01-15",
    lastActiveAt: "2024-01-20",
    avatar: null,
  },
  {
    id: "2",
    username: "haodev1307",
    email: "haodev1307@gmail.com",
    displayName: "H-Music Admin",
    role: "ADMIN",
    status: "ACTIVE",
    subscriptionTier: "PREMIUM",
    createdAt: "2024-01-01",
    lastActiveAt: "2024-01-20",
    avatar: null,
  },
  {
    id: "3",
    username: "artist123",
    email: "artist@example.com",
    displayName: "Nghệ sĩ ABC",
    role: "ARTIST",
    status: "ACTIVE",
    subscriptionTier: "PREMIUM",
    createdAt: "2024-01-10",
    lastActiveAt: "2024-01-19",
    avatar: null,
  },
];

const getRoleBadge = (role: string) => {
  switch (role) {
    case "ADMIN":
      return (
        <Badge variant="destructive">
          <Crown className="w-3 h-3 mr-1" />
          Admin
        </Badge>
      );
    case "MODERATOR":
      return (
        <Badge variant="default">
          <Shield className="w-3 h-3 mr-1" />
          Mod
        </Badge>
      );
    case "ARTIST":
      return <Badge variant="secondary">Artist</Badge>;
    case "USER":
    default:
      return <Badge variant="outline">User</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return (
        <Badge variant="default" className="bg-green-500">
          Hoạt động
        </Badge>
      );
    case "SUSPENDED":
      return <Badge variant="destructive">Tạm khóa</Badge>;
    case "BANNED":
      return <Badge variant="destructive">Bị cấm</Badge>;
    case "PENDING":
      return <Badge variant="secondary">Chờ duyệt</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getSubscriptionBadge = (tier: string) => {
  switch (tier) {
    case "PREMIUM":
      return (
        <Badge variant="default" className="bg-yellow-500">
          Premium
        </Badge>
      );
    case "FAMILY":
      return (
        <Badge variant="default" className="bg-blue-500">
          Family
        </Badge>
      );
    case "STUDENT":
      return <Badge variant="secondary">Student</Badge>;
    case "FREE":
    default:
      return <Badge variant="outline">Miễn phí</Badge>;
  }
};

export default function AdminUsersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Quản lý người dùng
        </h2>
        <div className="flex items-center space-x-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Thêm người dùng
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm người dùng</CardTitle>
          <CardDescription>
            Tìm kiếm theo tên, email hoặc username
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm người dùng..." className="max-w-sm" />
            <Button variant="outline">Lọc</Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>Tổng cộng {users.length} người dùng</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Gói</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Hoạt động cuối</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || ""} />
                        <AvatarFallback>
                          {user.displayName?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.displayName}</div>
                        <div className="text-sm text-muted-foreground">
                          @{user.username} • {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    {getSubscriptionBadge(user.subscriptionTier)}
                  </TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>{user.lastActiveAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Ban className="mr-2 h-4 w-4" />
                          Tạm khóa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Xóa tài khoản
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
