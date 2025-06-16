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
  Tag,
  MoreHorizontal,
  TrendingUp,
  Music,
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
const mockGenres = [
  {
    id: "1",
    name: "V-Pop",
    description: "Vietnamese Pop music - Nhạc pop Việt Nam hiện đại",
    color: "#FF6B6B",
    songCount: 1245,
    artistCount: 234,
    totalPlays: 45000000,
    isActive: true,
    createdDate: "2020-01-15",
    popularity: 92,
    weeklyGrowth: 8.5,
  },
  {
    id: "2",
    name: "Ballad",
    description: "Nhạc ballad - Những bản tình ca nhẹ nhàng, sâu lắng",
    color: "#4ECDC4",
    songCount: 867,
    artistCount: 156,
    totalPlays: 32000000,
    isActive: true,
    createdDate: "2020-01-15",
    popularity: 78,
    weeklyGrowth: 3.2,
  },
  {
    id: "3",
    name: "R&B",
    description: "Rhythm and Blues - Nhạc R&B hiện đại",
    color: "#45B7D1",
    songCount: 456,
    artistCount: 89,
    totalPlays: 18000000,
    isActive: true,
    createdDate: "2020-02-10",
    popularity: 65,
    weeklyGrowth: 12.1,
  },
  {
    id: "4",
    name: "Hip-Hop",
    description: "Vietnamese Hip-Hop và Rap music",
    color: "#F7DC6F",
    songCount: 324,
    artistCount: 67,
    totalPlays: 15000000,
    isActive: true,
    createdDate: "2020-03-05",
    popularity: 71,
    weeklyGrowth: 15.6,
  },
  {
    id: "5",
    name: "Indie",
    description: "Independent music - Nhạc độc lập, phong cách riêng",
    color: "#BB8FCE",
    songCount: 234,
    artistCount: 45,
    totalPlays: 8500000,
    isActive: true,
    createdDate: "2020-06-12",
    popularity: 58,
    weeklyGrowth: 6.8,
  },
  {
    id: "6",
    name: "EDM",
    description: "Electronic Dance Music - Nhạc điện tử sôi động",
    color: "#58D68D",
    songCount: 189,
    artistCount: 34,
    totalPlays: 12000000,
    isActive: true,
    createdDate: "2020-08-20",
    popularity: 63,
    weeklyGrowth: -2.1,
  },
  {
    id: "7",
    name: "Folk",
    description: "Nhạc dân gian hiện đại - Modern folk music",
    color: "#F4A460",
    songCount: 156,
    artistCount: 28,
    totalPlays: 5200000,
    isActive: false,
    createdDate: "2021-01-10",
    popularity: 42,
    weeklyGrowth: 1.2,
  },
];

const getPopularityBadge = (popularity: number) => {
  if (popularity >= 80) {
    return <Badge className="bg-red-500">Rất hot</Badge>;
  } else if (popularity >= 60) {
    return <Badge className="bg-orange-500">Phổ biến</Badge>;
  } else if (popularity >= 40) {
    return <Badge variant="secondary">Bình thường</Badge>;
  } else {
    return <Badge variant="outline">Ít nghe</Badge>;
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

export default function GenresManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredGenres = mockGenres.filter((genre) => {
    const matchesSearch =
      genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      genre.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && genre.isActive) ||
      (statusFilter === "inactive" && !genre.isActive);
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý thể loại
          </h1>
          <p className="text-muted-foreground">
            Quản lý các thể loại nhạc và xu hướng âm nhạc
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm thể loại mới
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng thể loại</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> thể loại mới tuần này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thể loại hot</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Độ phổ biến trên 80%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bài hát</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5K</div>
            <p className="text-xs text-muted-foreground">
              Trên tất cả thể loại
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tăng trưởng tuần
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+9.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">V-Pop</span> dẫn đầu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Genres Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Thể loại phổ biến nhất</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {mockGenres.slice(0, 4).map((genre) => (
            <Card key={genre.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: genre.color }}
                  />
                  {getPopularityBadge(genre.popularity)}
                </div>
                <CardTitle className="text-lg">{genre.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bài hát:</span>
                    <span className="font-medium">
                      {formatNumber(genre.songCount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nghệ sĩ:</span>
                    <span className="font-medium">{genre.artistCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lượt nghe:</span>
                    <span className="font-medium">
                      {formatNumber(genre.totalPlays)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tăng trưởng:</span>
                    <span
                      className={`font-medium ${
                        genre.weeklyGrowth >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {genre.weeklyGrowth >= 0 ? "+" : ""}
                      {genre.weeklyGrowth}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tất cả thể loại</CardTitle>
              <CardDescription>
                Quản lý và cấu hình các thể loại nhạc
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm thể loại..."
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
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thể loại</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Số bài hát</TableHead>
                <TableHead>Nghệ sĩ</TableHead>
                <TableHead>Lượt nghe</TableHead>
                <TableHead>Độ phổ biến</TableHead>
                <TableHead>Tăng trưởng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGenres.map((genre) => (
                <TableRow key={genre.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: genre.color }}
                      />
                      <span>{genre.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {genre.description}
                  </TableCell>
                  <TableCell>{formatNumber(genre.songCount)}</TableCell>
                  <TableCell>{genre.artistCount}</TableCell>
                  <TableCell>{formatNumber(genre.totalPlays)}</TableCell>
                  <TableCell>{getPopularityBadge(genre.popularity)}</TableCell>
                  <TableCell>
                    <span
                      className={
                        genre.weeklyGrowth >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {genre.weeklyGrowth >= 0 ? "+" : ""}
                      {genre.weeklyGrowth}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={genre.isActive ? "default" : "outline"}>
                      {genre.isActive ? "Hoạt động" : "Tạm khóa"}
                    </Badge>
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
                          <Tag className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Music className="mr-2 h-4 w-4" />
                          Xem bài hát
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          {genre.isActive ? "Tạm khóa" : "Kích hoạt"}
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
