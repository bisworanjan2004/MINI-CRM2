"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Generate mock data based on date range
const generateMockData = (dateRange: { from: Date | undefined; to: Date | undefined }) => {
  const salesReps = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Mike Johnson", email: "mike.j@example.com" },
    { name: "Sarah Williams", email: "sarah.w@example.com" },
    { name: "David Brown", email: "david.b@example.com" },
  ]

  return salesReps.map((rep) => {
    const leadsAssigned = Math.floor(Math.random() * 50) + 20
    const leadsContacted = Math.floor(Math.random() * leadsAssigned)
    const quotationsSent = Math.floor(Math.random() * leadsContacted)
    const salesClosed = Math.floor(Math.random() * quotationsSent)
    const revenue = salesClosed * (Math.floor(Math.random() * 5000) + 1000)

    return {
      ...rep,
      leadsAssigned,
      leadsContacted,
      quotationsSent,
      salesClosed,
      conversionRate: Math.round((salesClosed / leadsAssigned) * 100),
      revenue,
      target: Math.floor(Math.random() * 50000) + 30000,
    }
  })
}

interface SalesPerformanceTableProps {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
}

export function SalesPerformanceTable({ dateRange }: SalesPerformanceTableProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, you would fetch this data from your API based on the date range
    // For demo purposes, we'll generate mock data
    setData(generateMockData(dateRange))
  }, [dateRange])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const getPerformanceBadge = (conversionRate: number) => {
    if (conversionRate >= 30) {
      return <Badge className="bg-green-500">Excellent</Badge>
    } else if (conversionRate >= 20) {
      return <Badge className="bg-blue-500">Good</Badge>
    } else if (conversionRate >= 10) {
      return <Badge variant="secondary">Average</Badge>
    } else {
      return <Badge variant="destructive">Needs Improvement</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sales Rep</TableHead>
            <TableHead className="text-right">Leads</TableHead>
            <TableHead className="text-right">Quotations</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">Conversion</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead>Target Progress</TableHead>
            <TableHead>Performance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((rep) => (
            <TableRow key={rep.email}>
              <TableCell>
                <div>
                  <div className="font-medium">{rep.name}</div>
                  <div className="text-sm text-muted-foreground">{rep.email}</div>
                </div>
              </TableCell>
              <TableCell className="text-right">{rep.leadsAssigned}</TableCell>
              <TableCell className="text-right">{rep.quotationsSent}</TableCell>
              <TableCell className="text-right">{rep.salesClosed}</TableCell>
              <TableCell className="text-right">{rep.conversionRate}%</TableCell>
              <TableCell className="text-right">{formatCurrency(rep.revenue)}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Progress value={(rep.revenue / rep.target) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(rep.revenue)} of {formatCurrency(rep.target)}
                  </div>
                </div>
              </TableCell>
              <TableCell>{getPerformanceBadge(rep.conversionRate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
