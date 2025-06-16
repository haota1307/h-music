// API Base URLs
export const API_BASE_URL = "/api";

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  SIGNIN: `${API_BASE_URL}/auth/signin`,
  SIGNOUT: `${API_BASE_URL}/auth/signout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
} as const;

// User Endpoints
export const USER_ENDPOINTS = {
  PROFILE: `${API_BASE_URL}/user/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/user/profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/user/change-password`,
  UPLOAD_AVATAR: `${API_BASE_URL}/user/upload-avatar`,
  SUBSCRIPTION: `${API_BASE_URL}/user/subscription`,
} as const;

// Music Endpoints
export const MUSIC_ENDPOINTS = {
  SEARCH: `${API_BASE_URL}/music/search`,
  TRACKS: `${API_BASE_URL}/music/tracks`,
  ALBUMS: `${API_BASE_URL}/music/albums`,
  ARTISTS: `${API_BASE_URL}/music/artists`,
  PLAYLISTS: `${API_BASE_URL}/music/playlists`,
  CHARTS: `${API_BASE_URL}/music/charts`,
  GENRES: `${API_BASE_URL}/music/genres`,
  FAVORITES: `${API_BASE_URL}/music/favorites`,
  RECENTLY_PLAYED: `${API_BASE_URL}/music/recently-played`,
} as const;

// Playlist Endpoints
export const PLAYLIST_ENDPOINTS = {
  CREATE: `${API_BASE_URL}/playlists`,
  LIST: `${API_BASE_URL}/playlists`,
  DETAIL: (id: string) => `${API_BASE_URL}/playlists/${id}`,
  UPDATE: (id: string) => `${API_BASE_URL}/playlists/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/playlists/${id}`,
  ADD_TRACK: (id: string) => `${API_BASE_URL}/playlists/${id}/tracks`,
  REMOVE_TRACK: (id: string, trackId: string) =>
    `${API_BASE_URL}/playlists/${id}/tracks/${trackId}`,
} as const;

// Admin Endpoints
export const ADMIN_ENDPOINTS = {
  USERS: `${API_BASE_URL}/admin/users`,
  ANALYTICS: `${API_BASE_URL}/admin/analytics`,
  CONTENT_MANAGEMENT: `${API_BASE_URL}/admin/content`,
} as const;
