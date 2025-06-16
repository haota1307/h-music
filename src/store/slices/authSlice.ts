import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserProfile, UserSubscription } from "@/types";

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  subscription: UserSubscription | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  // Loading states
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isLoggingOut: boolean;
  isUpdatingProfile: boolean;

  // Errors
  error: string | null;
  loginError: string | null;
  signupError: string | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  subscription: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  // Loading states
  isLoggingIn: false,
  isSigningUp: false,
  isLoggingOut: false,
  isUpdatingProfile: false,

  // Errors
  error: null,
  loginError: null,
  signupError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
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
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    setSubscription: (state, action: PayloadAction<UserSubscription>) => {
      state.subscription = action.payload;
    },
    updateSubscription: (
      state,
      action: PayloadAction<Partial<UserSubscription>>
    ) => {
      if (state.subscription) {
        state.subscription = { ...state.subscription, ...action.payload };
      }
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setLoggingIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
    setSigningUp: (state, action: PayloadAction<boolean>) => {
      state.isSigningUp = action.payload;
    },
    setLoggingOut: (state, action: PayloadAction<boolean>) => {
      state.isLoggingOut = action.payload;
    },
    setUpdatingProfile: (state, action: PayloadAction<boolean>) => {
      state.isUpdatingProfile = action.payload;
    },
    setLoginError: (state, action: PayloadAction<string | null>) => {
      state.loginError = action.payload;
    },
    setSignupError: (state, action: PayloadAction<string | null>) => {
      state.signupError = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setProfile,
  setSubscription,
  setLoading,
  setError,
  clearError,
  updateSubscription,
  setInitialized,
  setLoggingIn,
  setSigningUp,
  setLoggingOut,
  setUpdatingProfile,
  setLoginError,
  setSignupError,
} = authSlice.actions;

export default authSlice.reducer;
