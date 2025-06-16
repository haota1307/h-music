"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2, Music, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface TrackUploadProps {
  onUploadSuccess?: (track: any) => void;
  className?: string;
}

export function TrackUpload({ onUploadSuccess, className }: TrackUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    description: "",
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const genres = [
    "V-Pop",
    "Ballad Việt",
    "Rap Việt",
    "Nhạc Trẻ",
    "Bolero",
    "Acoustic",
    "Rock Việt",
    "Indie Việt",
    "Nhạc Dân Gian",
    "Cải Lương",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioPreview(url);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!audioFile || !formData.title || !formData.artist) {
      toast.error(
        "Please fill in all required fields and select an audio file"
      );
      return;
    }

    setIsUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("audio", audioFile);
      if (imageFile) {
        uploadFormData.append("image", imageFile);
      }
      uploadFormData.append("title", formData.title);
      uploadFormData.append("artist", formData.artist);
      if (formData.album) uploadFormData.append("album", formData.album);
      if (formData.genre) uploadFormData.append("genre", formData.genre);

      const response = await fetch("/api/music/upload-track", {
        method: "POST",
        body: uploadFormData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Track uploaded successfully!");
        onUploadSuccess?.(result.track);

        // Reset form
        setFormData({
          title: "",
          artist: "",
          album: "",
          genre: "",
          description: "",
        });
        setAudioFile(null);
        setImageFile(null);
        setAudioPreview(null);
        setImagePreview(null);
      } else {
        toast.error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5" />
          Upload New Track
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Audio File Upload */}
          <div className="space-y-2">
            <Label htmlFor="audio-upload">Audio File *</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              {audioPreview ? (
                <div className="space-y-4">
                  <audio controls className="w-full">
                    <source src={audioPreview} />
                  </audio>
                  <p className="text-sm text-muted-foreground">
                    {audioFile?.name}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Music className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Click to select audio file
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MP3, WAV, FLAC, M4A, AAC up to 50MB
                  </p>
                </div>
              )}
              <Input
                id="audio-upload"
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className="hidden"
                disabled={isUploading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("audio-upload")?.click()}
                disabled={isUploading}
                className="mt-4"
              >
                Select Audio File
              </Button>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image-upload">Cover Image (Optional)</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="w-32 h-32 mx-auto rounded-lg object-cover"
                  />
                  <p className="text-sm text-muted-foreground">
                    {imageFile?.name}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Click to select cover image
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, WebP up to 5MB
                  </p>
                </div>
              )}
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isUploading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                disabled={isUploading}
                className="mt-4"
              >
                Select Cover Image
              </Button>
            </div>
          </div>

          {/* Track Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter track title"
                disabled={isUploading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist">Artist *</Label>
              <Input
                id="artist"
                value={formData.artist}
                onChange={(e) => handleInputChange("artist", e.target.value)}
                placeholder="Enter artist name"
                disabled={isUploading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="album">Album</Label>
              <Input
                id="album"
                value={formData.album}
                onChange={(e) => handleInputChange("album", e.target.value)}
                placeholder="Enter album name"
                disabled={isUploading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select
                value={formData.genre}
                onValueChange={(value) => handleInputChange("genre", value)}
                disabled={isUploading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your track..."
              disabled={isUploading}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={
              isUploading || !audioFile || !formData.title || !formData.artist
            }
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading Track...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Track
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
