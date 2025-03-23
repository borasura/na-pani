"use client"

import { useState } from "react"
import {
  AlertCircle,
  ArrowUpDown,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Tag,
  User,
} from "lucide-react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

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

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  // Filter tasks
  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((task) => (statusFilter === "all" ? true : task.status === statusFilter))
    .filter((task) => (priorityFilter === "all" ? true : task.priority === priorityFilter))
    .filter((task) => {
      if (assigneeFilter === "all") return true
      if (assigneeFilter === "unassigned") return task.assignee === null
      return task.assignee?.id === assigneeFilter
    })

  // Toggle task selection
  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  // Toggle all tasks
  const toggleAllTasks = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([])
    } else {
      setSelectedTasks(filteredTasks.map((task) => task.id))
    }
  }

  // Get unique assignees for filter
  const uniqueAssignees = Array.from(new Set(tasks.filter((task) => task.assignee).map((task) => task.assignee)))

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Tasks</h2>
          <p className="text-muted-foreground">Manage and track project tasks</p>
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Todo">Todo</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
              <SelectItem value="Blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>

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

      {/* Bulk actions (visible when tasks are selected) */}
      {selectedTasks.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <span className="text-sm font-medium">{selectedTasks.length} selected</span>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm">
              <User className="mr-2 h-4 w-4" />
              Assign
            </Button>
            <Button variant="outline" size="sm">
              <Tag className="mr-2 h-4 w-4" />
              Add Tag
            </Button>
            <Button variant="outline" size="sm">
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark Complete
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Tasks table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                  onCheckedChange={toggleAllTasks}
                  aria-label="Select all tasks"
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Task
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead className="w-[150px]">Due Date</TableHead>
              <TableHead className="w-[150px]">Assignee</TableHead>
              <TableHead className="w-[100px]">Tags</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={() => toggleTaskSelection(task.id)}
                      aria-label={`Select ${task.title}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{task.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    {task.blocker && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <AlertCircle className="h-3 w-3" />
                        <span className="truncate max-w-[100px]">{task.blocker}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className={task.is_overdue ? "text-red-600" : ""}>
                        {format(task.due_date, "MMM d, yyyy")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {task.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                          <AvatarFallback>
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee.name}</span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="bg-muted">
                        Unassigned
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
                          Assign Task
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="mr-2 h-4 w-4" />
                          Change Due Date
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="h-6 w-6 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No tasks found</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery("")
                        setStatusFilter("all")
                        setPriorityFilter("all")
                        setAssigneeFilter("all")
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

