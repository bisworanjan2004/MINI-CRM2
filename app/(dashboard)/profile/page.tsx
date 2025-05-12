"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    bio: "",
  })

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // For demo purposes, we'll use mock data from localStorage
    const userData = localStorage.getItem("user")

    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: "+1 (555) 123-4567",
        position: "Sales Manager",
        bio: "Experienced sales professional with a track record of exceeding targets and building strong client relationships.",
      })
    }

    setIsLoading(false)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      // In a real app, you would call your API here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local storage
      const updatedUser = { ...user, name: formData.name, email: formData.email }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      setSuccessMessage("Profile updated successfully")
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Your profile picture is visible to other users</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt={user?.name} />
              <AvatarFallback className="text-4xl">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change Picture
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 pt-4">
              {successMessage && (
                <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              {errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" name="position" value={formData.position} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                  <CardDescription>Customize how the CRM appears to you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Theme</h3>
                        <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Light
                        </Button>
                        <Button variant="outline" size="sm">
                          Dark
                        </Button>
                        <Button variant="default" size="sm">
                          System
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Dashboard Layout</h3>
                        <p className="text-sm text-muted-foreground">Choose your preferred dashboard layout</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          Customize
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Date Format</h3>
                        <p className="text-sm text-muted-foreground">Choose your preferred date format</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          MM/DD/YYYY
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
