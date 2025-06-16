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
import { useTokenRefresh } from "@/hooks/use-token-refresh";

export function TokenStatus() {
  const { data: session, status } = useSession();
  const { refreshToken } = useTokenRefresh();

  if (status === "loading") {
    return <div>Loading token status...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Not authenticated</div>;
  }

  const now = Math.floor(Date.now() / 1000);
  const tokenExp = (session as any)?.exp;
  const refreshAt = (session as any)?.refreshAt;
  const iat = (session as any)?.iat;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString("vi-VN");
  };

  const getTimeRemaining = (timestamp: number) => {
    const diff = timestamp - now;
    if (diff <= 0) return "Đã hết hạn";

    const days = Math.floor(diff / (24 * 60 * 60));
    const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((diff % (60 * 60)) / 60);

    if (days > 0) return `${days} ngày ${hours} giờ`;
    if (hours > 0) return `${hours} giờ ${minutes} phút`;
    return `${minutes} phút`;
  };

  const getStatusBadge = () => {
    if (!tokenExp) return <Badge variant="outline">Không xác định</Badge>;

    const timeLeft = tokenExp - now;
    if (timeLeft <= 0) return <Badge variant="destructive">Đã hết hạn</Badge>;
    if (timeLeft < 24 * 60 * 60)
      return <Badge variant="secondary">Sắp hết hạn</Badge>;
    if (timeLeft < 7 * 24 * 60 * 60)
      return <Badge variant="outline">Bình thường</Badge>;
    return <Badge variant="default">Còn mới</Badge>;
  };

  const shouldRefresh = refreshAt && now >= refreshAt;

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Token Status
          {getStatusBadge()}
        </CardTitle>
        <CardDescription>
          Thông tin về JWT token và thời gian refresh
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {iat && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Được tạo:</span>
            <span>{formatTime(iat)}</span>
          </div>
        )}

        {tokenExp && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Hết hạn:</span>
            <span>{formatTime(tokenExp)}</span>
          </div>
        )}

        {tokenExp && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Thời gian còn lại:</span>
            <span
              className={tokenExp - now < 24 * 60 * 60 ? "text-orange-600" : ""}
            >
              {getTimeRemaining(tokenExp)}
            </span>
          </div>
        )}

        {refreshAt && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Refresh sau:</span>
            <span className={shouldRefresh ? "text-red-600" : ""}>
              {shouldRefresh ? "Ngay bây giờ!" : formatTime(refreshAt)}
            </span>
          </div>
        )}

        <div className="pt-2">
          <Button
            onClick={refreshToken}
            variant="outline"
            className="w-full"
            disabled={status !== "authenticated"}
          >
            Refresh Token Ngay
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Current timestamp: {now}
          <br />
          User: {session?.user?.email}
        </div>
      </CardContent>
    </Card>
  );
}
