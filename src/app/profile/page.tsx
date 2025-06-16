"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileForm } from "@/components/profile/profile-form";
import { ChangePasswordForm } from "@/components/profile/change-password-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProfile } from "@/hooks/use-profile";
import { User, Settings, Lock, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 space-y-8">
          <ProfileSkeleton />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load profile. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Profile not found.</AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 space-y-8">
        {/* Profile Header */}
        <ProfileHeader profile={profile} isOwnProfile={true} />

        {/* Profile Management Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileForm profile={profile} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Account Type</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.subscriptionTier} Account
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Account Status</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.status}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Email Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.isVerified ? "Verified" : "Not Verified"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Artist Status</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.isArtist ? "Artist Account" : "Regular User"}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    To change your subscription plan or request artist
                    verification, please contact our support team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <ChangePasswordForm />

            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Last Active</h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.lastActiveAt
                      ? new Date(profile.lastActiveAt).toLocaleString("vi-VN")
                      : "Never"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Account Created</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(profile.createdAt).toLocaleString("vi-VN")}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    For additional security options like two-factor
                    authentication, please contact our support team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

// Loading skeleton component
function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="w-32 h-32 rounded-full" />
              <Skeleton className="w-24 h-8" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Skeleton className="w-48 h-8" />
                <Skeleton className="w-32 h-4" />
              </div>
              <Skeleton className="w-full h-16" />
              <div className="flex gap-4">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-32 h-4" />
              </div>
              <div className="grid grid-cols-5 gap-4 pt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="text-center space-y-2">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-8 h-6 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Skeleton */}
      <div className="space-y-4">
        <Skeleton className="w-full h-10" />
        <Card>
          <CardHeader>
            <Skeleton className="w-48 h-6" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-10" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
