import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient, { ApiError, ApiResponse } from "@/lib/axios";
import { MUSIC_ENDPOINTS, PLAYLIST_ENDPOINTS } from "@/constants/api-endpoints";

// Types
export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  imageUrl?: string;
  audioUrl: string;
  isLiked?: boolean;
  playCount: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  imageUrl?: string;
  tracks: Track[];
  releaseDate: string;
  genre?: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl?: string;
  bio?: string;
  followers: number;
  genres: string[];
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  tracks: Track[];
  isPublic: boolean;
  owner: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SearchParams {
  query: string;
  type?: "all" | "tracks" | "albums" | "artists" | "playlists";
  limit?: number;
  offset?: number;
}

export interface ChartData {
  tracks: Track[];
  period: "daily" | "weekly" | "monthly";
  country?: string;
}

// Query Keys
export const MUSIC_QUERY_KEYS = {
  SEARCH: (params: SearchParams) => ["music", "search", params],
  TRACKS: ["music", "tracks"],
  TRACK: (id: string) => ["music", "track", id],
  ALBUMS: ["music", "albums"],
  ALBUM: (id: string) => ["music", "album", id],
  ARTISTS: ["music", "artists"],
  ARTIST: (id: string) => ["music", "artist", id],
  CHARTS: (period: string) => ["music", "charts", period],
  GENRES: ["music", "genres"],
  FAVORITES: ["music", "favorites"],
  RECENTLY_PLAYED: ["music", "recently-played"],
  PLAYLISTS: ["music", "playlists"],
  PLAYLIST: (id: string) => ["music", "playlist", id],
} as const;

