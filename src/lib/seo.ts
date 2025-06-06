import type { Metadata } from "next"
import { ROUTES } from "./constants"

// Base metadata that will be used across the site
const baseMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://career.himafi.org"),
  title: {
    default: "HIMAFI Career Center",
    template: "%s | HIMAFI Career Center"
  },
  description: "Your hub for internships, competitions, scholarships, and career insights in physics.",
  keywords: [
    "physics careers",
    "internships",
    "scholarships",
    "competitions",
    "HIMAFI",
    "career center",
    "physics students",
    "alumni network"
  ],
  authors: [{ name: "HIMAFI" }],
  creator: "HIMAFI",
  publisher: "HIMAFI Career Center",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://career.himafi.org",
    siteName: "HIMAFI Career Center",
    title: "HIMAFI Career Center",
    description: "Your hub for internships, competitions, scholarships, and career insights in physics.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HIMAFI Career Center"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@HIMAFI",
    creator: "@HIMAFI",
    title: "HIMAFI Career Center",
    description: "Your hub for internships, competitions, scholarships, and career insights in physics.",
    images: ["/twitter-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  }
}

// Helper function to generate metadata for different page types
interface GenerateMetadataOptions {
  title?: string
  description?: string
  image?: string
  type?: "website" | "article"
  path?: string
  noindex?: boolean
}

export const generateMetadata = ({
  title,
  description,
  image,
  type = "website",
  path = "",
  noindex = false
}: GenerateMetadataOptions = {}): Metadata => {
  const url = `${baseMetadata.metadataBase}${path}`
  const imageUrl = image ? `${baseMetadata.metadataBase}${image}` : undefined

  return {
    ...baseMetadata,
    title: title,
    description: description || baseMetadata.description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: title || baseMetadata.openGraph?.title,
      description: description || baseMetadata.openGraph?.description,
      url,
      type,
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title
          }
        ]
      })
    },
    twitter: {
      ...baseMetadata.twitter,
      title: title || baseMetadata.twitter?.title,
      description: description || baseMetadata.twitter?.description,
      ...(imageUrl && { images: [imageUrl] })
    },
    ...(noindex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}

// Generate metadata for specific page types
export const generatePageMetadata = {
  home: (): Metadata => generateMetadata({
    path: ROUTES.HOME
  }),

  opportunities: (): Metadata => generateMetadata({
    title: "Opportunities",
    description: "Discover internships, competitions, and scholarships in physics and related fields.",
    path: ROUTES.OPPORTUNITIES
  }),

  opportunity: (title: string, description: string, image?: string): Metadata => generateMetadata({
    title,
    description,
    image,
    type: "article",
    path: `${ROUTES.OPPORTUNITIES}/${title.toLowerCase().replace(/\s+/g, "-")}`
  }),

  articles: (): Metadata => generateMetadata({
    title: "Articles",
    description: "Read insightful articles about physics careers, research, and industry trends.",
    path: ROUTES.ARTICLES
  }),

  article: (title: string, description: string, image?: string): Metadata => generateMetadata({
    title,
    description,
    image,
    type: "article",
    path: `${ROUTES.ARTICLES}/${title.toLowerCase().replace(/\s+/g, "-")}`
  }),

  events: (): Metadata => generateMetadata({
    title: "Events",
    description: "Join workshops, seminars, and networking events in the physics community.",
    path: ROUTES.EVENTS
  }),

  event: (title: string, description: string, image?: string): Metadata => generateMetadata({
    title,
    description,
    image,
    type: "article",
    path: `${ROUTES.EVENTS}/${title.toLowerCase().replace(/\s+/g, "-")}`
  }),

  alumni: (): Metadata => generateMetadata({
    title: "Alumni Network",
    description: "Connect with HIMAFI alumni and learn from their experiences.",
    path: ROUTES.ALUMNI
  }),

  profile: (): Metadata => generateMetadata({
    title: "My Profile",
    description: "Manage your profile, saved items, and event registrations.",
    path: ROUTES.PROFILE,
    noindex: true
  }),

  admin: (): Metadata => generateMetadata({
    title: "Admin Dashboard",
    description: "Manage content and users on the HIMAFI Career Center platform.",
    path: ROUTES.ADMIN.DASHBOARD,
    noindex: true
  })
}

// Schema.org structured data generators
export const generateStructuredData = {
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HIMAFI Career Center",
    url: baseMetadata.metadataBase?.toString(),
    logo: `${baseMetadata.metadataBase}/logo.png`,
    sameAs: [
      "https://twitter.com/HIMAFI",
      "https://www.linkedin.com/company/himafi",
      "https://www.instagram.com/himafi"
    ]
  }),

  article: (article: {
    title: string
    description: string
    author: string
    date: string
    image?: string
    url: string
  }) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author
    },
    datePublished: article.date,
    image: article.image ? `${baseMetadata.metadataBase}${article.image}` : undefined,
    url: `${baseMetadata.metadataBase}${article.url}`
  }),

  event: (event: {
    title: string
    description: string
    startDate: string
    endDate?: string
    location: string
    image?: string
    url: string
  }) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      "@type": "Place",
      name: event.location
    },
    image: event.image ? `${baseMetadata.metadataBase}${event.image}` : undefined,
    url: `${baseMetadata.metadataBase}${event.url}`
  })
}
