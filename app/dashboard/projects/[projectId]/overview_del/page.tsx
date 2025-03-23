"use client"
import { AlertCircle, Flag, PieChart, Plus, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for demonstration
const taskStats = {
  total: 124,
  by_status: [
    { name: "Backlog", count: 32, color: "bg-slate-400" },
    { name: "Todo", count: 18, color: "bg-blue-400" },
    { name: "In Progress", count: 27, color: "bg-amber-400" },
    { name: "Done", count: 42, color: "bg-green-400" },
    { name: "Blocked", count: 5, color: "bg-red-400" },
  ],
  by_priority: [
    { name: "Low", count: 35, color: "bg-blue-400" },
    { name: "Medium", count: 56, color: "bg-amber-400" },
    { name: "High", count: 33, color: "bg-red-400" },
  ],
  completion_rate: 34,
}

const attentionNeeded = {
  past_due: [
    { id: "task1", title: "Update homepage hero section", due_date: new Date(2023, 11, 15), priority: "High" },
    { id: "task2", title: "Finalize color palette", due_date: new Date(2023, 11, 20), priority: "Medium" },
  ],
  unassigned: [
    { id: "task3", title: "Create mobile wireframes", priority: "High" },
    { id: "task4", title: "SEO optimization plan", priority: "Medium" },
  ],
  blocked: [
    { id: "task8", title: "Payment gateway integration", blocker: "Waiting for API credentials", priority: "High" },
    { id: "task9", title: "User testing", blocker: "Need final designs", priority: "Medium" },
  ],
}

const recentActivities = [
  {
    id: "act1",
    type: "comment",
    content: "I've updated the color scheme based on client feedback. Please review.",
    username: "Sam Taylor",
    email: "sam@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    created_date: new Date(2023, 11, 28, 14, 35),
  },
  {
    id: "act2",
    type: "task_history",
    content: "Changed status from 'Todo' to 'In Progress'",
    task_title: "Implement new navigation menu",
    username: "Jordan Lee",
    email: "jordan@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    change_type: "status",
    new_values: "In Progress",
    previous_values: "Todo",
    created_date: new Date(2023, 11, 28, 11, 20),
  },
  {
    id: "act3",
    type: "comment",
    content: "The client has approved the final mockups. We can proceed with development.",
    username: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    created_date: new Date(2023, 11, 27, 16, 45),
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

export default function ProjectOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Task Distribution and Priority */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Task Status Distribution */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
            <CardDescription>Breakdown of tasks by current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taskStats.by_status.map((status) => (
                <div key={status.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{status.name}</span>
                    <span className="text-sm text-muted-foreground">{status.count} tasks</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full ${status.color}`}
                      style={{ width: `${(status.count / taskStats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
            <CardDescription>Tasks by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              <div className="relative h-40 w-40">
                {/* This would be a real chart in a production app */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <PieChart className="h-full w-full text-muted-foreground/30" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">{taskStats.total}</span>
                  <span className="text-sm text-muted-foreground">Total Tasks</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {taskStats.by_priority.map((priority) => (
                <div key={priority.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${priority.color}`}></div>
                    <span className="text-sm">{priority.name}</span>
                  </div>
                  <span className="text-sm font-medium">{priority.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attention Needed and Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Attention Needed */}
        <Card>
          <CardHeader>
            <CardTitle>Needs Attention</CardTitle>
            <CardDescription>Issues that require your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Past Due Tasks */}
              {attentionNeeded.past_due.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-1 mb-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span>Past Due</span>
                  </h3>
                  <div className="space-y-2">
                    {attentionNeeded.past_due.map((task) => (
                      <div key={task.id} className="flex justify-between items-start p-2 rounded-md bg-muted/50">
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-red-500">Due {formatDistanceToNow(task.due_date)} ago</p>
                        </div>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Unassigned Tasks */}
              {attentionNeeded.unassigned.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-1 mb-2">
                    <User className="h-4 w-4 text-amber-500" />
                    <span>Unassigned</span>
                  </h3>
                  <div className="space-y-2">
                    {attentionNeeded.unassigned.map((task) => (
                      <div key={task.id} className="flex justify-between items-start p-2 rounded-md bg-muted/50">
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                        </div>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blocked Tasks */}
              {attentionNeeded.blocked.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-1 mb-2">
                    <AlertCircle className="h-4 w-4 text-purple-500" />
                    <span>Blocked</span>
                  </h3>
                  <div className="space-y-2">
                    {attentionNeeded.blocked.map((task) => (
                      <div key={task.id} className="flex justify-between items-start p-2 rounded-md bg-muted/50">
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground">Blocker: {task.blocker}</p>
                        </div>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Issues
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivities.map((activity, index) => (
                <div key={activity.id} className="relative">
                  {index < recentActivities.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-0 w-px bg-muted"></div>
                  )}
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={activity.avatar} alt={activity.username} />
                      <AvatarFallback>
                        {activity.username
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.username}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(activity.created_date, { addSuffix: true })}
                        </span>
                      </div>

                      {activity.type === "comment" ? (
                        <div className="bg-muted p-3 rounded-lg text-sm">{activity.content}</div>
                      ) : (
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            {activity.content} on task "{activity.task_title}"
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        {activity.type === "comment" ? (
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                            Reply
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                            View Task
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Upcoming Milestones */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming Milestones</CardTitle>
            <CardDescription>Key project milestones</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Milestone
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full border">
                <Flag className="h-3 w-3" />
              </div>
              <div>
                <p className="font-medium">Design Approval</p>
                <p className="text-sm text-muted-foreground">Due in 3 days</p>
              </div>
              <Badge className="ml-auto">High</Badge>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full border">
                <Flag className="h-3 w-3" />
              </div>
              <div>
                <p className="font-medium">Development Phase 1 Complete</p>
                <p className="text-sm text-muted-foreground">Due in 2 weeks</p>
              </div>
              <Badge className="ml-auto">Medium</Badge>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full border">
                <Flag className="h-3 w-3" />
              </div>
              <div>
                <p className="font-medium">User Testing</p>
                <p className="text-sm text-muted-foreground">Due in 3 weeks</p>
              </div>
              <Badge className="ml-auto">Medium</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

