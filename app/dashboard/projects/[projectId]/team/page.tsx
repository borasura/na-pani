"use client"

import { useState } from "react"
import { CheckCircle2, Clock, MoreHorizontal, Plus, Search, User, Users } from "lucide-react"

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
import { Progress } from "@/components/ui/progress"

// Mock data for team members
const teamMembers = [
  {
    id: "user1",
    name: "Alex Johnson",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "alex@example.com",
    tasks: {
      total: 24,
      completed: 15,
      in_progress: 3,
      overdue: 1,
    },
    skills: ["Project Management", "Stakeholder Communication", "Risk Assessment"],
    workload: 85,
    joined_date: new Date(2023, 8, 15),
  },
  {
    id: "user2",
    name: "Sam Taylor",
    role: "Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "sam@example.com",
    tasks: {
      total: 31,
      completed: 22,
      in_progress: 4,
      overdue: 0,
    },
    skills: ["UI Design", "UX Research", "Prototyping", "Wireframing"],
    workload: 70,
    joined_date: new Date(2023, 9, 1),
  },
  {
    id: "user3",
    name: "Jordan Lee",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "jordan@example.com",
    tasks: {
      total: 42,
      completed: 18,
      in_progress: 7,
      overdue: 2,
    },
    skills: ["React", "TypeScript", "Node.js", "API Integration"],
    workload: 95,
    joined_date: new Date(2023, 9, 10),
  },
  {
    id: "user4",
    name: "Casey Morgan",
    role: "Content Writer",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "casey@example.com",
    tasks: {
      total: 18,
      completed: 12,
      in_progress: 2,
      overdue: 0,
    },
    skills: ["Copywriting", "Content Strategy", "SEO", "Editing"],
    workload: 60,
    joined_date: new Date(2023, 10, 5),
  },
  {
    id: "user5",
    name: "Riley Smith",
    role: "QA Tester",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "riley@example.com",
    tasks: {
      total: 27,
      completed: 8,
      in_progress: 5,
      overdue: 1,
    },
    skills: ["Test Planning", "Automated Testing", "Bug Reporting", "User Testing"],
    workload: 75,
    joined_date: new Date(2023, 10, 15),
  },
]

// Helper function to get workload color
const getWorkloadColor = (workload: number) => {
  if (workload >= 90) return "bg-red-500"
  if (workload >= 70) return "bg-amber-500"
  return "bg-green-500"
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  // Filter team members
  const filteredMembers = teamMembers
    .filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((member) => (roleFilter === "all" ? true : member.role === roleFilter))
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "workload":
          return b.workload - a.workload
        case "tasks":
          return b.tasks.total - a.tasks.total
        default:
          return 0
      }
    })

  // Get unique roles for filter
  const uniqueRoles = Array.from(new Set(teamMembers.map((member) => member.role)))

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Team</h2>
          <p className="text-muted-foreground">Project team members and workload</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {uniqueRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="workload">Workload</SelectItem>
              <SelectItem value="tasks">Tasks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team members grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Clock className="mr-2 h-4 w-4" />
                      View Timesheet
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit Role</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Remove from Project</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {/* Contact */}
                <div className="text-sm text-muted-foreground">{member.email}</div>

                {/* Workload */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Workload</span>
                    <span className={member.workload >= 90 ? "text-red-600" : ""}>{member.workload}%</span>
                  </div>
                  <Progress
                    value={member.workload}
                    className="h-2"
                    indicatorClassName={getWorkloadColor(member.workload)}
                  />
                </div>

                {/* Task Stats */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-lg font-semibold">{member.tasks.total}</div>
                    <div className="text-xs text-muted-foreground">Tasks</div>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-lg font-semibold text-green-600">{member.tasks.completed}</div>
                    <div className="text-xs text-muted-foreground">Done</div>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <div className="text-lg font-semibold text-blue-600">{member.tasks.in_progress}</div>
                    <div className="text-xs text-muted-foreground">Active</div>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <div
                      className={`text-lg font-semibold ${member.tasks.overdue > 0 ? "text-red-600" : "text-muted-foreground"}`}
                    >
                      {member.tasks.overdue}
                    </div>
                    <div className="text-xs text-muted-foreground">Overdue</div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="text-sm font-medium mb-2">Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex w-full gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Assign Task
                </Button>
                <Button className="flex-1" size="sm">
                  View Tasks
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredMembers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No team members found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find any team members matching your search criteria.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setRoleFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