// Hook: Search music
export function useSearchMusic(params: SearchParams) {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.SEARCH(params),
    queryFn: async (): Promise<{
      tracks: Track[];
      albums: Album[];
      artists: Artist[];
      playlists: Playlist[];
    }> => {
      const response = await apiClient.get(MUSIC_ENDPOINTS.SEARCH, { params });
      return response.data;
    },
    enabled: !!params.query && params.query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook: Get charts
export function useCharts(period: "daily" | "weekly" | "monthly" = "weekly") {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.CHARTS(period),
    queryFn: async (): Promise<ChartData> => {
      const response = await apiClient.get(MUSIC_ENDPOINTS.CHARTS, {
        params: { period },
      });
      return response.data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook: Get track details
export function useTrack(id: string) {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.TRACK(id),
    queryFn: async (): Promise<Track> => {
      const response = await apiClient.get(`${MUSIC_ENDPOINTS.TRACKS}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

// Hook: Get album details
export function useAlbum(id: string) {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.ALBUM(id),
    queryFn: async (): Promise<Album> => {
      const response = await apiClient.get(`${MUSIC_ENDPOINTS.ALBUMS}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

// Hook: Get artist details
export function useArtist(id: string) {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.ARTIST(id),
    queryFn: async (): Promise<Artist> => {
      const response = await apiClient.get(`${MUSIC_ENDPOINTS.ARTISTS}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

// Hook: Get genres
export function useGenres() {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.GENRES,
    queryFn: async (): Promise<string[]> => {
      const response = await apiClient.get(MUSIC_ENDPOINTS.GENRES);
      return response.data;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// Hook: Get favorites
export function useFavorites() {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.FAVORITES,
    queryFn: async (): Promise<Track[]> => {
      const response = await apiClient.get(MUSIC_ENDPOINTS.FAVORITES);
      return response.data;
    },
  });
}

// Hook: Get recently played
export function useRecentlyPlayed() {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.RECENTLY_PLAYED,
    queryFn: async (): Promise<Track[]> => {
      const response = await apiClient.get(MUSIC_ENDPOINTS.RECENTLY_PLAYED);
      return response.data;
    },
  });
}

// Hook: Toggle favorite track
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      trackId,
      isLiked,
    }: {
      trackId: string;
      isLiked: boolean;
    }): Promise<ApiResponse> => {
      const method = isLiked ? "delete" : "post";
      const response = await apiClient[method](
        `${MUSIC_ENDPOINTS.FAVORITES}/${trackId}`
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update favorites cache
      queryClient.invalidateQueries({ queryKey: MUSIC_QUERY_KEYS.FAVORITES });

      // Update track cache
      queryClient.setQueryData(
        MUSIC_QUERY_KEYS.TRACK(variables.trackId),
        (old: Track | undefined) => {
          if (old) {
            return { ...old, isLiked: !variables.isLiked };
          }
          return old;
        }
      );

      toast.success(
        variables.isLiked ? "Đã bỏ thích bài hát" : "Đã thêm vào yêu thích"
      );
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Không thể thực hiện hành động này");
    },
  });
}

// Hook: Get user playlists
export function usePlaylists() {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.PLAYLISTS,
    queryFn: async (): Promise<Playlist[]> => {
      const response = await apiClient.get(PLAYLIST_ENDPOINTS.LIST);
      return response.data;
    },
  });
}

// Hook: Get playlist details
export function usePlaylist(id: string) {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.PLAYLIST(id),
    queryFn: async (): Promise<Playlist> => {
      const response = await apiClient.get(PLAYLIST_ENDPOINTS.DETAIL(id));
      return response.data;
    },
    enabled: !!id,
  });
}

// Hook: Create playlist
export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string;
      isPublic?: boolean;
    }): Promise<Playlist> => {
      const response = await apiClient.post(PLAYLIST_ENDPOINTS.CREATE, data);
      return response.data;
    },
    onSuccess: (newPlaylist) => {
      // Update playlists cache
      queryClient.setQueryData(
        MUSIC_QUERY_KEYS.PLAYLISTS,
        (old: Playlist[] | undefined) => {
          return old ? [newPlaylist, ...old] : [newPlaylist];
        }
      );

      toast.success("Tạo playlist thành công!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Tạo playlist thất bại");
    },
  });
}

// Hook: Update playlist
export function useUpdatePlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { name?: string; description?: string; isPublic?: boolean };
    }): Promise<Playlist> => {
      const response = await apiClient.put(PLAYLIST_ENDPOINTS.UPDATE(id), data);
      return response.data;
    },
    onSuccess: (updatedPlaylist) => {
      // Update playlist cache
      queryClient.setQueryData(
        MUSIC_QUERY_KEYS.PLAYLIST(updatedPlaylist.id),
        updatedPlaylist
      );

      // Update playlists list cache
      queryClient.setQueryData(
        MUSIC_QUERY_KEYS.PLAYLISTS,
        (old: Playlist[] | undefined) => {
          return (
            old?.map((playlist) =>
              playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist
            ) || []
          );
        }
      );

      toast.success("Cập nhật playlist thành công!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Cập nhật playlist thất bại");
    },
  });
}

// Hook: Delete playlist
export function useDeletePlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<ApiResponse> => {
      const response = await apiClient.delete(PLAYLIST_ENDPOINTS.DELETE(id));
      return response.data;
    },
    onSuccess: (data, playlistId) => {
      // Remove from playlists cache
      queryClient.setQueryData(
        MUSIC_QUERY_KEYS.PLAYLISTS,
        (old: Playlist[] | undefined) => {
          return old?.filter((playlist) => playlist.id !== playlistId) || [];
        }
      );

      // Remove playlist detail cache
      queryClient.removeQueries({
        queryKey: MUSIC_QUERY_KEYS.PLAYLIST(playlistId),
      });

      toast.success("Xóa playlist thành công!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Xóa playlist thất bại");
    },
  });
}

// Hook: Add track to playlist
export function useAddTrackToPlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      playlistId,
      trackId,
    }: {
      playlistId: string;
      trackId: string;
    }): Promise<ApiResponse> => {
      const response = await apiClient.post(
        PLAYLIST_ENDPOINTS.ADD_TRACK(playlistId),
        { trackId }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate playlist cache to refetch with new track
      queryClient.invalidateQueries({
        queryKey: MUSIC_QUERY_KEYS.PLAYLIST(variables.playlistId),
      });
      queryClient.invalidateQueries({ queryKey: MUSIC_QUERY_KEYS.PLAYLISTS });

      toast.success("Đã thêm bài hát vào playlist!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Không thể thêm bài hát vào playlist");
    },
  });
}

// Hook: Remove track from playlist
export function useRemoveTrackFromPlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      playlistId,
      trackId,
    }: {
      playlistId: string;
      trackId: string;
    }): Promise<ApiResponse> => {
      const response = await apiClient.delete(
        PLAYLIST_ENDPOINTS.REMOVE_TRACK(playlistId, trackId)
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate playlist cache to refetch without removed track
      queryClient.invalidateQueries({
        queryKey: MUSIC_QUERY_KEYS.PLAYLIST(variables.playlistId),
      });
      queryClient.invalidateQueries({ queryKey: MUSIC_QUERY_KEYS.PLAYLISTS });

      toast.success("Đã xóa bài hát khỏi playlist!");
    },
    onError: (error: ApiError) => {
      toast.error(error.message || "Không thể xóa bài hát khỏi playlist");
    },
  });
}
