"use client"

import { useEffect, useState } from "react"
import { Chart, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate mock data based on date range
const generateMockData = (dateRange: { from: Date | undefined; to: Date | undefined }) => {
  const data = []
  const statuses = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"]

  // Generate data for each month in the range
  const startDate = dateRange.from || new Date(new Date().setMonth(new Date().getMonth() - 1))
  const endDate = dateRange.to || new Date()

  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const month = currentDate.toLocaleString("default", { month: "short" })
    const year = currentDate.getFullYear()

    const monthData: any = {
      name: `${month} ${year}`,
    }

    // Generate random values for each status
    statuses.forEach((status) => {
      monthData[status] = Math.floor(Math.random() * 50) + 5
    })

    data.push(monthData)

    // Move to next month
    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  return data
}

interface LeadsReportChartProps {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
}

export function LeadsReportChart({ dateRange }: LeadsReportChartProps) {
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
          <BarChart
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
            <Bar dataKey="New" stackId="a" fill="#8884d8" />
            <Bar dataKey="Contacted" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Qualified" stackId="a" fill="#ffc658" />
            <Bar dataKey="Proposal" stackId="a" fill="#ff8042" />
            <Bar dataKey="Negotiation" stackId="a" fill="#0088fe" />
            <Bar dataKey="Won" stackId="a" fill="#00C49F" />
            <Bar dataKey="Lost" stackId="a" fill="#ff0000" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Chart>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltipContent>
        <div className="font-medium">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.fill }} />
            <span>
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </ChartTooltipContent>
    )
  }

  return null
}
