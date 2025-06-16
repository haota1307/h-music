// User authentication and profile types
export interface User {
  id: string;
  email: string;
  username?: string;
  displayName?: string;
  avatar?: string;
  isVerified: boolean;
  accountProvider: "email" | "google" | "facebook" | "apple";
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isActive: boolean;
  role: "user" | "artist" | "admin" | "premium";
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  country?: string;
  city?: string;
  phoneNumber?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
  isPublic: boolean;
  followerCount: number;
  followingCount: number;
  playlistCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  plan: "free" | "premium" | "family" | "student";
  status: "active" | "cancelled" | "expired" | "past_due";
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
  paymentMethod?: string;
  pricePerMonth: number;
  currency: string;
  features: {
    adFree: boolean;
    offlineDownload: boolean;
    highQualityAudio: boolean;
    unlimitedSkips: boolean;
    exclusiveContent: boolean;
  };
  trialUsed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  id: string;
  userId: string;

  // Audio preferences
  audioQuality: "low" | "normal" | "high" | "lossless";
  enableCrossfade: boolean;
  crossfadeDuration: number;
  enableNormalization: boolean;
  enableEqualizer: boolean;
  equalizerPreset?: string;

  // Playback preferences
  autoplay: boolean;
  shuffleMode: boolean;
  repeatMode: "off" | "one" | "all";
  gaplessPlayback: boolean;

  // Privacy preferences
  showActivity: boolean;
  showPlaylists: boolean;
  showProfile: boolean;
  allowFollowing: boolean;
  allowComments: boolean;

  // Notification preferences
  emailNotifications: {
    newReleases: boolean;
    playlistUpdates: boolean;
    socialActivity: boolean;
    promotional: boolean;
  };
  pushNotifications: {
    nowPlaying: boolean;
    socialActivity: boolean;
    recommendations: boolean;
  };

  // Content preferences
  explicitContent: boolean;
  language: string;
  timezone: string;

  // Interface preferences
  theme: "light" | "dark" | "system";
  compactMode: boolean;
  showLyrics: boolean;
  showVisualizer: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  type:
    | "play"
    | "like"
    | "follow"
    | "playlist_create"
    | "playlist_follow"
    | "comment"
    | "share";
  targetType: "song" | "album" | "artist" | "playlist" | "user";
  targetId: string;
  metadata?: Record<string, any>;
  isPublic: boolean;
  createdAt: string;
}

export interface UserFollow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;

  // Populated data
  follower?: User;
  following?: User;
}

export interface UserDevice {
  id: string;
  userId: string;
  deviceName: string;
  deviceType:
    | "mobile"
    | "desktop"
    | "tablet"
    | "tv"
    | "speaker"
    | "car"
    | "web";
  platform: string;
  isActive: boolean;
  lastUsedAt: string;
  createdAt: string;
}

export interface UserSession {
  id: string;
  userId: string;
  sessionToken: string;
  deviceId?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
  lastAccessedAt: string;
}
