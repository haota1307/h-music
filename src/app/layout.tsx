import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClientSessionProvider } from "@/components/providers/session-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "H-Music - Ứng Dụng Nghe Nhạc Việt Hàng Đầu",
  description:
    "Khám phá và thưởng thức hàng triệu ca khúc Việt Nam với H-Music. Tạo playlist, theo dõi nghệ sĩ yêu thích và khám phá âm nhạc mới phù hợp với sở thích của bạn.",
  keywords: [
    "nhạc việt",
    "vpop",
    "streaming",
    "playlist",
    "ca sĩ việt",
    "album việt",
    "ballad",
    "rap việt",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        <QueryProvider>
          <ClientSessionProvider>
            <ThemeProvider defaultTheme="dark" storageKey="h-music-theme">
              {children}
              <ToastProvider />
            </ThemeProvider>
          </ClientSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
