// UI state and component types
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  persistent?: boolean;
}

export interface Modal {
  id: string;
  type:
    | "login"
    | "signup"
    | "playlist"
    | "settings"
    | "search"
    | "confirm"
    | "custom";
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closable?: boolean;
  backdrop?: "static" | "clickable";
  data?: any;
}

export interface Theme {
  name: string;
  mode: "light" | "dark";
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  gradients?: {
    primary: string;
    secondary: string;
    hero: string;
  };
  shadows?: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface SearchFilters {
  type: "all" | "songs" | "albums" | "artists" | "playlists" | "users";
  genre?: string[];
  year?: {
    min?: number;
    max?: number;
  };
  duration?: {
    min?: number; // seconds
    max?: number; // seconds
  };
  explicit?: boolean;
  verified?: boolean;
  sortBy?: "relevance" | "popularity" | "newest" | "oldest" | "alphabetical";
  sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  type: "song" | "album" | "artist" | "playlist" | "user";
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  badge?: string;
  metadata?: Record<string, any>;
  url?: string;
}

export interface SearchSuggestion {
  id: string;
  query: string;
  type: "history" | "trending" | "suggestion";
  count?: number;
}

// Layout and navigation
export interface LayoutState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  playerOpen: boolean;
  playerExpanded: boolean;
  headerVisible: boolean;
  footerVisible: boolean;
  chatOpen?: boolean;
  queueOpen?: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  badge?: string | number;
  active?: boolean;
  children?: NavigationItem[];
  onClick?: () => void;
  external?: boolean;
}

// Player UI
export interface PlayerVisualization {
  type: "bars" | "circle" | "wave" | "spectrum";
  enabled: boolean;
  color?: string;
  sensitivity?: number;
  smoothing?: number;
}

export interface PlayerLayout {
  compact: boolean;
  showAlbumArt: boolean;
  showLyrics: boolean;
  showQueue: boolean;
  showVisualizer: boolean;
  position: "bottom" | "sidebar" | "overlay";
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
  indeterminate?: boolean;
}

export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch?: string;
}

// Form states
export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
  dirty: boolean;
  valid: boolean;
}

export interface FormState<T = Record<string, any>> {
  fields: Record<keyof T, FormField>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Toast notifications
export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info" | "loading";
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  dismissible?: boolean;
}

// Context menu
export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  submenu?: ContextMenuItem[];
  onClick?: () => void;
  danger?: boolean;
}

export interface ContextMenu {
  id: string;
  items: ContextMenuItem[];
  position: {
    x: number;
    y: number;
  };
  targetId?: string;
  visible: boolean;
}

// Drag and drop
export interface DragItem {
  id: string;
  type: "song" | "album" | "artist" | "playlist";
  data: any;
}

export interface DropZone {
  id: string;
  accepts: string[];
  active: boolean;
  hovered: boolean;
}

// Responsive breakpoints
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveState {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

// Animation states
export interface AnimationState {
  isAnimating: boolean;
  direction?: "in" | "out";
  duration?: number;
  easing?: string;
}

// Keyboard shortcuts
export interface KeyboardShortcut {
  id: string;
  keys: string[];
  description: string;
  action: () => void;
  global?: boolean;
  disabled?: boolean;
}
