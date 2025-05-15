"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, ChevronsUpDown, Loader2, Plus, Search, X } from "lucide-react"
import { format } from "date-fns"
import { debounce } from "lodash"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  CommandLoading,
} from "./command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { createProject, createProjectPermissions, getUsers } from "@/lib/dao/TaskDAOAlt"

// Types for team members
type TeamMember = {
  id: string
  name: string
  email: string
  role: string
  avatar: string
}

type TeamMemberWithPermission = TeamMember & {
  permission: "editor" | "commenter" | "viewer"
}

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

// Mock API functions - these would be replaced with actual API calls
const fetchTeamMembers = async (query = "", page = 1, limit = 5): Promise<TeamMember[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const allMembers = await getUsers(query)
  console.log(">>>>>>>>>>>>>>>> Inside fetchTeamMembers")
  console.log(allMembers)
  

  // Filter by query if provided
  const filtered = query
    ? allMembers.filter(
        (member) =>
          member.username.toLowerCase().includes(query.toLowerCase()) ||
          member.email.toLowerCase().includes(query.toLowerCase()) ||
          member.role.toLowerCase().includes(query.toLowerCase()),
      )
    : allMembers

  // Paginate results
  const start = (page - 1) * limit
  const end = start + limit
  return filtered.slice(start, end)
}

