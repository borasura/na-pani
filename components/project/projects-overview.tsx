"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Clock,
  Grid3X3,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Users,
} from "lucide-react"
import { format, isValid } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AvatarGroup } from "./avatar-group"

// Mock data for demonstration
const projects = [
  {
    id: "proj1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with new branding, improved UX, and mobile responsiveness.",
    color: "#4f46e5",
    status: "Execution",
    priority: "High",
    progress: 65,
    start_date: new Date(2023, 9, 1), // Oct 1, 2023
    end_date: new Date(2024, 2, 31), // Mar 31, 2024
    days_remaining: 45,
    tasks: {
      total: 124,
      completed: 42,
      in_progress: 27,
      overdue: 3,
    },
    team: [
      { id: "user1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user2", name: "Sam Taylor", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user3", name: "Jordan Lee", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user4", name: "Casey Morgan", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    needs_attention: true,
    starred: true,
  },
  {
    id: "proj2",
    name: "Mobile App Development",
    description: "Building a cross-platform mobile application for iOS and Android with React Native.",
    color: "#0ea5e9",
    status: "Planning",
    priority: "Medium",
    progress: 15,
    start_date: new Date(2023, 10, 15), // Nov 15, 2023
    end_date: new Date(2024, 5, 30), // Jun 30, 2024
    days_remaining: 136,
    tasks: {
      total: 98,
      completed: 12,
      in_progress: 8,
      overdue: 0,
    },
    team: [
      { id: "user2", name: "Sam Taylor", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user3", name: "Jordan Lee", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user5", name: "Riley Smith", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    needs_attention: false,
    starred: false,
  },
  {
    id: "proj3",
    name: "Marketing Campaign",
    description: "Q1 marketing campaign for new product launch including social media, email, and content strategy.",
    color: "#f59e0b",
    status: "Execution",
    priority: "High",
    progress: 42,
    start_date: new Date(2023, 11, 1), // Dec 1, 2023
    end_date: new Date(2024, 2, 15), // Mar 15, 2024
    days_remaining: 29,
    tasks: {
      total: 56,
      completed: 23,
      in_progress: 15,
      overdue: 2,
    },
    team: [
      { id: "user1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user4", name: "Casey Morgan", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user6", name: "Taylor Kim", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    needs_attention: true,
    starred: true,
  },
  {
    id: "proj4",
    name: "Product Launch",
    description: "Coordinating the launch of our new flagship product including PR, events, and sales enablement.",
    color: "#10b981",
    status: "Planning",
    priority: "High",
    progress: 22,
    start_date: new Date(2023, 11, 15), // Dec 15, 2023
    end_date: new Date(2024, 3, 30), // Apr 30, 2024
    days_remaining: 75,
    tasks: {
      total: 87,
      completed: 19,
      in_progress: 12,
      overdue: 0,
    },
    team: [
      { id: "user1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user2", name: "Sam Taylor", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user4", name: "Casey Morgan", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user5", name: "Riley Smith", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user6", name: "Taylor Kim", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    needs_attention: false,
    starred: false,
  },
  {
    id: "proj5",
    name: "Customer Research",
    description: "Conducting user interviews and surveys to gather insights for product development.",
    color: "#8b5cf6",
    status: "Closed",
    priority: "Medium",
    progress: 100,
    start_date: new Date(2023, 8, 1), // Sep 1, 2023
    end_date: new Date(2023, 10, 30), // Nov 30, 2023
    days_remaining: 0,
    tasks: {
      total: 42,
      completed: 42,
      in_progress: 0,
      overdue: 0,
    },
    team: [
      { id: "user4", name: "Casey Morgan", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user6", name: "Taylor Kim", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    needs_attention: false,
    starred: false,
  },
  {
    id: "proj6",
    name: "Infrastructure Upgrade",
    description: "Migrating our infrastructure to the cloud and implementing CI/CD pipelines.",
    color: "#ec4899",
    status: "Execution",
    priority: "Medium",
    progress: 58,
    start_date: new Date(2023, 10, 1), // Nov 1, 2023
    end_date: new Date(2024, 1, 28), // Feb 28, 2024
    days_remaining: 14,
    tasks: {
      total: 63,
      completed: 37,
      in_progress: 18,
      overdue: 1,
    },
    team: [
      { id: "user3", name: "Jordan Lee", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user5", name: "Riley Smith", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    needs_attention: true,
    starred: false,
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
    case "Planning":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400"
    case "Execution":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-400"
    case "Closed":
      return "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400"
    default:
      return "bg-slate-100 text-slate-800 hover:bg-slate-100/80 dark:bg-slate-900/30 dark:text-slate-400"
  }
}

/**
 * 
 * @param param0 TODO Needs Attention and Starred - both are not implemented. This needs to be fixed.
 * @returns 
 */

export default function ProjectsOverview({ projects }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  // Filter and sort projects
  const filteredProjects = projects
    .filter(
      (project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((project) => (statusFilter === "all" ? true : project.status === statusFilter))
    .filter((project) => (priorityFilter === "all" ? true : project.priority === priorityFilter))
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "deadline":
          return a.end_date.getTime() - b.end_date.getTime()
        case "progress":
          return b.progress - a.progress
        case "priority":
          const priorityOrder = { High: 0, Medium: 1, Low: 2 }
          return (
            priorityOrder[a.priority as keyof typeof priorityOrder] -
            priorityOrder[b.priority as keyof typeof priorityOrder]
          )
        default:
          return 0
      }
    })

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all your projects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
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
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="Execution">Execution</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
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

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center rounded-md border bg-background">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-none rounded-l-md"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="rounded-none rounded-r-md"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Projects Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }} />
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      {project.starred && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                    </div>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        {project.starred ? "Unstar Project" : "Star Project"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Manage Team
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Open Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  {/* Status and Priority */}
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <Badge variant="outline" style={{ borderColor: getStatusColor(project.status), color: getStatusColor(project.status) }}>
                    {project.status}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(project.priority)}>
                      {project.priority} Priority
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Timeline */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {/* <span>
                        {format(project.start_date, "MMM d")} - {format(project.end_date, "MMM d, yyyy")}
                      </span> */}
                      <span>
                      {isValid(project.start_date) ? format(project.start_date, "MMM d") : 'N/A'}{' '}-{' '}
                      {isValid(project.end_date) ? format(project.end_date, "MMM d, yyyy") : 'N/A'}
                    </span>
                    </div>
                    {project.days_remaining > 0 ? (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{project.days_remaining} days left</span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    )}
                  </div>

                  {/* Task Stats */}
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="rounded-md bg-muted p-2">
                      <div className="text-lg font-semibold">{project.tasks.total}</div>
                      <div className="text-xs text-muted-foreground">Tasks</div>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <div className="text-lg font-semibold text-green-600">{project.tasks.done}</div>
                      <div className="text-xs text-muted-foreground">Done</div>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <div className="text-lg font-semibold text-blue-600">{project.tasks.in_progress}</div>
                      <div className="text-xs text-muted-foreground">In Progress</div>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <div
                        className={`text-lg font-semibold ${project.tasks.overdue > 0 ? "text-red-600" : "text-muted-foreground"}`}
                      >
                        {project.tasks.overdue}
                      </div>
                      <div className="text-xs text-muted-foreground">Overdue</div>
                    </div>
                  </div>

                  {/* Team */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Team</div>
                    <AvatarGroup>
                      {project.team.map((member) => (
                        <Avatar key={member.id} className="h-7 w-7 border-2 border-background">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </div>

                  {/* Attention Indicator */}
                  {project.needs_attention && (
                    <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-800/30 dark:bg-red-900/30 dark:text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>Needs attention</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex w-full gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/dashboard/projects/${project.id}/tasks`}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Tasks
                    </Link>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Overview
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Projects List View */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }} />
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        {project.starred && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 border-t md:border-t-0 md:border-l p-4 bg-muted/30">
                  <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="text-xs text-muted-foreground">Progress</div>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2 w-20" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="text-xs text-muted-foreground">Timeline</div>
                    <div className="text-sm">
                      {project.days_remaining > 0 ? (
                        <span>{project.days_remaining} days left</span>
                      ) : (
                        <span className="text-green-600">Completed</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="text-xs text-muted-foreground">Tasks</div>
                    <div className="text-sm">
                      <span className="font-medium">{project.tasks.done}</span>
                      <span className="text-muted-foreground">/{project.tasks.total}</span>
                      {project.tasks.overdue > 0 && (
                        <span className="ml-2 text-red-600">{project.tasks.overdue} overdue</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="text-xs text-muted-foreground">Team</div>
                    <AvatarGroup>
                      {project.team.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <Avatar className="h-6 w-6 border-2 border-background">
                          <AvatarFallback>+{project.team.length - 3}</AvatarFallback>
                        </Avatar>
                      )}
                    </AvatarGroup>
                  </div>

                  <div className="flex gap-2 ml-auto">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/projects/${project.id}/tasks`}>Tasks</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/projects/${project.id}`}>Overview</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find any projects matching your search criteria.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setStatusFilter("all")
              setPriorityFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

