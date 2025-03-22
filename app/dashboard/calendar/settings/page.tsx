import { ArrowLeft, Calendar, Clock, Eye, EyeOff, Filter, Palette } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function CalendarSettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Calendar Settings</h1>
            <p className="text-muted-foreground">Customize your calendar view and preferences</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/calendar">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Calendar
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="display" className="space-y-4">
          <TabsList>
            <TabsTrigger value="display">Display Settings</TabsTrigger>
            <TabsTrigger value="events">Event Settings</TabsTrigger>
            <TabsTrigger value="workweek">Work Week</TabsTrigger>
          </TabsList>

          <TabsContent value="display" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>Configure how your calendar is displayed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Default View</Label>
                    <RadioGroup defaultValue="month" className="grid grid-cols-2 gap-4">
                      <div>
                        <RadioGroupItem value="month" id="month" className="peer sr-only" />
                        <Label
                          htmlFor="month"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Calendar className="mb-2 h-6 w-6" />
                          <span className="font-medium">Month</span>
                          <span className="text-xs text-muted-foreground">View entire month</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="week" id="week" className="peer sr-only" />
                        <Label
                          htmlFor="week"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Calendar className="mb-2 h-6 w-6" />
                          <span className="font-medium">Week</span>
                          <span className="text-xs text-muted-foreground">View week with hours</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="first-day">First Day of Week</Label>
                    <Select defaultValue="sunday">
                      <SelectTrigger id="first-day">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time-format">Time Format</Label>
                    <Select defaultValue="12">
                      <SelectTrigger id="time-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12-hour (1:00 PM)</SelectItem>
                        <SelectItem value="24">24-hour (13:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Display Options</h3>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="show-weekends">Show weekends</Label>
                    </div>
                    <Switch id="show-weekends" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="show-week-numbers">Show week numbers</Label>
                    </div>
                    <Switch id="show-week-numbers" />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="show-all-day">Show all-day events in week view</Label>
                    </div>
                    <Switch id="show-all-day" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="hide-completed">Hide completed tasks</Label>
                    </div>
                    <Switch id="hide-completed" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of your calendar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-density">Event Density</Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger id="event-density">
                        <SelectValue placeholder="Select density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Controls how much space is used for displaying events
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color-scheme">Color Scheme</Label>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-8 w-8 rounded-full bg-indigo-500" />
                        <span className="text-xs">Indigo</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-8 w-8 rounded-full bg-cyan-500" />
                        <span className="text-xs">Cyan</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-8 w-8 rounded-full bg-violet-500" />
                        <span className="text-xs">Violet</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-8 w-8 rounded-full bg-emerald-500" />
                        <span className="text-xs">Emerald</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-8 w-8 rounded-full bg-rose-500" />
                        <span className="text-xs">Rose</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Choose a color scheme for your calendar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Display</CardTitle>
                <CardDescription>Configure how events are displayed on your calendar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Event Types</h3>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-emerald-500" />
                      <Label htmlFor="show-tasks">Tasks</Label>
                    </div>
                    <Switch id="show-tasks" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-blue-500" />
                      <Label htmlFor="show-meetings">Meetings</Label>
                    </div>
                    <Switch id="show-meetings" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 rounded-full bg-violet-500" />
                      <Label htmlFor="show-milestones">Milestones</Label>
                    </div>
                    <Switch id="show-milestones" defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Event Information</h3>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="show-project-colors">Show project colors</Label>
                    </div>
                    <Switch id="show-project-colors" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="show-priority-indicators">Show priority indicators</Label>
                    </div>
                    <Switch id="show-priority-indicators" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="show-time">Show time in month view</Label>
                    </div>
                    <Switch id="show-time" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Visibility</CardTitle>
                <CardDescription>Choose which projects to display on your calendar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-indigo-500" />
                    <Label htmlFor="show-marketing">Marketing Campaign Q2</Label>
                  </div>
                  <Switch id="show-marketing" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-cyan-500" />
                    <Label htmlFor="show-website">Website Redesign</Label>
                  </div>
                  <Switch id="show-website" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-violet-500" />
                    <Label htmlFor="show-mobile">Mobile App Development</Label>
                  </div>
                  <Switch id="show-mobile" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-teal-500" />
                    <Label htmlFor="show-annual">Annual Report</Label>
                  </div>
                  <Switch id="show-annual" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-red-500" />
                    <Label htmlFor="show-product">Product Launch</Label>
                  </div>
                  <Switch id="show-product" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-orange-500" />
                    <Label htmlFor="show-training">Team Training</Label>
                  </div>
                  <Switch id="show-training" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workweek" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Working Hours</CardTitle>
                <CardDescription>Set your working hours for better calendar visualization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch id="highlight-working-hours" defaultChecked />
                  <Label htmlFor="highlight-working-hours">Highlight working hours in calendar</Label>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="work-start-time">Work Start Time</Label>
                      <Select defaultValue="9">
                        <SelectTrigger id="work-start-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="work-end-time">Work End Time</Label>
                      <Select defaultValue="17">
                        <SelectTrigger id="work-end-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Working Days</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                      <div key={day + index} className="flex flex-col items-center gap-2">
                        <div className="text-sm font-medium">{day}</div>
                        <Switch id={`day-${index}`} defaultChecked={index > 0 && index < 6} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Zone</CardTitle>
                <CardDescription>Set your time zone for accurate scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue="america-new_york">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-new_york">Eastern Time (ET) - New York</SelectItem>
                      <SelectItem value="america-chicago">Central Time (CT) - Chicago</SelectItem>
                      <SelectItem value="america-denver">Mountain Time (MT) - Denver</SelectItem>
                      <SelectItem value="america-los_angeles">Pacific Time (PT) - Los Angeles</SelectItem>
                      <SelectItem value="europe-london">Greenwich Mean Time (GMT) - London</SelectItem>
                      <SelectItem value="europe-paris">Central European Time (CET) - Paris</SelectItem>
                      <SelectItem value="asia-tokyo">Japan Standard Time (JST) - Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Calendar events will be displayed in your selected time zone
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </main>
    </div>
  )
}

