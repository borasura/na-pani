"use client"

import React from "react"

import { useState } from "react"
import {
  addDays,
  addMonths,
  format,
  getDaysInMonth,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Filter,
  Plus,
  Search,
  Settings,
  X,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Users,
} from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week">("month")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  const goToPreviousPeriod = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1))
    } else {
      setCurrentDate(addDays(currentDate, -7))
    }
  }

  const goToNextPeriod = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1))
    } else {
      setCurrentDate(addDays(currentDate, 7))
    }
  }

  const handleDateClick = (date: Date, events: CalendarEvent[]) => {
    setSelectedDate(date)
    if (events.length > 0) {
      setSelectedEvent(events[0])
      setShowEventDetails(true)
    } else {
      setShowEventDetails(false)
    }
  }

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const closeEventDetails = () => {
    setShowEventDetails(false)
    setSelectedEvent(null)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">Manage your schedule and view upcoming deadlines</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToPreviousPeriod}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToNextPeriod}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">
                {view === "month"
                  ? format(currentDate, "MMMM yyyy")
                  : `Week of ${format(startOfWeek(currentDate), "MMM d")} - ${format(addDays(startOfWeek(currentDate), 6), "MMM d, yyyy")}`}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Select value={view} onValueChange={(value: "month" | "week") => setView(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                <Link href="/dashboard/calendar/settings">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Calendar Settings</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem>All Projects</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-indigo-500" />
                      Marketing Campaign Q2
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-500" />
                      Website Redesign
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-violet-500" />
                      Mobile App Development
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-teal-500" />
                      Annual Report
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      Show completed tasks
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search events..." className="pl-8 md:w-[200px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <Card className="col-span-1 lg:col-span-5">
            <CardContent className="p-0">
              {view === "month" ? (
                <MonthView
                  currentDate={currentDate}
                  events={calendarEvents}
                  onDateClick={handleDateClick}
                  onEventClick={handleEventClick}
                  selectedDate={selectedDate}
                />
              ) : (
                <WeekView
                  currentDate={currentDate}
                  events={calendarEvents}
                  onDateClick={handleDateClick}
                  onEventClick={handleEventClick}
                  selectedDate={selectedDate}
                />
              )}
            </CardContent>
          </Card>

          <div className="col-span-1 flex flex-col gap-4 lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Mini Calendar</CardTitle>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronsLeft className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronsRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{format(currentDate, "MMMM yyyy")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="py-1 font-medium">
                      {day}
                    </div>
                  ))}
                  {generateMiniCalendarDays(currentDate).map((day, index) => {
                    const isCurrentMonth = isSameMonth(day.date, currentDate)
                    const isSelected = selectedDate ? isSameDay(day.date, selectedDate) : false
                    const hasEvents = day.events > 0

                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-xs",
                          isToday(day.date) && "bg-primary text-primary-foreground",
                          !isToday(day.date) && isSelected && "bg-muted",
                          !isToday(day.date) && !isSelected && hasEvents && "font-medium",
                          !isCurrentMonth && "text-muted-foreground opacity-50",
                        )}
                        onClick={() => setSelectedDate(day.date)}
                      >
                        {format(day.date, "d")}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {showEventDetails && selectedEvent ? (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: getProjectColor(selectedEvent.project) }}
                        />
                        <CardDescription>{selectedEvent.project}</CardDescription>
                      </div>
                      <CardTitle className="mt-1">{selectedEvent.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeEventDetails}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{format(parseISO(selectedEvent.start), "EEEE, MMMM d, yyyy")}</div>
                      {selectedEvent.allDay ? (
                        <div className="text-sm text-muted-foreground">All day</div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          {format(parseISO(selectedEvent.start), "h:mm a")} -{" "}
                          {format(parseISO(selectedEvent.end), "h:mm a")}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedEvent.description && (
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Description</div>
                      <div className="text-sm text-muted-foreground">{selectedEvent.description}</div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={
                        selectedEvent.status === "Done"
                          ? "outline"
                          : selectedEvent.status === "In Progress"
                            ? "default"
                            : selectedEvent.status === "Blocked"
                              ? "destructive"
                              : "secondary"
                      }
                    >
                      {selectedEvent.status}
                    </Badge>
                    <Badge
                      variant={
                        selectedEvent.priority === "High"
                          ? "destructive"
                          : selectedEvent.priority === "Medium"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {selectedEvent.priority} Priority
                    </Badge>
                    {selectedEvent.isOverdue && <Badge variant="destructive">Overdue</Badge>}
                  </div>

                  {selectedEvent.assignedTo && (
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Assigned to:</div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={selectedEvent.assignedTo.avatar} alt={selectedEvent.assignedTo.name} />
                          <AvatarFallback>{selectedEvent.assignedTo.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{selectedEvent.assignedTo.name}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button size="sm">View Task Details</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Tasks due in the next 7 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-start space-x-4 rounded-md border p-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{deadline.title}</p>
                          {deadline.isOverdue && (
                            <Badge variant="destructive" className="ml-auto">
                              Overdue
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{deadline.project}</p>
                        <div className="flex items-center pt-2">
                          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-medium">{deadline.dueDate}</span>
                          <div className="ml-auto flex items-center">
                            <div
                              className="mr-1 h-2 w-2 rounded-full"
                              style={{ backgroundColor: getProjectColor(deadline.project) }}
                            />
                            <span className="text-xs">{deadline.priority}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Deadlines
                  </Button>
                </CardFooter>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>{format(new Date(), "EEEE, MMMM d, yyyy")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayEvents.length > 0 ? (
                  todayEvents.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {event.type === "meeting" ? (
                          <Users className="h-5 w-5 text-blue-500" />
                        ) : event.type === "task" ? (
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Calendar className="h-5 w-5 text-violet-500" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {event.allDay ? "All day" : `${event.time}`}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{event.project}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <Calendar className="mb-2 h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No events today</h3>
                    <p className="text-sm text-muted-foreground">Enjoy your free day or schedule something new</p>
                    <Button variant="outline" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Event
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function MonthView({
  currentDate,
  events,
  onDateClick,
  onEventClick,
  selectedDate,
}: {
  currentDate: Date
  events: CalendarEvent[]
  onDateClick: (date: Date, events: CalendarEvent[]) => void
  onEventClick: (event: CalendarEvent, e: React.MouseEvent) => void
  selectedDate: Date | null
}) {
  const monthStart = startOfMonth(currentDate)
  const startDate = startOfWeek(monthStart)
  const days = generateCalendarDays(startDate, 42, events)

  return (
    <div className="grid grid-cols-7 border-b border-l text-sm">
      {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
        <div key={day} className="border-r border-t p-2 text-center font-medium">
          <div className="hidden md:block">{day}</div>
          <div className="md:hidden">{day.substring(0, 3)}</div>
        </div>
      ))}

      {days.map((day, index) => {
        const isCurrentMonth = isSameMonth(day.date, currentDate)
        const isSelected = selectedDate ? isSameDay(day.date, selectedDate) : false
        const dayEvents = day.events

        return (
          <div
            key={index}
            className={cn(
              "min-h-[120px] border-r border-t p-1 md:p-2",
              !isCurrentMonth && "bg-muted/30",
              isSelected && "bg-muted",
            )}
            onClick={() => onDateClick(day.date, dayEvents)}
          >
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-sm",
                  isToday(day.date) && "bg-primary text-primary-foreground",
                  !isToday(day.date) && "text-muted-foreground",
                )}
              >
                {format(day.date, "d")}
              </div>
              {dayEvents.length > 0 && (
                <Badge variant="outline" className="h-5 px-1 text-xs">
                  {dayEvents.length}
                </Badge>
              )}
            </div>

            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 3).map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className={cn(
                    "flex cursor-pointer items-center gap-1 rounded px-1 py-0.5 text-xs",
                    event.status === "Done" && "opacity-60",
                    event.isOverdue && "border-l-2 border-destructive",
                  )}
                  style={{ backgroundColor: `${getProjectColor(event.project)}20` }}
                  onClick={(e) => onEventClick(event, e)}
                >
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: getProjectColor(event.project) }}
                  />
                  <span className="truncate">{event.title}</span>
                  {event.isOverdue && <AlertTriangle className="ml-auto h-3 w-3 shrink-0 text-destructive" />}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="px-1 text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function WeekView({
  currentDate,
  events,
  onDateClick,
  onEventClick,
  selectedDate,
}: {
  currentDate: Date
  events: CalendarEvent[]
  onDateClick: (date: Date, events: CalendarEvent[]) => void
  onEventClick: (event: CalendarEvent, e: React.MouseEvent) => void
  selectedDate: Date | null
}) {
  const weekStart = startOfWeek(currentDate)
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(weekStart, i)
    return {
      date,
      events: events.filter((event) => {
        const eventDate = parseISO(event.start)
        return isSameDay(eventDate, date)
      }),
    }
  })

  const hours = Array.from({ length: 24 }).map((_, i) => i)

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-8 border-b border-l">
        <div className="border-r border-t p-2 text-center font-medium">
          <div className="text-sm">Time</div>
        </div>
        {days.map((day, index) => {
          const isSelected = selectedDate ? isSameDay(day.date, selectedDate) : false

          return (
            <div
              key={index}
              className={cn(
                "border-r border-t p-2 text-center",
                isToday(day.date) && "bg-muted/50",
                isSelected && "bg-muted",
              )}
              onClick={() => onDateClick(day.date, day.events)}
            >
              <div className="text-sm font-medium">{format(day.date, "EEE")}</div>
              <div
                className={cn(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full text-sm",
                  isToday(day.date) && "bg-primary text-primary-foreground",
                )}
              >
                {format(day.date, "d")}
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-8 border-b border-l">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="border-r border-t p-1 text-center text-xs text-muted-foreground">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
            {days.map((day, dayIndex) => {
              const hourEvents = day.events.filter((event) => {
                if (event.allDay) return false
                const eventHour = parseISO(event.start).getHours()
                return eventHour === hour
              })

              return (
                <div
                  key={`${hour}-${dayIndex}`}
                  className={cn("relative border-r border-t p-1", isToday(day.date) && "bg-muted/50")}
                >
                  {hourEvents.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={cn(
                        "mb-1 cursor-pointer rounded px-1 py-0.5 text-xs",
                        event.status === "Done" && "opacity-60",
                        event.isOverdue && "border-l-2 border-destructive",
                      )}
                      style={{ backgroundColor: `${getProjectColor(event.project)}20` }}
                      onClick={(e) => onEventClick(event, e)}
                    >
                      <div className="flex items-center gap-1">
                        <div
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: getProjectColor(event.project) }}
                        />
                        <span className="truncate">{event.title}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">{format(parseISO(event.start), "h:mm a")}</div>
                    </div>
                  ))}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function generateCalendarDays(startDate: Date, count: number, events: CalendarEvent[]) {
  return Array.from({ length: count }).map((_, i) => {
    const date = addDays(startDate, i)
    return {
      date,
      events: events.filter((event) => {
        const eventDate = parseISO(event.start)
        return isSameDay(eventDate, date)
      }),
    }
  })
}

function generateMiniCalendarDays(currentDate: Date) {
  const monthStart = startOfMonth(currentDate)
  const startDate = startOfWeek(monthStart)
  const daysInMonth = getDaysInMonth(currentDate)

  return Array.from({ length: 42 }).map((_, i) => {
    const date = addDays(startDate, i)
    // Simulate event count - in a real app, this would come from your events data
    const events = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0
    return { date, events }
  })
}

function getProjectColor(project: string) {
  const colorMap: Record<string, string> = {
    "Marketing Campaign Q2": "#4f46e5", // indigo-600
    "Website Redesign": "#0891b2", // cyan-600
    "Mobile App Development": "#7c3aed", // violet-600
    "Annual Report": "#0d9488", // teal-600
    "Product Launch": "#dc2626", // red-600
    "Team Training": "#ea580c", // orange-600
  }

  return colorMap[project] || "#6b7280" // gray-500 as default
}

// Sample data
interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  allDay: boolean
  project: string
  status: "Todo" | "In Progress" | "Done" | "Blocked"
  priority: "Low" | "Medium" | "High"
  isOverdue: boolean
  description?: string
  type?: "task" | "meeting" | "milestone"
  assignedTo?: {
    name: string
    avatar: string
  }
}

const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Update marketing materials",
    start: "2025-03-20T10:00:00",
    end: "2025-03-20T11:30:00",
    allDay: false,
    project: "Marketing Campaign Q2",
    status: "In Progress",
    priority: "High",
    isOverdue: true,
    description: "Update all marketing materials with new branding guidelines",
    type: "task",
    assignedTo: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "2",
    title: "API Integration Meeting",
    start: "2025-03-22T14:00:00",
    end: "2025-03-22T15:00:00",
    allDay: false,
    project: "Mobile App Development",
    status: "Todo",
    priority: "Medium",
    isOverdue: false,
    description: "Discuss API integration strategy with backend team",
    type: "meeting",
  },
  {
    id: "3",
    title: "Finalize Q2 marketing budget",
    start: "2025-03-24T09:00:00",
    end: "2025-03-24T09:00:00",
    allDay: true,
    project: "Marketing Campaign Q2",
    status: "Todo",
    priority: "High",
    isOverdue: false,
    type: "task",
  },
  {
    id: "4",
    title: "Review design mockups",
    start: "2025-03-21T11:00:00",
    end: "2025-03-21T12:00:00",
    allDay: false,
    project: "Website Redesign",
    status: "Blocked",
    priority: "Medium",
    isOverdue: true,
    description: "Review and approve final design mockups for homepage",
    type: "task",
  },
  {
    id: "5",
    title: "Team Standup",
    start: "2025-03-23T09:30:00",
    end: "2025-03-23T10:00:00",
    allDay: false,
    project: "Mobile App Development",
    status: "Todo",
    priority: "Medium",
    isOverdue: false,
    type: "meeting",
  },
  {
    id: "6",
    title: "Complete user flow diagrams",
    start: "2025-03-25T13:00:00",
    end: "2025-03-25T15:00:00",
    allDay: false,
    project: "Website Redesign",
    status: "In Progress",
    priority: "Medium",
    isOverdue: false,
    type: "task",
    assignedTo: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "7",
    title: "Product Launch Planning",
    start: "2025-03-26T10:00:00",
    end: "2025-03-26T11:30:00",
    allDay: false,
    project: "Product Launch",
    status: "Todo",
    priority: "High",
    isOverdue: false,
    type: "meeting",
  },
  {
    id: "8",
    title: "Quarterly Review",
    start: "2025-03-31T14:00:00",
    end: "2025-03-31T16:00:00",
    allDay: false,
    project: "Annual Report",
    status: "Todo",
    priority: "High",
    isOverdue: false,
    type: "milestone",
  },
  {
    id: "9",
    title: "Prepare training materials",
    start: "2025-03-27T09:00:00",
    end: "2025-03-27T12:00:00",
    allDay: false,
    project: "Team Training",
    status: "In Progress",
    priority: "Low",
    isOverdue: false,
    type: "task",
  },
  {
    id: "10",
    title: "Review API documentation",
    start: "2025-03-26T13:00:00",
    end: "2025-03-26T14:30:00",
    allDay: false,
    project: "Mobile App Development",
    status: "Todo",
    priority: "Medium",
    isOverdue: false,
    type: "task",
  },
]

const upcomingDeadlines = [
  {
    title: "Finalize Q2 marketing budget",
    project: "Marketing Campaign Q2",
    dueDate: "Tomorrow",
    priority: "High",
    isOverdue: false,
  },
  {
    title: "Complete user flow diagrams",
    project: "Website Redesign",
    dueDate: "In 2 days",
    priority: "Medium",
    isOverdue: false,
  },
  {
    title: "Review API documentation",
    project: "Mobile App Development",
    dueDate: "In 3 days",
    priority: "Medium",
    isOverdue: false,
  },
  {
    title: "Update marketing materials",
    project: "Marketing Campaign Q2",
    dueDate: "2 days ago",
    priority: "High",
    isOverdue: true,
  },
]

const todayEvents = [
  {
    title: "Team Standup",
    time: "9:30 AM - 10:00 AM",
    project: "Mobile App Development",
    type: "meeting",
    allDay: false,
  },
  {
    title: "Review design mockups",
    time: "11:00 AM - 12:00 PM",
    project: "Website Redesign",
    type: "task",
    allDay: false,
  },
  {
    title: "Client Presentation",
    time: "2:00 PM - 3:00 PM",
    project: "Marketing Campaign Q2",
    type: "meeting",
    allDay: false,
  },
]

