import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Playlist,
  PlaylistSong,
  PlaylistSortBy,
  PlaylistFilterBy,
} from "@/types";

interface PlaylistState {
  // Current playlists
  userPlaylists: Playlist[];
  likedPlaylists: Playlist[];
  recentPlaylists: Playlist[];
  featuredPlaylists: Playlist[];

  // Current viewing playlist
  currentPlaylist: Playlist | null;
  currentPlaylistSongs: PlaylistSong[];

  // Playlist creation
  isCreatingPlaylist: boolean;
  createPlaylistForm: {
    name: string;
    description: string;
    isPublic: boolean;
    collaborative: boolean;
    tags: string[];
  };

  // Playlist operations
  isAddingToPlaylist: boolean;
  isRemovingFromPlaylist: boolean;
  isDeletingPlaylist: boolean;
  isUpdatingPlaylist: boolean;

  // Playlist modals
  selectedSongForPlaylist: string | null;
  showAddToPlaylistModal: boolean;
  showCreatePlaylistModal: boolean;
  showEditPlaylistModal: boolean;

  // Loading states
  isLoading: boolean;
  isLoadingPlaylists: boolean;
  isLoadingPlaylistSongs: boolean;

  // Errors
  error: string | null;

  // Sorting and filtering
  sortBy: PlaylistSortBy;
  sortOrder: "asc" | "desc";
  filterBy: PlaylistFilterBy;
}

