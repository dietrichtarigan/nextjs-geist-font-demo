// Scroll handling
export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto"
  })
}

export const scrollToElement = (elementId: string, offset = 0, smooth = true) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: smooth ? "smooth" : "auto"
    })
  }
}

// Intersection Observer utilities
export const createIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
    ...options
  }

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => callback(entry))
  }, defaultOptions)
}

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error("Failed to copy text:", error)
    return false
  }
}

// Local image loader with error handling
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Screen size detection
export const getScreenSize = () => {
  const width = window.innerWidth
  if (width < 640) return "xs"
  if (width < 768) return "sm"
  if (width < 1024) return "md"
  if (width < 1280) return "lg"
  return "xl"
}

// Device detection
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// Focus trap for modals
export const createFocusTrap = (containerElement: HTMLElement) => {
  const focusableElements = containerElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusableElement = focusableElements[0] as HTMLElement
  const lastFocusableElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus()
        e.preventDefault()
      }
    }
  }

  return {
    activate: () => {
      document.addEventListener("keydown", handleTabKey)
      firstFocusableElement.focus()
    },
    deactivate: () => {
      document.removeEventListener("keydown", handleTabKey)
    }
  }
}

// Animation helpers
export const animate = (
  element: HTMLElement,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions
): Animation => {
  return element.animate(keyframes, options)
}

// Common animations
export const animations = {
  fadeIn: (element: HTMLElement, duration = 300) =>
    animate(
      element,
      [
        { opacity: 0 },
        { opacity: 1 }
      ],
      { duration, easing: "ease-in-out" }
    ),

  fadeOut: (element: HTMLElement, duration = 300) =>
    animate(
      element,
      [
        { opacity: 1 },
        { opacity: 0 }
      ],
      { duration, easing: "ease-in-out" }
    ),

  slideIn: (element: HTMLElement, direction: "left" | "right" | "top" | "bottom" = "right", duration = 300) => {
    const axis = direction === "left" || direction === "right" ? "X" : "Y"
    const sign = direction === "left" || direction === "top" ? 1 : -1
    
    return animate(
      element,
      [
        { transform: `translate${axis}(${sign * 100}%)` },
        { transform: "translate(0)" }
      ],
      { duration, easing: "ease-in-out" }
    )
  },

  slideOut: (element: HTMLElement, direction: "left" | "right" | "top" | "bottom" = "right", duration = 300) => {
    const axis = direction === "left" || direction === "right" ? "X" : "Y"
    const sign = direction === "left" || direction === "top" ? -1 : 1
    
    return animate(
      element,
      [
        { transform: "translate(0)" },
        { transform: `translate${axis}(${sign * 100}%)` }
      ],
      { duration, easing: "ease-in-out" }
    )
  }
}

// Error boundary helper
export class ErrorBoundary extends Error {
  constructor(message: string, public readonly metadata: Record<string, any> = {}) {
    super(message)
    this.name = "ErrorBoundary"
  }
}

// Event bus for component communication
type EventCallback = (...args: any[]) => void

class EventBus {
  private events: Map<string, EventCallback[]> = new Map()

  on(event: string, callback: EventCallback) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)
  }

  off(event: string, callback: EventCallback) {
    if (!this.events.has(event)) return
    const callbacks = this.events.get(event)!
    const index = callbacks.indexOf(callback)
    if (index !== -1) {
      callbacks.splice(index, 1)
    }
  }

  emit(event: string, ...args: any[]) {
    if (!this.events.has(event)) return
    this.events.get(event)!.forEach(callback => callback(...args))
  }
}

export const eventBus = new EventBus()
