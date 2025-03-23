"use client"

import * as React from "react"
import {
  AudioWaveform, Bot,
  Command,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  Map,
  MoreHorizontal,
  PieChart, SquareTerminal,
  Trash2
} from "lucide-react"

import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Bell,
  Calendar,
  CheckCircle, Clock, Filter,
  Flag,
  Home, Plus,
  Star,
  Tag, Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import ConfirmDeleteDialog from "./delete-dialog"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Pearson Specter Litt.",
      logo: GalleryVerticalEnd,
      plan: "Firm",
    },
    {
      name: "NaPani Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "My Items",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/dashboard",
        },
        {
          title: "My Tasks",
          url: "/dashboard/tasks",
        },
        {
          title: "Notifications",
          url: "/notifications",
        },
      ],
    },
    {
      title: "Projects",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Projects",
          url: "/dashboard/projects",
        },
        // {
        //   title: "Explorer",
        //   url: "#",
        // },
        // {
        //   title: "Quantum",
        //   url: "#",
        // },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

// Mock data for demonstration
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
  role: "Project Manager",
  notifications: 5,
}

// const userProjects = [
//   { id: "proj1", name: "Website Redesign", color: "#4f46e5", status: "Execution", unread: true },
//   { id: "proj2", name: "Mobile App Development", color: "#0ea5e9", status: "Planning" },
//   { id: "proj3", name: "Marketing Campaign", color: "#f59e0b", status: "Execution" },
//   { id: "proj4", name: "Product Launch", color: "#10b981", status: "Planning" },
//   { id: "proj5", name: "Customer Research", color: "#8b5cf6", status: "Closed" },
// ]

const taskFilters = [
  { id: "high", name: "High Priority", color: "bg-red-500" },
  { id: "medium", name: "Medium Priority", color: "bg-amber-500" },
  { id: "low", name: "Low Priority", color: "bg-blue-500" },
  { id: "blocked", name: "Blocked", color: "bg-purple-500" },
  { id: "overdue", name: "Overdue", color: "bg-rose-500" },
]

const handleDelete = async () => {
  try {
    // Call your API or server function to delete the project
    // const response = await fetch(`/api/projects/${projectId}`, {
    //   method: "DELETE",
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to delete project");
    // }

    // Handle success, maybe show a notification or update the UI
    alert("Project deleted successfully");
  } catch (error) {
    // Handle error, show a notification, etc.
    alert("Failed to delete project");
  }
};

export function AppSidebar({projects, userProfile, ...props }: React.ComponentProps<typeof Sidebar>) {
  //console.log("Inside App Sidebar, received projects - ", projects)
  //console.log(projects)

    const userProjects = projects
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isExpanded, setIsExpanded] = React.useState(true)

    const [isDialogOpen, setDialogOpen] = React.useState(false);

    const { isMobile } = useSidebar()
  
    // Filter projects based on search query
    const filteredProjects = userProjects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} />
        <NavProjects projects={projects} /> */}
        <ScrollArea className="h-[calc(100vh-12rem)]">
            {/* User Navigation Section */}
            <SidebarGroup>
              <SidebarGroupLabel>My Items</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/dashboard/home" passHref legacyBehavior>
                      <SidebarMenuButton isActive={pathname === "/dashboard/home"} className="flex items-center">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/dashboard/tasks" passHref legacyBehavior>
                      <SidebarMenuButton
                        isActive={pathname === "/dashboard/tasks"}
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
                    <Link href="/dashboard/notifications" passHref legacyBehavior>
                      <SidebarMenuButton
                        isActive={pathname === "/dashboard/notifications"}
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
                    <Link href="/dashboard/calendar" passHref legacyBehavior>
                      <SidebarMenuButton isActive={pathname === "/dashboard/calendar"} className="flex items-center">
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
                      <Link href={`/dashboard/projects/${project.id}`} passHref legacyBehavior>
                        <SidebarMenuButton
                          isActive={pathname === `/dashboard/projects/${project.id}`}
                          className="flex items-center justify-between w-full"
                        >
                          <div className="flex items-center">
                            <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: project.color_code }} />
                            <span className="truncate">{project.name}</span>
                          </div>
                          {project.unread && <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>}
                        </SidebarMenuButton>
                      </Link>
                      <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <a href={`/dashboard/projects/${project.id}/tasks`}>
                {/* <item.icon /> */}
                <span>View Project</span>
              </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                  
                </DropdownMenuItem>               
                
              </DropdownMenuContent>
            </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
                  {filteredProjects.length === 0 && (
                    <div className="px-3 py-2 text-sm text-muted-foreground">No projects found</div>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
              <ConfirmDeleteDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}
                  onConfirm={handleDelete}
                  />
            </SidebarGroup>

            {/* Favorites Section TODO - Implement this later*/}
            {/* <SidebarGroup>
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
            </SidebarGroup> */}
          </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userProfile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
