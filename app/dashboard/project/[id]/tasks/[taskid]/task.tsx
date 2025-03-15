"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, CalendarIcon, Pencil, RefreshCw, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { SidebarProvider, Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { createComment, updateTaskAttributes, updateTaskAttributes1, updateTaskDescription, updateTaskTitle } from "@/lib/dao/TaskDAOAlt"
import { UserSearchAutocomplete } from "@/app/pokemonsearch/user-search-autocomplete"

// Types
type ActivityType = "comment" | "update"
type Priority = "low" | "medium" | "high" | "urgent"
type Status = "todo" | "in-progress" | "in-review" | "done"

interface UserType {
  id: string
  name: string
  email: string
  avatar?: string
}

interface Activity {
  id: string
  type: ActivityType
  content: string
  username: string
  email: string
  change_type?: string
  new_values?: string
  previous_values?: string
  created_date: Date
}

interface Task {
  id: string
  project_id: string
  title: string
  description: string
  status: Status
  priority: Priority
  assigned_to: string | null
  due_date: Date | null
  assigned_to_id: string
  assigned_to_username: string
  activities: Activity[]
}

// Sample data
const users: UserType[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sam Taylor",
    email: "sam@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Jordan Lee",
    email: "jordan@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function EditTaskPage({taskActivities}) {
  console.log("Inside Edit Task Page", taskActivities)

  // taskActivities.activities.forEach(activity => {
  //   if (activity.activity_type && activity.activity_type === 'task_history') {
  //     activity.content = `${activity.previous_values} - ${activity.new_values}`;
  //   }
  // });

  // console.log("Updated task activities ---------------")
  // console.log(taskActivities)
  // console.log(JSON.stringify(taskActivities))

  const [task, setTask] = useState<Task>(taskActivities)
  const [newComment, setNewComment] = useState("")
  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [isStarred, setIsStarred] = useState(false)

  const handleFieldChange = (field: keyof Task, value: any) => {
    console.log("Updating value: " + field + " - " + value)
    setTask((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    const comment: Activity = {
      id: `act-${task.activities.length + 1}`,
      type: "comment",
      username: "CURRENT USER", // Current user
      email: "USER EMAIL",
      created_date: new Date(),
      content: newComment,
    }

    await createComment(task.id, comment.content, comment.created_date)

    setTask((prev) => ({
      ...prev,
      activities: [comment, ...prev.activities],
    }))

    setNewComment("")
  }

  const formatActivityDate = (date: Date) => {
    return format(date, "MMM d, yyyy 'at' h:mm a")
  }

  const handleTitleEdit = () => {
    setEditedTitle(task.title)
    setIsTitleEditing(true)
  }

  const handleDescriptionEdit = () => {
    setEditedDescription(task.description)
    setIsDescriptionEditing(true)
  }

  const handleTitleSave = () => {
    handleFieldChange("title", editedTitle)
    updateTaskTitle(task.id, editedTitle)
    setIsTitleEditing(false)
  }

  const handleDescriptionSave = () => {
    handleFieldChange("description", editedDescription)
    updateTaskDescription(task.id, editedDescription)
    setIsDescriptionEditing(false)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "title" | "description",
  ) => {
    if (e.key === "Enter" && field === "title") {
      e.preventDefault()
      handleTitleSave()
    } else if (e.key === "Escape") {
      if (field === "title") {
        setEditedTitle(task.title)
        setIsTitleEditing(false)
      } else {
        setEditedDescription(task.description)
        setIsDescriptionEditing(false)
      }
    }
  }

  async function saveTaskProperties(event: FormEvent<HTMLButtonElement>): void {
    console.log(event)
    console.log("Updating task activities")
    console.log(task.id, " - ", task.status, " - ", task.priority, " - ", task.due_date, " - ", task.assigned_to, " - ", task.assigned_to_username)
    //updateTaskAttributes(task.id, task.status, task.priority, task.due_date)
    updateTaskAttributes1(task.id, task.status, task.priority, task.due_date, task.assigned_to)
    //throw new Error("Function not implemented.")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="flex items-center gap-2 mr-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Back">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Refresh">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label="Star task"
                    onClick={() => setIsStarred(!isStarred)}
                  >
                    <Star className={cn("h-4 w-4", isStarred ? "fill-yellow-400 text-yellow-400" : "")} />
                  </Button>
                </div>
                <h1 className="text-2xl font-bold">Edit Task</h1>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <div className="mt-1 relative">
                    {isTitleEditing ? (
                      <Input
                        id="title"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={handleTitleSave}
                        onKeyDown={(e) => handleKeyDown(e, "title")}
                        className="pr-10"
                        autoFocus
                      />
                    ) : (
                      // <div className="flex items-center justify-between p-2 border rounded-md bg-background hover:bg-muted/50">
                      <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                        <div className="font-medium">{task.title}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleTitleEdit}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit title</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <div className="mt-1 relative">
                    {isDescriptionEditing ? (
                      <Textarea
                        id="description"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        onBlur={handleDescriptionSave}
                        onKeyDown={(e) => handleKeyDown(e, "description")}
                        className="min-h-[120px]"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-start justify-between p-2 border rounded-md bg-muted/50">
                        <div className="whitespace-pre-wrap">{task.description}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleDescriptionEdit}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit description</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Activity</h2>

                <div className="mb-6">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="mt-2 flex justify-end">
                    <Button onClick={handleAddComment}>Add Comment</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {task.activities.map((activity) => (
                    <Card key={activity.id} className="py-0">
                      <CardContent className={cn("p-2", activity.type === "update" ? "bg-muted/50" : "")}>
                        <div className="flex items-start gap-3">
                          <Avatar className="h-6 w-6">
                            {/* <AvatarImage src={activity.user.avatar} alt={activity.user.name} /> */}
                            <AvatarFallback>{activity.username.charAt(0)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{activity.username}</p>
                              <p className="text-xs text-muted-foreground">{formatActivityDate(activity.created_date)}</p>
                            </div>

                            {activity.type === "comment" ? (
                              <p className="mt-1">{activity.content}</p>
                            ) : (
                              <p className="mt-1 text-sm text-muted-foreground">
                                <b>{activity.username}</b> updated {activity.change_type} from {activity.previous_values} to <b>{activity.new_values}</b>
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar variant="inset" collapsible="none" className="w-full md:w-80 border-l">
            <SidebarContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Task Details</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={task.status} onValueChange={(value) => handleFieldChange("status", value)}>
                    <SelectTrigger id="status" className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Backlog">Backlog</SelectItem>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={task.priority}
                    onValueChange={(value) => handleFieldChange("priority", value as Priority)}
                  >
                    <SelectTrigger id="priority" className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Select
                    value={task.assigned_to || ""}
                    onValueChange={(value) => {
                      const user = users.find((u) => u.id === value) || null
                      handleFieldChange("assigned_to", user)
                    }}
                  >
                    <SelectTrigger id="assignedTo" className="mt-1">
                      <SelectValue placeholder="Assign to someone" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                <UserSearchAutocomplete
                      value={task.assigned_to_username}
                      onChange={(selectedUser) => {
                        console.log(">> Selected user - ", selectedUser)
                        console.log(">> This is good")
                        handleFieldChange("assigned_to", selectedUser)
                      }}
                      />
                </div>

                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full mt-1 justify-start text-left font-normal",
                          !task.due_date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {task.due_date ? format(task.due_date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={task.due_date || undefined}
                        onSelect={(date) => handleFieldChange("due_date", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Separator className="my-6" />

                <div className="flex gap-2">
                  <Button onClick={saveTaskProperties} className="flex-1">Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </div>
            </SidebarContent>
          </Sidebar>
        </div>
      </div>
    </SidebarProvider>
  )
}

