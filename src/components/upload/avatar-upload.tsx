"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUpdateAvatar } from "@/hooks/use-profile";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const updateAvatarMutation = useUpdateAvatar();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước file không được vượt quá 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file hình ảnh");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload using the hook with Redux dispatch
    updateAvatarMutation.mutate(file, {
      onSuccess: (data) => {
        onUploadSuccess?.(data.url);
        // Preview will be updated by Redux state
      },
      onError: () => {
        setPreviewUrl(null);
      },
    });
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
          disabled={updateAvatarMutation.isPending}
          className="hidden"
          id="avatar-upload"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById("avatar-upload")?.click()}
          disabled={updateAvatarMutation.isPending}
          className="w-full"
        >
          {updateAvatarMutation.isPending ? (
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
