// API Configuration
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
}

// Authentication
export const AUTH = {
  TOKEN_KEY: "authToken",
  REFRESH_TOKEN_KEY: "refreshToken",
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
}

// Routes
export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    OPPORTUNITIES: "/admin/opportunities",
    ARTICLES: "/admin/articles",
    EVENTS: "/admin/events",
    ALUMNI: "/admin/alumni",
  },
  OPPORTUNITIES: "/opportunities",
  ARTICLES: "/articles",
  EVENTS: "/events",
  ALUMNI: "/alumni",
  PROFILE: "/profile",
} as const

// Content Types
export const CONTENT_TYPES = {
  OPPORTUNITIES: ["internship", "competition", "scholarship"] as const,
  ARTICLES: ["career", "research", "academic", "industry"] as const,
  EVENTS: ["workshop", "seminar", "conference", "networking"] as const,
} as const

// UI Constants
export const UI = {
  BREAKPOINTS: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
  ANIMATION_DURATION: 200,
  TOAST_DURATION: 5000,
  MODAL_TRANSITION: 150,
  DEBOUNCE_DELAY: 300,
  INFINITE_SCROLL_THRESHOLD: 0.8,
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
  PAGE_SIZE_OPTIONS: [10, 25, 50],
} as const

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: {
    DATE: "MMMM d, yyyy",
    TIME: "h:mm a",
    DATETIME: "MMMM d, yyyy 'at' h:mm a",
    DEADLINE: "MMM d, yyyy",
  },
  ISO: {
    DATE: "yyyy-MM-dd",
    TIME: "HH:mm:ss",
    DATETIME: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  },
} as const

// File Upload
export const UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  IMAGE_DIMENSIONS: {
    thumbnail: { width: 100, height: 100 },
    small: { width: 300, height: 300 },
    medium: { width: 600, height: 600 },
    large: { width: 1200, height: 1200 },
  },
} as const

// Social Media
export const SOCIAL = {
  PLATFORMS: {
    TWITTER: "Twitter",
    FACEBOOK: "Facebook",
    LINKEDIN: "LinkedIn",
    INSTAGRAM: "Instagram",
  },
  SHARE_URLS: {
    TWITTER: "https://twitter.com/intent/tweet",
    FACEBOOK: "https://www.facebook.com/sharer/sharer.php",
    LINKEDIN: "https://www.linkedin.com/sharing/share-offsite",
  },
} as const

// Error Messages
export const ERROR_MESSAGES = {
  GENERAL: "An error occurred. Please try again later.",
  NETWORK: "Network error. Please check your internet connection.",
  AUTH: {
    INVALID_CREDENTIALS: "Invalid email or password",
    SESSION_EXPIRED: "Your session has expired. Please sign in again.",
    UNAUTHORIZED: "You are not authorized to perform this action",
  },
  FORM: {
    REQUIRED: "This field is required",
    INVALID_EMAIL: "Please enter a valid email address",
    INVALID_PASSWORD: "Password must be at least 8 characters long",
    PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
  },
  UPLOAD: {
    FILE_TOO_LARGE: `File size must be less than ${UPLOAD.MAX_FILE_SIZE / (1024 * 1024)}MB`,
    INVALID_FILE_TYPE: "Invalid file type",
  },
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: "Successfully signed in",
    LOGOUT: "Successfully signed out",
    REGISTER: "Account created successfully",
    PASSWORD_RESET: "Password reset email sent",
  },
  FORM: {
    SAVE: "Changes saved successfully",
    SUBMIT: "Form submitted successfully",
    DELETE: "Item deleted successfully",
  },
  UPLOAD: {
    SUCCESS: "File uploaded successfully",
  },
} as const

// Analytics Events
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  USER: {
    SIGN_IN: "user_sign_in",
    SIGN_OUT: "user_sign_out",
    REGISTER: "user_register",
  },
  CONTENT: {
    VIEW: "content_view",
    SHARE: "content_share",
    SAVE: "content_save",
    APPLY: "opportunity_apply",
  },
  INTERACTION: {
    CLICK: "click",
    SCROLL: "scroll",
    SEARCH: "search",
    FILTER: "filter",
  },
} as const

// Feature Flags
export const FEATURES = {
  DARK_MODE: true,
  COMMENTS: true,
  NOTIFICATIONS: true,
  ANALYTICS: true,
  FILE_UPLOAD: true,
  SOCIAL_SHARE: true,
  INFINITE_SCROLL: true,
} as const
