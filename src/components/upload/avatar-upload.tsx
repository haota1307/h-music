"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AvatarUploadProps {
  currentAvatar?: string;
  onUploadSuccess?: (url: string) => void;
  className?: string;
}

export function AvatarUpload({
  currentAvatar,
  onUploadSuccess,
  className,
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/user/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Tải lên ảnh đại diện thành công!");
        onUploadSuccess?.(result.url);
      } else {
        toast.error(result.error || "Tải lên thất bại");
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Lỗi mạng. Vui lòng thử lại.");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <Avatar className="w-24 h-24">
        <AvatarImage src={previewUrl || currentAvatar} alt="Avatar preview" />
        <AvatarFallback>
          <Upload className="w-8 h-8 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center space-y-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
          id="avatar-upload"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById("avatar-upload")?.click()}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang tải lên...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Chọn ảnh đại diện
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          JPG, PNG, WebP tối đa 5MB
        </p>
      </div>
    </div>
  );
}
