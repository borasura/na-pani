'use client'



import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// // Mock data for demonstration
// const projectData = {
//     id: "123e4567-e89b-12d3-a456-426614174000",
//     name: "Website Redesign",
//     description: "Complete overhaul of the company website with new branding, improved UX, and mobile responsiveness.",
//     start_date: new Date(2023, 9, 1), // Oct 1, 2023
//     end_date: new Date(2025, 3, 31), // Mar 31, 2024
//     color_code: "#4f46e5",
//     status: "Execution",
//     priority: "High",
//     owner: {
//       id: "123e4567-e89b-12d3-a456-426614174001",
//       name: "Alex Johnson",
//       email: "alex@example.com",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     progress: 65,
//   }

  // const taskStats = {
  //   total: 124,
  //   by_status: [
  //     { name: "Backlog", count: 32, color: "bg-slate-400" },
  //     { name: "Todo", count: 18, color: "bg-blue-400" },
  //     { name: "In Progress", count: 27, color: "bg-amber-400" },
  //     { name: "Done", count: 42, color: "bg-green-400" },
  //     { name: "Blocked", count: 5, color: "bg-red-400" },
  //   ],
  //   by_priority: [
  //     { name: "Low", count: 35, color: "bg-blue-400" },
  //     { name: "Medium", count: 56, color: "bg-amber-400" },
  //     { name: "High", count: 33, color: "bg-red-400" },
  //   ],
  //   completion_rate: 34,
  // }

  // Helper function to get priority badge color
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 hover:bg-red-100/80"
    case "Medium":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
    case "Low":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
    default:
      return "bg-slate-100 text-slate-800 hover:bg-slate-100/80"
  }
}

// Helper function to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Planning":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
    case "Execution":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
    case "Closed":
      return "bg-green-100 text-green-800 hover:bg-green-100/80"
    default:
      return "bg-slate-100 text-slate-800 hover:bg-slate-100/80"
  }
}


export default function ProjectInfoCards({ projectData, projectStats }) {

  const totalDuration = projectData.end_date.getTime() - projectData.start_date.getTime()
  const elapsedDuration = Date.now() - projectData.start_date.getTime()
  const timelineProgress = Math.min(Math.round((elapsedDuration / totalDuration) * 100), 100)
  const daysRemaining = Math.round((projectData.end_date.getTime() - Date.now()) / (1000 * 3600 * 24))
  //const progress = Math.round(projectStats.)


  return (
       
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className={getStatusColor(projectData.status)}>
                {projectData.status}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(projectData.priority)}>
                {projectData.priority} Priority
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{format(projectData.start_date, "MMM d, yyyy")}</span>
                <span>{format(projectData.end_date, "MMM d, yyyy")}</span>
              </div>
              <Progress value={timelineProgress} className="h-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{daysRemaining} days remaining</span>
                <span className="text-xs text-muted-foreground">{timelineProgress}% elapsed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{projectStats.completion_rate}%</span>
                <span className="text-xs text-muted-foreground">
                  {projectStats.by_status[3].count} of {projectStats.total} tasks completed
                </span>
              </div>
              <Progress value={projectStats.completion_rate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Owner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={projectData.owner.avatar} alt={projectData.owner_username} />
                <AvatarFallback>
                  {projectData.owner_username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{projectData.owner_username}</p>
                <p className="text-xs text-muted-foreground">{projectData.owner_email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}