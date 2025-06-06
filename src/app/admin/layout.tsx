"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Implement proper authentication check
    const checkAuth = () => {
      // Simulate auth check
      const isLoggedIn = localStorage.getItem("adminToken")
      setIsLoading(false)

      // Redirect if not authenticated and trying to access dashboard
      if (!isLoggedIn && pathname.includes("/admin/dashboard")) {
        router.push("/admin")
      }
      // Redirect if authenticated and trying to access login page
      if (isLoggedIn && pathname === "/admin") {
        router.push("/admin/dashboard")
      }
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  return children
}
