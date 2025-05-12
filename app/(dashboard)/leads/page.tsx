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
import { Plus, MoreHorizontal, Search, Filter } from "lucide-react"
import { leadAPI, userAPI } from "@/lib/api"

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [filteredLeads, setFilteredLeads] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLeads: 0,
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userAPI.getUsers()
        setUsers(response.data.users)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchLeads = async () => {
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

        if (assigneeFilter !== "all") {
          params.assignedTo = assigneeFilter
        }

        const response = await leadAPI.getLeads(params)

        setLeads(response.data.leads)
        setFilteredLeads(response.data.leads)
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalLeads: response.data.total,
        })
      } catch (error) {
        console.error("Error fetching leads:", error)
        setLeads([])
        setFilteredLeads([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [searchQuery, statusFilter, assigneeFilter, pagination.currentPage])

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

  const handleDeleteLead = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await leadAPI.deleteLead(id)
        // Refresh leads after deletion
        setLeads(leads.filter((lead) => lead._id !== id))
        setFilteredLeads(filteredLeads.filter((lead) => lead._id !== id))
      } catch (error) {
        console.error("Error deleting lead:", error)
        alert("Failed to delete lead. Please try again.")
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Manage and track your leads</p>
        </div>
        <Button asChild>
          <Link href="/leads/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Lead
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>View and manage all your leads in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
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
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
              <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
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
                ) : filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No leads found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead._id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{lead.name}</div>
                          <div className="text-sm text-muted-foreground">{lead.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell>{lead.assignedTo ? lead.assignedTo.name || "Unknown" : "Unassigned"}</TableCell>
                      <TableCell>{formatDate(lead.createdAt)}</TableCell>
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
                              <Link href={`/leads/${lead._id}`}>View details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/leads/${lead._id}/edit`}>Edit lead</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/quotations/new?leadId=${lead._id}`}>Create quotation</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteLead(lead._id)}>
                              Delete lead
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
                Showing {filteredLeads.length} of {pagination.totalLeads} leads
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
