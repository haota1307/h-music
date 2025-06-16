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
  Disc,
  MoreHorizontal,
  Play,
  Calendar,
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
const mockAlbums = [
  {
    id: "1",
    title: "Sky Tour",
    artist: "Sơn Tùng M-TP",
    cover: null,
    trackCount: 12,
    totalDuration: "42:35",
    releaseDate: "2024-01-15",
    genre: "V-Pop",
    totalPlays: 25000000,
    status: "published",
    type: "album",
  },
  {
    id: "2",
    title: "22",
    artist: "MONO",
    cover: null,
    trackCount: 8,
    totalDuration: "28:42",
    releaseDate: "2023-12-20",
    genre: "R&B",
    totalPlays: 15000000,
    status: "published",
    type: "album",
  },
  {
    id: "3",
    title: "Những Bài Hát Hay Nhất",
    artist: "Hà Anh Tuấn",
    cover: null,
    trackCount: 15,
    totalDuration: "56:18",
    releaseDate: "2023-11-10",
    genre: "V-Pop",
    totalPlays: 32000000,
    status: "published",
    type: "compilation",
  },
  {
    id: "4",
    title: "Mùa Hè EP",
    artist: "Orange",
    cover: null,
    trackCount: 4,
    totalDuration: "16:23",
    releaseDate: "2024-02-14",
    genre: "Indie",
    totalPlays: 5800000,
    status: "pending",
    type: "ep",
  },
  {
    id: "5",
    title: "Tình Đầu Quá Chén (Single)",
    artist: "Quang Hùng MasterD",
    cover: null,
    trackCount: 1,
    totalDuration: "3:12",
    releaseDate: "2024-03-01",
    genre: "V-Pop",
    totalPlays: 8900000,
    status: "published",
    type: "single",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "published":
      return (
        <Badge variant="default" className="bg-green-500">
          Đã phát hành
        </Badge>
      );
    case "pending":
      return <Badge variant="secondary">Chờ duyệt</Badge>;
    case "draft":
      return <Badge variant="outline">Bản nháp</Badge>;
    case "scheduled":
      return (
        <Badge variant="default" className="bg-blue-500">
          Đã lên lịch
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "album":
      return (
        <Badge variant="outline" className="text-purple-600 border-purple-600">
          Album
        </Badge>
      );
    case "ep":
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-600">
          EP
        </Badge>
      );
    case "single":
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          Single
        </Badge>
      );
    case "compilation":
      return (
        <Badge variant="outline" className="text-orange-600 border-orange-600">
          Tuyển tập
        </Badge>
      );
    default:
      return <Badge variant="outline">{type}</Badge>;
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

export default function AlbumsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredAlbums = mockAlbums.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || album.status === statusFilter;
    const matchesType = typeFilter === "all" || album.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý album</h1>
          <p className="text-muted-foreground">
            Quản lý album, EP, single và tuyển tập nhạc
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tạo album mới
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng album</CardTitle>
            <Disc className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> album mới tuần này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EP & Single</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23</span> phát hành mới
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
            <div className="text-2xl font-bold">89M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Album cần xem xét</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách album</CardTitle>
              <CardDescription>
                Quản lý tất cả album, EP và single trên nền tảng
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm album, nghệ sĩ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">Tất cả loại</option>
                <option value="album">Album</option>
                <option value="ep">EP</option>
                <option value="single">Single</option>
                <option value="compilation">Tuyển tập</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="published">Đã phát hành</option>
                <option value="pending">Chờ duyệt</option>
                <option value="draft">Bản nháp</option>
                <option value="scheduled">Đã lên lịch</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Album</TableHead>
                <TableHead>Nghệ sĩ</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Số bài</TableHead>
                <TableHead>Thời lượng</TableHead>
                <TableHead>Lượt nghe</TableHead>
                <TableHead>Ngày phát hành</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlbums.map((album) => (
                <TableRow key={album.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                        <Disc className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium">{album.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {album.genre}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{album.artist}</TableCell>
                  <TableCell>{getTypeBadge(album.type)}</TableCell>
                  <TableCell>{album.trackCount} bài</TableCell>
                  <TableCell>{album.totalDuration}</TableCell>
                  <TableCell>{formatNumber(album.totalPlays)}</TableCell>
                  <TableCell>
                    {new Date(album.releaseDate).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell>{getStatusBadge(album.status)}</TableCell>
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
                          <Disc className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Phát album
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa album
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
