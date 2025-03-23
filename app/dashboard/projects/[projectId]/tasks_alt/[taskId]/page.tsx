"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronsUpDown,
  Edit,
  Loader2,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Save,
  Send,
  Trash2,
  User,
  X,
} from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

// Mock function to get task data
const getTaskData = (taskId: string) => {
  // In a real app, this would be an API call
  return {
    id: taskId,
    title: "Update homepage hero section",
    description:
      "Redesign the hero section with new imagery and copy that better reflects our brand values and appeals to our target audience. Include a stronger call-to-action and optimize for mobile viewing.",
    status: "In Progress",
    priority: "High",
    dueDate: new Date(2024, 1, 15),
    createdDate: new Date(2023, 11, 10),
    assignee: {
      id: "user2",
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tags: ["tag1", "tag2"],
    isCompleted: false,
    isOverdue: true,
    comments: [
      {
        id: "comment1",
        content: "I've started working on the mockups for this. Will share them by tomorrow.",
        author: {
          id: "user2",
          name: "Sam Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        createdAt: new Date(2023, 11, 12, 14, 35),
      },
      {
        id: "comment2",
        content: "Looking forward to seeing the designs. Make sure to incorporate the new color palette we discussed.",
        author: {
          id: "user1",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        createdAt: new Date(2023, 11, 12, 15, 20),
      },
      {
        id: "comment3",
        content: "Here are the initial mockups. Let me know what you think!",
        author: {
          id: "user2",
          name: "Sam Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        createdAt: new Date(2023, 11, 13, 10, 15),
        attachments: [{ id: "attach1", name: "hero-mockup-v1.png", type: "image", size: "1.2 MB" }],
      },
    ],
    activity: [
      {
        id: "activity1",
        type: "created",
        user: {
          id: "user1",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        timestamp: new Date(2023, 11, 10, 9, 30),
      },
      {
        id: "activity2",
        type: "assigned",
        user: {
          id: "user1",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        assignee: {
          id: "user2",
          name: "Sam Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        timestamp: new Date(2023, 11, 10, 9, 35),
      },
      {
        id: "activity3",
        type: "status_changed",
        user: {
          id: "user2",
          name: "Sam Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        oldStatus: "Todo",
        newStatus: "In Progress",
        timestamp: new Date(2023, 11, 12, 11, 15),
      },
    ],
  }
}

// Helper function to get priority badge color
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900/30 dark:text-red-400"
    case "Medium":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-400"
    case "Low":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400"
    default:
      return "bg-slate-100 text-slate-800 hover:bg-slate-100/80 dark:bg-slate-900/30 dark:text-slate-400"
  }
}

// Helper function to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Todo":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400"
    case "In Progress":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-400"
    case "Done":
      return "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400"
    case "Blocked":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100/80 dark:bg-purple-900/30 dark:text-purple-400"
    default:
      return "bg-slate-100 text-slate-800 hover:bg-slate-100/80 dark:bg-slate-900/30 dark:text-slate-400"
  }
}

export default function TaskDetailPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string
  const taskId = params.taskId as string

  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [newComment, setNewComment] = useState("")

  // Task data state
  const [taskData, setTaskData] = useState<any>(null)

  // Form state for editing
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: new Date(),
    assignee: "",
    selectedTags: [] as string[],
  })

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load task data
  useEffect(() => {
    const loadTask = async () => {
      try {
        // In a real app, this would be an API call
        const data = getTaskData(taskId)
        setTaskData(data)

        // Initialize form data for editing
        setFormData({
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          dueDate: data.dueDate,
          assignee: data.assignee?.id || "",
          selectedTags: data.tags,
        })
      } catch (error) {
        console.error("Error loading task:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTask()
  }, [taskId])

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
      // In a real app, this would be an API call to update the task
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update local task data
      setTaskData({
        ...taskData,
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate,
        assignee: formData.assignee ? teamMembers.find((m) => m.id === formData.assignee) : null,
        tags: formData.selectedTags,
      })

      // Exit edit mode
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating task:", error)
      setErrors({
        form: "There was an error updating the task. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return

    try {
      // In a real app, this would be an API call to add a comment
      const newCommentObj = {
        id: `comment${taskData.comments.length + 1}`,
        content: newComment,
        author: teamMembers[0], // Assuming the current user is the first team member
        createdAt: new Date(),
      }

      // Update local task data
      setTaskData({
        ...taskData,
        comments: [...taskData.comments, newCommentObj],
      })

      // Clear comment input
      setNewComment("")
    } catch (error) {
      console.error("Error adding comment:", error)
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

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading task data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/projects/${projectId}/tasks`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">Back to Tasks</div>
      </div>

      <div className="space-y-6">
        {/* Task Header */}
        <div className="flex justify-between items-start">
          {isEditing ? (
            <div className="w-full">
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-2xl font-bold h-auto py-2"
                placeholder="Task title"
              />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold">{taskData.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={getStatusColor(taskData.status)}>
                  {taskData.status}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(taskData.priority)}>
                  {taskData.priority}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created {formatDistanceToNow(taskData.createdDate, { addSuffix: true })}
                </span>
              </div>
            </div>
          )}

          {!isEditing && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Check className="mr-2 h-4 w-4" />
                    Mark as Complete
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Reassign
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="comments">Comments ({taskData.comments.length})</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4 pt-4">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div className="space-y-2">
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
                              <CommandItem
                                value="Unassigned"
                                onSelect={() => setFormData({ ...formData, assignee: "" })}
                              >
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
                  </div>
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

                <div className="flex justify-end gap-4 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isSubmitting}>
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
            ) : (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Description</h3>
                  <div className="text-sm">
                    {taskData.description || (
                      <span className="text-muted-foreground italic">No description provided</span>
                    )}
                  </div>
                </div>

                {/* Task Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Due Date</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className={taskData.isOverdue ? "text-red-600" : ""}>
                        {format(taskData.dueDate, "PPP")}
                        {taskData.isOverdue && " (Overdue)"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Assignee</h3>
                    {taskData.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={taskData.assignee.avatar} alt={taskData.assignee.name} />
                          <AvatarFallback>{taskData.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{taskData.assignee.name}</span>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Unassigned</div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {taskData.tags.length > 0 ? (
                      taskData.tags.map((tagId: string) => {
                        const tag = availableTags.find((t) => t.id === tagId)
                        return (
                          <Badge
                            key={tagId}
                            variant="secondary"
                            style={{ backgroundColor: `${tag?.color}20`, color: tag?.color }}
                          >
                            {tag?.name}
                          </Badge>
                        )
                      })
                    ) : (
                      <div className="text-sm text-muted-foreground">No tags</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" className="space-y-4 pt-4">
            {/* Comment List */}
            <div className="space-y-4">
              {taskData.comments.length > 0 ? (
                taskData.comments.map((comment: any) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                        </span>
                      </div>
                      <div className="bg-muted p-3 rounded-lg text-sm">{comment.content}</div>

                      {comment.attachments && comment.attachments.length > 0 && (
                        <div className="mt-2">
                          {comment.attachments.map((attachment: any) => (
                            <div
                              key={attachment.id}
                              className="flex items-center gap-2 p-2 rounded-md bg-background border text-sm"
                            >
                              <Paperclip className="h-4 w-4 text-muted-foreground" />
                              <span>{attachment.name}</span>
                              <span className="text-xs text-muted-foreground ml-auto">{attachment.size}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">No comments yet</h3>
                  <p className="text-sm text-muted-foreground">Be the first to comment on this task</p>
                </div>
              )}
            </div>

            {/* Add Comment */}
            <div className="pt-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={teamMembers[0].avatar} alt={teamMembers[0].name} />
                  <AvatarFallback>{teamMembers[0].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" type="button">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Attach
                    </Button>
                    <Button size="sm" type="button" onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4 pt-4">
            <div className="space-y-6">
              {taskData.activity.map((activity: any, index: number) => (
                <div key={activity.id} className="relative">
                  {index < taskData.activity.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-0 w-px bg-muted"></div>
                  )}
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                        </span>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {activity.type === "created" && <span>Created this task</span>}
                        {activity.type === "assigned" && (
                          <span>
                            Assigned this task to <span className="font-medium">{activity.assignee.name}</span>
                          </span>
                        )}
                        {activity.type === "status_changed" && (
                          <span>
                            Changed status from{" "}
                            <Badge variant="outline" className="text-xs font-normal">
                              {activity.oldStatus}
                            </Badge>{" "}
                            to{" "}
                            <Badge variant="outline" className="text-xs font-normal">
                              {activity.newStatus}
                            </Badge>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

