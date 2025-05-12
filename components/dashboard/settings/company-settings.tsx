"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Plus, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CompanySettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [companyData, setCompanyData] = useState({
    name: "Acme Corporation",
    address: "123 Business Ave, Suite 100",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    website: "https://www.acmecorp.com",
    taxId: "12-3456789",
    industry: "Technology",
    logo: "",
    about: "Acme Corporation is a leading provider of innovative business solutions.",
  })

  const [customFields, setCustomFields] = useState([
    { id: "1", name: "Customer Type", entity: "lead", type: "dropdown" },
    { id: "2", name: "Referral Source", entity: "lead", type: "text" },
    { id: "3", name: "Payment Terms", entity: "quotation", type: "dropdown" },
  ])

  const [newField, setNewField] = useState({
    name: "",
    entity: "lead",
    type: "text",
  })

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompanyData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCompanyData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewField((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewFieldSelectChange = (name: string, value: string) => {
    setNewField((prev) => ({ ...prev, [name]: value }))
  }

  const addCustomField = () => {
    if (newField.name.trim() === "") return

    setCustomFields((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newField.name,
        entity: newField.entity,
        type: newField.type,
      },
    ])

    setNewField({
      name: "",
      entity: "lead",
      type: "text",
    })
  }

  const removeCustomField = (id: string) => {
    setCustomFields((prev) => prev.filter((field) => field.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccessMessage("")

    try {
      // In a real app, you would call your API here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage("Company settings saved successfully")
    } catch (error) {
      console.error("Error saving company settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && (
        <Alert className="mb-4 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Manage your company details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={companyData.name}
                  onChange={handleCompanyChange}
                  required
                  onChange={handleCompanyChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={companyData.address} onChange={handleCompanyChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={companyData.city} onChange={handleCompanyChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" name="state" value={companyData.state} onChange={handleCompanyChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip/Postal Code</Label>
                <Input id="zipCode" name="zipCode" value={companyData.zipCode} onChange={handleCompanyChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={companyData.country} onChange={handleCompanyChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={companyData.phone} onChange={handleCompanyChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" value={companyData.website} onChange={handleCompanyChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input id="taxId" name="taxId" value={companyData.taxId} onChange={handleCompanyChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" name="industry" value={companyData.industry} onChange={handleCompanyChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea id="about" name="about" value={companyData.about} onChange={handleCompanyChange} rows={4} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Fields</CardTitle>
            <CardDescription>Manage custom fields for leads, quotations, and other entities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field Name</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customFields.map((field) => (
                    <TableRow key={field.id}>
                      <TableCell>{field.name}</TableCell>
                      <TableCell className="capitalize">{field.entity}</TableCell>
                      <TableCell className="capitalize">{field.type}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeCustomField(field.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="fieldName">Field Name</Label>
                <Input
                  id="fieldName"
                  name="name"
                  value={newField.name}
                  onChange={handleNewFieldChange}
                  placeholder="Enter field name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fieldEntity">Entity</Label>
                <Select value={newField.entity} onValueChange={(value) => handleNewFieldSelectChange("entity", value)}>
                  <SelectTrigger id="fieldEntity">
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="quotation">Quotation</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fieldType">Field Type</Label>
                <Select value={newField.type} onValueChange={(value) => handleNewFieldSelectChange("type", value)}>
                  <SelectTrigger id="fieldType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="dropdown">Dropdown</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="button" variant="outline" onClick={addCustomField}>
              <Plus className="mr-2 h-4 w-4" /> Add Custom Field
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
