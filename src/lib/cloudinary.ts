import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Upload options for different file types
export const uploadOptions = {
  // For audio files (music tracks)
  audio: {
    resource_type: "video" as const, // Cloudinary treats audio as video
    folder: "h-music/tracks",
    allowed_formats: ["mp3", "wav", "flac", "m4a", "aac"],
    transformation: [
      {
        quality: "auto",
        format: "mp3",
      },
    ],
  },

  // For images (album covers, avatars, etc.)
  image: {
    resource_type: "image" as const,
    folder: "h-music/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      {
        quality: "auto",
        format: "webp",
      },
    ],
  },

  // For avatars specifically
  avatar: {
    resource_type: "image" as const,
    folder: "h-music/avatars",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      {
        width: 400,
        height: 400,
        crop: "fill",
        gravity: "face",
        quality: "auto",
        format: "webp",
      },
    ],
  },

  // For album covers
  albumCover: {
    resource_type: "image" as const,
    folder: "h-music/albums",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      {
        width: 800,
        height: 800,
        crop: "fill",
        quality: "auto",
        format: "webp",
      },
    ],
  },
};

// Helper function to upload file
export async function uploadToCloudinary(
  file: File | Buffer | string,
  options: (typeof uploadOptions)[keyof typeof uploadOptions],
  publicId?: string
) {
  try {
    const result = await cloudinary.uploader.upload(file as string, {
      ...options,
      public_id: publicId,
    });

    return {
      success: true,
      publicId: result.public_id,
      url: result.secure_url,
      format: result.format,
      duration: result.duration, // For audio files
      bytes: result.bytes,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

// Helper function to delete file
export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: result.result === "ok" };
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

// Generate signed URL for secure uploads
export function generateSignedUrl(publicId: string, options: any = {}) {
  return cloudinary.utils.url(publicId, {
    sign_url: true,
    ...options,
  });
}
