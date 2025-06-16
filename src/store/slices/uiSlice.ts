import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  // Layout
  isSidebarOpen: boolean;
  isMiniPlayer: boolean;
  isFullscreenPlayer: boolean;

  // Modals
  isLoginModalOpen: boolean;
  isSignupModalOpen: boolean;
  isPlaylistModalOpen: boolean;
  isSettingsModalOpen: boolean;
  isSearchModalOpen: boolean;

  // Theme
  theme: "light" | "dark" | "system";

  // Notifications
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    title: string;
    message?: string;
    duration?: number;
  }>;

  // Loading states
  isLoading: boolean;
  loadingMessage?: string;

  // Search
  searchQuery: string;
  searchResults: any[];
  isSearching: boolean;

  // Error handling
  error: string | null;
}

const initialState: UIState = {
  // Layout
  isSidebarOpen: true,
  isMiniPlayer: false,
  isFullscreenPlayer: false,

  // Modals
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  isPlaylistModalOpen: false,
  isSettingsModalOpen: false,
  isSearchModalOpen: false,

  // Theme
  theme: "dark",

  // Notifications
  notifications: [],

  // Loading
  isLoading: false,
  loadingMessage: undefined,

  // Search
  searchQuery: "",
  searchResults: [],
  isSearching: false,

  // Error
  error: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Layout
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleMiniPlayer: (state) => {
      state.isMiniPlayer = !state.isMiniPlayer;
    },
    setMiniPlayer: (state, action: PayloadAction<boolean>) => {
      state.isMiniPlayer = action.payload;
    },
    toggleFullscreenPlayer: (state) => {
      state.isFullscreenPlayer = !state.isFullscreenPlayer;
    },
    setFullscreenPlayer: (state, action: PayloadAction<boolean>) => {
      state.isFullscreenPlayer = action.payload;
    },

    // Modals
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
      state.isSignupModalOpen = false;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    openSignupModal: (state) => {
      state.isSignupModalOpen = true;
      state.isLoginModalOpen = false;
    },
    closeSignupModal: (state) => {
      state.isSignupModalOpen = false;
    },
    openPlaylistModal: (state) => {
      state.isPlaylistModalOpen = true;
    },
    closePlaylistModal: (state) => {
      state.isPlaylistModalOpen = false;
    },
    openSettingsModal: (state) => {
      state.isSettingsModalOpen = true;
    },
    closeSettingsModal: (state) => {
      state.isSettingsModalOpen = false;
    },
    openSearchModal: (state) => {
      state.isSearchModalOpen = true;
    },
    closeSearchModal: (state) => {
      state.isSearchModalOpen = false;
    },
    closeAllModals: (state) => {
      state.isLoginModalOpen = false;
      state.isSignupModalOpen = false;
      state.isPlaylistModalOpen = false;
      state.isSettingsModalOpen = false;
      state.isSearchModalOpen = false;
    },

    // Theme
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    // Notifications
    addNotification: (
      state,
      action: PayloadAction<{
        type: "success" | "error" | "warning" | "info";
        title: string;
        message?: string;
        duration?: number;
      }>
    ) => {
      const notification = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (!action.payload) {
        state.loadingMessage = undefined;
      }
    },
    setLoadingMessage: (state, action: PayloadAction<string>) => {
      state.loadingMessage = action.payload;
      state.isLoading = true;
    },

    // Search
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    },
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
      state.isSearching = false;
    },

    // Error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  // Layout
  toggleSidebar,
  setSidebarOpen,
  toggleMiniPlayer,
  setMiniPlayer,
  toggleFullscreenPlayer,
  setFullscreenPlayer,

  // Modals
  openLoginModal,
  closeLoginModal,
  openSignupModal,
  closeSignupModal,
  openPlaylistModal,
  closePlaylistModal,
  openSettingsModal,
  closeSettingsModal,
  openSearchModal,
  closeSearchModal,
  closeAllModals,

  // Theme
  setTheme,
  toggleTheme,

  // Notifications
  addNotification,
  removeNotification,
  clearNotifications,

  // Loading
  setLoading,
  setLoadingMessage,

  // Search
  setSearchQuery,
  setSearchResults,
  setSearching,
  clearSearch,

  // Error
  setError,
  clearError,
} = uiSlice.actions;

export default uiSlice.reducer;
