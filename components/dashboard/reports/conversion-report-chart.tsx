"use client"

import { useEffect, useState } from "react"
import { Chart, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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
      "Lead to Quotation": Math.floor(Math.random() * 30) + 20,
      "Quotation to Sale": Math.floor(Math.random() * 40) + 30,
      "Overall Conversion": Math.floor(Math.random() * 20) + 10,
    })

    // Move to next month
    currentDate.setMonth(currentDate.getMonth() + 1)
  }

  return data
}

interface ConversionReportChartProps {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
}

export function ConversionReportChart({ dateRange }: ConversionReportChartProps) {
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
          <LineChart
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
            <YAxis unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="Lead to Quotation" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Quotation to Sale" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Overall Conversion" stroke="#ff7300" activeDot={{ r: 8 }} />
          </LineChart>
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
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.stroke }} />
            <span>
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </ChartTooltipContent>
    )
  }

  return null
}
