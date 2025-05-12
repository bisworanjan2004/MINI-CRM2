"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, FileQuestion, MessageSquare, Search } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setContactSubmitted(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Get help with using the Mini CRM system</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for help topics..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers about using the CRM system</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create a new lead?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      To create a new lead, navigate to the Leads section from the sidebar, then click on the "Add New
                      Lead" button in the top right corner. Fill out the required information in the form and click
                      "Create Lead" to save it.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I generate a quotation?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      To generate a quotation, go to the Quotations section and click "Create New Quotation". You can
                      also create a quotation directly from a lead by clicking the three dots menu next to a lead and
                      selecting "Create quotation".
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I change my password?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      To change your password, go to Settings, then select the "Security" tab. You'll find the password
                      change option there. You'll need to enter your current password and then your new password twice
                      to confirm.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I assign a lead to a team member?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      When editing a lead, you can assign it to a team member using the "Assigned To" dropdown in the
                      Additional Details section. You can also change the assignment from the lead details page.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I export reports?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      In the Reports section, after selecting your report parameters, you can use the export buttons to
                      download the report in various formats including CSV, PDF, or send it via email.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Can I customize the CRM fields?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Yes, administrators can customize fields in the Settings section under the "Company" tab. Look for
                      the "Custom Fields" option to add, edit, or remove fields for leads, contacts, and quotations.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>Detailed guides to help you use the CRM system effectively</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="cursor-pointer hover:bg-muted/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Getting Started Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Learn the basics of using the Mini CRM system</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Lead Management</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">How to effectively manage and track leads</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Creating Quotations</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Step-by-step guide to creating professional quotations
                    </p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Reporting & Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">How to generate and interpret reports</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">User Management</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Managing users, roles, and permissions</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/50">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">System Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Customizing the CRM to fit your business needs</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team for assistance</CardDescription>
            </CardHeader>
            <CardContent>
              {contactSubmitted ? (
                <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle>Support request submitted</AlertTitle>
                  <AlertDescription>
                    Thank you for contacting support. We'll get back to you within 24 hours.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={5} required />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Submit Request</Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Other Ways to Get Help</CardTitle>
              <CardDescription>Alternative support channels</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-4">
                <MessageSquare className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat with our support team in real-time during business hours.
                  </p>
                  <Button variant="link" className="p-0 h-auto">
                    Start Chat
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FileQuestion className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground">Browse our extensive knowledge base for answers.</p>
                  <Button variant="link" className="p-0 h-auto">
                    Visit Knowledge Base
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
