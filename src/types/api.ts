// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  version?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    field?: string;
    stack?: string;
  };
  timestamp: string;
  path?: string;
  method?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  meta?: {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filters?: Record<string, any>;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  filters?: Record<string, any>;
}

// HTTP request types
export interface RequestConfig {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  cache?: boolean;
  cacheTtl?: number;
}

export interface UploadConfig {
  file: File;
  field: string;
  data?: Record<string, any>;
  onProgress?: (progress: number) => void;
  onComplete?: (response: any) => void;
  onError?: (error: any) => void;
}

// API endpoints
export interface ApiEndpoints {
  // Authentication
  auth: {
    login: string;
    signup: string;
    logout: string;
    refresh: string;
    verify: string;
    resetPassword: string;
    changePassword: string;
    profile: string;
  };

  // Music
  music: {
    songs: string;
    albums: string;
    artists: string;
    genres: string;
    search: string;
    trending: string;
    charts: string;
    recommendations: string;
  };

  // Playlists
  playlists: {
    user: string;
    public: string;
    featured: string;
    create: string;
    update: (id: string) => string;
    delete: (id: string) => string;
    songs: (id: string) => string;
    follow: (id: string) => string;
    collaborate: (id: string) => string;
  };

  // User
  user: {
    profile: (id?: string) => string;
    preferences: string;
    subscription: string;
    activity: string;
    following: string;
    followers: string;
    library: string;
  };

  // Social
  social: {
    follow: (id: string) => string;
    unfollow: (id: string) => string;
    like: (type: string, id: string) => string;
    unlike: (type: string, id: string) => string;
    comment: (type: string, id: string) => string;
    share: (type: string, id: string) => string;
  };

  // Admin
  admin: {
    users: string;
    content: string;
    analytics: string;
    reports: string;
    settings: string;
  };

  // Upload
  upload: {
    image: string;
    audio: string;
    document: string;
  };
}

// Search API types
export interface SearchRequest {
  query: string;
  type?: "all" | "songs" | "albums" | "artists" | "playlists" | "users";
  filters?: {
    genre?: string[];
    year?: { min?: number; max?: number };
    duration?: { min?: number; max?: number };
    explicit?: boolean;
    verified?: boolean;
  };
  pagination?: PaginationParams;
}

export interface SearchResponse {
  songs?: PaginatedResponse<any>;
  albums?: PaginatedResponse<any>;
  artists?: PaginatedResponse<any>;
  playlists?: PaginatedResponse<any>;
  users?: PaginatedResponse<any>;
  suggestions?: string[];
  query: string;
  totalResults: number;
  searchTime: number;
}

// Analytics API types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  timestamp?: string;
  page?: string;
  referrer?: string;
  userAgent?: string;
}

export interface AnalyticsResponse {
  events: AnalyticsEvent[];
  metrics: {
    totalEvents: number;
    uniqueUsers: number;
    avgSessionDuration: number;
    bounceRate: number;
    topPages: Array<{ page: string; views: number }>;
    topEvents: Array<{ event: string; count: number }>;
  };
  timeRange: {
    start: string;
    end: string;
  };
}

// File upload types
export interface UploadResponse {
  success: boolean;
  file: {
    id: string;
    filename: string;
    originalName: string;
    mimetype: string;
    size: number;
    url: string;
    thumbnailUrl?: string;
    metadata?: Record<string, any>;
  };
  uploadedAt: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
  speed?: number;
  timeRemaining?: number;
}

// Streaming API types
export interface StreamRequest {
  songId: string;
  quality?: "low" | "normal" | "high" | "lossless";
  startTime?: number;
  device?: string;
  sessionId?: string;
}

export interface StreamResponse {
  url: string;
  format: string;
  quality: string;
  duration: number;
  expires: string;
  metadata?: {
    bitrate: number;
    sampleRate: number;
    channels: number;
    codec: string;
  };
}

// Payment API types
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "succeeded" | "failed" | "cancelled";
  clientSecret: string;
  paymentMethod?: string;
  metadata?: Record<string, any>;
}

export interface SubscriptionRequest {
  plan: "premium" | "family" | "student";
  paymentMethodId: string;
  couponCode?: string;
}

export interface SubscriptionResponse {
  subscription: {
    id: string;
    status: string;
    currentPeriodEnd: string;
    plan: string;
    amount: number;
    currency: string;
  };
  invoice?: {
    id: string;
    amount: number;
    status: string;
    hostedInvoiceUrl: string;
  };
}

// WebSocket API types
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: string;
  id?: string;
}

export interface WebSocketEvent {
  event: "connect" | "disconnect" | "message" | "error";
  data?: any;
  error?: string;
}

// Rate limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// API versioning
export interface ApiVersion {
  version: string;
  deprecated?: boolean;
  deprecationDate?: string;
  supportedUntil?: string;
  migrationGuide?: string;
}
