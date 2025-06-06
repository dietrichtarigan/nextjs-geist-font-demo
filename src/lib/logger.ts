import analytics from "./analytics"

interface ErrorContext {
  userId?: string
  path?: string
  action?: string
  metadata?: Record<string, any>
}

interface LogOptions {
  level?: "info" | "warn" | "error"
  context?: Record<string, any>
  tags?: string[]
}

class Logger {
  private static instance: Logger
  private isDevelopment: boolean
  private errorQueue: Array<{ error: Error; context?: ErrorContext }> = []
  private isProcessing: boolean = false
  private batchSize: number = 10
  private batchTimeout: number = 5000 // 5 seconds

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development"
    this.setupErrorListeners()
    this.startErrorProcessor()
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private setupErrorListeners() {
    if (typeof window !== "undefined") {
      window.addEventListener("unhandledrejection", (event) => {
        this.error(event.reason, {
          action: "unhandledRejection",
          metadata: {
            type: event.type,
            reason: event.reason
          }
        })
      })

      window.addEventListener("error", (event) => {
        this.error(event.error, {
          action: "uncaughtError",
          metadata: {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
          }
        })
      })
    }
  }

  private async startErrorProcessor() {
    while (true) {
      if (this.errorQueue.length >= this.batchSize || 
          (this.errorQueue.length > 0 && await this.waitForTimeout(this.batchTimeout))) {
        await this.processBatch()
      }
      await this.waitForTimeout(1000) // Check every second
    }
  }

  private waitForTimeout(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => resolve(true), ms)
    })
  }

  private async processBatch() {
    if (this.isProcessing || this.errorQueue.length === 0) return

    this.isProcessing = true
    const batch = this.errorQueue.splice(0, this.batchSize)

    try {
      // In a real app, send to error monitoring service
      await this.sendToErrorService(batch)
    } catch (error) {
      console.error("Failed to process error batch:", error)
      // Put failed items back in queue
      this.errorQueue.unshift(...batch)
    } finally {
      this.isProcessing = false
    }
  }

  private async sendToErrorService(errors: Array<{ error: Error; context?: ErrorContext }>) {
    if (this.isDevelopment) {
      console.group("Error Batch")
      errors.forEach(({ error, context }) => {
        console.error("Error:", error)
        if (context) console.error("Context:", context)
      })
      console.groupEnd()
      return
    }

    // TODO: Replace with actual error monitoring service
    // Example: Sentry, LogRocket, etc.
    try {
      await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ errors })
      })
    } catch (error) {
      console.error("Failed to send errors to monitoring service:", error)
    }
  }

  info(message: string, options?: LogOptions) {
    this.log(message, { ...options, level: "info" })
  }

  warn(message: string, options?: LogOptions) {
    this.log(message, { ...options, level: "warn" })
  }

  error(error: Error | string, context?: ErrorContext) {
    const errorObject = error instanceof Error ? error : new Error(error)
    
    // Add to queue for batch processing
    this.errorQueue.push({
      error: errorObject,
      context: {
        ...context,
        path: typeof window !== "undefined" ? window.location.pathname : undefined,
        timestamp: new Date().toISOString()
      }
    })

    // Track error in analytics
    analytics.trackError(errorObject, context)

    // Log immediately in development
    if (this.isDevelopment) {
      console.error("Error:", errorObject)
      if (context) console.error("Context:", context)
    }
  }

  private log(message: string, options: LogOptions) {
    const { level, context, tags } = options
    const timestamp = new Date().toISOString()

    if (this.isDevelopment) {
      const logFn = console[level]
      logFn(
        `[${timestamp}] ${level.toUpperCase()}: ${message}`,
        ...(context ? ["\nContext:", context] : []),
        ...(tags ? ["\nTags:", tags] : [])
      )
      return
    }

    // TODO: Replace with actual logging service
    // Example: Send to logging endpoint
    fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level,
        message,
        context,
        tags,
        timestamp
      })
    }).catch(error => {
      console.error("Failed to send log:", error)
    })
  }

  // Performance monitoring
  startPerformanceTimer(label: string) {
    if (typeof performance !== "undefined") {
      performance.mark(`${label}-start`)
    }
  }

  endPerformanceTimer(label: string) {
    if (typeof performance !== "undefined") {
      performance.mark(`${label}-end`)
      performance.measure(label, `${label}-start`, `${label}-end`)
      
      const measurements = performance.getEntriesByName(label)
      const duration = measurements[measurements.length - 1].duration

      this.info(`Performance: ${label} took ${duration}ms`, {
        context: { duration },
        tags: ["performance"]
      })

      // Cleanup
      performance.clearMarks(`${label}-start`)
      performance.clearMarks(`${label}-end`)
      performance.clearMeasures(label)
    }
  }

  // Memory monitoring
  logMemoryUsage() {
    if (typeof performance !== "undefined" && performance.memory) {
      const memory = performance.memory
      this.info("Memory Usage", {
        context: {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        },
        tags: ["memory"]
      })
    }
  }
}

// Export singleton instance
export const logger = Logger.getInstance()

// Export helper functions for common use cases
export const logError = (error: Error | string, context?: ErrorContext) => {
  logger.error(error, context)
}

export const logInfo = (message: string, options?: LogOptions) => {
  logger.info(message, options)
}

export const logWarning = (message: string, options?: LogOptions) => {
  logger.warn(message, options)
}

export const withErrorLogging = <T extends (...args: any[]) => any>(
  fn: T,
  context?: Omit<ErrorContext, "action">
): T => {
  return ((...args: Parameters<T>): ReturnType<T> => {
    try {
      const result = fn(...args)
      
      // Handle promises
      if (result instanceof Promise) {
        return result.catch(error => {
          logger.error(error, {
            ...context,
            action: fn.name || "anonymous"
          })
          throw error
        }) as ReturnType<T>
      }
      
      return result
    } catch (error) {
      logger.error(error as Error, {
        ...context,
        action: fn.name || "anonymous"
      })
      throw error
    }
  }) as T
}
