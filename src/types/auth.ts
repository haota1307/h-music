import { User, UserProfile, UserSubscription } from "./user";

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  username?: string;
  displayName?: string;
  agreeToTerms: boolean;
  subscribeToNewsletter?: boolean;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  username?: string;
  bio?: string;
  avatar?: File | string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  country?: string;
  city?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
}

// OAuth provider types
export interface OAuthProvider {
  id: "google" | "facebook" | "apple" | "spotify" | "twitter";
  name: string;
  icon: string;
  buttonText: string;
  color: string;
  enabled: boolean;
}

export interface OAuthProfile {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  provider: string;
  verified_email?: boolean;
}

// Session and token types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: "Bearer";
}

export interface JWTPayload {
  sub: string; // user id
  email: string;
  role: string;
  iat: number; // issued at
  exp: number; // expires at
  iss: string; // issuer
  aud: string; // audience
}

export interface Session {
  user: User;
  tokens: AuthTokens;
  isAuthenticated: boolean;
  expiresAt: string;
}

// Authentication state
export interface AuthState {
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
  isRefreshing: boolean;
  isUpdatingProfile: boolean;
  isChangingPassword: boolean;
  isResettingPassword: boolean;

  // Error states
  error: string | null;
  loginError: string | null;
  signupError: string | null;
  profileError: string | null;

  // Form states
  loginForm: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  signupForm: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    displayName: string;
    agreeToTerms: boolean;
    subscribeToNewsletter: boolean;
  };

  // Session info
  lastLoginAt?: string;
  deviceInfo?: {
    deviceType: string;
    platform: string;
    userAgent: string;
  };
}

// Authentication events
export interface AuthEvent {
  type:
    | "login"
    | "logout"
    | "signup"
    | "password_change"
    | "profile_update"
    | "token_refresh";
  userId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Email verification
export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationConfirm {
  token: string;
}

// Two-factor authentication
export interface TwoFactorSetupRequest {
  password: string;
}

export interface TwoFactorSetupResponse {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerifyRequest {
  code: string;
  backupCode?: string;
}

export interface TwoFactorDisableRequest {
  password: string;
  code?: string;
  backupCode?: string;
}

// Account deletion
export interface DeleteAccountRequest {
  password: string;
  confirmationText: string;
  reason?: string;
  feedback?: string;
}

// Social login state
export interface SocialLoginState {
  provider: string | null;
  isConnecting: boolean;
  error: string | null;
  redirectUrl?: string;
}

// Account linking
export interface LinkedAccount {
  id: string;
  provider: string;
  providerAccountId: string;
  email?: string;
  username?: string;
  displayName?: string;
  avatar?: string;
  linkedAt: string;
  lastUsedAt?: string;
  isActive: boolean;
}

export interface LinkAccountRequest {
  provider: string;
  credentials?: any;
}

export interface UnlinkAccountRequest {
  accountId: string;
  password: string;
}