const initialState: PlaylistState = {
  // Current playlists
  userPlaylists: [],
  likedPlaylists: [],
  recentPlaylists: [],
  featuredPlaylists: [],

  // Current viewing playlist
  currentPlaylist: null,
  currentPlaylistSongs: [],

  // Playlist creation
  isCreatingPlaylist: false,
  createPlaylistForm: {
    name: "",
    description: "",
    isPublic: true,
    collaborative: false,
    tags: [],
  },

  // Playlist operations
  isAddingToPlaylist: false,
  isRemovingFromPlaylist: false,
  isDeletingPlaylist: false,
  isUpdatingPlaylist: false,

  // Playlist modals
  selectedSongForPlaylist: null,
  showAddToPlaylistModal: false,
  showCreatePlaylistModal: false,
  showEditPlaylistModal: false,

  // Loading states
  isLoading: false,
  isLoadingPlaylists: false,
  isLoadingPlaylistSongs: false,

  // Errors
  error: null,

  // Sorting and filtering
  sortBy: "created",
  sortOrder: "desc",
  filterBy: "all",
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    // Playlist data
    setUserPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.userPlaylists = action.payload;
    },
    addUserPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.userPlaylists.unshift(action.payload);
    },
    updateUserPlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.userPlaylists.findIndex(
        (playlist) => playlist.id === action.payload.id
      );
      if (index !== -1) {
        state.userPlaylists[index] = action.payload;
      }
    },
    removeUserPlaylist: (state, action: PayloadAction<string>) => {
      state.userPlaylists = state.userPlaylists.filter(
        (playlist) => playlist.id !== action.payload
      );
    },
    setLikedPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.likedPlaylists = action.payload;
    },
    setRecentPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.recentPlaylists = action.payload;
    },
    setFeaturedPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.featuredPlaylists = action.payload;
    },

    // Current playlist
    setCurrentPlaylist: (state, action: PayloadAction<Playlist | null>) => {
      state.currentPlaylist = action.payload;
    },
    setCurrentPlaylistSongs: (state, action: PayloadAction<PlaylistSong[]>) => {
      state.currentPlaylistSongs = action.payload;
    },
    addSongToCurrentPlaylist: (state, action: PayloadAction<PlaylistSong>) => {
      state.currentPlaylistSongs.push(action.payload);
      if (state.currentPlaylist) {
        state.currentPlaylist.songCount += 1;
        state.currentPlaylist.totalDuration +=
          action.payload.song?.duration || 0;
      }
    },
    removeSongFromCurrentPlaylist: (state, action: PayloadAction<string>) => {
      const songIndex = state.currentPlaylistSongs.findIndex(
        (song) => song.id === action.payload
      );
      if (songIndex !== -1) {
        const removedSong = state.currentPlaylistSongs[songIndex];
        state.currentPlaylistSongs.splice(songIndex, 1);
        if (state.currentPlaylist) {
          state.currentPlaylist.songCount -= 1;
          state.currentPlaylist.totalDuration -=
            removedSong.song?.duration || 0;
        }
      }
    },
    reorderPlaylistSongs: (
      state,
      action: PayloadAction<{
        startIndex: number;
        endIndex: number;
      }>
    ) => {
      const { startIndex, endIndex } = action.payload;
      const [reorderedItem] = state.currentPlaylistSongs.splice(startIndex, 1);
      state.currentPlaylistSongs.splice(endIndex, 0, reorderedItem);

      // Update positions
      state.currentPlaylistSongs.forEach((song, index) => {
        song.position = index;
      });
    },

    // Playlist creation form
    updateCreatePlaylistForm: (
      state,
      action: PayloadAction<
        Partial<{
          name: string;
          description: string;
          isPublic: boolean;
          collaborative: boolean;
          tags: string[];
        }>
      >
    ) => {
      state.createPlaylistForm = {
        ...state.createPlaylistForm,
        ...action.payload,
      };
    },
    resetCreatePlaylistForm: (state) => {
      state.createPlaylistForm = {
        name: "",
        description: "",
        isPublic: true,
        collaborative: false,
        tags: [],
      };
    },

    // Modal controls
    setSelectedSongForPlaylist: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.selectedSongForPlaylist = action.payload;
    },
    showAddToPlaylistModal: (state, action: PayloadAction<string>) => {
      state.selectedSongForPlaylist = action.payload;
      state.showAddToPlaylistModal = true;
    },
    hideAddToPlaylistModal: (state) => {
      state.showAddToPlaylistModal = false;
      state.selectedSongForPlaylist = null;
    },
    showCreatePlaylistModal: (state) => {
      state.showCreatePlaylistModal = true;
    },
    hideCreatePlaylistModal: (state) => {
      state.showCreatePlaylistModal = false;
    },
    showEditPlaylistModal: (state) => {
      state.showEditPlaylistModal = true;
    },
    hideEditPlaylistModal: (state) => {
      state.showEditPlaylistModal = false;
    },

    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoadingPlaylists: (state, action: PayloadAction<boolean>) => {
      state.isLoadingPlaylists = action.payload;
    },
    setLoadingPlaylistSongs: (state, action: PayloadAction<boolean>) => {
      state.isLoadingPlaylistSongs = action.payload;
    },
    setCreatingPlaylist: (state, action: PayloadAction<boolean>) => {
      state.isCreatingPlaylist = action.payload;
    },
    setAddingToPlaylist: (state, action: PayloadAction<boolean>) => {
      state.isAddingToPlaylist = action.payload;
    },
    setRemovingFromPlaylist: (state, action: PayloadAction<boolean>) => {
      state.isRemovingFromPlaylist = action.payload;
    },
    setDeletingPlaylist: (state, action: PayloadAction<boolean>) => {
      state.isDeletingPlaylist = action.payload;
    },
    setUpdatingPlaylist: (state, action: PayloadAction<boolean>) => {
      state.isUpdatingPlaylist = action.payload;
    },

    // Error handling
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Sorting and filtering
    setSortBy: (
      state,
      action: PayloadAction<
        "name" | "created" | "updated" | "duration" | "songs"
      >
    ) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
    },
    setFilterBy: (
      state,
      action: PayloadAction<"all" | "owned" | "liked" | "collaborative">
    ) => {
      state.filterBy = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },

    // Utility actions
    clearPlaylists: (state) => {
      state.userPlaylists = [];
      state.likedPlaylists = [];
      state.recentPlaylists = [];
      state.featuredPlaylists = [];
      state.currentPlaylist = null;
      state.currentPlaylistSongs = [];
    },
  },
});

export const {
  // Playlist data
  setUserPlaylists,
  addUserPlaylist,
  updateUserPlaylist,
  removeUserPlaylist,
  setLikedPlaylists,
  setRecentPlaylists,
  setFeaturedPlaylists,

  // Current playlist
  setCurrentPlaylist,
  setCurrentPlaylistSongs,
  addSongToCurrentPlaylist,
  removeSongFromCurrentPlaylist,
  reorderPlaylistSongs,

  // Playlist creation form
  updateCreatePlaylistForm,
  resetCreatePlaylistForm,

  // Modal controls
  setSelectedSongForPlaylist,
  showAddToPlaylistModal,
  hideAddToPlaylistModal,
  showCreatePlaylistModal,
  hideCreatePlaylistModal,
  showEditPlaylistModal,
  hideEditPlaylistModal,

  // Loading states
  setLoading,
  setLoadingPlaylists,
  setLoadingPlaylistSongs,
  setCreatingPlaylist,
  setAddingToPlaylist,
  setRemovingFromPlaylist,
  setDeletingPlaylist,
  setUpdatingPlaylist,

  // Error handling
  setError,
  clearError,

  // Sorting and filtering
  setSortBy,
  setSortOrder,
  setFilterBy,
  toggleSortOrder,

  // Utility actions
  clearPlaylists,
} = playlistSlice.actions;

export default playlistSlice.reducer;
