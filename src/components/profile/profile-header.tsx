"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarUpload } from "@/components/upload/avatar-upload";
import {
  Calendar,
  MapPin,
  Globe,
  Users,
  Music,
  Album,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { type UserProfile } from "@/hooks/use-profile";

interface ProfileHeaderProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
  className?: string;
}

export function ProfileHeader({
  profile,
  isOwnProfile = false,
  className,
}: ProfileHeaderProps) {
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  const handleAvatarUploadSuccess = (url: string) => {
    setShowAvatarUpload(false);
    // Avatar will be updated via React Query cache
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "MODERATOR":
        return "secondary";
      case "ARTIST":
        return "default";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
    });
  };

  const formatSocialLink = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch {
      return url;
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            {showAvatarUpload && isOwnProfile ? (
              <AvatarUpload
                currentAvatar={profile.avatar || undefined}
                onUploadSuccess={handleAvatarUploadSuccess}
              />
            ) : (
              <>
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src={profile.avatar || undefined}
                    alt={profile.displayName || profile.username}
                  />
                  <AvatarFallback className="text-2xl">
                    {(profile.displayName || profile.username)
                      .charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isOwnProfile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAvatarUpload(true)}
                  >
                    Đổi ảnh đại diện
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            {/* Name and Role */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-bold">
                  {profile.displayName || profile.username}
                </h1>
                <div className="flex gap-2">
                  <Badge variant={getRoleBadgeVariant(profile.role)}>
                    {profile.role}
                  </Badge>
                  {profile.isVerified && (
                    <Badge variant="secondary">Đã xác minh</Badge>
                  )}
                  {profile.isArtist && <Badge variant="default">Nghệ sĩ</Badge>}
                </div>
              </div>
              <p className="text-muted-foreground">@{profile.username}</p>
            </div>

            {/* Bio */}
            {profile.profile?.bio && (
              <p className="text-sm leading-relaxed">{profile.profile.bio}</p>
            )}

            {/* Additional Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {profile.profile?.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.profile.location}
                </div>
              )}
              {profile.profile?.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <a
                    href={profile.profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    {formatSocialLink(profile.profile.website)}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Tham gia {formatDate(profile.createdAt)}
              </div>
            </div>

            {/* Social Links */}
            {profile.profile?.socialLinks &&
              Object.keys(profile.profile.socialLinks).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(profile.profile.socialLinks).map(
                    ([platform, url]) => (
                      <Button
                        key={platform}
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="capitalize"
                        >
                          {platform}
                        </a>
                      </Button>
                    )
                  )}
                </div>
              )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Music className="w-4 h-4" />
                  Bài hát
                </div>
                <div className="text-xl font-bold">{profile.stats.tracks}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Album className="w-4 h-4" />
                  Album
                </div>
                <div className="text-xl font-bold">{profile.stats.albums}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Heart className="w-4 h-4" />
                  Playlist
                </div>
                <div className="text-xl font-bold">
                  {profile.stats.playlists}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  Người theo dõi
                </div>
                <div className="text-xl font-bold">
                  {profile.stats.followers}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  Đang theo dõi
                </div>
                <div className="text-xl font-bold">
                  {profile.stats.following}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
