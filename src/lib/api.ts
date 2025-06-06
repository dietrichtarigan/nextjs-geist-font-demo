import { getAuthToken } from "./auth"
import type {
  ApiResponse,
  Opportunity,
  Article,
  Alumni,
  Event,
  Comment,
  ContactForm,
  MentorshipForm
} from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

// Helper function to handle API requests
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken()
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "An error occurred")
    }

    return data
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

// Opportunities
export const getOpportunities = () => 
  fetchAPI<Opportunity[]>("/opportunities")

export const getOpportunity = (id: string) => 
  fetchAPI<Opportunity>(`/opportunities/${id}`)

export const createOpportunity = (data: Omit<Opportunity, "id" | "createdAt" | "updatedAt">) => 
  fetchAPI<Opportunity>("/opportunities", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const updateOpportunity = (id: string, data: Partial<Opportunity>) => 
  fetchAPI<Opportunity>(`/opportunities/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })

export const deleteOpportunity = (id: string) => 
  fetchAPI(`/opportunities/${id}`, {
    method: "DELETE",
  })

// Articles
export const getArticles = () => 
  fetchAPI<Article[]>("/articles")

export const getArticle = (id: string) => 
  fetchAPI<Article>(`/articles/${id}`)

export const createArticle = (data: Omit<Article, "id" | "createdAt" | "updatedAt">) => 
  fetchAPI<Article>("/articles", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const updateArticle = (id: string, data: Partial<Article>) => 
  fetchAPI<Article>(`/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })

export const deleteArticle = (id: string) => 
  fetchAPI(`/articles/${id}`, {
    method: "DELETE",
  })

// Alumni
export const getAlumni = () => 
  fetchAPI<Alumni[]>("/alumni")

export const getAlumniProfile = (id: string) => 
  fetchAPI<Alumni>(`/alumni/${id}`)

export const createAlumniProfile = (data: Omit<Alumni, "id" | "createdAt" | "updatedAt">) => 
  fetchAPI<Alumni>("/alumni", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const updateAlumniProfile = (id: string, data: Partial<Alumni>) => 
  fetchAPI<Alumni>(`/alumni/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })

export const deleteAlumniProfile = (id: string) => 
  fetchAPI(`/alumni/${id}`, {
    method: "DELETE",
  })

// Events
export const getEvents = () => 
  fetchAPI<Event[]>("/events")

export const getEvent = (id: string) => 
  fetchAPI<Event>(`/events/${id}`)

export const createEvent = (data: Omit<Event, "id" | "createdAt" | "updatedAt">) => 
  fetchAPI<Event>("/events", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const updateEvent = (id: string, data: Partial<Event>) => 
  fetchAPI<Event>(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })

export const deleteEvent = (id: string) => 
  fetchAPI(`/events/${id}`, {
    method: "DELETE",
  })

// Comments
export const getComments = (articleId?: string, opportunityId?: string) => {
  const query = articleId 
    ? `?articleId=${articleId}` 
    : opportunityId 
    ? `?opportunityId=${opportunityId}` 
    : ""
  return fetchAPI<Comment[]>(`/comments${query}`)
}

export const createComment = (data: Omit<Comment, "id" | "createdAt">) => 
  fetchAPI<Comment>("/comments", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const deleteComment = (id: string) => 
  fetchAPI(`/comments/${id}`, {
    method: "DELETE",
  })

// Forms
export const submitContactForm = (data: ContactForm) => 
  fetchAPI("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  })

export const submitMentorshipRequest = (data: MentorshipForm) => 
  fetchAPI("/mentorship", {
    method: "POST",
    body: JSON.stringify(data),
  })

// Newsletter
export const subscribeToNewsletter = (email: string) => 
  fetchAPI("/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  })

// Favorites
export const getFavorites = () => 
  fetchAPI<(Article | Opportunity)[]>("/favorites")

export const addToFavorites = (itemId: string, type: "article" | "opportunity") => 
  fetchAPI("/favorites", {
    method: "POST",
    body: JSON.stringify({ itemId, type }),
  })

export const removeFromFavorites = (itemId: string) => 
  fetchAPI(`/favorites/${itemId}`, {
    method: "DELETE",
  })
