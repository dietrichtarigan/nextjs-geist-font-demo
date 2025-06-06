const STORAGE_PREFIX = "himafi_"

// Cookie utilities
export const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${STORAGE_PREFIX}${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`
}

export const getCookie = (name: string) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${STORAGE_PREFIX}${name}=`))
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null
}

export const removeCookie = (name: string) => {
  document.cookie = `${STORAGE_PREFIX}${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

// Local storage utilities
export const setLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value))
    return true
  } catch (error) {
    console.error("Local storage error:", error)
    return false
  }
}

export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error("Local storage error:", error)
    return null
  }
}

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
    return true
  } catch (error) {
    console.error("Local storage error:", error)
    return false
  }
}

// Session storage utilities
export const setSessionStorage = (key: string, value: any) => {
  try {
    sessionStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value))
    return true
  } catch (error) {
    console.error("Session storage error:", error)
    return false
  }
}

export const getSessionStorage = <T>(key: string): T | null => {
  try {
    const item = sessionStorage.getItem(`${STORAGE_PREFIX}${key}`)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error("Session storage error:", error)
    return null
  }
}

export const removeSessionStorage = (key: string) => {
  try {
    sessionStorage.removeItem(`${STORAGE_PREFIX}${key}`)
    return true
  } catch (error) {
    console.error("Session storage error:", error)
    return false
  }
}

// Clear all storage
export const clearAllStorage = () => {
  try {
    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      const key = c.split("=")[0].trim()
      if (key.startsWith(STORAGE_PREFIX)) {
        removeCookie(key.slice(STORAGE_PREFIX.length))
      }
    })

    // Clear local storage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })

    // Clear session storage
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        sessionStorage.removeItem(key)
      }
    })

    return true
  } catch (error) {
    console.error("Clear storage error:", error)
    return false
  }
}

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_DATA: "user_data",
  THEME: "theme",
  LANGUAGE: "language",
  FAVORITES: "favorites",
  NOTIFICATIONS: "notifications",
  LAST_VISIT: "last_visit",
  SEARCH_HISTORY: "search_history",
  FILTERS: "filters"
} as const

// Storage types
export type StorageKey = keyof typeof STORAGE_KEYS

// Helper to ensure type safety when getting/setting storage values
export const storage = {
  get: <T>(key: StorageKey): T | null => getLocalStorage<T>(STORAGE_KEYS[key]),
  set: <T>(key: StorageKey, value: T): boolean => setLocalStorage(STORAGE_KEYS[key], value),
  remove: (key: StorageKey): boolean => removeLocalStorage(STORAGE_KEYS[key]),
  session: {
    get: <T>(key: StorageKey): T | null => getSessionStorage<T>(STORAGE_KEYS[key]),
    set: <T>(key: StorageKey, value: T): boolean => setSessionStorage(STORAGE_KEYS[key], value),
    remove: (key: StorageKey): boolean => removeSessionStorage(STORAGE_KEYS[key])
  }
}
