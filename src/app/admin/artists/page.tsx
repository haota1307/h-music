"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Plus,
  Edit,
  Trash2,
  User,
  MoreHorizontal,
  Music,
  Users,
  Star,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - Replace with real API data
const mockArtists = [
  {
    id: "1",
    name: "Sơn Tùng M-TP",
    email: "sontung@example.com",
    avatar: null,
    followers: 2500000,
    totalSongs: 45,
    totalPlays: 150000000,
    status: "verified",
    joinDate: "2020-01-15",
    genres: ["V-Pop", "R&B"],
    isActive: true,
  },
  {
    id: "2",
    name: "Hà Anh Tuấn",
    email: "haanhquan@example.com",
    avatar: null,
    followers: 1800000,
    totalSongs: 67,
    totalPlays: 89000000,
    status: "verified",
    joinDate: "2019-08-20",
    genres: ["V-Pop", "Ballad"],
    isActive: true,
  },
  {
    id: "3",
    name: "MONO",
    email: "mono@example.com",
    avatar: null,
    followers: 1200000,
    totalSongs: 23,
    totalPlays: 45000000,
    status: "verified",
    joinDate: "2021-03-10",
    genres: ["R&B", "Soul"],
    isActive: true,
  },
  {
    id: "4",
    name: "Quang Hùng MasterD",
    email: "quanghung@example.com",
    avatar: null,
    followers: 950000,
    totalSongs: 18,
    totalPlays: 32000000,
    status: "pending",
    joinDate: "2022-06-15",
    genres: ["V-Pop", "Dance"],
    isActive: true,
  },
  {
    id: "5",
    name: "Orange",
    email: "orange@example.com",
    avatar: null,
    followers: 780000,
    totalSongs: 31,
    totalPlays: 28000000,
    status: "verified",
    joinDate: "2020-11-08",
    genres: ["V-Pop", "Indie"],
    isActive: false,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-blue-500">
          <Star className="w-3 h-3 mr-1" />
          Đã xác minh
        </Badge>
      );
    case "pending":
      return <Badge variant="secondary">Chờ xác minh</Badge>;
    case "suspended":
      return <Badge variant="destructive">Tạm khóa</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export default function ArtistsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredArtists = mockArtists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || artist.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý nghệ sĩ</h1>
          <p className="text-muted-foreground">
            Quản lý hồ sơ và hoạt động của các nghệ sĩ trên nền tảng
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm nghệ sĩ
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng nghệ sĩ</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> nghệ sĩ mới tuần này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã xác minh</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">69% tổng số nghệ sĩ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nghệ sĩ hoạt động
            </CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">967</div>
            <p className="text-xs text-muted-foreground">
              Có hoạt động trong 30 ngày
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ xác minh</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">+5</span> yêu cầu mới
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách nghệ sĩ</CardTitle>
              <CardDescription>
                Quản lý thông tin và trạng thái xác minh nghệ sĩ
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm nghệ sĩ, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="verified">Đã xác minh</option>
                <option value="pending">Chờ xác minh</option>
                <option value="suspended">Tạm khóa</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nghệ sĩ</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Bài hát</TableHead>
                <TableHead>Tổng lượt nghe</TableHead>
                <TableHead>Thể loại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArtists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={artist.avatar || undefined} />
                        <AvatarFallback>
                          {artist.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{artist.name}</div>
                        <div className="flex items-center space-x-1">
                          {!artist.isActive && (
                            <Badge variant="outline" className="text-xs">
                              Không hoạt động
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{artist.email}</TableCell>
                  <TableCell>{formatNumber(artist.followers)}</TableCell>
                  <TableCell>{artist.totalSongs}</TableCell>
                  <TableCell>{formatNumber(artist.totalPlays)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {artist.genres.map((genre) => (
                        <Badge
                          key={genre}
                          variant="outline"
                          className="text-xs"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(artist.status)}</TableCell>
                  <TableCell>
                    {new Date(artist.joinDate).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          Xem hồ sơ
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Music className="mr-2 h-4 w-4" />
                          Xem bài hát
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        {artist.status === "pending" && (
                          <DropdownMenuItem className="text-green-600">
                            <Star className="mr-2 h-4 w-4" />
                            Xác minh
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Tạm khóa
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
    </>
  );
}
