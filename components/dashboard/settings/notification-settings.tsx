"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export function NotificationSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [notifications, setNotifications] = useState({
    // Lead notifications
    newLeadCreated: true,
    leadStatusChanged: true,
    leadAssigned: true,

    // Quotation notifications
    newQuotationCreated: true,
    quotationStatusChanged: true,
    quotationExpiringSoon: true,

    // System notifications
    systemUpdates: false,
    maintenanceAlerts: true,
    securityAlerts: true,

    // Digest notifications
    dailyDigest: false,
    weeklyDigest: true,
    monthlyReport: true,
  })

  const handleSwitchChange = (name: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccessMessage("")

    try {
      // In a real app, you would call your API here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage("Notification settings saved successfully")
    } catch (error) {
      console.error("Error saving notification settings:", error)
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
            <CardTitle>Lead Notifications</CardTitle>
            <CardDescription>Notifications related to leads</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newLeadCreated">New Lead Created</Label>
                <p className="text-sm text-muted-foreground">Receive notifications when a new lead is created</p>
              </div>
              <Switch
                id="newLeadCreated"
                checked={notifications.newLeadCreated}
                onCheckedChange={(checked) => handleSwitchChange("newLeadCreated", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="leadStatusChanged">Lead Status Changed</Label>
                <p className="text-sm text-muted-foreground">Receive notifications when a lead's status changes</p>
              </div>
              <Switch
                id="leadStatusChanged"
                checked={notifications.leadStatusChanged}
                onCheckedChange={(checked) => handleSwitchChange("leadStatusChanged", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="leadAssigned">Lead Assigned</Label>
                <p className="text-sm text-muted-foreground">Receive notifications when a lead is assigned to you</p>
              </div>
              <Switch
                id="leadAssigned"
                checked={notifications.leadAssigned}
                onCheckedChange={(checked) => handleSwitchChange("leadAssigned", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quotation Notifications</CardTitle>
            <CardDescription>Notifications related to quotations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newQuotationCreated">New Quotation Created</Label>
                <p className="text-sm text-muted-foreground">Receive notifications when a new quotation is created</p>
              </div>
              <Switch
                id="newQuotationCreated"
                checked={notifications.newQuotationCreated}
                onCheckedChange={(checked) => handleSwitchChange("newQuotationCreated", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="quotationStatusChanged">Quotation Status Changed</Label>
                <p className="text-sm text-muted-foreground">Receive notifications when a quotation's status changes</p>
              </div>
              <Switch
                id="quotationStatusChanged"
                checked={notifications.quotationStatusChanged}
                onCheckedChange={(checked) => handleSwitchChange("quotationStatusChanged", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="quotationExpiringSoon">Quotation Expiring Soon</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when a quotation is about to expire
                </p>
              </div>
              <Switch
                id="quotationExpiringSoon"
                checked={notifications.quotationExpiringSoon}
                onCheckedChange={(checked) => handleSwitchChange("quotationExpiringSoon", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
            <CardDescription>Notifications related to the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="systemUpdates">System Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about system updates and new features
                </p>
              </div>
              <Switch
                id="systemUpdates"
                checked={notifications.systemUpdates}
                onCheckedChange={(checked) => handleSwitchChange("systemUpdates", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenanceAlerts">Maintenance Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about scheduled maintenance</p>
              </div>
              <Switch
                id="maintenanceAlerts"
                checked={notifications.maintenanceAlerts}
                onCheckedChange={(checked) => handleSwitchChange("maintenanceAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="securityAlerts">Security Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about security-related events</p>
              </div>
              <Switch
                id="securityAlerts"
                checked={notifications.securityAlerts}
                onCheckedChange={(checked) => handleSwitchChange("securityAlerts", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Digest Notifications</CardTitle>
            <CardDescription>Periodic summary notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dailyDigest">Daily Digest</Label>
                <p className="text-sm text-muted-foreground">Receive a daily summary of activities</p>
              </div>
              <Switch
                id="dailyDigest"
                checked={notifications.dailyDigest}
                onCheckedChange={(checked) => handleSwitchChange("dailyDigest", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">Receive a weekly summary of activities</p>
              </div>
              <Switch
                id="weeklyDigest"
                checked={notifications.weeklyDigest}
                onCheckedChange={(checked) => handleSwitchChange("weeklyDigest", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="monthlyReport">Monthly Report</Label>
                <p className="text-sm text-muted-foreground">Receive a monthly performance report</p>
              </div>
              <Switch
                id="monthlyReport"
                checked={notifications.monthlyReport}
                onCheckedChange={(checked) => handleSwitchChange("monthlyReport", checked)}
              />
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
