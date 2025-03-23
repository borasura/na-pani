"use client"

import { useState } from "react"
import { AlertCircle, Calendar, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for tasks
const tasks = [
  {
    id: "task1",
    title: "Update homepage hero section",
    description: "Redesign the hero section with new imagery and copy",
    status: "In Progress",
    priority: "High",
    due_date: new Date(2024, 1, 15),
    created_date: new Date(2023, 11, 10),
    assignee: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tags: ["Design", "Frontend"],
    is_completed: false,
    is_overdue: true,
  },
  {
    id: "task2",
    title: "Finalize color palette",
    description: "Select and document the final color scheme for the website",
    status: "Todo",
    priority: "Medium",
    due_date: new Date(2024, 1, 20),
    created_date: new Date(2023, 11, 12),
    assignee: {
      id: "user2",
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tags: ["Design"],
    is_completed: false,
    is_overdue: false,
  },
  {
    id: "task3",
    title: "Create mobile wireframes",
    description: "Design wireframes for mobile version of all key pages",
    status: "Todo",
    priority: "High",
    due_date: new Date(2024, 1, 25),
    created_date: new Date(2023, 11, 15),
    assignee: null,
    tags: ["Design", "Mobile"],
    is_completed: false,
    is_overdue: false,
  },
  {
    id: "task4",
    title: "Implement responsive navigation",
    description: "Code the responsive navigation menu for all screen sizes",
    status: "In Progress",
    priority: "Medium",
    due_date: new Date(2024, 1, 18),
    created_date: new Date(2023, 11, 20),
    assignee: {
      id: "user3",
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tags: ["Development", "Frontend"],
    is_completed: false,
    is_overdue: false,
  },
  {
    id: "task5",
    title: "Set up CI/CD pipeline",
    description: "Configure continuous integration and deployment workflow",
    status: "Done",
    priority: "Medium",
    due_date: new Date(2024, 1, 10),
    created_date: new Date(2023, 11, 5),
    assignee: {
      id: "user3",
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tags: ["DevOps"],
    is_completed: true,
    is_overdue: false,
  },
  {
    id: "task6",
    title: "Content migration strategy",
    description: "Plan and document the approach for migrating existing content",
    status: "Blocked",
    priority: "Medium",
    due_date: new Date(2024, 1, 22),
    created_date: new Date(2023, 11, 18),
    assignee: {
      id: "user4",
      name: "Casey Morgan",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tags: ["Content", "Planning"],
    is_completed: false,
    is_overdue: false,
    blocker: "Waiting for content inventory from client",
  },
  {
    id: "task7",
    title: "SEO optimization plan",
    description: "Develop strategy for improving SEO on the new website",
    status: "Todo",
    priority: "Low",
    due_date: new Date(2024, 2, 5),
    created_date: new Date(2023, 11, 22),
    assignee: null,
    tags: ["SEO", "Planning"],
    is_completed: false,
    is_overdue: false,
  },
  {
    id: "task8",
    title: "Payment gateway integration",
    description: "Integrate and test payment processing functionality",
    status: "Blocked",
    priority: "High",
    due_date: new Date(2024, 1, 28),
    created_date: new Date(2023, 11, 25),
    assignee: {
      id: "user3",
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    tags: ["Development", "Backend"],
    is_completed: false,
    is_overdue: false,
    blocker: "Waiting for API credentials",
  },
]

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

// Helper function to get status column color
const getStatusColumnColor = (status: string) => {
  switch (status) {
    case "Todo":
      return "bg-blue-50 dark:bg-blue-950/20"
    case "In Progress":
      return "bg-amber-50 dark:bg-amber-950/20"
    case "Done":
      return "bg-green-50 dark:bg-green-950/20"
    case "Blocked":
      return "bg-purple-50 dark:bg-purple-950/20"
    default:
      return "bg-slate-50 dark:bg-slate-950/20"
  }
}

export default function BoardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")

  // Filter tasks
  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((task) => (priorityFilter === "all" ? true : task.priority === priorityFilter))
    .filter((task) => {
      if (assigneeFilter === "all") return true
      if (assigneeFilter === "unassigned") return task.assignee === null
      return task.assignee?.id === assigneeFilter
    })

  // Group tasks by status
  const columns = [
    { id: "todo", title: "Todo", color: "bg-blue-500" },
    { id: "in-progress", title: "In Progress", color: "bg-amber-500" },
    { id: "blocked", title: "Blocked", color: "bg-purple-500" },
    { id: "done", title: "Done", color: "bg-green-500" },
  ]

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  // Get unique assignees for filter
  const uniqueAssignees = Array.from(new Set(tasks.filter((task) => task.assignee).map((task) => task.assignee)))

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Board</h2>
          <p className="text-muted-foreground">Visualize tasks by status</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {uniqueAssignees.map((assignee) => (
                <SelectItem key={assignee!.id} value={assignee!.id}>
                  {assignee!.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Board columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`rounded-lg border ${getStatusColumnColor(column.title)} p-3 min-h-[500px] min-w-[280px]`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${column.color}`}></div>
                <h3 className="font-semibold">{column.title}</h3>
                <Badge variant="outline" className="ml-1">
                  {getTasksByStatus(column.title).length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {getTasksByStatus(column.title).map((task) => (
                <Card key={task.id} className="shadow-sm">
                  <CardHeader className="p-3 pb-0">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                          <DropdownMenuItem>Assign Task</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="line-clamp-2 text-xs mt-1">{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-2">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {task.blocker && (
                      <div className="flex items-center gap-1 mb-2 text-xs text-red-600 bg-red-50 dark:bg-red-950/20 p-1.5 rounded">
                        <AlertCircle className="h-3 w-3" />
                        <span className="line-clamp-1">{task.blocker}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className={task.is_overdue ? "text-red-600" : ""}>{format(task.due_date, "MMM d")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    {task.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                          <AvatarFallback>
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{task.assignee.name}</span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-xs bg-muted">
                        Unassigned
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              ))}

              {getTasksByStatus(column.title).length === 0 && (
                <div className="flex flex-col items-center justify-center h-24 border border-dashed rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">No tasks</p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Task
                  </Button>
                </div>
              )}

              <Button variant="ghost" className="w-full justify-start text-muted-foreground text-sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

