import {
    CalendarClock,
    Clock,
    Flag,
    MoreHorizontal,
    PlusCircle,
    AlertTriangle,
    Users,
    Activity,
    BarChart3,
    Layers,
    ArrowUpRight,
  } from "lucide-react"
  import Link from "next/link"
  
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
  import { Progress } from "@/components/ui/progress"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  
  export default function DashboardPage() {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">+8 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">-3 from last week</p>
              </CardContent>
            </Card>
          </div>
  
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="owned">Owned</TabsTrigger>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="viewer">Viewer</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            </div>
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ProjectCard
                  name="Marketing Campaign Q2"
                  description="Quarterly marketing campaign for product launch"
                  progress={75}
                  status="Execution"
                  priority="High"
                  tasks={{ total: 24, completed: 18 }}
                  dueDate="May 15, 2025"
                  role="Owner"
                  color="#4f46e5"
                />
                <ProjectCard
                  name="Website Redesign"
                  description="Complete overhaul of company website"
                  progress={45}
                  status="Execution"
                  priority="Medium"
                  tasks={{ total: 32, completed: 14 }}
                  dueDate="Jun 30, 2025"
                  role="Editor"
                  color="#0891b2"
                />
                <ProjectCard
                  name="Mobile App Development"
                  description="iOS and Android app for customer engagement"
                  progress={20}
                  status="Planning"
                  priority="High"
                  tasks={{ total: 48, completed: 10 }}
                  dueDate="Aug 20, 2025"
                  role="Owner"
                  color="#7c3aed"
                />
                <ProjectCard
                  name="Annual Report"
                  description="Preparation of annual financial report"
                  progress={90}
                  status="Execution"
                  priority="Medium"
                  tasks={{ total: 18, completed: 16 }}
                  dueDate="Apr 10, 2025"
                  role="Viewer"
                  color="#0d9488"
                />
                <ProjectCard
                  name="Product Launch"
                  description="Launch of new product line"
                  progress={30}
                  status="Planning"
                  priority="High"
                  tasks={{ total: 36, completed: 11 }}
                  dueDate="Jul 5, 2025"
                  role="Editor"
                  color="#dc2626"
                />
                <ProjectCard
                  name="Team Training"
                  description="Technical training for development team"
                  progress={60}
                  status="Execution"
                  priority="Low"
                  tasks={{ total: 12, completed: 7 }}
                  dueDate="May 25, 2025"
                  role="Owner"
                  color="#ea580c"
                />
              </div>
            </TabsContent>
            <TabsContent value="owned" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ProjectCard
                  name="Marketing Campaign Q2"
                  description="Quarterly marketing campaign for product launch"
                  progress={75}
                  status="Execution"
                  priority="High"
                  tasks={{ total: 24, completed: 18 }}
                  dueDate="May 15, 2025"
                  role="Owner"
                  color="#4f46e5"
                />
                <ProjectCard
                  name="Mobile App Development"
                  description="iOS and Android app for customer engagement"
                  progress={20}
                  status="Planning"
                  priority="High"
                  tasks={{ total: 48, completed: 10 }}
                  dueDate="Aug 20, 2025"
                  role="Owner"
                  color="#7c3aed"
                />
                <ProjectCard
                  name="Team Training"
                  description="Technical training for development team"
                  progress={60}
                  status="Execution"
                  priority="Low"
                  tasks={{ total: 12, completed: 7 }}
                  dueDate="May 25, 2025"
                  role="Owner"
                  color="#ea580c"
                />
              </div>
            </TabsContent>
            <TabsContent value="editor" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ProjectCard
                  name="Website Redesign"
                  description="Complete overhaul of company website"
                  progress={45}
                  status="Execution"
                  priority="Medium"
                  tasks={{ total: 32, completed: 14 }}
                  dueDate="Jun 30, 2025"
                  role="Editor"
                  color="#0891b2"
                />
                <ProjectCard
                  name="Product Launch"
                  description="Launch of new product line"
                  progress={30}
                  status="Planning"
                  priority="High"
                  tasks={{ total: 36, completed: 11 }}
                  dueDate="Jul 5, 2025"
                  role="Editor"
                  color="#dc2626"
                />
              </div>
            </TabsContent>
            <TabsContent value="viewer" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ProjectCard
                  name="Annual Report"
                  description="Preparation of annual financial report"
                  progress={90}
                  status="Execution"
                  priority="Medium"
                  tasks={{ total: 18, completed: 16 }}
                  dueDate="Apr 10, 2025"
                  role="Viewer"
                  color="#0d9488"
                />
              </div>
            </TabsContent>
          </Tabs>
  
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Needs Attention</CardTitle>
                <CardDescription>Tasks that require your immediate attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AttentionItem
                  title="Update marketing materials"
                  project="Marketing Campaign Q2"
                  issue="Past due date"
                  dueDate="Mar 20, 2025"
                  priority="High"
                />
                <AttentionItem
                  title="Finalize API documentation"
                  project="Mobile App Development"
                  issue="No updates in 7 weeks"
                  dueDate="Apr 15, 2025"
                  priority="Medium"
                />
                <AttentionItem
                  title="Review design mockups"
                  project="Website Redesign"
                  issue="Missing assignment"
                  dueDate="Apr 5, 2025"
                  priority="High"
                />
                <AttentionItem
                  title="Prepare Q2 budget forecast"
                  project="Annual Report"
                  issue="Past due date"
                  dueDate="Mar 25, 2025"
                  priority="High"
                />
                <AttentionItem
                  title="Schedule team training sessions"
                  project="Team Training"
                  issue="No updates in 5 weeks"
                  dueDate="Apr 10, 2025"
                  priority="Medium"
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Issues
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates across your projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ActivityItem
                  username="Sarah Johnson"
                  email="sarah.j@example.com"
                  type="comment"
                  content="I've updated the design files with the new color scheme. Please review when you get a chance."
                  project="Website Redesign"
                  task="Update design system"
                  time="2 hours ago"
                  avatar="/placeholder.svg?height=32&width=32"
                />
                <ActivityItem
                  username="Michael Chen"
                  email="m.chen@example.com"
                  type="task_history"
                  content="Changed status from 'Todo' to 'In Progress'"
                  project="Mobile App Development"
                  task="Implement user authentication"
                  time="4 hours ago"
                  avatar="/placeholder.svg?height=32&width=32"
                />
                <ActivityItem
                  username="Alex Rodriguez"
                  email="alex.r@example.com"
                  type="comment"
                  content="The API integration is complete. I've added documentation in the shared folder."
                  project="Mobile App Development"
                  task="API Integration"
                  time="Yesterday"
                  avatar="/placeholder.svg?height=32&width=32"
                />
                <ActivityItem
                  username="Emily Wong"
                  email="e.wong@example.com"
                  type="task_history"
                  content="Changed priority from 'Medium' to 'High'"
                  project="Marketing Campaign Q2"
                  task="Create social media assets"
                  time="Yesterday"
                  avatar="/placeholder.svg?height=32&width=32"
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
  
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Your Performance</CardTitle>
                <CardDescription>Task completion metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">Tasks Completed</div>
                    <div>24/32</div>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">On-time Completion</div>
                    <div>92%</div>
                  </div>
                  <Progress value={92} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">Response Time</div>
                    <div>85%</div>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="pt-4">
                  <div className="text-sm font-medium">Completed This Month</div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="text-2xl font-bold">18</div>
                    <Badge variant="outline" className="text-xs font-normal">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      15% increase
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks due in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DeadlineItem
                  title="Finalize Q2 marketing budget"
                  project="Marketing Campaign Q2"
                  dueDate="Tomorrow"
                  priority="High"
                />
                <DeadlineItem
                  title="Complete user flow diagrams"
                  project="Website Redesign"
                  dueDate="In 2 days"
                  priority="Medium"
                />
                <DeadlineItem
                  title="Review API documentation"
                  project="Mobile App Development"
                  dueDate="In 3 days"
                  priority="Medium"
                />
                <DeadlineItem
                  title="Prepare training materials"
                  project="Team Training"
                  dueDate="In 5 days"
                  priority="Low"
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Calendar
                </Button>
              </CardFooter>
            </Card>
  
            <Card>
              <CardHeader>
                <CardTitle>Team Workload</CardTitle>
                <CardDescription>Task distribution across team members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <WorkloadItem
                  name="Sarah Johnson"
                  role="Designer"
                  tasks={8}
                  avatar="/placeholder.svg?height=32&width=32"
                  completion={65}
                />
                <WorkloadItem
                  name="Michael Chen"
                  role="Developer"
                  tasks={12}
                  avatar="/placeholder.svg?height=32&width=32"
                  completion={40}
                />
                <WorkloadItem
                  name="Alex Rodriguez"
                  role="Backend Engineer"
                  tasks={6}
                  avatar="/placeholder.svg?height=32&width=32"
                  completion={80}
                />
                <WorkloadItem
                  name="Emily Wong"
                  role="Marketing Specialist"
                  tasks={9}
                  avatar="/placeholder.svg?height=32&width=32"
                  completion={55}
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Team
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    )
  }
  
  function ProjectCard({
    name,
    description,
    progress,
    status,
    priority,
    tasks,
    dueDate,
    role,
    color,
  }: {
    name: string
    description: string
    progress: number
    status: string
    priority: string
    tasks: { total: number; completed: number }
    dueDate: string
    role: string
    color: string
  }) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>View tasks</DropdownMenuItem>
                <DropdownMenuItem>Edit project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="text-sm font-medium">{progress}%</div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Status</div>
              <Badge variant="outline" style={{ borderColor: color, color: color }}>
                {status}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Priority</div>
              <Badge
                variant="outline"
                className={
                  priority === "High"
                    ? "text-destructive border-destructive"
                    : priority === "Medium"
                      ? "text-amber-500 border-amber-500"
                      : "text-emerald-500 border-emerald-500"
                }
              >
                {priority}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Tasks</div>
              <div className="text-sm font-medium">
                {tasks.completed}/{tasks.total}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Due Date</div>
              <div className="text-sm font-medium">{dueDate}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex w-full items-center justify-between">
            <Badge variant="secondary">{role}</Badge>
            <Button size="sm" variant="ghost" asChild>
              <Link href="#">View Project</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  }
  
  function AttentionItem({
    title,
    project,
    issue,
    dueDate,
    priority,
  }: {
    title: string
    project: string
    issue: string
    dueDate: string
    priority: string
  }) {
    return (
      <div className="flex items-start space-x-4 rounded-md border p-3">
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{title}</p>
            <Badge variant={issue.includes("Past due") ? "destructive" : "outline"}>{issue}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{project}</p>
          <div className="flex items-center pt-2">
            <CalendarClock className="mr-1 h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{dueDate}</span>
            <div className="ml-auto flex items-center">
              <Flag className={`mr-1 h-3 w-3 ${priority === "High" ? "text-destructive" : "text-amber-500"}`} />
              <span className="text-xs">{priority}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  function ActivityItem({
    username,
    email,
    type,
    content,
    project,
    task,
    time,
    avatar,
  }: {
    username: string
    email: string
    type: "comment" | "task_history"
    content: string
    project: string
    task: string
    time: string
    avatar: string
  }) {
    return (
      <div className="flex items-start space-x-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} alt={username} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-muted-foreground">{time}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            {project} • {task}
          </p>
          <div className="rounded-md bg-muted p-2 text-xs">
            {type === "comment" ? <p>{content}</p> : <p className="text-muted-foreground">{content}</p>}
          </div>
        </div>
      </div>
    )
  }
  
  function DeadlineItem({
    title,
    project,
    dueDate,
    priority,
  }: {
    title: string
    project: string
    dueDate: string
    priority: string
  }) {
    return (
      <div className="flex items-start space-x-4 rounded-md border p-3">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{project}</p>
          <div className="flex items-center pt-2">
            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium">{dueDate}</span>
            <div className="ml-auto flex items-center">
              <Flag
                className={`mr-1 h-3 w-3 ${priority === "High" ? "text-destructive" : priority === "Medium" ? "text-amber-500" : "text-emerald-500"}`}
              />
              <span className="text-xs">{priority}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  function WorkloadItem({
    name,
    role,
    tasks,
    avatar,
    completion,
  }: {
    name: string
    role: string
    tasks: number
    avatar: string
    completion: number
  }) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium">{tasks} tasks</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div>Task Completion</div>
            <div>{completion}%</div>
          </div>
          <Progress value={completion} className="h-1.5" />
        </div>
      </div>
    )
  }
  
  