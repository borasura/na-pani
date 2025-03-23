"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWeekend,
} from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for timeline events
const timelineEvents = [
  {
    id: "event1",
    title: "Project Kickoff",
    type: "milestone",
    date: new Date(2024, 0, 10),
    description: "Official project start with all stakeholders",
    color: "#4f46e5",
  },
  {
    id: "event2",
    title: "Design Phase",
    type: "phase",
    start_date: new Date(2024, 0, 11),
    end_date: new Date(2024, 1, 15),
    description: "UI/UX design and prototyping",
    color: "#0ea5e9",
  },
  {
    id: "event3",
    title: "Design Review",
    type: "milestone",
    date: new Date(2024, 1, 15),
    description: "Client review of design deliverables",
    color: "#4f46e5",
  },
  {
    id: "event4",
    title: "Development Phase",
    type: "phase",
    start_date: new Date(2024, 1, 16),
    end_date: new Date(2024, 3, 15),
    description: "Frontend and backend implementation",
    color: "#f59e0b",
  },
  {
    id: "event5",
    title: "Alpha Release",
    type: "milestone",
    date: new Date(2024, 2, 20),
    description: "Internal testing release",
    color: "#4f46e5",
  },
  {
    id: "event6",
    title: "Beta Testing",
    type: "phase",
    start_date: new Date(2024, 3, 1),
    end_date: new Date(2024, 3, 30),
    description: "Client beta testing period",
    color: "#ec4899",
  },
  {
    id: "event7",
    title: "Final Delivery",
    type: "milestone",
    date: new Date(2024, 4, 15),
    description: "Project completion and handover",
    color: "#4f46e5",
  },
]

// Helper function to check if a date has an event
const getEventsForDate = (date: Date) => {
  return timelineEvents.filter((event) => {
    if (event.type === "milestone") {
      return isSameDay(event.date, date)
    } else if (event.type === "phase") {
      return date >= event.start_date && date <= event.end_date
    }
    return false
  })
}

export default function TimelinePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("month")

  // Filter events
  const filteredEvents = timelineEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Navigate to previous/next month
  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  // Generate days for the current month view
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Timeline</h2>
          <p className="text-muted-foreground">Project schedule and milestones</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center rounded-md border bg-background">
            <Button variant="ghost" size="icon" onClick={previousMonth} className="rounded-none rounded-l-md">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-3 py-2 text-sm font-medium">{format(currentDate, "MMMM yyyy")}</div>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="rounded-none rounded-r-md">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="icon">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Month view calendar */}
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 gap-px bg-muted">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-muted">
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-start-${index}`} className="bg-background p-3 min-h-[100px]"></div>
            ))}

            {days.map((day) => {
              const dayEvents = getEventsForDate(day)
              const isToday = isSameDay(day, new Date())
              const isWeekendDay = isWeekend(day)

              return (
                <div
                  key={day.toString()}
                  className={`bg-background p-3 min-h-[100px] ${isWeekendDay ? "bg-muted/30" : ""}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`text-sm font-medium ${isToday ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center" : ""}`}
                    >
                      {format(day, "d")}
                    </span>
                    {dayEvents.length > 0 && (
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Plus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-1">
                    <TooltipProvider>
                      {dayEvents.map((event) => (
                        <Tooltip key={event.id}>
                          <TooltipTrigger asChild>
                            <div
                              className={`text-xs p-1 rounded truncate ${
                                event.type === "milestone" ? "border-l-4 bg-primary/10" : "bg-primary/5"
                              }`}
                              style={{ borderLeftColor: event.color }}
                            >
                              {event.title}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p className="font-medium">{event.title}</p>
                              <p className="text-xs">{event.description}</p>
                              {event.type === "milestone" ? (
                                <p className="text-xs">{format(event.date, "MMM d, yyyy")}</p>
                              ) : (
                                <p className="text-xs">
                                  {format(event.start_date, "MMM d")} - {format(event.end_date, "MMM d, yyyy")}
                                </p>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </div>
                </div>
              )
            })}

            {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
              <div key={`empty-end-${index}`} className="bg-background p-3 min-h-[100px]"></div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline events list */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
        <div className="space-y-3">
          {filteredEvents
            .filter((event) => (event.type === "milestone" ? event.date >= new Date() : event.end_date >= new Date()))
            .sort((a, b) => {
              const dateA = a.type === "milestone" ? a.date : a.start_date
              const dateB = b.type === "milestone" ? b.date : b.start_date
              return dateA.getTime() - dateB.getTime()
            })
            .slice(0, 5)
            .map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div
                  className="h-10 w-10 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: `${event.color}20`, color: event.color }}
                >
                  {event.type === "milestone" ? (
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: event.color }}></div>
                  ) : (
                    <div className="h-4 w-1 rounded-full" style={{ backgroundColor: event.color }}></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge variant="outline">{event.type === "milestone" ? "Milestone" : "Phase"}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  <div className="text-sm mt-2">
                    {event.type === "milestone" ? (
                      <span>{format(event.date, "MMMM d, yyyy")}</span>
                    ) : (
                      <span>
                        {format(event.start_date, "MMM d")} - {format(event.end_date, "MMM d, yyyy")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

