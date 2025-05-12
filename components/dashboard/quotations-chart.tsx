"use client"

import { useEffect, useState } from "react"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { quotationAPI } from "@/lib/api"

export function QuotationsChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchQuotationStats = async () => {
      try {
        setIsLoading(true)
        const response = await quotationAPI.getQuotationStats()

        // Format data for chart
        const statusCounts = response.data.stats.statusCounts || {}

        // Transform the data to match the chart format
        const formattedData = [
          { name: "Draft", value: statusCounts.draft?.count || 0, color: "#94a3b8" },
          { name: "Sent", value: statusCounts.sent?.count || 0, color: "#3b82f6" },
          { name: "Accepted", value: statusCounts.accepted?.count || 0, color: "#22c55e" },
          { name: "Rejected", value: statusCounts.rejected?.count || 0, color: "#ef4444" },
          { name: "Expired", value: statusCounts.expired?.count || 0, color: "#f97316" },
        ].filter((item) => item.value > 0) // Remove items with zero value

        setData(formattedData)
      } catch (error) {
        console.error("Error fetching quotation stats:", error)
        // Fallback to mock data if API fails
        setData([
          { name: "Draft", value: 15, color: "#94a3b8" },
          { name: "Sent", value: 25, color: "#3b82f6" },
          { name: "Accepted", value: 35, color: "#22c55e" },
          { name: "Rejected", value: 15, color: "#ef4444" },
          { name: "Expired", value: 10, color: "#f97316" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuotationStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // If no data, show a message
  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-muted-foreground">No quotation data available</p>
      </div>
    )
  }

  return (
    <Chart>
      <ChartContainer className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    </Chart>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltipContent>
        <div className="font-medium">{payload[0].name}</div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
          <span>Count: {payload[0].value}</span>
        </div>
      </ChartTooltipContent>
    )
  }

  return null
}
