"use client"

import type React from "react"

import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, CheckCircle, ClipboardList, MoreHorizontal, Star, Users } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AvatarGroup } from "@/components/ui/avatar-group"

// Mock data for demonstration - in a real app, this would be fetched based on the projectId
const getProjectData = (projectId: string) => {
  // This would be a fetch call in a real application
  return {
    id: projectId,
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

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const pathname = usePathname()
  const projectId = params.projectId as string
  const project = getProjectData(projectId)

  // Determine the active tab based on the current pathname
  const getActiveTab = () => {
    if (pathname.endsWith("/tasks")) return "tasks"
    if (pathname.endsWith("/board")) return "board"
    if (pathname.endsWith("/timeline")) return "timeline"
    if (pathname.endsWith("/team")) return "team"
    return "overview"
  }

  const activeTab = getActiveTab()

  return (
    <div className="container mx-auto pl-4 space-y-1 max-w-full">
      {/* Back button and project header */}
      <div className="flex flex-col space-y-4">
        {/* <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="text-sm text-muted-foreground">Back to Projects</div>
        </div> */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* <div className="flex items-start gap-3">
            <div className="h-10 w-2 rounded-full mt-1" style={{ backgroundColor: project.color }} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{project.name}</h1>
                {project.starred && <Star className="h-5 w-5 fill-amber-400 text-amber-400" />}
              </div>
              <p className="text-muted-foreground mt-1">{project.description}</p>
            </div>
          </div> */}

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                Actions
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
              <DropdownMenuItem>Edit Project Details</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Archive Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>

      {/* Project stats */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Status</div>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(project.priority)}>
                {project.priority}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <ClipboardList className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Tasks</div>
            <div className="flex gap-2 mt-1">
              <span className="text-sm">
                {project.tasks.completed} of {project.tasks.total} completed
              </span>
              {project.tasks.overdue > 0 && (
                <span className="text-sm text-red-600">{project.tasks.overdue} overdue</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Timeline</div>
            <div className="text-sm mt-1">
              {format(project.start_date, "MMM d")} - {format(project.end_date, "MMM d, yyyy")}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium">Team</div>
            <div className="mt-1">
              <AvatarGroup>
                {project.team.map((member) => (
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
              </AvatarGroup>
            </div>
          </div>
        </div>
      </div> */}

      {/* Progress bar */}
      {/* <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Overall Progress</div>
          <div className="text-sm">{project.progress}%</div>
        </div>
        <Progress value={project.progress} className="h-2" />
      </div> */}

      {/* Tab navigation */}
      <div className="border-b">
        <Tabs value={activeTab} className="w-full">
          <TabsList className="w-full justify-start h-auto p-0">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              asChild
            >
              <Link href={`/dashboard/projects/${projectId}`}>Overview</Link>
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              asChild
            >
              <Link href={`/dashboard/projects/${projectId}/tasks`}>Tasks</Link>
            </TabsTrigger>
            <TabsTrigger
              value="board"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              asChild
            >
              <Link href={`/dashboard/projects/${projectId}/board`}>Board</Link>
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              asChild
            >
              <Link href={`/dashboard/projects/${projectId}/timeline`}>Timeline</Link>
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              asChild
            >
              <Link href={`/dashboard/projects/${projectId}/team`}>Team</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Page content */}
      <div>{children}</div>
    </div>
  )
}

