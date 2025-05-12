"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export function UserSettings() {
  const [user, setUser] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "English",
    timezone: "UTC-5 (Eastern Time)",
    emailNotifications: true,
    smsNotifications: false,
    appNotifications: true,
  })

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // For demo purposes, we'll use mock data from localStorage
    const userData = localStorage.getItem("user")

    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData((prev) => ({
        ...prev,
        name: parsedUser.name || "",
        email: parsedUser.email || "",
      }))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccessMessage("")

    try {
      // In a real app, you would call your API here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local storage
      const updatedUser = { ...user, name: formData.name, email: formData.email }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      setSuccessMessage("Settings saved successfully")
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && (
        <Alert className="mb-4 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Manage your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input id="language" name="language" value={formData.language} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" name="timezone" value={formData.timezone} onChange={handleChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Control how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={formData.smsNotifications}
                  onCheckedChange={(checked) => handleSwitchChange("smsNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appNotifications">In-App Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications within the app</p>
                </div>
                <Switch
                  id="appNotifications"
                  checked={formData.appNotifications}
                  onCheckedChange={(checked) => handleSwitchChange("appNotifications", checked)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
