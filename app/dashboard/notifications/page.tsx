import {
    Bell,
    Calendar,
    CheckCircle2,
    Clock,
    Filter,
    MessageSquare,
    MoreHorizontal,
    Search,
    Trash2,
    UserPlus,
    AlertTriangle,
    Clock8,
    CheckCheck,
    Eye,
    EyeOff,
    Archive,
  } from "lucide-react"
  import Link from "next/link"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
  
  export default function NotificationsPage() {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground">Stay updated on your projects and tasks</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/notifications/settings">
                  <Bell className="mr-2 h-4 w-4" />
                  Notification Settings
                </Link>
              </Button>
            </div>
          </div>
  
          <div className="flex flex-col gap-4 md:flex-row">
            <Card className="flex-1">
              <CardHeader className="px-5 pb-0">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>Notification Inbox</CardTitle>
                    <CardDescription>You have 12 unread notifications</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <CheckCheck className="h-4 w-4" />
                            <span className="sr-only">Mark all as read</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Mark all as read</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Filter className="h-4 w-4" />
                          <span className="sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuItem>All notifications</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Task assignments</DropdownMenuItem>
                        <DropdownMenuItem>Comments</DropdownMenuItem>
                        <DropdownMenuItem>Task updates</DropdownMenuItem>
                        <DropdownMenuItem>Project changes</DropdownMenuItem>
                        <DropdownMenuItem>Reminders</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search notifications..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="all" className="w-full">
                  <div className="border-b px-5">
                    <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
                      <TabsTrigger
                        value="all"
                        className="relative rounded-none border-b-2 border-b-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="unread"
                        className="relative rounded-none border-b-2 border-b-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground"
                      >
                        Unread
                      </TabsTrigger>
                      <TabsTrigger
                        value="snoozed"
                        className="relative rounded-none border-b-2 border-b-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground"
                      >
                        Snoozed
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="all" className="m-0">
                    <NotificationList notifications={allNotifications} />
                  </TabsContent>
                  <TabsContent value="unread" className="m-0">
                    <NotificationList notifications={allNotifications.filter((n) => !n.read)} />
                  </TabsContent>
                  <TabsContent value="snoozed" className="m-0">
                    <NotificationList notifications={allNotifications.filter((n) => n.snoozed)} />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex items-center justify-center border-t p-4">
                <Button variant="outline" className="w-full">
                  Load More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    )
  }
  
  function NotificationList({ notifications }: { notifications: any[] }) {
    return (
      <div className="divide-y">
        {notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
      </div>
    )
  }
  
  function NotificationItem({ notification }: { notification: any }) {
    return (
      <div className={`flex items-start gap-4 p-4 ${notification.read ? "bg-background" : "bg-muted/30"}`}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <NotificationIcon type={notification.type} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className={`text-sm ${notification.read ? "font-normal" : "font-medium"}`}>{notification.title}</p>
              <p className="text-xs text-muted-foreground">
                {notification.project} • {notification.time}
              </p>
            </div>
            {notification.priority === "high" && (
              <Badge variant="destructive" className="ml-auto">
                High Priority
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{notification.description}</p>
          {notification.actionRequired && (
            <div className="pt-2">
              <Button size="sm" variant="default" className="h-8 mr-2">
                {notification.actionText || "View"}
              </Button>
              <Button size="sm" variant="outline" className="h-8">
                Dismiss
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                {notification.read ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" /> Mark as unread
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" /> Mark as read
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Clock8 className="mr-2 h-4 w-4" /> Snooze for 24 hours
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" /> Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
        </div>
      </div>
    )
  }
  
  function NotificationIcon({ type }: { type: string }) {
    switch (type) {
      case "task_assignment":
        return <CheckCircle2 className="h-5 w-5 text-primary" />
      case "comment":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "task_update":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "project_change":
        return <UserPlus className="h-5 w-5 text-indigo-500" />
      case "reminder":
        return <Calendar className="h-5 w-5 text-emerald-500" />
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-destructive" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }
  
  // Sample notification data
  const allNotifications = [
    {
      type: "task_assignment",
      title: "You have been assigned a new task",
      description: 'Sarah Johnson assigned you to "Create wireframes for mobile app" in Mobile App Development project.',
      project: "Mobile App Development",
      time: "10 minutes ago",
      read: false,
      snoozed: false,
      priority: "high",
      actionRequired: true,
      actionText: "View Task",
    },
    {
      type: "comment",
      title: "New comment on your task",
      description:
        'Michael Chen commented: "I\'ve added some reference materials to the shared folder that might help with this task."',
      project: "Website Redesign",
      time: "1 hour ago",
      read: false,
      snoozed: false,
      priority: "normal",
      actionRequired: true,
      actionText: "Reply",
    },
    {
      type: "task_update",
      title: "Task status changed",
      description: 'The status of "Update API documentation" was changed from "In Progress" to "Done".',
      project: "Mobile App Development",
      time: "2 hours ago",
      read: false,
      snoozed: false,
      priority: "normal",
      actionRequired: false,
    },
    {
      type: "project_change",
      title: "Your role has been updated",
      description: 'Your role in "Marketing Campaign Q2" has been changed from "Editor" to "Owner".',
      project: "Marketing Campaign Q2",
      time: "3 hours ago",
      read: true,
      snoozed: false,
      priority: "normal",
      actionRequired: false,
    },
    {
      type: "reminder",
      title: "Task due tomorrow",
      description: 'Your task "Finalize Q2 marketing budget" is due tomorrow.',
      project: "Marketing Campaign Q2",
      time: "5 hours ago",
      read: false,
      snoozed: false,
      priority: "high",
      actionRequired: true,
      actionText: "View Task",
    },
    {
      type: "overdue",
      title: "Task is overdue",
      description: 'Your task "Update marketing materials" is 2 days overdue.',
      project: "Marketing Campaign Q2",
      time: "1 day ago",
      read: false,
      snoozed: false,
      priority: "high",
      actionRequired: true,
      actionText: "Update Status",
    },
    {
      type: "comment",
      title: "New comment on your task",
      description:
        'Alex Rodriguez commented: "The API integration is complete. I\'ve added documentation in the shared folder."',
      project: "Mobile App Development",
      time: "1 day ago",
      read: true,
      snoozed: false,
      priority: "normal",
      actionRequired: true,
      actionText: "Reply",
    },
    {
      type: "task_update",
      title: "Task priority changed",
      description: 'The priority of "Create social media assets" was changed from "Medium" to "High".',
      project: "Marketing Campaign Q2",
      time: "2 days ago",
      read: true,
      snoozed: false,
      priority: "high",
      actionRequired: false,
    },
    {
      type: "project_change",
      title: "You were added to a project",
      description: 'Emily Wong added you to "Annual Report" project as a Viewer.',
      project: "Annual Report",
      time: "3 days ago",
      read: true,
      snoozed: true,
      priority: "normal",
      actionRequired: true,
      actionText: "View Project",
    },
    {
      type: "reminder",
      title: "No updates in 7 days",
      description: 'Your task "Finalize API documentation" has had no updates in the last 7 days.',
      project: "Mobile App Development",
      time: "3 days ago",
      read: true,
      snoozed: true,
      priority: "normal",
      actionRequired: true,
      actionText: "Update Status",
    },
  ]
  
  