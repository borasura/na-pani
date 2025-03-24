"use client"

import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight, ChevronsUpDown, Filter, Plus, Search } from "lucide-react"
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  differenceInDays,
  isWithinInterval,
  parseISO,
} from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

// Types
type Task = {
  id: string
  title: string
  description: string
  start_date: Date
  end_date: Date
  progress: number
  status: string
  priority: string
  assignee?: {
    id: string
    name: string
    avatar: string
  }
  parent_id?: string
  subtasks?: Task[]
  dependencies?: string[]
  is_milestone?: boolean
  is_expanded?: boolean
}

type GanttViewMode = "day" | "week" | "month"

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: "task1",
    title: "Project Planning",
    description: "Define project scope and requirements",
    start_date: parseISO("2024-02-01"),
    end_date: parseISO("2024-02-15"),
    progress: 100,
    status: "Done",
    priority: "High",
    assignee: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    is_expanded: true,
    subtasks: [
      {
        id: "task1.1",
        title: "Requirements Gathering",
        description: "Collect and document requirements",
        start_date: parseISO("2024-02-01"),
        end_date: parseISO("2024-02-05"),
        progress: 100,
        status: "Done",
        priority: "High",
        assignee: {
          id: "user2",
          name: "Sam Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "task1.2",
        title: "Project Kickoff",
        description: "Initial meeting with stakeholders",
        start_date: parseISO("2024-02-06"),
        end_date: parseISO("2024-02-06"),
        progress: 100,
        status: "Done",
        priority: "Medium",
        is_milestone: true,
        assignee: {
          id: "user1",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "task1.3",
        title: "Project Plan Creation",
        description: "Create detailed project plan",
        start_date: parseISO("2024-02-07"),
        end_date: parseISO("2024-02-15"),
        progress: 100,
        status: "Done",
        priority: "High",
        assignee: {
          id: "user1",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
    ],
  },
  {
    id: "task2",
    title: "Design Phase",
    description: "Create UI/UX designs",
    start_date: parseISO("2024-02-16"),
    end_date: parseISO("2024-03-15"),
    progress: 80,
    status: "In Progress",
    priority: "High",
    assignee: {
      id: "user2",
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    is_expanded: true,
    dependencies: ["task1"],
    subtasks: [
      {
        id: "task2.1",
        title: "Wireframing",
        description: "Create wireframes for all pages",
        start_date: parseISO("2024-02-16"),
        end_date: parseISO("2024-02-28"),
        progress: 100,
        status: "Done",
        priority: "Medium",
        assignee: {
          id: "user2",
          name: "Sam Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "task2.2",
        title: "Visual Design",
        description: "Create visual designs based on wireframes",
        start_date: parseISO("2024-03-01"),
        end_date: parseISO("2024-03-15"),
        progress: 60,
        status: "In Progress",
        priority: "High",
        assignee: {
          id: "user2",
          name: "Sam Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "task2.3",
        title: "Design Review",
        description: "Review designs with stakeholders",
        start_date: parseISO("2024-03-15"),
        end_date: parseISO("2024-03-15"),
        progress: 0,
        status: "Todo",
        priority: "Medium",
        is_milestone: true,
        dependencies: ["task2.2"],
      },
    ],
  },
  {
    id: "task3",
    title: "Development Phase",
    description: "Implement the designs",
    start_date: parseISO("2024-03-16"),
    end_date: parseISO("2024-05-15"),
    progress: 30,
    status: "In Progress",
    priority: "High",
    assignee: {
      id: "user3",
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    is_expanded: true,
    dependencies: ["task2"],
    subtasks: [
      {
        id: "task3.1",
        title: "Frontend Development",
        description: "Implement frontend components",
        start_date: parseISO("2024-03-16"),
        end_date: parseISO("2024-04-15"),
        progress: 40,
        status: "In Progress",
        priority: "High",
        assignee: {
          id: "user3",
          name: "Jordan Lee",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "task3.2",
        title: "Backend Development",
        description: "Implement backend services",
        start_date: parseISO("2024-03-16"),
        end_date: parseISO("2024-04-30"),
        progress: 35,
        status: "In Progress",
        priority: "High",
        assignee: {
          id: "user8",
          name: "Jamie Wilson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "task3.3",
        title: "Integration",
        description: "Integrate frontend and backend",
        start_date: parseISO("2024-05-01"),
        end_date: parseISO("2024-05-15"),
        progress: 0,
        status: "Todo",
        priority: "High",
        dependencies: ["task3.1", "task3.2"],
      },
    ],
  },
  {
    id: "task4",
    title: "Testing Phase",
    description: "Test the application",
    start_date: parseISO("2024-05-16"),
    end_date: parseISO("2024-06-15"),
    progress: 0,
    status: "Todo",
    priority: "Medium",
    assignee: {
      id: "user5",
      name: "Riley Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    is_expanded: true,
    dependencies: ["task3"],
    subtasks: [
      {
        id: "task4.1",
        title: "Unit Testing",
        description: "Write and execute unit tests",
        start_date: parseISO("2024-05-16"),
        end_date: parseISO("2024-05-31"),
        progress: 0,
        status: "Todo",
        priority: "Medium",
      },
      {
        id: "task4.2",
        title: "Integration Testing",
        description: "Test integrated components",
        start_date: parseISO("2024-06-01"),
        end_date: parseISO("2024-06-10"),
        progress: 0,
        status: "Todo",
        priority: "Medium",
        dependencies: ["task4.1"],
      },
      {
        id: "task4.3",
        title: "User Acceptance Testing",
        description: "Conduct UAT with stakeholders",
        start_date: parseISO("2024-06-11"),
        end_date: parseISO("2024-06-15"),
        progress: 0,
        status: "Todo",
        priority: "High",
        dependencies: ["task4.2"],
      },
    ],
  },
  {
    id: "task5",
    title: "Deployment",
    description: "Deploy the application to production",
    start_date: parseISO("2024-06-16"),
    end_date: parseISO("2024-06-20"),
    progress: 0,
    status: "Todo",
    priority: "High",
    assignee: {
      id: "user12",
      name: "Cameron Wright",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dependencies: ["task4"],
    is_milestone: true,
  },
  {
    id: "task6",
    title: "Post-Launch Support",
    description: "Provide support after launch",
    start_date: parseISO("2024-06-21"),
    end_date: parseISO("2024-07-20"),
    progress: 0,
    status: "Todo",
    priority: "Medium",
    dependencies: ["task5"],
  },
]

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Todo":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    case "In Progress":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
    case "Done":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "Blocked":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
  }
}

// Helper function to get priority color
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    case "Medium":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
    case "Low":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
  }
}

// Helper function to get task bar color
const getTaskBarColor = (task: Task) => {
  if (task.is_milestone) {
    return "bg-purple-500 dark:bg-purple-600"
  }

  switch (task.status) {
    case "Done":
      return "bg-green-500 dark:bg-green-600"
    case "In Progress":
      return "bg-amber-500 dark:bg-amber-600"
    case "Todo":
      return "bg-blue-500 dark:bg-blue-600"
    case "Blocked":
      return "bg-red-500 dark:bg-red-600"
    default:
      return "bg-slate-500 dark:bg-slate-600"
  }
}

// Helper function to flatten tasks for rendering
const flattenTasks = (tasks: Task[], parentId?: string, level = 0): (Task & { level: number })[] => {
  return tasks.reduce(
    (acc, task) => {
      const flatTask = { ...task, level, parent_id: parentId }
      acc.push(flatTask)

      if (task.subtasks && task.subtasks.length > 0 && task.is_expanded) {
        acc.push(...flattenTasks(task.subtasks, task.id, level + 1))
      }

      return acc
    },
    [] as (Task & { level: number })[],
  )
}

// Helper function to find earliest and latest dates in tasks
const findDateRange = (tasks: Task[]): { start: Date; end: Date } => {
  let earliest = new Date()
  let latest = new Date()

  const checkTask = (task: Task) => {
    if (task.start_date < earliest) {
      earliest = task.start_date
    }
    if (task.end_date > latest) {
      latest = task.end_date
    }

    if (task.subtasks) {
      task.subtasks.forEach(checkTask)
    }
  }

  tasks.forEach(checkTask)

  // Add some padding
  earliest = subDays(earliest, 7)
  latest = addDays(latest, 7)

  return { start: earliest, end: latest }
}

export default function GanttView() {
  const params = useParams()
  const projectId = params.projectId as string

  // State
  const [viewMode, setViewMode] = useState<GanttViewMode>("week")
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)
  const [dateRange, setDateRange] = useState(() => findDateRange(tasks))
  const [currentStartDate, setCurrentStartDate] = useState<Date>(dateRange.start)
  const [timelineItems, setTimelineItems] = useState<Date[]>([])

  const ganttContainerRef = useRef<HTMLDivElement>(null)
  const taskListRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Calculate timeline items based on view mode and current start date
  useEffect(() => {
    let items: Date[] = []

    switch (viewMode) {
      case "day":
        const endDay = addDays(currentStartDate, 30)
        items = eachDayOfInterval({ start: currentStartDate, end: endDay })
        break
      case "week":
        const startWeek = startOfWeek(currentStartDate, { weekStartsOn: 1 })
        const endWeek = endOfWeek(addWeeks(startWeek, 12), { weekStartsOn: 1 })
        items = eachWeekOfInterval({ start: startWeek, end: endWeek }, { weekStartsOn: 1 })
        break
      case "month":
        const startMonth = startOfMonth(currentStartDate)
        const endMonth = endOfMonth(addMonths(startMonth, 11))
        items = eachMonthOfInterval({ start: startMonth, end: endMonth })
        break
    }

    setTimelineItems(items)
  }, [viewMode, currentStartDate])

  // Filter tasks based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredTasks(tasks)
      return
    }

    const filterTasksRecursive = (tasks: Task[]): Task[] => {
      return tasks
        .map((task) => {
          const matches =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())

          const newTask = { ...task }

          if (task.subtasks && task.subtasks.length > 0) {
            newTask.subtasks = filterTasksRecursive(task.subtasks)
            newTask.is_expanded = newTask.subtasks.length > 0 || matches
          }

          return matches || (newTask.subtasks && newTask.subtasks.length > 0) ? newTask : null
        })
        .filter(Boolean) as Task[]
    }

    setFilteredTasks(filterTasksRecursive(tasks))
  }, [searchQuery, tasks])

  // Toggle task expansion
  const toggleTaskExpansion = (taskId: string) => {
    setTasks((prevTasks) => {
      const updateTasksRecursive = (tasks: Task[]): Task[] => {
        return tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, is_expanded: !task.is_expanded }
          }

          if (task.subtasks && task.subtasks.length > 0) {
            return { ...task, subtasks: updateTasksRecursive(task.subtasks) }
          }

          return task
        })
      }

      return updateTasksRecursive(prevTasks)
    })
  }

  // Navigate timeline
  const navigateTimeline = (direction: "prev" | "next") => {
    switch (viewMode) {
      case "day":
        setCurrentStartDate((prev) => (direction === "prev" ? subDays(prev, 15) : addDays(prev, 15)))
        break
      case "week":
        setCurrentStartDate((prev) => (direction === "prev" ? subWeeks(prev, 6) : addWeeks(prev, 6)))
        break
      case "month":
        setCurrentStartDate((prev) => (direction === "prev" ? subMonths(prev, 6) : addMonths(prev, 6)))
        break
    }
  }

  // Calculate cell width based on view mode
  const getCellWidth = () => {
    switch (viewMode) {
      case "day":
        return 40
      case "week":
        return 120
      case "month":
        return 200
      default:
        return 120
    }
  }

  // Calculate task position and width on the timeline
  const getTaskBarStyle = (task: Task) => {
    const cellWidth = getCellWidth()
    let left = 0
    let width = 0

    switch (viewMode) {
      case "day":
        // Position based on days from start
        left = differenceInDays(task.start_date, timelineItems[0]) * cellWidth
        width = (differenceInDays(task.end_date, task.start_date) + 1) * cellWidth
        break
      case "week":
        // Position based on weeks from start
        const startWeekDiff = differenceInDays(task.start_date, timelineItems[0]) / 7
        const duration = differenceInDays(task.end_date, task.start_date) / 7
        left = startWeekDiff * cellWidth
        width = (duration + 0.14) * cellWidth // Add a small fraction to account for the end day
        break
      case "month":
        // Position based on months from start
        const startMonthDiff =
          (task.start_date.getFullYear() - timelineItems[0].getFullYear()) * 12 +
          (task.start_date.getMonth() - timelineItems[0].getMonth())
        const endMonthDiff =
          (task.end_date.getFullYear() - timelineItems[0].getFullYear()) * 12 +
          (task.end_date.getMonth() - timelineItems[0].getMonth())
        left = startMonthDiff * cellWidth
        width = (endMonthDiff - startMonthDiff + 1) * cellWidth
        break
    }

    // Adjust for milestones
    if (task.is_milestone) {
      width = 24 // Fixed width for milestone
      left = left + cellWidth / 2 - 12 // Center the milestone
    }

    return {
      left: `${left}px`,
      width: `${width}px`,
    }
  }

  // Check if task is visible in current timeline view
  const isTaskVisible = (task: Task) => {
    if (!timelineItems.length) return false

    const firstDate = timelineItems[0]
    const lastDate = timelineItems[timelineItems.length - 1]

    // Add padding to the last date based on view mode
    let extendedLastDate = lastDate
    switch (viewMode) {
      case "day":
        extendedLastDate = addDays(lastDate, 1)
        break
      case "week":
        extendedLastDate = addDays(lastDate, 7)
        break
      case "month":
        extendedLastDate = addMonths(lastDate, 1)
        break
    }

    return (
      isWithinInterval(task.start_date, { start: firstDate, end: extendedLastDate }) ||
      isWithinInterval(task.end_date, { start: firstDate, end: extendedLastDate }) ||
      (task.start_date <= firstDate && task.end_date >= extendedLastDate)
    )
  }

  // Format date for display based on view mode
  const formatTimelineDate = (date: Date) => {
    switch (viewMode) {
      case "day":
        return format(date, "MMM d")
      case "week":
        return `${format(date, "MMM d")} - ${format(addDays(date, 6), "MMM d")}`
      case "month":
        return format(date, "MMMM yyyy")
    }
  }

  // Render the flattened task list
  const flattenedTasks = flattenTasks(filteredTasks)

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gantt Chart</h2>
          <p className="text-muted-foreground">Visualize project timeline and task dependencies</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Controls and filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={viewMode} onValueChange={(value: GanttViewMode) => setViewMode(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center rounded-md border bg-background">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateTimeline("prev")}
              className="rounded-none rounded-l-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-3 py-2 text-sm font-medium">
              {timelineItems.length > 0 && (
                <>
                  {formatTimelineDate(timelineItems[0])} - {formatTimelineDate(timelineItems[timelineItems.length - 1])}
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateTimeline("next")}
              className="rounded-none rounded-r-md"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Gantt Chart */}
      <Card>
        <CardHeader className="px-4 py-3 border-b">
          <CardTitle className="text-base">Project Timeline</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex" ref={ganttContainerRef}>
            {/* Task List (Left Side) */}
            <div className="min-w-[300px] max-w-[300px] border-r bg-muted/30" ref={taskListRef}>
              {/* Task List Header */}
              <div className="flex h-10 items-center border-b px-4 font-medium text-sm">
                <div className="flex-1">Task</div>
                <div className="w-20 text-right">Progress</div>
              </div>

              {/* Task List Items */}
              <ScrollArea className="h-[calc(100vh-320px)]">
                {flattenedTasks.length > 0 ? (
                  flattenedTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center border-b px-4 py-2 ${
                        task.level > 0 ? "pl-" + (task.level * 8 + 4) + "px" : ""
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          {task.subtasks && task.subtasks.length > 0 && (
                            <button
                              onClick={() => toggleTaskExpansion(task.id)}
                              className="h-4 w-4 rounded-sm hover:bg-muted flex items-center justify-center"
                            >
                              <ChevronsUpDown className="h-3 w-3" />
                            </button>
                          )}
                          <div className="truncate font-medium text-sm">{task.title}</div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                          </Badge>
                          {task.assignee && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                                    <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{task.assignee.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                      <div className="w-20 text-right">
                        <div className="text-xs font-medium">{task.progress}%</div>
                        <Progress value={task.progress} className="h-1.5 w-16 mt-1" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">No tasks found</div>
                )}
              </ScrollArea>
            </div>

            {/* Timeline (Right Side) */}
            <div className="flex-1 overflow-auto" ref={timelineRef}>
              {/* Timeline Header */}
              <div className="flex h-10 border-b">
                {timelineItems.map((date, index) => (
                  <div
                    key={index}
                    className="flex-none border-r text-center text-xs font-medium"
                    style={{ width: `${getCellWidth()}px` }}
                  >
                    {formatTimelineDate(date)}
                  </div>
                ))}
              </div>

              {/* Timeline Grid */}
              <ScrollArea className="h-[calc(100vh-320px)]">
                <div className="relative">
                  {/* Grid Lines */}
                  <div
                    className="absolute inset-0 grid"
                    style={{
                      gridTemplateColumns: `repeat(${timelineItems.length}, ${getCellWidth()}px)`,
                    }}
                  >
                    {timelineItems.map((_, index) => (
                      <div key={index} className="border-r h-full"></div>
                    ))}
                  </div>

                  {/* Task Bars */}
                  {flattenedTasks.map(
                    (task, taskIndex) =>
                      isTaskVisible(task) && (
                        <div key={task.id} className="relative h-[52px] border-b">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={`absolute top-1/2 -translate-y-1/2 h-6 ${
                                    task.is_milestone
                                      ? "h-6 w-6 rounded-full flex items-center justify-center"
                                      : "rounded-md"
                                  } ${getTaskBarColor(task)}`}
                                  style={getTaskBarStyle(task)}
                                >
                                  {!task.is_milestone && (
                                    <div className="px-2 h-full flex items-center text-white text-xs truncate">
                                      {task.title}
                                    </div>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-1">
                                  <p className="font-medium">{task.title}</p>
                                  <p className="text-xs">
                                    {format(task.start_date, "MMM d, yyyy")} - {format(task.end_date, "MMM d, yyyy")}
                                  </p>
                                  <p className="text-xs">Progress: {task.progress}%</p>
                                  {task.assignee && <p className="text-xs">Assignee: {task.assignee.name}</p>}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {/* Dependency Lines (simplified) */}
                          {task.dependencies?.map((depId) => {
                            const parentTask = flattenedTasks.find((t) => t.id === depId)
                            if (!parentTask || !isTaskVisible(parentTask)) return null

                            return (
                              <div
                                key={`${task.id}-${depId}`}
                                className="absolute top-0 h-px bg-slate-400"
                                style={{
                                  left: getTaskBarStyle(parentTask).left,
                                  width: `calc(${getTaskBarStyle(task).left} - ${getTaskBarStyle(parentTask).left})`,
                                  top: "-1px",
                                }}
                              />
                            )
                          })}
                        </div>
                      ),
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-green-500"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-amber-500"></div>
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
          <span>Todo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-red-500"></div>
          <span>Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
          <span>Milestone</span>
        </div>
      </div>
    </div>
  )
}

