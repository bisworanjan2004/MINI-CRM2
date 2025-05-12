"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { mockLeads } from "@/lib/mock-data"

interface QuotationItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export default function NewQuotationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const leadId = searchParams.get("leadId")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [leads, setLeads] = useState<any[]>([])
  const [selectedLead, setSelectedLead] = useState<string>("")
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    company: "",
    address: "",
  })
  const [quotationInfo, setQuotationInfo] = useState({
    quotationNumber: `QT-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
    date: new Date().toISOString().split("T")[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    notes: "",
    terms: "Payment due within 30 days of receipt.",
  })
  const [items, setItems] = useState<QuotationItem[]>([
    {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      amount: 0,
    },
  ])

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // For demo purposes, we'll use mock data
    setLeads(mockLeads)

    // If leadId is provided in the URL, select that lead
    if (leadId) {
      setSelectedLead(leadId)
      const lead = mockLeads.find((l) => l.id === leadId)
      if (lead) {
        setClientInfo({
          name: lead.name,
          email: lead.email,
          company: lead.company,
          address: lead.address || "",
        })
      }
    }
  }, [leadId])

  const handleLeadChange = (leadId: string) => {
    setSelectedLead(leadId)
    const lead = leads.find((l) => l.id === leadId)
    if (lead) {
      setClientInfo({
        name: lead.name,
        email: lead.email,
        company: lead.company,
        address: lead.address || "",
      })
    }
  }

  const handleClientInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setClientInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuotationInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuotationInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (id: string, field: keyof QuotationItem, value: string | number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalculate amount if quantity or unitPrice changes
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  const addItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        unitPrice: 0,
        amount: 0,
      },
    ])
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.1 // 10% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would call your API here
      // const response = await fetch("/api/quotations", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: JSON.stringify({
      //     leadId: selectedLead,
      //     clientInfo,
      //     quotationInfo,
      //     items,
      //     subtotal: calculateSubtotal(),
      //     tax: calculateTax(),
      //     total: calculateTotal(),
      //   }),
      // })

      // if (!response.ok) {
      //   throw new Error("Failed to create quotation")
      // }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to quotations page
      router.push("/quotations")
    } catch (error) {
      console.error("Error creating quotation:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/quotations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Quotation</h1>
          <p className="text-muted-foreground">Create a new quotation for a client</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quotation Information</CardTitle>
              <CardDescription>Enter the basic information for this quotation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quotationNumber">Quotation Number</Label>
                  <Input
                    id="quotationNumber"
                    name="quotationNumber"
                    value={quotationInfo.quotationNumber}
                    onChange={handleQuotationInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={quotationInfo.date}
                    onChange={handleQuotationInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    name="validUntil"
                    type="date"
                    value={quotationInfo.validUntil}
                    onChange={handleQuotationInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead">Select Lead</Label>
                  <Select value={selectedLead} onValueChange={handleLeadChange}>
                    <SelectTrigger id="lead">
                      <SelectValue placeholder="Select a lead" />
                    </SelectTrigger>
                    <SelectContent>
                      {leads.map((lead) => (
                        <SelectItem key={lead.id} value={lead.id}>
                          {lead.name} - {lead.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>Enter the client details for this quotation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Client Name</Label>
                  <Input id="name" name="name" value={clientInfo.name} onChange={handleClientInfoChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={clientInfo.email}
                    onChange={handleClientInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={clientInfo.company}
                    onChange={handleClientInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={clientInfo.address} onChange={handleClientInfoChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quotation Items</CardTitle>
              <CardDescription>Add the items for this quotation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                            placeholder="Item description"
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(item.id, "quantity", Number.parseInt(e.target.value) || 0)
                            }
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) =>
                              handleItemChange(item.id, "unitPrice", Number.parseFloat(e.target.value) || 0)
                            }
                            required
                          />
                        </TableCell>
                        <TableCell>{formatCurrency(item.amount)}</TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button type="button" variant="outline" onClick={addItem}>
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>

              <div className="mt-4 flex flex-col items-end space-y-2">
                <div className="flex w-full max-w-xs justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div className="flex w-full max-w-xs justify-between">
                  <span>Tax (10%):</span>
                  <span>{formatCurrency(calculateTax())}</span>
                </div>
                <div className="flex w-full max-w-xs justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Add notes and terms for this quotation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={quotationInfo.notes}
                  onChange={handleQuotationInfoChange}
                  rows={3}
                  placeholder="Add any additional notes for this quotation..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms">Terms and Conditions</Label>
                <Textarea
                  id="terms"
                  name="terms"
                  value={quotationInfo.terms}
                  onChange={handleQuotationInfoChange}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/quotations">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Quotation"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
