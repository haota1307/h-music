import { Song, ArtistProfile } from "./music";
import { User } from "./user";

// Playlist types
export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  isPublic: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  songCount: number;
  totalDuration: number;
  collaborative: boolean;
  followerCount: number;
  tags: string[];

  // Populated relationships
  owner?: User;
  songs?: PlaylistSong[];
  collaborators?: PlaylistCollaborator[];
  followers?: PlaylistFollower[];
}

export interface PlaylistSong {
  id: string;
  playlistId: string;
  songId: string;
  addedAt: string;
  addedBy: string;
  position: number;

  // Populated relationships
  playlist?: Playlist;
  song?: Song;
  addedByUser?: User;
}

export interface PlaylistCollaborator {
  id: string;
  playlistId: string;
  userId: string;
  role: "editor" | "viewer" | "admin";
  permissions: {
    canAddSongs: boolean;
    canRemoveSongs: boolean;
    canReorderSongs: boolean;
    canEditDetails: boolean;
    canInviteOthers: boolean;
    canRemoveOthers: boolean;
  };
  invitedAt: string;
  acceptedAt?: string;
  invitedBy: string;

  // Status
  status: "pending" | "accepted" | "declined";

  // Populated relationships
  playlist?: Playlist;
  user?: User;
  invitedByUser?: User;
}

export interface PlaylistFollower {
  id: string;
  playlistId: string;
  userId: string;
  followedAt: string;

  // Notifications
  notifyOnUpdate: boolean;

  // Populated relationships
  playlist?: Playlist;
  user?: User;
}

export interface PlaylistGenre {
  id: string;
  playlistId: string;
  genreId: string;

  // Populated relationships
  playlist?: Playlist;
  genre?: {
    id: string;
    name: string;
    color?: string;
  };
}

// Playlist creation and editing
export interface CreatePlaylistRequest {
  name: string;
  description?: string;
  isPublic: boolean;
  collaborative: boolean;
  tags?: string[];
  coverImage?: File | string;
}

export interface UpdatePlaylistRequest {
  name?: string;
  description?: string;
  isPublic?: boolean;
  collaborative?: boolean;
  tags?: string[];
  coverImage?: File | string;
}

export interface AddSongToPlaylistRequest {
  playlistId: string;
  songId: string;
  position?: number;
}

export interface RemoveSongFromPlaylistRequest {
  playlistId: string;
  playlistSongId: string;
}

export interface ReorderPlaylistSongsRequest {
  playlistId: string;
  songIds: string[];
}

// Playlist state management
export interface PlaylistFormData {
  name: string;
  description: string;
  isPublic: boolean;
  collaborative: boolean;
  tags: string[];
  coverImage?: File | string;
}

export interface PlaylistFilters {
  sortBy: "name" | "created" | "updated" | "duration" | "songs";
  sortOrder: "asc" | "desc";
  filterBy: "all" | "owned" | "liked" | "collaborative";
  searchQuery?: string;
  genre?: string;
  tags?: string[];
}

export interface PlaylistStats {
  totalPlaylists: number;
  totalSongs: number;
  totalDuration: number;
  averageSongsPerPlaylist: number;
  mostPopularGenre?: string;
  recentActivity: PlaylistActivity[];
}

export interface PlaylistActivity {
  id: string;
  playlistId: string;
  userId: string;
  type:
    | "created"
    | "updated"
    | "song_added"
    | "song_removed"
    | "followed"
    | "unfollowed"
    | "collaborator_added";
  metadata?: {
    songId?: string;
    songTitle?: string;
    artistName?: string;
    collaboratorId?: string;
    collaboratorName?: string;
  };
  createdAt: string;

  // Populated relationships
  playlist?: Playlist;
  user?: User;
}
