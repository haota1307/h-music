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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Flag, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kiểm duyệt nội dung - Admin - H-Music",
  description: "Kiểm duyệt và xử lý báo cáo nội dung",
};

// Mock reports data
const reports = [
  {
    id: "1",
    type: "INAPPROPRIATE",
    reason: "Nội dung không phù hợp",
    description: "Bài hát có lời tục tĩu",
    entityType: "song",
    entityId: "song_123",
    entityTitle: "Bài hát ABC",
    reporterName: "Người dùng A",
    status: "pending",
    createdAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    type: "COPYRIGHT",
    reason: "Vi phạm bản quyền",
    description: "Sử dụng nhạc nền không có phép",
    entityType: "song",
    entityId: "song_456",
    entityTitle: "Bài hát XYZ",
    reporterName: "Công ty ABC",
    status: "investigating",
    createdAt: "2024-01-19T15:45:00Z",
  },
  {
    id: "3",
    type: "SPAM",
    reason: "Spam/Rác",
    description: "Playlist chứa toàn bài hát quảng cáo",
    entityType: "playlist",
    entityId: "playlist_789",
    entityTitle: "Playlist Quảng Cáo",
    reporterName: "Người dùng B",
    status: "resolved",
    createdAt: "2024-01-18T09:15:00Z",
  },
];

const getReportTypeBadge = (type: string) => {
  switch (type) {
    case "INAPPROPRIATE":
      return <Badge variant="destructive">Không phù hợp</Badge>;
    case "COPYRIGHT":
      return <Badge variant="default">Bản quyền</Badge>;
    case "SPAM":
      return <Badge variant="secondary">Spam</Badge>;
    case "HATE_SPEECH":
      return <Badge variant="destructive">Ngôn từ thù địch</Badge>;
    case "VIOLENCE":
      return <Badge variant="destructive">Bạo lực</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Chờ xử lý
        </Badge>
      );
    case "investigating":
      return (
        <Badge variant="default" className="bg-blue-100 text-blue-800">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Đang xử lý
        </Badge>
      );
    case "resolved":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Đã xử lý
        </Badge>
      );
    case "dismissed":
      return (
        <Badge variant="outline">
          <XCircle className="w-3 h-3 mr-1" />
          Đã bỏ qua
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function AdminModerationPage() {
  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const investigatingCount = reports.filter(
    (r) => r.status === "investigating"
  ).length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Kiểm duyệt nội dung
        </h2>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive">Admin</Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Báo cáo chờ xử lý
            </CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {pendingCount}
            </div>
            <p className="text-xs text-muted-foreground">Cần xử lý ngay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang xử lý</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {investigatingCount}
            </div>
            <p className="text-xs text-muted-foreground">Đang được xem xét</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng báo cáo</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">Trong tháng này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ xử lý</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">95%</div>
            <p className="text-xs text-muted-foreground">Trong 24h</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách báo cáo</CardTitle>
          <CardDescription>
            Xem và xử lý các báo cáo từ người dùng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại báo cáo</TableHead>
                <TableHead>Nội dung bị báo cáo</TableHead>
                <TableHead>Người báo cáo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="space-y-1">
                      {getReportTypeBadge(report.type)}
                      <div className="text-sm text-muted-foreground">
                        {report.reason}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.entityTitle}</div>
                      <div className="text-sm text-muted-foreground">
                        {report.entityType} • {report.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{report.reporterName}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    {new Date(report.createdAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        Xem chi tiết
                      </Button>
                      {report.status === "pending" && (
                        <>
                          <Button size="sm" variant="default">
                            Xử lý
                          </Button>
                          <Button size="sm" variant="destructive">
                            Từ chối
                          </Button>
                        </>
                      )}
                    </div>
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