export default function NewProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    status: "Planning",
    priority: "Medium",
    color: colorOptions[0].value,
    selectedTeamMembers: [] as TeamMemberWithPermission[],
    owner: "" as string,
    ownerDetails: null as TeamMember | null,
  })

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoadingTeamMembers, setIsLoadingTeamMembers] = useState(false)
  const [teamMembersSearch, setTeamMembersSearch] = useState("")

  // Owner selection state
  const [potentialOwners, setPotentialOwners] = useState<TeamMember[]>([])
  const [isLoadingOwners, setIsLoadingOwners] = useState(false)
  const [ownerSearch, setOwnerSearch] = useState("")

  // New team member selection state
  const [selectedMemberId, setSelectedMemberId] = useState("")
  const [selectedMemberPermission, setSelectedMemberPermission] = useState<"editor" | "commenter" | "viewer">("editor")
  const [selectedMemberDetails, setSelectedMemberDetails] = useState<TeamMember | null>(null)

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Fetch initial team members
  useEffect(() => {
    const loadInitialTeamMembers = async () => {
      setIsLoadingTeamMembers(true)
      try {
        const members = await fetchTeamMembers()
        setTeamMembers(members)
      } catch (error) {
        console.error("Error loading team members:", error)
      } finally {
        setIsLoadingTeamMembers(false)
      }
    }

    loadInitialTeamMembers()
  }, [])

  // Fetch initial potential owners
  useEffect(() => {
    const loadInitialOwners = async () => {
      setIsLoadingOwners(true)
      try {
        const owners = await fetchTeamMembers()
        setPotentialOwners(owners)
      } catch (error) {
        console.error("Error loading potential owners:", error)
      } finally {
        setIsLoadingOwners(false)
      }
    }

    loadInitialOwners()
  }, [])

  // Debounced search for team members
  const debouncedTeamMemberSearch = useCallback(
    debounce(async (query: string) => {
      setIsLoadingTeamMembers(true)
      try {
        const members = await fetchTeamMembers(query)
        setTeamMembers(members)
      } catch (error) {
        console.error("Error searching team members:", error)
      } finally {
        setIsLoadingTeamMembers(false)
      }
    }, 300),
    [],
  )

  // Debounced search for owners
  const debouncedOwnerSearch = useCallback(
    debounce(async (query: string) => {
      setIsLoadingOwners(true)
      try {
        const owners = await fetchTeamMembers(query)
        setPotentialOwners(owners)
      } catch (error) {
        console.error("Error searching owners:", error)
      } finally {
        setIsLoadingOwners(false)
      }
    }, 300),
    [],
  )

  // Handle team member search
  useEffect(() => {
    if (teamMembersSearch) {
      debouncedTeamMemberSearch(teamMembersSearch)
    }
    return () => {
      debouncedTeamMemberSearch.cancel()
    }
  }, [teamMembersSearch, debouncedTeamMemberSearch])

  // Handle owner search
  useEffect(() => {
    if (ownerSearch) {
      debouncedOwnerSearch(ownerSearch)
    }
    return () => {
      debouncedOwnerSearch.cancel()
    }
  }, [ownerSearch, debouncedOwnerSearch])

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
      // In a real app, this would be an API call to create the project
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log(formData)
      const newProjectID = await createProject(formData.name, formData.description, formData.status, formData.priority, formData.color, formData.owner, formData.startDate, formData.endDate)
      // Redirect to projects page after successful creation
      
      console.log("Project created " + newProjectID)
      const memberPermissions = formData.selectedTeamMembers.map((member) => ({
        project_id: newProjectID,
        user_id: member.id,
        role: member.permission,
      }))

      await createProjectPermissions(memberPermissions);
      // TODO Redirect to Project over view page with valid onboarding hints
      router.push("/dashboard/projects/" + newProjectID + "/tasks")

    } catch (error) {
      console.error("Error creating project:", error)
      setErrors({
        form: "There was an error creating the project. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle owner selection
  const handleOwnerSelect = async (memberId: string) => {
    const member = potentialOwners.find((m) => m.id === memberId)
    if (member) {
      setFormData({
        ...formData,
        owner: memberId,
        ownerDetails: member,
      })
    }
  }

  // Handle team member selection
  const handleTeamMemberSelect = (memberId: string) => {
    const member = teamMembers.find((m) => m.id === memberId)
    if (member) {
      setSelectedMemberId(memberId)
      setSelectedMemberDetails(member)
    }
  }

  // Add team member with permission
  const addTeamMember = () => {
    if (selectedMemberId && selectedMemberDetails) {
      // Check if member is already added
      if (formData.selectedTeamMembers.some((m) => m.id === selectedMemberId)) {
        return
      }

      // Check if member is the owner
      if (selectedMemberId === formData.owner) {
        return
      }

      // Add member with permission
      setFormData((prev) => ({
        ...prev,
        selectedTeamMembers: [
          ...prev.selectedTeamMembers,
          {
            ...selectedMemberDetails,
            permission: selectedMemberPermission,
          },
        ],
      }))

      // Reset selection
      setSelectedMemberId("")
      setSelectedMemberDetails(null)
    }
  }

  // Remove team member
  const removeTeamMember = (memberId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTeamMembers: prev.selectedTeamMembers.filter((m) => m.id !== memberId),
    }))
  }

  // Get permission badge color
  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case "editor":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "commenter":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "viewer":
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">Back to Projects</div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-muted-foreground mt-1">Fill in the details below to create a new project</p>
        </div>

        {errors.form && <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Basic information about your project</CardDescription>
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
              <CardDescription>Assign team members to this project</CardDescription>
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
                      {formData.ownerDetails ? (
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={formData.ownerDetails.avatar} alt={formData.ownerDetails.username} />
                            <AvatarFallback>{formData.ownerDetails.username.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {formData.ownerDetails.username}
                        </div>
                      ) : (
                        "Select project owner"
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <div className="flex items-center border-b px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <CommandInput
                          placeholder="Search team members..."
                          className="h-9 border-0 focus:ring-0"
                          value={ownerSearch}
                          onValueChange={setOwnerSearch}
                        />
                      </div>
                      <CommandList>
                        {isLoadingOwners ? (
                          <CommandLoading>
                            <div className="flex items-center justify-center p-4">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              <span>Loading users...</span>
                            </div>
                          </CommandLoading>
                        ) : (
                          <>
                            <CommandEmpty>No team member found.</CommandEmpty>
                            <CommandGroup>
                              {potentialOwners.map((member) => (
                                <CommandItem
                                  key={member.id}
                                  value={member.username}
                                  onSelect={() => handleOwnerSelect(member.id)}
                                >
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage src={member.avatar} alt={member.username} />
                                    <AvatarFallback>{member.username.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <p>{member.username}</p>
                                    <p className="text-xs text-muted-foreground">{member.email}</p>
                                  </div>
                                  {formData.owner === member.id && <Check className="ml-2 h-4 w-4" />}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </>
                        )}
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
                      formData.selectedTeamMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-1 bg-muted rounded-md pl-1 pr-2 py-1">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={member.avatar} alt={member.username} />
                            <AvatarFallback>{member.username.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{member.username}</span>
                          <Badge
                            variant="secondary"
                            className={`text-xs ml-1 ${getPermissionColor(member.permission)}`}
                          >
                            {member.permission.charAt(0).toUpperCase() + member.permission.slice(1)}
                          </Badge>
                          <button
                            type="button"
                            onClick={() => removeTeamMember(member.id)}
                            className="h-4 w-4 rounded-full ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground p-1">No team members selected</div>
                    )}
                  </div>
                  <Separator />

                  {/* Team member selection */}
                  <div className="p-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className="w-full justify-between">
                              {selectedMemberDetails ? (
                                <div className="flex items-center">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage src={selectedMemberDetails.avatar} alt={selectedMemberDetails.username} />
                                    <AvatarFallback>{selectedMemberDetails.username.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  {selectedMemberDetails.username}
                                </div>
                              ) : (
                                "Select team member"
                              )}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0">
                            <Command>
                              <div className="flex items-center border-b px-3">
                                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                <CommandInput
                                  placeholder="Search team members..."
                                  className="h-9 border-0 focus:ring-0"
                                  value={teamMembersSearch}
                                  onValueChange={setTeamMembersSearch}
                                />
                              </div>
                              <CommandList>
                                {isLoadingTeamMembers ? (
                                  <CommandLoading>
                                    <div className="flex items-center justify-center p-4">
                                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                      <span>Loading users...</span>
                                    </div>
                                  </CommandLoading>
                                ) : (
                                  <>
                                    <CommandEmpty>No team member found.</CommandEmpty>
                                    <CommandGroup>
                                      {teamMembers
                                        .filter(
                                          (member) =>
                                            member.id !== formData.owner &&
                                            !formData.selectedTeamMembers.some((m) => m.id === member.id),
                                        )
                                        .map((member) => (
                                          <CommandItem
                                            key={member.id}
                                            value={member.username}
                                            onSelect={() => handleTeamMemberSelect(member.id)}
                                          >
                                            <Avatar className="h-6 w-6 mr-2">
                                              <AvatarImage src={member.avatar} alt={member.username} />
                                              <AvatarFallback>{member.username.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                              <p>{member.username}</p>
                                              <p className="text-xs text-muted-foreground">{member.email}</p>
                                            </div>
                                            {selectedMemberId === member.id && <Check className="ml-2 h-4 w-4" />}
                                          </CommandItem>
                                        ))}
                                    </CommandGroup>
                                  </>
                                )}
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      <Select
                        value={selectedMemberPermission}
                        onValueChange={(value: "editor" | "commenter" | "viewer") => setSelectedMemberPermission(value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Permission" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="commenter">Commenter</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button type="button" size="sm" onClick={addTeamMember} disabled={!selectedMemberId}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Permissions:</span>
                      <ul className="mt-1 space-y-1 pl-4">
                        <li>
                          <span className="font-medium">Editor:</span> Can edit project details and tasks
                        </li>
                        <li>
                          <span className="font-medium">Commenter:</span> Can add comments but not edit
                        </li>
                        <li>
                          <span className="font-medium">Viewer:</span> Can only view project content
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/projects")} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

