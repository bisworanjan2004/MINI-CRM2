"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { leadAPI } from "@/lib/api"

export function RecentLeads() {
  const [leads, setLeads] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentLeads = async () => {
      try {
        setIsLoading(true)
        const response = await leadAPI.getLeads({
          page: 1,
          limit: 5,
          sortBy: "createdAt",
          sortOrder: "desc",
        })
        setLeads(response.data.leads)
      } catch (error) {
        console.error("Error fetching recent leads:", error)
        setLeads([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentLeads()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="default">New</Badge>
      case "contacted":
        return <Badge variant="outline">Contacted</Badge>
      case "qualified":
        return <Badge variant="secondary">Qualified</Badge>
      case "proposal":
        return <Badge variant="secondary">Proposal</Badge>
      case "negotiation":
        return <Badge className="bg-amber-500">Negotiation</Badge>
      case "won":
        return <Badge className="bg-green-500">Won</Badge>
      case "lost":
        return <Badge variant="destructive">Lost</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {leads.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">No recent leads</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead._id} className="flex items-center justify-between gap-4 rounded-md border p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-sm text-muted-foreground">{lead.company}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(lead.status)}
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/leads/${lead._id}`}>View</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <Button variant="outline" size="sm" asChild>
          <Link href="/leads">View All Leads</Link>
        </Button>
      </div>
    </div>
  )
}
