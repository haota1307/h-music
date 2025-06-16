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
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Eye,
  MoreHorizontal,
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
const mockSongs = [
  {
    id: "1",
    title: "Nơi Này Có Anh",
    artist: "Sơn Tùng M-TP",
    album: "Sky Tour",
    genre: "V-Pop",
    duration: "4:23",
    plays: 1250000,
    status: "published",
    uploadDate: "2024-01-15",
    isExplicit: false,
  },
  {
    id: "2",
    title: "Chúng Ta Của Hiện Tại",
    artist: "Sơn Tùng M-TP",
    album: "Single",
    genre: "V-Pop",
    duration: "3:45",
    plays: 980000,
    status: "published",
    uploadDate: "2024-02-20",
    isExplicit: false,
  },
  {
    id: "3",
    title: "Tình Đầu Quá Chén",
    artist: "Quang Hùng MasterD",
    album: "Single",
    genre: "V-Pop",
    duration: "3:12",
    plays: 750000,
    status: "pending",
    uploadDate: "2024-03-10",
    isExplicit: false,
  },
  {
    id: "4",
    title: "Waiting For You",
    artist: "MONO",
    album: "22",
    genre: "R&B",
    duration: "4:01",
    plays: 650000,
    status: "published",
    uploadDate: "2024-02-28",
    isExplicit: false,
  },
  {
    id: "5",
    title: "Em Của Ngày Hôm Qua",
    artist: "Sơn Tùng M-TP",
    album: "Single",
    genre: "V-Pop",
    duration: "4:15",
    plays: 2100000,
    status: "published",
    uploadDate: "2023-12-05",
    isExplicit: false,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "published":
      return (
        <Badge variant="default" className="bg-green-500">
          Đã xuất bản
        </Badge>
      );
    case "pending":
      return <Badge variant="secondary">Chờ duyệt</Badge>;
    case "rejected":
      return <Badge variant="destructive">Bị từ chối</Badge>;
    case "draft":
      return <Badge variant="outline">Bản nháp</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
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

export default function SongsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSongs = mockSongs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || song.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý bài hát</h1>
          <p className="text-muted-foreground">
            Quản lý tất cả bài hát trên nền tảng H-Music
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm bài hát
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bài hát</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,421</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23</span> bài mới tuần này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">+12</span> từ hôm qua
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng lượt nghe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bài hát hot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">Top 1000 lượt nghe</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách bài hát</CardTitle>
              <CardDescription>
                Quản lý và kiểm duyệt bài hát được tải lên
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm bài hát, nghệ sĩ..."
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
                <option value="published">Đã xuất bản</option>
                <option value="pending">Chờ duyệt</option>
                <option value="rejected">Bị từ chối</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bài hát</TableHead>
                <TableHead>Nghệ sĩ</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Thể loại</TableHead>
                <TableHead>Thời lượng</TableHead>
                <TableHead>Lượt nghe</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tải</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSongs.map((song) => (
                <TableRow key={song.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                        <Play className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{song.title}</div>
                        {song.isExplicit && (
                          <Badge variant="outline" className="text-xs mt-1">
                            18+
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>{song.album}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{song.genre}</Badge>
                  </TableCell>
                  <TableCell>{song.duration}</TableCell>
                  <TableCell>{formatNumber(song.plays)}</TableCell>
                  <TableCell>{getStatusBadge(song.status)}</TableCell>
                  <TableCell>
                    {new Date(song.uploadDate).toLocaleDateString("vi-VN")}
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
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Phát nhạc
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa bài hát
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
