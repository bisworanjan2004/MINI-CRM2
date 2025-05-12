"use client"

import { useState, useRef, useEffect } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { authAPI } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Bell, LogOut } from "lucide-react"
import Image from "next/image"

interface TopBarProps {
  user: {
    name: string
    email: string
    role: string
    avatar?: string
  }
}

export function TopBar({ user }: TopBarProps) {
  const router = useRouter()
  const [notifications] = useState(3)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/login")
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 w-full">
      <SidebarTrigger className="md:hidden" />

      <div className="ml-auto flex items-center gap-4">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] leading-none text-white">
              {notifications}
            </span>
          )}
        </div>

        {/* User Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm font-medium text-gray-700">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 min-w-[180px] rounded-md border bg-white shadow-md z-50 text-sm sm:text-base">
              <div className="px-4 py-3">
                <div className="font-semibold truncate">{user.name}</div>
                <div className="text-muted-foreground truncate">{user.email}</div>
              </div>
              <div className="border-t">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
