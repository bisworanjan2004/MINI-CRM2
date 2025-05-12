"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Plus, Trash2, UserPlus } from "lucide-react"

export function TeamSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [teamMembers, setTeamMembers] = useState([
    { id: "1", name: "John Doe", email: "john.doe@example.com", role: "admin", status: "active" },
    { id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "manager", status: "active" },
    { id: "3", name: "Mike Johnson", email: "mike.j@example.com", role: "employee", status: "active" },
    { id: "4", name: "Sarah Williams", email: "sarah.w@example.com", role: "employee", status: "invited" },
  ])

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "employee",
  })

  const [roles, setRoles] = useState([
    { id: "1", name: "Admin", description: "Full access to all features" },
    { id: "2", name: "Manager", description: "Can manage leads, quotations, and reports" },
    { id: "3", name: "Employee", description: "Can view and edit assigned leads and quotations" },
  ])

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
  })

  const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMember((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewRole((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleSelectChange = (value: string) => {
    setNewMember((prev) => ({ ...prev, role: value }))
  }

  const addTeamMember = () => {
    if (newMember.name.trim() === "" || newMember.email.trim() === "") return

    setTeamMembers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        status: "invited",
      },
    ])

    setNewMember({
      name: "",
      email: "",
      role: "employee",
    })
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id))
  }

  const addRole = () => {
    if (newRole.name.trim() === "") return

    setRoles((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newRole.name,
        description: newRole.description,
      },
    ])

    setNewRole({
      name: "",
      description: "",
    })
  }

  const removeRole = (id: string) => {
    setRoles((prev) => prev.filter((role) => role.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSuccessMessage("")

    try {
      // In a real app, you would call your API here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage("Team settings saved successfully")
    } catch (error) {
      console.error("Error saving team settings:", error)
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
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage your team members and their access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{member.role}</TableCell>
                      <TableCell>
                        {member.status === "active" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Invited
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeTeamMember(member.id)}>
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
                <Label htmlFor="memberName">Name</Label>
                <Input
                  id="memberName"
                  name="name"
                  value={newMember.name}
                  onChange={handleNewMemberChange}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="memberEmail">Email</Label>
                <Input
                  id="memberEmail"
                  name="email"
                  type="email"
                  value={newMember.email}
                  onChange={handleNewMemberChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="memberRole">Role</Label>
                <Select value={newMember.role} onValueChange={handleRoleSelectChange}>
                  <SelectTrigger id="memberRole">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="button" variant="outline" onClick={addTeamMember}>
              <UserPlus className="mr-2 h-4 w-4" /> Add Team Member
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
            <CardDescription>Manage roles and their permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeRole(role.id)}
                          disabled={["1", "2", "3"].includes(role.id)} // Prevent removing default roles
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input
                  id="roleName"
                  name="name"
                  value={newRole.name}
                  onChange={handleNewRoleChange}
                  placeholder="Enter role name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleDescription">Description</Label>
                <Input
                  id="roleDescription"
                  name="description"
                  value={newRole.description}
                  onChange={handleNewRoleChange}
                  placeholder="Enter description"
                />
              </div>
            </div>

            <Button type="button" variant="outline" onClick={addRole}>
              <Plus className="mr-2 h-4 w-4" /> Add Role
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
