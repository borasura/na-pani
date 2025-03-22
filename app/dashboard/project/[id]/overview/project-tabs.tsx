'use client'

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";


import {
  Activity,
  AlertCircle,
  BarChart3, CheckCircle2,
  Clock,
  Flag,
  MoreHorizontal,
  PieChart, User,
  Users
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

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
    { id: "task5", title: "Performance testing", priority: "Low" },
  ],
  no_updates: [
    { id: "task6", title: "Content migration strategy", last_update: new Date(2023, 9, 10), priority: "Medium" },
    { id: "task7", title: "Analytics integration", last_update: new Date(2023, 9, 15), priority: "Low" },
  ],
  blocked: [
    { id: "task8", title: "Payment gateway integration", blocker: "Waiting for API credentials", priority: "High" },
    { id: "task9", title: "User testing", blocker: "Need final designs", priority: "Medium" },
  ],
}

const teamMembers = [
  {
    id: "user1",
    name: "Alex Johnson",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    tasks_completed: 15,
    tasks_in_progress: 3,
  },
  {
    id: "user2",
    name: "Sam Taylor",
    role: "Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasks_completed: 22,
    tasks_in_progress: 4,
  },
  {
    id: "user3",
    name: "Jordan Lee",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasks_completed: 18,
    tasks_in_progress: 7,
  },
  {
    id: "user4",
    name: "Casey Morgan",
    role: "Content Writer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasks_completed: 12,
    tasks_in_progress: 2,
  },
  {
    id: "user5",
    name: "Riley Smith",
    role: "QA Tester",
    avatar: "/placeholder.svg?height=40&width=40",
    tasks_completed: 8,
    tasks_in_progress: 5,
  },
]

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
  {
    id: "act4",
    type: "task_history",
    content: "Changed priority from 'Medium' to 'High'",
    task_title: "Fix responsive layout issues",
    username: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    change_type: "priority",
    new_values: "High",
    previous_values: "Medium",
    created_date: new Date(2023, 11, 27, 10, 15),
  },
  {
    id: "act5",
    type: "task_history",
    content: "Assigned task to Riley Smith",
    task_title: "Conduct cross-browser testing",
    username: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    change_type: "assigned_to",
    new_values: "Riley Smith",
    previous_values: null,
    created_date: new Date(2023, 11, 26, 14, 30),
  },
]

// Helper function to get priority badge color
// TODO put this in a util helper function. Remove duplicates
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

export default function ProjectTabs({ id }) {

  console.log('The URL param projectID is ' + id);
  const [activeTab, setActiveTab] = useState("overview")


  return (
       
    <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attention">Needs Attention</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
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

          {/* Completion Trend and Upcoming Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Completion Trend</CardTitle>
                <CardDescription>Task completion over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Task completion rate is {taskStats.completion_rate}% higher than last month
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Milestones</CardTitle>
                  <CardDescription>Key project milestones</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
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
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full border">
                      <Flag className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium">Development Phase 1 Complete</p>
                      <p className="text-sm text-muted-foreground">Due in 2 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full border">
                      <Flag className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-medium">User Testing</p>
                      <p className="text-sm text-muted-foreground">Due in 3 weeks</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Milestone
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Needs Attention Tab */}
        <TabsContent value="attention" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Past Due Tasks */}
            <Card>
              <CardHeader className="bg-red-50 dark:bg-red-950/20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <CardTitle>Past Due Tasks</CardTitle>
                </div>
                <CardDescription>Tasks that have exceeded their due date</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {attentionNeeded.past_due.length > 0 ? (
                  <div className="space-y-4">
                    {attentionNeeded.past_due.map((task) => (
                      <div key={task.id} className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-red-500">Due {formatDistanceToNow(task.due_date)} ago</p>
                        </div>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No past due tasks. Great job!</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All
                </Button>
              </CardFooter>
            </Card>

            {/* Unassigned Tasks */}
            <Card>
              <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-amber-500" />
                  <CardTitle>Unassigned Tasks</CardTitle>
                </div>
                <CardDescription>Tasks that need to be assigned to team members</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {attentionNeeded.unassigned.length > 0 ? (
                  <div className="space-y-4">
                    {attentionNeeded.unassigned.map((task) => (
                      <div key={task.id} className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{task.title}</p>
                        </div>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">All tasks are assigned. Great job!</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* No Recent Updates */}
            <Card>
              <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <CardTitle>No Recent Updates</CardTitle>
                </div>
                <CardDescription>Tasks with no activity in the past 7 weeks</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {attentionNeeded.no_updates.length > 0 ? (
                  <div className="space-y-4">
                    {attentionNeeded.no_updates.map((task) => (
                      <div key={task.id} className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Last update: {format(task.last_update, "MMM d, yyyy")}
                          </p>
                        </div>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">All tasks have recent updates. Great job!</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All
                </Button>
              </CardFooter>
            </Card>

            {/* Blocked Tasks */}
            <Card>
              <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-purple-500" />
                  <CardTitle>Blocked Tasks</CardTitle>
                </div>
                <CardDescription>Tasks that are currently blocked</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {attentionNeeded.blocked.length > 0 ? (
                  <div className="space-y-4">
                    {attentionNeeded.blocked.map((task) => (
                      <div key={task.id} className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">Blocker: {task.blocker}</p>
                        </div>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No blocked tasks. Great job!</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Recent Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes to the project</CardDescription>
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
              <Button variant="ghost" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>People working on this project</CardDescription>
                </div>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">{member.tasks_completed} completed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-muted-foreground">{member.tasks_in_progress} in progress</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Assign Tasks</DropdownMenuItem>
                          <DropdownMenuItem>Message</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Manage Roles</Button>
              <Button variant="outline">View Workload</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
  );
}