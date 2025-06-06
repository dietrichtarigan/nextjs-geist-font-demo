// Date formatting options
interface DateFormatOptions {
  year?: "numeric" | "2-digit"
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow"
  day?: "numeric" | "2-digit"
  weekday?: "long" | "short" | "narrow"
  hour?: "numeric" | "2-digit"
  minute?: "numeric" | "2-digit"
  second?: "numeric" | "2-digit"
  timeZoneName?: "long" | "short"
}

// Default format options
const DEFAULT_DATE_FORMAT: DateFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
}

const DEFAULT_TIME_FORMAT: DateFormatOptions = {
  hour: "numeric",
  minute: "2-digit"
}

const DEFAULT_DATETIME_FORMAT: DateFormatOptions = {
  ...DEFAULT_DATE_FORMAT,
  ...DEFAULT_TIME_FORMAT
}

// Format functions
export const formatDate = (
  date: string | Date,
  options: DateFormatOptions = DEFAULT_DATE_FORMAT,
  locale: string = "en-US"
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, options)
}

export const formatTime = (
  time: string | Date,
  options: DateFormatOptions = DEFAULT_TIME_FORMAT,
  locale: string = "en-US"
): string => {
  const dateObj = typeof time === "string" ? new Date(`1970-01-01T${time}`) : time
  return dateObj.toLocaleTimeString(locale, options)
}

export const formatDateTime = (
  datetime: string | Date,
  options: DateFormatOptions = DEFAULT_DATETIME_FORMAT,
  locale: string = "en-US"
): string => {
  const dateObj = typeof datetime === "string" ? new Date(datetime) : datetime
  return dateObj.toLocaleString(locale, options)
}

// Relative time formatting
export const getRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - dateObj.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) return `${years} year${years === 1 ? "" : "s"} ago`
  if (months > 0) return `${months} month${months === 1 ? "" : "s"} ago`
  if (days > 0) return `${days} day${days === 1 ? "" : "s"} ago`
  if (hours > 0) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  if (minutes > 0) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  return "just now"
}

// Date manipulation functions
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date)
  result.setFullYear(result.getFullYear() + years)
  return result
}

// Date comparison functions
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const isBefore = (date1: Date, date2: Date): boolean => {
  return date1.getTime() < date2.getTime()
}

export const isAfter = (date1: Date, date2: Date): boolean => {
  return date1.getTime() > date2.getTime()
}

export const isBetween = (date: Date, start: Date, end: Date): boolean => {
  return isAfter(date, start) && isBefore(date, end)
}

// Calendar helpers
export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

export const getLastDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()
}

// Week number
export const getWeekNumber = (date: Date): number => {
  const target = new Date(date.valueOf())
  const dayNr = (date.getDay() + 6) % 7
  target.setDate(target.getDate() - dayNr + 3)
  const firstThursday = target.valueOf()
  target.setMonth(0, 1)
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7))
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000)
}

// Deadline helpers
export const isDeadlineApproaching = (deadline: Date, warningDays: number = 7): boolean => {
  const now = new Date()
  const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return daysUntilDeadline > 0 && daysUntilDeadline <= warningDays
}

export const isDeadlinePassed = (deadline: Date): boolean => {
  return isBefore(deadline, new Date())
}

export const getDeadlineStatus = (deadline: Date, warningDays: number = 7): "passed" | "approaching" | "open" => {
  if (isDeadlinePassed(deadline)) return "passed"
  if (isDeadlineApproaching(deadline, warningDays)) return "approaching"
  return "open"
}
