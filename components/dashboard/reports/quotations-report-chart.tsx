"use client"

import { useEffect, useState } from "react"
import { Chart, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate mock data based on date range
const generateMockData = (dateRange: { from: Date | undefined; to: Date | undefined }) => {
  const data = []

  // Generate data for each month in the range
  const startDate = dateRange.from || new Date(new Date().setMonth(new Date().getMonth() - 1))
  const endDate = dateRange.to || new Date()

  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const month = currentDate.toLocaleString("default", { month: "short" })
    const year = currentDate.getFullYear()

    data.push({
      name: `${month} ${year}`,
      Draft: Math.floor(Math.random() * 10000) + 1000,
      Sent: Math.floor(Math.random() * 15000) + 5000,
      Accepted: Math.floor(Math.random() * 20000) + 10000,
      Rejected: Math.floor(Math.random() * 5000) + 1000,
    })

    // Move to next month
    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  return data
}

interface QuotationsReportChartProps {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
}

export function QuotationsReportChart({ dateRange }: QuotationsReportChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, you would fetch this data from your API based on the date range
    // For demo purposes, we'll generate mock data
    setData(generateMockData(dateRange))
  }, [dateRange])

  return (
    <Chart>
      <ChartContainer className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="Draft" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="Sent" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="Accepted" stackId="1" stroke="#ffc658" fill="#ffc658" />
            <Area type="monotone" dataKey="Rejected" stackId="1" stroke="#ff8042" fill="#ff8042" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Chart>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
    }

    return (
      <ChartTooltipContent>
        <div className="font-medium">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.fill }} />
            <span>
              {entry.name}: {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </ChartTooltipContent>
    )
  }

  return null
}
