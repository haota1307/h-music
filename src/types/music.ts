// Music content types
export interface Song {
  id: string;
  title: string;
  duration: number; // in seconds
  trackNumber?: number;
  discNumber?: number;
  year?: number;
  isrc?: string;
  explicit: boolean;

  // File information
  audioUrl: string;
  audioFormat: "mp3" | "flac" | "wav" | "aac" | "ogg";
  audioQuality: "low" | "normal" | "high" | "lossless";
  fileSize: number; // in bytes
  bitrate?: number;
  sampleRate?: number;

  // Relationships
  albumId?: string;
  labelId?: string;

  // Metadata
  lyrics?: string;
  description?: string;
  language?: string;
  mood?: string[];
  tags?: string[];

  // Statistics
  playCount: number;
  likeCount: number;
  shareCount: number;
  downloadCount: number;

  // Dates
  releaseDate?: string;
  createdAt: string;
  updatedAt: string;

  // Status
  isPublic: boolean;
  isActive: boolean;
  isFeatured: boolean;

  // Populated relationships
  album?: Album;
  artists?: ArtistProfile[];
  genres?: Genre[];
  label?: Label;
  audioFeatures?: AudioFeatures;
}

export interface Album {
  id: string;
  title: string;
  description?: string;
  albumType: "album" | "single" | "ep" | "compilation";

  // Media
  coverImage?: string;
  coverImageLarge?: string;
  coverImageSmall?: string;

  // Relationships
  labelId?: string;

  // Metadata
  year?: number;
  upc?: string;
  totalTracks: number;
  totalDiscs: number;
  language?: string;

  // Statistics
  playCount: number;
  likeCount: number;
  shareCount: number;

  // Dates
  releaseDate?: string;
  createdAt: string;
  updatedAt: string;

  // Status
  isPublic: boolean;
  isActive: boolean;
  isFeatured: boolean;

  // Populated relationships
  artists?: ArtistProfile[];
  songs?: Song[];
  genres?: Genre[];
  label?: Label;
}

export interface ArtistProfile {
  id: string;
  name: string;
  bio?: string;

  // Media
  profileImage?: string;
  coverImage?: string;

  // Social
  website?: string;
  socialLinks?: {
    spotify?: string;
    apple?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
  };

  // Metadata
  country?: string;
  city?: string;
  genres?: string[];
  yearsActive?: string;
  recordLabel?: string;

  // Verification
  isVerified: boolean;
  verificationBadge?: "blue" | "gold" | "platinum";

  // Statistics
  followerCount: number;
  monthlyListeners: number;
  totalPlays: number;

  // Dates
  createdAt: string;
  updatedAt: string;

  // Status
  isActive: boolean;

  // Populated relationships
  songs?: Song[];
  albums?: Album[];
  featuredSongs?: Song[];
}

export interface Genre {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parentGenreId?: string;

  // Statistics
  songCount: number;
  artistCount: number;
  albumCount: number;

  // Status
  isActive: boolean;
  isFeatured: boolean;

  // Dates
  createdAt: string;
  updatedAt: string;

  // Relationships
  parentGenre?: Genre;
  subGenres?: Genre[];
}

export interface Label {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  country?: string;
  foundedYear?: number;

  // Contact
  contactEmail?: string;
  contactPhone?: string;
  address?: string;

  // Statistics
  artistCount: number;
  albumCount: number;
  songCount: number;

  // Status
  isActive: boolean;
  isVerified: boolean;

  // Dates
  createdAt: string;
  updatedAt: string;

  // Relationships
  artists?: ArtistProfile[];
  albums?: Album[];
  songs?: Song[];
}

export interface AudioFeatures {
  id: string;
  songId: string;

  // Spotify-like audio features
  acousticness: number; // 0.0 to 1.0
  danceability: number; // 0.0 to 1.0
  energy: number; // 0.0 to 1.0
  instrumentalness: number; // 0.0 to 1.0
  liveness: number; // 0.0 to 1.0
  loudness: number; // typically -60 to 0 db
  speechiness: number; // 0.0 to 1.0
  valence: number; // 0.0 to 1.0 (positive/negative)
  tempo: number; // BPM

  // Musical attributes
  key: number; // 0-11 (C, C#, D, etc.)
  mode: number; // 0 = minor, 1 = major
  timeSignature: number; // 3, 4, 5, 6, 7

  // Additional features
  popularity: number; // 0-100

  createdAt: string;
  updatedAt: string;
}

export interface SongArtist {
  id: string;
  songId: string;
  artistId: string;
  role: "primary" | "featured" | "producer" | "writer" | "composer";
  order: number;

  // Populated relationships
  song?: Song;
  artist?: ArtistProfile;
}

export interface AlbumArtist {
  id: string;
  albumId: string;
  artistId: string;
  role: "primary" | "featured" | "producer" | "various";
  order: number;

  // Populated relationships
  album?: Album;
  artist?: ArtistProfile;
}

// Charts and trending
export interface Chart {
  id: string;
  name: string;
  description?: string;
  chartType:
    | "global"
    | "country"
    | "genre"
    | "mood"
    | "new_releases"
    | "trending";
  country?: string;
  genre?: string;
  period: "daily" | "weekly" | "monthly" | "yearly";

  // Metadata
  isActive: boolean;
  isOfficial: boolean;

  // Dates
  createdAt: string;
  updatedAt: string;

  // Relationships
  entries?: ChartEntry[];
}

export interface ChartEntry {
  id: string;
  chartId: string;
  songId: string;
  position: number;
  previousPosition?: number;
  peakPosition: number;
  weeksOnChart: number;
  trend: "up" | "down" | "same" | "new";

  // Period
  chartDate: string;

  // Populated relationships
  chart?: Chart;
  song?: Song;
}

// Recommendations and discovery
export interface Recommendation {
  id: string;
  userId: string;
  songId: string;
  reason:
    | "liked_artist"
    | "liked_genre"
    | "similar_users"
    | "trending"
    | "new_release"
    | "mood_based"
    | "collaborative_filtering";
  score: number; // 0.0 to 1.0
  metadata?: Record<string, any>;

  // Status
  isViewed: boolean;
  isLiked?: boolean;
  isSkipped?: boolean;

  // Dates
  createdAt: string;
  viewedAt?: string;

  // Populated relationships
  song?: Song;
}
