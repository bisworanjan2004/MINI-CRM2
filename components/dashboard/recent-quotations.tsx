"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { quotationAPI } from "@/lib/api"

export function RecentQuotations() {
  const [quotations, setQuotations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentQuotations = async () => {
      try {
        setIsLoading(true)
        const response = await quotationAPI.getQuotations({
          page: 1,
          limit: 5,
          sortBy: "createdAt",
          sortOrder: "desc",
        })
        setQuotations(response.data.quotations)
      } catch (error) {
        console.error("Error fetching recent quotations:", error)
        setQuotations([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentQuotations()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "sent":
        return <Badge variant="secondary">Sent</Badge>
      case "accepted":
        return <Badge className="bg-green-500">Accepted</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
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
      {quotations.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">No recent quotations</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotations.map((quotation) => (
            <div key={quotation._id} className="flex items-center justify-between gap-4 rounded-md border p-3">
              <div>
                <div className="font-medium">{quotation.quotationNumber}</div>
                <div className="text-sm text-muted-foreground">{quotation.client.company}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{formatCurrency(quotation.total)}</div>
                {getStatusBadge(quotation.status)}
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/quotations/${quotation._id}`}>View</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <Button variant="outline" size="sm" asChild>
          <Link href="/quotations">View All Quotations</Link>
        </Button>
      </div>
    </div>
  )
}
