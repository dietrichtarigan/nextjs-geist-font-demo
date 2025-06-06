import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HIMAFI Career Center",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://career.himafi.org",
    title: "HIMAFI Career Center",
    description: "Your hub for internships, competitions, scholarships, and career insights in physics.",
    siteName: "HIMAFI Career Center"
  },
  twitter: {
    card: "summary_large_image",
    title: "HIMAFI Career Center",
    description: "Your hub for internships, competitions, scholarships, and career insights in physics.",
    creator: "@HIMAFI"
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
