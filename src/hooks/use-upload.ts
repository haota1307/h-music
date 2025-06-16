import { useState } from "react";
import { toast } from "sonner";

interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

// Hook for avatar upload
export function useAvatarUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadAvatar = async (file: File): Promise<UploadResult> => {
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
        toast.success("Avatar uploaded successfully!");
        return {
          success: true,
          url: result.url,
          publicId: result.publicId,
        };
      } else {
        toast.error(result.error || "Upload failed");
        return {
          success: false,
          error: result.error || "Upload failed",
        };
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Network error. Please try again.");
      return {
        success: false,
        error: "Network error",
      };
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadAvatar,
    isUploading,
  };
}

// Hook for track upload
export function useTrackUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadTrack = async (
    audioFile: File,
    metadata: {
      title: string;
      artist: string;
      album?: string;
      genre?: string;
    },
    imageFile?: File
  ): Promise<UploadResult> => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("audio", audioFile);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("title", metadata.title);
      formData.append("artist", metadata.artist);
      if (metadata.album) formData.append("album", metadata.album);
      if (metadata.genre) formData.append("genre", metadata.genre);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      const response = await fetch("/api/music/upload-track", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();

      if (result.success) {
        toast.success("Track uploaded successfully!");
        return {
          success: true,
          url: result.track.audioUrl,
          publicId: result.track.audioPublicId,
        };
      } else {
        toast.error(result.error || "Upload failed");
        return {
          success: false,
          error: result.error || "Upload failed",
        };
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Network error. Please try again.");
      return {
        success: false,
        error: "Network error",
      };
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    uploadTrack,
    isUploading,
    uploadProgress,
  };
}

// Generic file upload hook
export function useFileUpload(endpoint: string) {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (
    file: File,
    additionalData?: Record<string, string>
  ): Promise<UploadResult> => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Add additional data if provided
      if (additionalData) {
        Object.entries(additionalData).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          url: result.url,
          publicId: result.publicId,
        };
      } else {
        return {
          success: false,
          error: result.error || "Upload failed",
        };
      }
    } catch (error) {
      console.error("Upload error:", error);
      return {
        success: false,
        error: "Network error",
      };
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    isUploading,
  };
}

// Utility functions for file validation
export const validateImageFile = (
  file: File
): { valid: boolean; error?: string } => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Only JPG, PNG, and WebP are allowed.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "File size too large. Maximum 5MB allowed.",
    };
  }

  return { valid: true };
};

export const validateAudioFile = (
  file: File
): { valid: boolean; error?: string } => {
  const allowedTypes = [
    "audio/mpeg",
    "audio/wav",
    "audio/flac",
    "audio/mp4",
    "audio/aac",
  ];
  const maxSize = 50 * 1024 * 1024; // 50MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error:
        "Invalid file type. Only MP3, WAV, FLAC, M4A, and AAC are allowed.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "File size too large. Maximum 50MB allowed.",
    };
  }

  return { valid: true };
};
