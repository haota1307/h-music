"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import {
  useUpdateProfile,
  type UpdateProfileData,
  type UserProfile,
} from "@/hooks/use-profile";

interface ProfileFormProps {
  profile: UserProfile;
  className?: string;
}

export function ProfileForm({ profile, className }: ProfileFormProps) {
  const updateProfile = useUpdateProfile();

  const [formData, setFormData] = useState<UpdateProfileData>({
    displayName: profile.displayName || "",
    bio: profile.profile?.bio || "",
    location: profile.profile?.location || "",
    website: profile.profile?.website || "",
    socialLinks: profile.profile?.socialLinks || {},
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: profile.profile?.socialLinks?.facebook || "",
    instagram: profile.profile?.socialLinks?.instagram || "",
    twitter: profile.profile?.socialLinks?.twitter || "",
    youtube: profile.profile?.socialLinks?.youtube || "",
  });

  // Update form when profile changes
  useEffect(() => {
    setFormData({
      displayName: profile.displayName || "",
      bio: profile.profile?.bio || "",
      location: profile.profile?.location || "",
      website: profile.profile?.website || "",
      socialLinks: profile.profile?.socialLinks || {},
    });
    setSocialLinks({
      facebook: profile.profile?.socialLinks?.facebook || "",
      instagram: profile.profile?.socialLinks?.instagram || "",
      twitter: profile.profile?.socialLinks?.twitter || "",
      youtube: profile.profile?.socialLinks?.youtube || "",
    });
  }, [profile]);

  const handleInputChange = (field: keyof UpdateProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Filter out empty social links
    const filteredSocialLinks = Object.entries(socialLinks).reduce(
      (acc, [key, value]) => {
        if (value.trim()) {
          acc[key] = value.trim();
        }
        return acc;
      },
      {} as Record<string, string>
    );

    const updateData: UpdateProfileData = {
      ...formData,
      socialLinks: filteredSocialLinks,
    };

    updateProfile.mutate(updateData);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Thông tin hồ sơ</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  value={profile.username}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Tên đăng nhập không thể thay đổi
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email không thể thay đổi
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Tên hiển thị</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) =>
                  handleInputChange("displayName", e.target.value)
                }
                placeholder="Nhập tên hiển thị của bạn"
                maxLength={50}
                disabled={updateProfile.isPending}
              />
              <p className="text-xs text-muted-foreground">
                Đây là tên sẽ hiển thị cho người dùng khác
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Tiểu sử</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Hãy kể về bản thân bạn..."
                maxLength={500}
                rows={4}
                disabled={updateProfile.isPending}
              />
              <p className="text-xs text-muted-foreground">
                {formData.bio?.length || 0}/500 ký tự
              </p>
            </div>
          </div>

          {/* Location & Website */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin bổ sung</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Địa điểm</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="VD: Thành phố Hồ Chí Minh, Việt Nam"
                  disabled={updateProfile.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://your-website.com"
                  disabled={updateProfile.isPending}
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên kết mạng xã hội</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={socialLinks.facebook}
                  onChange={(e) =>
                    handleSocialLinkChange("facebook", e.target.value)
                  }
                  placeholder="https://facebook.com/username"
                  disabled={updateProfile.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={socialLinks.instagram}
                  onChange={(e) =>
                    handleSocialLinkChange("instagram", e.target.value)
                  }
                  placeholder="https://instagram.com/username"
                  disabled={updateProfile.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={socialLinks.twitter}
                  onChange={(e) =>
                    handleSocialLinkChange("twitter", e.target.value)
                  }
                  placeholder="https://twitter.com/username"
                  disabled={updateProfile.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={socialLinks.youtube}
                  onChange={(e) =>
                    handleSocialLinkChange("youtube", e.target.value)
                  }
                  placeholder="https://youtube.com/channel/..."
                  disabled={updateProfile.isPending}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={updateProfile.isPending}
            className="w-full md:w-auto"
          >
            {updateProfile.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Lưu thay đổi
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
