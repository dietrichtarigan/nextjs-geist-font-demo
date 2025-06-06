import { ANALYTICS_EVENTS, FEATURES } from "./constants"

interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
}

interface PageView {
  path: string
  title: string
  referrer?: string
}

class Analytics {
  private isInitialized: boolean = false
  private queue: AnalyticsEvent[] = []
  private userId?: string
  private sessionId: string
  private debug: boolean

  constructor(debug = false) {
    this.debug = debug
    this.sessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15)
  }

  init(userId?: string) {
    if (!FEATURES.ANALYTICS) return

    this.isInitialized = true
    this.userId = userId

    // Process any queued events
    while (this.queue.length > 0) {
      const event = this.queue.shift()
      if (event) this.trackEvent(event.name, event.properties)
    }

    if (this.debug) {
      console.log("Analytics initialized", { userId, sessionId: this.sessionId })
    }
  }

  private async sendToAnalyticsService(event: AnalyticsEvent) {
    if (!FEATURES.ANALYTICS) return

    const payload = {
      ...event,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: event.timestamp || Date.now(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`
    }

    if (this.debug) {
      console.log("Analytics event:", payload)
      return
    }

    try {
      // TODO: Replace with actual analytics service endpoint
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    } catch (error) {
      console.error("Failed to send analytics event:", error)
    }
  }

  trackEvent(name: string, properties?: Record<string, any>) {
    if (!this.isInitialized) {
      this.queue.push({ name, properties })
      return
    }

    this.sendToAnalyticsService({ name, properties })
  }

  trackPageView({ path, title, referrer }: PageView) {
    this.trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
      path,
      title,
      referrer: referrer || document.referrer
    })
  }

  trackUserSignIn(method: "email" | "google" | "github") {
    this.trackEvent(ANALYTICS_EVENTS.USER.SIGN_IN, { method })
  }

  trackUserSignOut() {
    this.trackEvent(ANALYTICS_EVENTS.USER.SIGN_OUT)
  }

  trackUserRegister(method: "email" | "google" | "github") {
    this.trackEvent(ANALYTICS_EVENTS.USER.REGISTER, { method })
  }

  trackContentView(contentType: "article" | "opportunity" | "event", contentId: string) {
    this.trackEvent(ANALYTICS_EVENTS.CONTENT.VIEW, {
      contentType,
      contentId
    })
  }

  trackContentShare(contentType: "article" | "opportunity" | "event", contentId: string, platform: string) {
    this.trackEvent(ANALYTICS_EVENTS.CONTENT.SHARE, {
      contentType,
      contentId,
      platform
    })
  }

  trackContentSave(contentType: "article" | "opportunity", contentId: string) {
    this.trackEvent(ANALYTICS_EVENTS.CONTENT.SAVE, {
      contentType,
      contentId
    })
  }

  trackOpportunityApply(opportunityId: string) {
    this.trackEvent(ANALYTICS_EVENTS.CONTENT.APPLY, {
      opportunityId
    })
  }

  trackSearch(query: string, filters?: Record<string, any>) {
    this.trackEvent(ANALYTICS_EVENTS.INTERACTION.SEARCH, {
      query,
      filters
    })
  }

  trackFilter(filters: Record<string, any>) {
    this.trackEvent(ANALYTICS_EVENTS.INTERACTION.FILTER, {
      filters
    })
  }

  // Performance tracking
  trackPageLoadPerformance() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing
      const performanceMetrics = {
        dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
        tcpConnection: timing.connectEnd - timing.connectStart,
        serverResponse: timing.responseEnd - timing.requestStart,
        domLoad: timing.domComplete - timing.domLoading,
        totalPageLoad: timing.loadEventEnd - timing.navigationStart
      }

      this.trackEvent("page_performance", performanceMetrics)
    }
  }

  // Error tracking
  trackError(error: Error, context?: Record<string, any>) {
    this.trackEvent("error", {
      message: error.message,
      stack: error.stack,
      ...context
    })
  }

  // User behavior tracking
  private scrollDepth = 0
  private scrollTimeout: NodeJS.Timeout | null = null

  initScrollTracking() {
    window.addEventListener("scroll", () => {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout)
      }

      this.scrollTimeout = setTimeout(() => {
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = window.pageYOffset
        const newScrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)

        if (newScrollDepth > this.scrollDepth) {
          this.scrollDepth = newScrollDepth
          this.trackEvent(ANALYTICS_EVENTS.INTERACTION.SCROLL, {
            depth: this.scrollDepth
          })
        }
      }, 500)
    })
  }
}

// Create a singleton instance
const analytics = new Analytics(process.env.NODE_ENV === "development")

export default analytics
