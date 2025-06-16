// Central export file for all types
export * from "./user";
export * from "./music";
export * from "./playlist";
export * from "./ui";
export * from "./auth";
export * from "./api";

// Common utility types
export type ID = string;
export type Timestamp = string;
export type URL = string;
export type Email = string;
export type Color = string;

// Generic types
export interface BaseEntity {
  id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TimestampedEntity {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SoftDeletableEntity extends TimestampedEntity {
  deletedAt?: Timestamp;
  isDeleted: boolean;
}

// Enum-like types
export type UserRole = "user" | "artist" | "admin" | "premium";
export type SubscriptionPlan = "free" | "premium" | "family" | "student";
export type SubscriptionStatus =
  | "active"
  | "cancelled"
  | "expired"
  | "past_due";
export type AudioQuality = "low" | "normal" | "high" | "lossless";
export type AudioFormat = "mp3" | "flac" | "wav" | "aac" | "ogg";
export type PlayMode = "normal" | "shuffle" | "repeat_one" | "repeat_all";
export type DeviceType =
  | "mobile"
  | "desktop"
  | "tablet"
  | "tv"
  | "speaker"
  | "car"
  | "web";
export type NotificationType = "success" | "error" | "warning" | "info";
export type ThemeMode = "light" | "dark" | "system";
export type SortOrder = "asc" | "desc";

// Music-specific types
export type AlbumType = "album" | "single" | "ep" | "compilation";
export type ArtistRole =
  | "primary"
  | "featured"
  | "producer"
  | "writer"
  | "composer";
export type ChartType =
  | "global"
  | "country"
  | "genre"
  | "mood"
  | "new_releases"
  | "trending";
export type ChartPeriod = "daily" | "weekly" | "monthly" | "yearly";

// Social interaction types
export type ActivityType =
  | "play"
  | "like"
  | "follow"
  | "playlist_create"
  | "playlist_follow"
  | "comment"
  | "share";
export type TargetType = "song" | "album" | "artist" | "playlist" | "user";

// Search and filter types
export type SearchType =
  | "all"
  | "songs"
  | "albums"
  | "artists"
  | "playlists"
  | "users";
export type SortBy =
  | "relevance"
  | "popularity"
  | "newest"
  | "oldest"
  | "alphabetical"
  | "duration";

// Playlist types
export type PlaylistSortBy =
  | "name"
  | "created"
  | "updated"
  | "duration"
  | "songs";
export type PlaylistFilterBy = "all" | "owned" | "liked" | "collaborative";
export type PlaylistRole = "editor" | "viewer" | "admin";
export type CollaboratorStatus = "pending" | "accepted" | "declined";

// UI component types
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
export type ModalType =
  | "login"
  | "signup"
  | "playlist"
  | "settings"
  | "search"
  | "confirm"
  | "custom";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

// Form validation types
export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: any) => boolean | string;
};

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;

// API types
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type ApiStatus = "idle" | "loading" | "success" | "error";

// File types
export type FileType = "image" | "audio" | "video" | "document";
export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "svg" | "gif";

// Gender types
export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

// OAuth provider types
export type OAuthProviderId =
  | "google"
  | "facebook"
  | "apple"
  | "spotify"
  | "twitter";

// Recommendation types
export type RecommendationReason =
  | "liked_artist"
  | "liked_genre"
  | "similar_users"
  | "trending"
  | "new_release"
  | "mood_based"
  | "collaborative_filtering";

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Timestamp;
  path?: string;
  stack?: string;
}

// Metadata types
export interface Metadata {
  [key: string]: any;
}

export interface SocialLinks {
  instagram?: URL;
  twitter?: URL;
  facebook?: URL;
  tiktok?: URL;
  youtube?: URL;
  spotify?: URL;
  apple?: URL;
}

// Location types
export interface Location {
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

// Pagination types
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Generic async state
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch?: Timestamp;
}

// Generic form state
export interface FormState<T> {
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

// File upload types
export interface FileUpload {
  file: File;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  url?: string;
}

// Event types
export interface EventHandler<T = any> {
  (event: T): void;
}

export interface AsyncEventHandler<T = any> {
  (event: T): Promise<void>;
}
