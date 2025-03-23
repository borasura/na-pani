"use client"

import {
  Folder,
  FolderPlus,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useState } from "react"
import ConfirmDeleteDialog from "./delete-dialog"

export function NavProjects({
  projects,
}: {
  projects: {
    id: string
    name: string
    description: string
    status: string
    priority: string
    color_code: string
    //url: string
    //icon: LucideIcon
  }[]
}) {

  const [isDialogOpen, setDialogOpen] = useState(false);

  const { isMobile } = useSidebar()

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

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects (to be implemented)</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={`/dashboard/project/${item.id}/tasks`}>
                {/* <item.icon /> */}
                {/* <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color_code }} /> */}
                <FolderPlus color={item.color_code} />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
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
                  <a href={`/dashboard/project/${item.id}/tasks`}>
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
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <ConfirmDeleteDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}
                  onConfirm={handleDelete}
                  />
    </SidebarGroup>
  )
}
