import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import authSlice from "@/store/slices/authSlice";
import musicPlayerSlice from "@/store/slices/musicPlayerSlice";
import playlistSlice from "@/store/slices/playlistSlice";
import uiSlice from "@/store/slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    musicPlayer: musicPlayerSlice,
    ui: uiSlice,
    playlist: playlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
