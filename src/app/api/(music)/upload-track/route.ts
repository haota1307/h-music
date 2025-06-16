import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary, uploadOptions } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has permission to upload (artist/admin)
    if (session.user.role !== "ARTIST" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only artists and admins can upload tracks" },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;
    const imageFile = formData.get("image") as File | null;
    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string;
    const album = formData.get("album") as string | null;
    const genre = formData.get("genre") as string | null;

    if (!audioFile || !title || !artist) {
      return NextResponse.json(
        { error: "Audio file, title, and artist are required" },
        { status: 400 }
      );
    }

    // Validate audio file type
    const allowedAudioTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/flac",
      "audio/mp4",
      "audio/aac",
    ];
    if (!allowedAudioTypes.includes(audioFile.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid audio file type. Only MP3, WAV, FLAC, M4A, and AAC are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate audio file size (max 50MB)
    const maxAudioSize = 50 * 1024 * 1024; // 50MB
    if (audioFile.size > maxAudioSize) {
      return NextResponse.json(
        { error: "Audio file size too large. Maximum 50MB allowed." },
        { status: 400 }
      );
    }

    // Convert audio file to base64
    const audioBytes = await audioFile.arrayBuffer();
    const audioBuffer = Buffer.from(audioBytes);
    const audioBase64 = `data:${audioFile.type};base64,${audioBuffer.toString(
      "base64"
    )}`;

    // Generate unique public ID for audio
    const audioPublicId = `track_${session.user.id}_${Date.now()}`;

    // Upload audio to Cloudinary
    const audioResult = await uploadToCloudinary(
      audioBase64,
      uploadOptions.audio,
      audioPublicId
    );

    if (!audioResult.success) {
      return NextResponse.json(
        { error: audioResult.error || "Audio upload failed" },
        { status: 500 }
      );
    }

    let imageUrl = null;
    let imagePublicId = null;

    // Upload image if provided
    if (imageFile) {
      // Validate image file type
      const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedImageTypes.includes(imageFile.type)) {
        return NextResponse.json(
          {
            error:
              "Invalid image file type. Only JPG, PNG, and WebP are allowed.",
          },
          { status: 400 }
        );
      }

      // Validate image file size (max 5MB)
      const maxImageSize = 5 * 1024 * 1024; // 5MB
      if (imageFile.size > maxImageSize) {
        return NextResponse.json(
          { error: "Image file size too large. Maximum 5MB allowed." },
          { status: 400 }
        );
      }

      // Convert image file to base64
      const imageBytes = await imageFile.arrayBuffer();
      const imageBuffer = Buffer.from(imageBytes);
      const imageBase64 = `data:${imageFile.type};base64,${imageBuffer.toString(
        "base64"
      )}`;

      // Generate unique public ID for image
      imagePublicId = `track_cover_${session.user.id}_${Date.now()}`;

      // Upload image to Cloudinary
      const imageResult = await uploadToCloudinary(
        imageBase64,
        uploadOptions.albumCover,
        imagePublicId
      );

      if (imageResult.success) {
        imageUrl = imageResult.url;
      }
    }

    // TODO: Save track metadata to database
    const trackData = {
      title,
      artist,
      album,
      genre,
      audioUrl: audioResult.url,
      audioPublicId: audioResult.publicId,
      imageUrl,
      imagePublicId,
      duration: audioResult.duration,
      fileSize: audioResult.bytes,
      uploadedBy: session.user.id,
      uploadedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      track: trackData,
      message: "Track uploaded successfully",
    });
  } catch (error) {
    console.error("Track upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
