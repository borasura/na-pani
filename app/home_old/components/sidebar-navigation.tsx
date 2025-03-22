"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Bell,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Cog,
  Filter,
  Flag,
  Home,
  LayoutDashboard,
  LogOut,
  Plus,
  Star,
  Tag,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Mock data for demonstration
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
  role: "Project Manager",
  notifications: 5,
}

const userProjects = [
  { id: "proj1", name: "Website Redesign", color: "#4f46e5", status: "Execution", unread: true },
  { id: "proj2", name: "Mobile App Development", color: "#0ea5e9", status: "Planning" },
  { id: "proj3", name: "Marketing Campaign", color: "#f59e0b", status: "Execution" },
  { id: "proj4", name: "Product Launch", color: "#10b981", status: "Planning" },
  { id: "proj5", name: "Customer Research", color: "#8b5cf6", status: "Closed" },
]

const taskFilters = [
  { id: "high", name: "High Priority", color: "bg-red-500" },
  { id: "medium", name: "Medium Priority", color: "bg-amber-500" },
  { id: "low", name: "Low Priority", color: "bg-blue-500" },
  { id: "blocked", name: "Blocked", color: "bg-purple-500" },
  { id: "overdue", name: "Overdue", color: "bg-rose-500" },
]

export function SidebarNavigation() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isExpanded, setIsExpanded] = React.useState(true)

  // Filter projects based on search query
  const filteredProjects = userProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="px-2 py-2">
          <div className="flex items-center px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div className="ml-2 text-lg font-semibold">TaskFlow</div>
            {/* <SidebarTrigger asChild className="ml-auto"> */}
            <SidebarTrigger className="ml-auto">
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </SidebarTrigger>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {/* User Navigation Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/" passHref legacyBehavior>
                      <SidebarMenuButton isActive={pathname === "/"} className="flex items-center">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/my-tasks" passHref legacyBehavior>
                      <SidebarMenuButton
                        isActive={pathname === "/my-tasks"}
                        className="flex items-center justify-between w-full"
                      >
                        <div className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>My Tasks</span>
                        </div>
                        <Badge variant="outline">12</Badge>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/notifications" passHref legacyBehavior>
                      <SidebarMenuButton
                        isActive={pathname === "/notifications"}
                        className="flex items-center justify-between w-full"
                      >
                        <div className="flex items-center">
                          <Bell className="mr-2 h-4 w-4" />
                          <span>Notifications</span>
                        </div>
                        {userData.notifications > 0 && <Badge variant="destructive">{userData.notifications}</Badge>}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/calendar" passHref legacyBehavior>
                      <SidebarMenuButton isActive={pathname === "/calendar"} className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Calendar</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/team" passHref legacyBehavior>
                      <SidebarMenuButton isActive={pathname === "/team"} className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Team</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Task Filters Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center justify-between">
                <span>Quick Filters</span>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Filter className="h-3.5 w-3.5" />
                </Button>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {taskFilters.map((filter) => (
                    <SidebarMenuItem key={filter.id}>
                      <Link href={`/tasks/filter/${filter.id}`} passHref legacyBehavior>
                        <SidebarMenuButton className="flex items-center">
                          <div className={`mr-2 h-3 w-3 rounded-full ${filter.color}`} />
                          <span>{filter.name}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <Link href="/tasks/due-today" passHref legacyBehavior>
                      <SidebarMenuButton className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-orange-500" />
                        <span>Due Today</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/tasks/flagged" passHref legacyBehavior>
                      <SidebarMenuButton className="flex items-center">
                        <Flag className="mr-2 h-4 w-4 text-red-500" />
                        <span>Flagged</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Projects Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center justify-between">
                <span>Projects</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Create New Project</DropdownMenuItem>
                    <DropdownMenuItem>Join Existing Project</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="mb-2 px-3">
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8"
                  />
                </div>
                <SidebarMenu>
                  {filteredProjects.map((project) => (
                    <SidebarMenuItem key={project.id}>
                      <Link href={`/projects/${project.id}`} passHref legacyBehavior>
                        <SidebarMenuButton
                          isActive={pathname === `/projects/${project.id}`}
                          className="flex items-center justify-between w-full"
                        >
                          <div className="flex items-center">
                            <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: project.color }} />
                            <span className="truncate">{project.name}</span>
                          </div>
                          {project.unread && <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>}
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                  {filteredProjects.length === 0 && (
                    <div className="px-3 py-2 text-sm text-muted-foreground">No projects found</div>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Favorites Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center justify-between">
                <span>Favorites</span>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Star className="h-3.5 w-3.5" />
                </Button>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/favorites/dashboard" passHref legacyBehavior>
                      <SidebarMenuButton className="flex items-center">
                        <Tag className="mr-2 h-4 w-4" />
                        <span>My Dashboard</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/favorites/weekly-report" passHref legacyBehavior>
                      <SidebarMenuButton className="flex items-center">
                        <Tag className="mr-2 h-4 w-4" />
                        <span>Weekly Report</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>

        {/* User Profile Section at Bottom */}
        <div className="mt-auto border-t p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">{userData.name}</span>
                  <span className="text-xs text-muted-foreground">{userData.role}</span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Cog className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}

