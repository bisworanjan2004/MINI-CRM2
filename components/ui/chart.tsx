"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div className={cn("dark:bg-neutral-950 rounded-md border", className)} ref={ref} {...props} />
})
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("w-full", className)} ref={ref} {...props} />
  },
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("rounded-md border bg-popover p-4 text-sm text-popover-foreground shadow-md", className)}
        ref={ref}
        {...props}
      />
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("", className)} ref={ref} {...props} />
  },
)
ChartTooltip.displayName = "ChartTooltip"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent }
