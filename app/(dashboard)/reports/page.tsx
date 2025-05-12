"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/dashboard/date-range-picker"
import { LeadsReportChart } from "@/components/dashboard/reports/leads-report-chart"
import { QuotationsReportChart } from "@/components/dashboard/reports/quotations-report-chart"
import { ConversionReportChart } from "@/components/dashboard/reports/conversion-report-chart"
import { SalesPerformanceTable } from "@/components/dashboard/reports/sales-performance-table"
import { Download, FileText, Mail, Printer } from "lucide-react"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  })

  const [reportType, setReportType] = useState("leads")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Analyze your CRM data and generate reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Parameters</CardTitle>
          <CardDescription>Select the parameters for your report</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full sm:w-1/3">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leads">Leads Report</SelectItem>
                  <SelectItem value="quotations">Quotations Report</SelectItem>
                  <SelectItem value="conversion">Conversion Report</SelectItem>
                  <SelectItem value="sales">Sales Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-2/3">
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Email Report
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="chart" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chart">Chart View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {reportType === "leads" && "Leads Report"}
                {reportType === "quotations" && "Quotations Report"}
                {reportType === "conversion" && "Conversion Report"}
                {reportType === "sales" && "Sales Performance"}
              </CardTitle>
              <CardDescription>
                {reportType === "leads" && "Lead acquisition and status over time"}
                {reportType === "quotations" && "Quotation values and status over time"}
                {reportType === "conversion" && "Lead to quotation conversion rates"}
                {reportType === "sales" && "Sales performance by team member"}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              {reportType === "leads" && <LeadsReportChart dateRange={dateRange} />}
              {reportType === "quotations" && <QuotationsReportChart dateRange={dateRange} />}
              {reportType === "conversion" && <ConversionReportChart dateRange={dateRange} />}
              {reportType === "sales" && <SalesPerformanceTable dateRange={dateRange} />}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {reportType === "leads" && "Leads Report Data"}
                {reportType === "quotations" && "Quotations Report Data"}
                {reportType === "conversion" && "Conversion Report Data"}
                {reportType === "sales" && "Sales Performance Data"}
              </CardTitle>
              <CardDescription>Detailed data view of the selected report</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesPerformanceTable dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
