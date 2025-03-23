"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, ChevronsUpDown, Loader2, Save, Trash2, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock data for team members
const teamMembers = [
  { id: "user1", name: "Alex Johnson", role: "Project Manager", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user2", name: "Sam Taylor", role: "Designer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user3", name: "Jordan Lee", role: "Developer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user4", name: "Casey Morgan", role: "Content Writer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user5", name: "Riley Smith", role: "QA Tester", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user6", name: "Taylor Kim", role: "Marketing Specialist", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user7", name: "Morgan Chen", role: "Product Manager", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user8", name: "Jamie Wilson", role: "Backend Developer", avatar: "/placeholder.svg?height=32&width=32" },
]

// Color options for project
const colorOptions = [
  { name: "Indigo", value: "#4f46e5" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Teal", value: "#14b8a6" },
]

// Mock function to get project data
const getProjectData = (projectId: string) => {
  // In a real app, this would be an API call
  return {
    id: projectId,
    name: "Website Redesign",
    description: "Complete overhaul of the company website with new branding, improved UX, and mobile responsiveness.",
    startDate: new Date(2023, 9, 1), // Oct 1, 2023
    endDate: new Date(2024, 2, 31), // Mar 31, 2024
    status: "Execution",
    priority: "High",
    color: "#4f46e5",
    owner: "user1",
    teamMembers: ["user2", "user3", "user4", "user5"],
    createdAt: new Date(2023, 8, 15),
    lastModified: new Date(2023, 11, 10),
  }
}

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    status: "",
    priority: "",
    color: "",
    selectedTeamMembers: [] as string[],
    owner: "",
  })

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      try {
        // In a real app, this would be an API call
        const projectData = getProjectData(projectId)

        setFormData({
          name: projectData.name,
          description: projectData.description,
          startDate: projectData.startDate,
          endDate: projectData.endDate,
          status: projectData.status,
          priority: projectData.priority,
          color: projectData.color,
          selectedTeamMembers: projectData.teamMembers,
          owner: projectData.owner,
        })
      } catch (error) {
        console.error("Error loading project:", error)
        setErrors({
          form: "There was an error loading the project. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [projectId])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required"
    }

    if (formData.endDate < formData.startDate) {
      newErrors.endDate = "End date must be after start date"
    }

    if (!formData.owner) {
      newErrors.owner = "Project owner is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to update the project
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to project page after successful update
      router.push(`/projects/${projectId}`)
    } catch (error) {
      console.error("Error updating project:", error)
      setErrors({
        form: "There was an error updating the project. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle project deletion
  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // In a real app, this would be an API call to delete the project
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to projects page after successful deletion
      router.push("/projects")
    } catch (error) {
      console.error("Error deleting project:", error)
      setErrors({
        form: "There was an error deleting the project. Please try again.",
      })
      setIsDeleting(false)
    }
  }

  // Handle team member selection
  const toggleTeamMember = (memberId: string) => {
    setFormData((prev) => {
      if (prev.selectedTeamMembers.includes(memberId)) {
        return {
          ...prev,
          selectedTeamMembers: prev.selectedTeamMembers.filter((id) => id !== memberId),
        }
      } else {
        return {
          ...prev,
          selectedTeamMembers: [...prev.selectedTeamMembers, memberId],
        }
      }
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading project data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/projects/${projectId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">Back to Project</div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <p className="text-muted-foreground mt-1">Update project details and team members</p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Project
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the project and all associated tasks,
                  comments, and files.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Project"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {errors.form && <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Update the basic information about your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Project Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter project name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter project description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Execution">Execution</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal" id="startDate">
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(formData.startDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">
                    End Date
                    {errors.endDate && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          errors.endDate ? "border-destructive" : ""
                        }`}
                        id="endDate"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(formData.endDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                        initialFocus
                        disabled={(date) => date < formData.startDate}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Project Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`h-8 w-8 rounded-full border-2 ${
                        formData.color === color.value ? "border-primary" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      title={color.name}
                    >
                      {formData.color === color.value && <Check className="h-4 w-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>Manage team members for this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="owner">
                  Project Owner <span className="text-destructive">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={`w-full justify-between ${errors.owner ? "border-destructive" : ""}`}
                      id="owner"
                    >
                      {formData.owner ? (
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage
                              src={teamMembers.find((m) => m.id === formData.owner)?.avatar}
                              alt={teamMembers.find((m) => m.id === formData.owner)?.name}
                            />
                            <AvatarFallback>
                              {teamMembers.find((m) => m.id === formData.owner)?.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {teamMembers.find((m) => m.id === formData.owner)?.name}
                        </div>
                      ) : (
                        "Select project owner"
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search team members..." />
                      <CommandList>
                        <CommandEmpty>No team member found.</CommandEmpty>
                        <CommandGroup>
                          {teamMembers.map((member) => (
                            <CommandItem
                              key={member.id}
                              value={member.name}
                              onSelect={() => {
                                setFormData({ ...formData, owner: member.id })
                              }}
                            >
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p>{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                              </div>
                              {formData.owner === member.id && <Check className="ml-2 h-4 w-4" />}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.owner && <p className="text-sm text-destructive">{errors.owner}</p>}
              </div>

              <div className="space-y-2">
                <Label>Team Members</Label>
                <div className="border rounded-md">
                  <div className="p-2 flex flex-wrap gap-1">
                    {formData.selectedTeamMembers.length > 0 ? (
                      formData.selectedTeamMembers.map((memberId) => {
                        const member = teamMembers.find((m) => m.id === memberId)
                        return (
                          <Badge key={memberId} variant="secondary" className="flex items-center gap-1">
                            {member?.name}
                            <button
                              type="button"
                              onClick={() => toggleTeamMember(memberId)}
                              className="h-4 w-4 rounded-full"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )
                      })
                    ) : (
                      <div className="text-sm text-muted-foreground p-1">No team members selected</div>
                    )}
                  </div>
                  <Separator />
                  <div className="p-0">
                    <Command>
                      <CommandInput placeholder="Search team members..." />
                      <CommandList>
                        <CommandEmpty>No team member found.</CommandEmpty>
                        <CommandGroup>
                          {teamMembers
                            .filter((member) => member.id !== formData.owner)
                            .map((member) => (
                              <CommandItem
                                key={member.id}
                                value={member.name}
                                onSelect={() => toggleTeamMember(member.id)}
                              >
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p>{member.name}</p>
                                  <p className="text-xs text-muted-foreground">{member.role}</p>
                                </div>
                                {formData.selectedTeamMembers.includes(member.id) && <Check className="ml-2 h-4 w-4" />}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/projects/${projectId}`)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

