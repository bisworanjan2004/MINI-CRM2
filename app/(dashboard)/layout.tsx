"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { authAPI } from "@/lib/api"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    // Fetch current user data
    const fetchUser = async () => {
      try {
        const response = await authAPI.getCurrentUser()
        setUser(response.data.user)

        // Update localStorage with fresh user data
        localStorage.setItem("user", JSON.stringify(response.data.user))
      } catch (error) {
        console.error("Failed to fetch user data", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/login")
        return
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <TopBar user={user} />
        <div className="flex flex-1">
          <DashboardSidebar pathname={pathname} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
