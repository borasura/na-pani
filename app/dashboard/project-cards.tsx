"use client"

import { Edit3, Eye, MessageSquare, User } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  priority: string
  status: string
  role: "owner" | "editor" | "commenter" | "viewer"
  updatedAt: string
  url: string
}

export default function ProjectCards({proj}) {

  console.log("Inside Projects card " + proj)
  
  const projects: Project[] = proj;

  const getRoleIcon = (role: Project["role"]) => {
    switch (role) {
      case "editor":
        return <Edit3 className="h-4 w-4 text-blue-500" />
      case "commenter":
        return <MessageSquare className="h-4 w-4 text-amber-500" />
      case "viewer":
        return <Eye className="h-4 w-4 text-gray-500" />
      case "owner":
        return <User className="h-4 w-4 text-green-500" />
    }
  }

  const getRoleText = (role: Project["role"]) => {
    switch (role) {
      case "editor":
        return "Editor"
      case "commenter":
        return "Commenter"
      case "viewer":
        return "Viewer"
      case "owner":
        return "Owner"
    }
  }

  return (
    <div className="container mx-auto py-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <Link href={"/dashboard/project/"+project.id+"/tasks"} key={project.id} className="block group">
            <Card className="h-full hover:shadow-md transition-shadow border-2 hover:border-primary/20">
              <CardHeader className="p-2 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="flex items-center gap-1 ml-2">
                          {getRoleIcon(project.role)}
                          <span className="sr-only">{getRoleText(project.role)}</span>
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{getRoleText(project.role)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription className="text-xs mt-1 line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-2 pt-2 text-xs text-muted-foreground">{project.status}</CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

