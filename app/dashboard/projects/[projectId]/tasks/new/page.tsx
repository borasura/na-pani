"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Check, ChevronsUpDown, Loader2, Plus, X, Search } from "lucide-react"
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
import { createTask, getUsers } from "@/lib/dao/TaskDAOAlt"
import { debounce } from "lodash"
import { CommandLoading } from "../../../new/command"

// Mock data for team members
const teamMembers = [
  { id: "user1", name: "Alex Johnson", role: "Project Manager", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user2", name: "Sam Taylor", role: "Designer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user3", name: "Jordan Lee", role: "Developer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user4", name: "Casey Morgan", role: "Content Writer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "user5", name: "Riley Smith", role: "QA Tester", avatar: "/placeholder.svg?height=32&width=32" },
]

// Mock data for available tags
const availableTags = [
  { id: "tag1", name: "Design", color: "#0ea5e9" },
  { id: "tag2", name: "Frontend", color: "#8b5cf6" },
  { id: "tag3", name: "Backend", color: "#10b981" },
  { id: "tag4", name: "Content", color: "#f59e0b" },
  { id: "tag5", name: "Mobile", color: "#ec4899" },
  { id: "tag6", name: "DevOps", color: "#6366f1" },
  { id: "tag7", name: "SEO", color: "#14b8a6" },
  { id: "tag8", name: "Planning", color: "#f43f5e" },
]

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

  
const fetchTeamMembers = async (query = "", page = 1, limit = 5): Promise<TeamMember[]> => {
  // Simulate API delay
  //await new Promise((resolve) => setTimeout(resolve, 800))

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

export default function NewTaskPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "Medium",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    assignee: "",
    selectedTags: [] as string[],
    owner: "" as string,
    ownerDetails: null as TeamMember | null,
  })

  const [potentialOwners, setPotentialOwners] = useState<TeamMember[]>([])
  const [isLoadingOwners, setIsLoadingOwners] = useState(false)
  const [ownerSearch, setOwnerSearch] = useState("")

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

      // Handle owner search
        useEffect(() => {
          if (ownerSearch) {
            debouncedOwnerSearch(ownerSearch)
          }
          return () => {
            debouncedOwnerSearch.cancel()
          }
        }, [ownerSearch, debouncedOwnerSearch])

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required"
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
      // In a real app, this would be an API call to create the task
      //await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log(formData)
        await createTask(formData.title, formData.description, formData.status, formData.dueDate, projectId, formData.priority, "", formData.owner); 
            console.log("Created new task ")
            
    // TODOU - create task API
      // Redirect to tasks page after successful creation
      router.push(`/dashboard/projects/${projectId}/tasks`)
    } catch (error) {
      console.error("Error creating task:", error)
      setErrors({
        form: "There was an error creating the task. Please try again.",
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

  // Handle tag selection
  const toggleTag = (tagId: string) => {
    setFormData((prev) => {
      if (prev.selectedTags.includes(tagId)) {
        return {
          ...prev,
          selectedTags: prev.selectedTags.filter((id) => id !== tagId),
        }
      } else {
        return {
          ...prev,
          selectedTags: [...prev.selectedTags, tagId],
        }
      }
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/projects/${projectId}/tasks`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">Back to Tasks</div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Task</h1>
          <p className="text-muted-foreground mt-1">Add a new task to your project</p>
        </div>

        {errors.form && <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
              <CardDescription>Basic information about the task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
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
                      <SelectItem value="Todo">Todo</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
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

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" id="dueDate">
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(formData.dueDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.dueDate}
                      onSelect={(date) => date && setFormData({ ...formData, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between" id="assignee">
                      {formData.assignee ? (
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage
                              src={teamMembers.find((m) => m.id === formData.assignee)?.avatar}
                              alt={teamMembers.find((m) => m.id === formData.assignee)?.name}
                            />
                            <AvatarFallback>
                              {teamMembers.find((m) => m.id === formData.assignee)?.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {teamMembers.find((m) => m.id === formData.assignee)?.name}
                        </div>
                      ) : (
                        "Unassigned"
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
                          <CommandItem value="Unassigned" onSelect={() => setFormData({ ...formData, assignee: "" })}>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border mr-2">
                              <X className="h-3 w-3" />
                            </div>
                            <span>Unassigned</span>
                            {formData.assignee === "" && <Check className="ml-auto h-4 w-4" />}
                          </CommandItem>
                          {teamMembers.map((member) => (
                            <CommandItem
                              key={member.id}
                              value={member.name}
                              onSelect={() => {
                                setFormData({ ...formData, assignee: member.id })
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
                              {formData.assignee === member.id && <Check className="ml-2 h-4 w-4" />}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div> */}

              <div className="space-y-2">
                <Label htmlFor="owner">
                Assignee <span className="text-destructive">*</span>
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
                        "Select Task Assignee"
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
                <Label>Tags</Label>
                <div className="border rounded-md">
                  <div className="p-2 flex flex-wrap gap-1">
                    {formData.selectedTags.length > 0 ? (
                      formData.selectedTags.map((tagId) => {
                        const tag = availableTags.find((t) => t.id === tagId)
                        return (
                          <Badge
                            key={tagId}
                            variant="secondary"
                            className="flex items-center gap-1"
                            style={{ backgroundColor: `${tag?.color}20`, color: tag?.color }}
                          >
                            {tag?.name}
                            <button type="button" onClick={() => toggleTag(tagId)} className="h-4 w-4 rounded-full">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )
                      })
                    ) : (
                      <div className="text-sm text-muted-foreground p-1">No tags selected</div>
                    )}
                  </div>
                  <Separator />
                  <div className="p-2">
                    <div className="text-sm font-medium mb-1">Available Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="outline"
                          className={`cursor-pointer ${
                            formData.selectedTags.includes(tag.id) ? "bg-primary text-primary-foreground" : ""
                          }`}
                          style={
                            formData.selectedTags.includes(tag.id)
                              ? {}
                              : { backgroundColor: `${tag.color}20`, color: tag.color }
                          }
                          onClick={() => toggleTag(tag.id)}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/projects/${projectId}/tasks`)}
              disabled={isSubmitting}
            >
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
                  Create Task
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}



