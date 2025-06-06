// User Types
export interface User {
  id: string
  email: string
  role: "admin" | "user"
}

// Content Types
export interface Opportunity {
  id: string
  title: string
  type: "internship" | "competition" | "scholarship"
  organization: string
  deadline: string
  description: string
  requirements: string[]
  location?: string
  amount?: string
  prize?: string
  createdAt: string
  updatedAt: string
}

export interface Article {
  id: string
  title: string
  category: string
  author: string
  date: string
  readTime: string
  excerpt: string
  content: string
  image: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Alumni {
  id: string
  name: string
  graduation: string
  role: string
  company: string
  image: string
  story: string
  advice: string
  location: string
  email?: string
  linkedin?: string
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  title: string
  type: "workshop" | "seminar" | "conference" | "networking"
  date: string
  time: string
  location: string
  description: string
  speaker?: string
  capacity?: number
  registrationDeadline?: string
  createdAt: string
  updatedAt: string
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface MentorshipForm {
  name: string
  email: string
  currentYear: string
  interests: string
  mentorPreference?: string
}

// Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Filter Types
export interface ArticleFilters {
  category?: string
  author?: string
  tag?: string
  sortBy?: "latest" | "popular" | "trending"
}

export interface OpportunityFilters {
  type?: "internship" | "competition" | "scholarship"
  organization?: string
  deadline?: string
  sortBy?: "deadline" | "latest"
}

export interface AlumniFilters {
  graduationYear?: string
  company?: string
  role?: string
  location?: string
}

// Statistics Types
export interface CareerStats {
  fields: Array<{ name: string; percentage: number }>
  education: Array<{ level: string; percentage: number }>
  locations: Array<{ region: string; percentage: number }>
}

// Comment Types
export interface Comment {
  id: string
  content: string
  author: {
    name: string
    email: string
  }
  createdAt: string
  articleId?: string
  opportunityId?: string
}
