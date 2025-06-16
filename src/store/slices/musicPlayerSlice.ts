import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song, AudioQuality } from "@/types";

export interface MusicPlayerState {
  currentSong: Song | null;
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  isShuffled: boolean;
  repeatMode: "off" | "all" | "one";
  crossfadeEnabled: boolean;
  audioQuality: AudioQuality;
  error: string | null;
}

const initialState: MusicPlayerState = {
  currentSong: null,
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  isPaused: false,
  isLoading: false,
  volume: 0.8,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  isShuffled: false,
  repeatMode: "off",
  crossfadeEnabled: false,
  audioQuality: "high",
  error: null,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    // Playback Control
    playSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.isPaused = false;
      state.error = null;
    },
    playQueue: (
      state,
      action: PayloadAction<{ songs: Song[]; startIndex?: number }>
    ) => {
      state.queue = action.payload.songs;
      state.currentIndex = action.payload.startIndex || 0;
      state.currentSong = state.queue[state.currentIndex];
      state.isPlaying = true;
      state.isPaused = false;
      state.error = null;
    },
    pause: (state) => {
      state.isPlaying = false;
      state.isPaused = true;
    },
    resume: (state) => {
      state.isPlaying = true;
      state.isPaused = false;
    },
    stop: (state) => {
      state.isPlaying = false;
      state.isPaused = false;
      state.currentTime = 0;
    },

    // Queue Management
    addToQueue: (state, action: PayloadAction<Song>) => {
      state.queue.push(action.payload);
    },
    addToQueueNext: (state, action: PayloadAction<Song>) => {
      state.queue.splice(state.currentIndex + 1, 0, action.payload);
    },
    removeFromQueue: (state, action: PayloadAction<number>) => {
      state.queue.splice(action.payload, 1);
      if (action.payload < state.currentIndex) {
        state.currentIndex--;
      } else if (
        action.payload === state.currentIndex &&
        state.queue.length > 0
      ) {
        if (state.currentIndex >= state.queue.length) {
          state.currentIndex = 0;
        }
        state.currentSong = state.queue[state.currentIndex];
      }
    },
    clearQueue: (state) => {
      state.queue = [];
      state.currentIndex = 0;
      state.currentSong = null;
      state.isPlaying = false;
      state.isPaused = false;
    },
    shuffleQueue: (state) => {
      if (state.queue.length > 1) {
        const currentSong = state.currentSong;
        const shuffled = [...state.queue];

        // Fisher-Yates shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Ensure current song stays at current position
        if (currentSong) {
          const currentSongIndex = shuffled.findIndex(
            (song) => song.id === currentSong.id
          );
          if (currentSongIndex !== -1) {
            [shuffled[state.currentIndex], shuffled[currentSongIndex]] = [
              shuffled[currentSongIndex],
              shuffled[state.currentIndex],
            ];
          }
        }

        state.queue = shuffled;
        state.isShuffled = true;
      }
    },

    // Navigation
    nextSong: (state) => {
      if (state.queue.length === 0) return;

      if (state.repeatMode === "one") {
        // Stay on current song
        return;
      }

      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex++;
      } else if (state.repeatMode === "all") {
        state.currentIndex = 0;
      } else {
        // End of queue
        state.isPlaying = false;
        state.isPaused = false;
        return;
      }

      state.currentSong = state.queue[state.currentIndex];
      state.currentTime = 0;
    },
    previousSong: (state) => {
      if (state.queue.length === 0) return;

      if (state.currentTime > 3) {
        // If more than 3 seconds played, restart current song
        state.currentTime = 0;
        return;
      }

      if (state.currentIndex > 0) {
        state.currentIndex--;
      } else if (state.repeatMode === "all") {
        state.currentIndex = state.queue.length - 1;
      } else {
        // Beginning of queue, restart current song
        state.currentTime = 0;
        return;
      }

      state.currentSong = state.queue[state.currentIndex];
      state.currentTime = 0;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.queue.length) {
        state.currentIndex = action.payload;
        state.currentSong = state.queue[state.currentIndex];
        state.currentTime = 0;
      }
    },

    // Audio Settings
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = Math.max(0, Math.min(1, action.payload));
      if (state.volume > 0) {
        state.isMuted = false;
      }
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },

    // Playback Modes
    toggleShuffle: (state) => {
      state.isShuffled = !state.isShuffled;
    },
    setRepeatMode: (state, action: PayloadAction<"off" | "all" | "one">) => {
      state.repeatMode = action.payload;
    },
    toggleCrossfade: (state) => {
      state.crossfadeEnabled = !state.crossfadeEnabled;
    },
    setAudioQuality: (
      state,
      action: PayloadAction<"low" | "normal" | "high" | "lossless">
    ) => {
      state.audioQuality = action.payload;
    },

    // Loading and Error States
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  playSong,
  playQueue,
  pause,
  resume,
  stop,
  addToQueue,
  addToQueueNext,
  removeFromQueue,
  clearQueue,
  shuffleQueue,
  nextSong,
  previousSong,
  setCurrentIndex,
  setVolume,
  toggleMute,
  setCurrentTime,
  setDuration,
  toggleShuffle,
  setRepeatMode,
  toggleCrossfade,
  setAudioQuality,
  setLoading,
  setError,
  clearError,
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
