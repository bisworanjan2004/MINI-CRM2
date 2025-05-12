"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Search, Filter, Download } from "lucide-react"
import { quotationAPI } from "@/lib/api"

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalQuotations: 0,
  })

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        setIsLoading(true)

        // Build query params
        const params: any = {
          page: pagination.currentPage,
          limit: 10,
        }

        if (searchQuery) {
          params.search = searchQuery
        }

        if (statusFilter !== "all") {
          params.status = statusFilter
        }

        const response = await quotationAPI.getQuotations(params)

        setQuotations(response.data.quotations)
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalQuotations: response.data.total,
        })
      } catch (error) {
        console.error("Error fetching quotations:", error)
        setQuotations([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuotations()
  }, [searchQuery, statusFilter, pagination.currentPage])

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleDeleteQuotation = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this quotation?")) {
      try {
        await quotationAPI.deleteQuotation(id)
        // Refresh quotations after deletion
        setQuotations(quotations.filter((quotation) => quotation._id !== id))
      } catch (error) {
        console.error("Error deleting quotation:", error)
        alert("Failed to delete quotation. Please try again.")
      }
    }
  }

  const handleSendQuotation = async (id: string) => {
    try {
      await quotationAPI.sendQuotation(id)
      // Update the status in the UI
      setQuotations(
        quotations.map((quotation) => (quotation._id === id ? { ...quotation, status: "sent" } : quotation)),
      )
    } catch (error) {
      console.error("Error sending quotation:", error)
      alert("Failed to send quotation. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
          <p className="text-muted-foreground">Manage and track your quotations</p>
        </div>
        <Button asChild>
          <Link href="/quotations/new">
            <Plus className="mr-2 h-4 w-4" /> Create New Quotation
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Quotations</CardTitle>
          <CardDescription>View and manage all your quotations in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quotations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quotation #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading state
                  [...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={6} className="h-16">
                        <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : quotations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No quotations found.
                    </TableCell>
                  </TableRow>
                ) : (
                  quotations.map((quotation) => (
                    <TableRow key={quotation._id}>
                      <TableCell className="font-medium">{quotation.quotationNumber}</TableCell>
                      <TableCell>{quotation.client.company}</TableCell>
                      <TableCell>{formatDate(quotation.date)}</TableCell>
                      <TableCell>{formatCurrency(quotation.total)}</TableCell>
                      <TableCell>{getStatusBadge(quotation.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/quotations/${quotation._id}`}>View details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/quotations/${quotation._id}/edit`}>Edit quotation</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {quotation.pdfUrl && (
                              <DropdownMenuItem asChild>
                                <a href={quotation.pdfUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="mr-2 h-4 w-4" /> Download PDF
                                </a>
                              </DropdownMenuItem>
                            )}
                            {quotation.status === "draft" && (
                              <DropdownMenuItem onClick={() => handleSendQuotation(quotation._id)}>
                                Send to client
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteQuotation(quotation._id)}
                            >
                              Delete quotation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {quotations.length} of {pagination.totalQuotations} quotations
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.currentPage === 1}
                  onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.currentPage === pagination.totalPages}
                  onClick={() => setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
