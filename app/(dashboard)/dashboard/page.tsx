"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { LeadsChart } from "@/components/dashboard/leads-chart"
import { QuotationsChart } from "@/components/dashboard/quotations-chart"
import { RecentLeads } from "@/components/dashboard/recent-leads"
import { RecentQuotations } from "@/components/dashboard/recent-quotations"
import { reportAPI } from "@/lib/api"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    totalQuotations: 0,
    conversionRate: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)

        // Fetch dashboard stats
        const statsResponse = await reportAPI.getDashboardStats()
        setStats(statsResponse.data.stats)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        // Set default stats if API fails
        setStats({
          totalLeads: 0,
          newLeads: 0,
          totalQuotations: 0,
          conversionRate: 0,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your CRM performance and metrics</p>
      </div>

      <DashboardStats stats={stats} isLoading={isLoading} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Leads Overview</CardTitle>
                <CardDescription>Lead acquisition and conversion over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LeadsChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quotations</CardTitle>
                <CardDescription>Quotation status distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <QuotationsChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest leads added to the system</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentLeads />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Quotations</CardTitle>
                <CardDescription>Latest quotations created</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentQuotations />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Advanced analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
