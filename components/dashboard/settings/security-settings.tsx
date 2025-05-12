"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"

export function SecuritySettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: true,
    loginNotifications: true,
    passwordExpiry: true,
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccessMessage("")
    setErrorMessage("")

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New passwords do not match")
      setIsSaving(false)
      return
    }

    try {
      // In a real app, you would call your API here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage("Password changed successfully")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      setErrorMessage("Failed to change password. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccessMessage("")

    try {
      // In a real app, you would call your API here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage("Security settings saved successfully")
    } catch (error) {
      console.error("Error saving security settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      {successMessage && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordSubmit}>
          <CardContent className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special
                characters.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Changing..." : "Change Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <form onSubmit={handleSecuritySubmit}>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => handleSwitchChange("twoFactorAuth", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sessionTimeout">Session Timeout</Label>
                <p className="text-sm text-muted-foreground">Automatically log out after 30 minutes of inactivity</p>
              </div>
              <Switch
                id="sessionTimeout"
                checked={securitySettings.sessionTimeout}
                onCheckedChange={(checked) => handleSwitchChange("sessionTimeout", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="loginNotifications">Login Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for new login attempts</p>
              </div>
              <Switch
                id="loginNotifications"
                checked={securitySettings.loginNotifications}
                onCheckedChange={(checked) => handleSwitchChange("loginNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="passwordExpiry">Password Expiry</Label>
                <p className="text-sm text-muted-foreground">Require password change every 90 days</p>
              </div>
              <Switch
                id="passwordExpiry"
                checked={securitySettings.passwordExpiry}
                onCheckedChange={(checked) => handleSwitchChange("passwordExpiry", checked)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>Recent login activity for your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-muted-foreground">Chrome on Windows • New York, USA</p>
                </div>
                <p className="text-sm text-muted-foreground">Just now</p>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Previous Login</p>
                  <p className="text-sm text-muted-foreground">Safari on macOS • New York, USA</p>
                </div>
                <p className="text-sm text-muted-foreground">Yesterday at 2:30 PM</p>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Previous Login</p>
                  <p className="text-sm text-muted-foreground">Chrome on Windows • New York, USA</p>
                </div>
                <p className="text-sm text-muted-foreground">May 12, 2023 at 10:15 AM</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline">View Full History</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
