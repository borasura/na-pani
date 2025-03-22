import type React from "react"
import {
  Bell,
  BellOff,
  Clock,
  Mail,
  MessageSquare,
  Smartphone,
  UserPlus,
  AlertTriangle,
  CheckCircle2,
  Calendar,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function NotificationSettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notification Settings</h1>
            <p className="text-muted-foreground">Customize how and when you receive notifications</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/notifications">Back to Notifications</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="channels" className="space-y-4">
          <TabsList>
            <TabsTrigger value="channels">Notification Channels</TabsTrigger>
            <TabsTrigger value="preferences">Notification Preferences</TabsTrigger>
            <TabsTrigger value="schedule">Schedule & Frequency</TabsTrigger>
          </TabsList>

          <TabsContent value="channels" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Delivery</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-4">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">In-app Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications within the application</p>
                    </div>
                  </div>
                  <Switch defaultChecked id="in-app" />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch defaultChecked id="email" />
                </div>
                <Separator />
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-4">
                    <Smartphone className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                    </div>
                  </div>
                  <Switch id="push" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Notification Settings</CardTitle>
                <CardDescription>Configure your email notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-format">Email Format</Label>
                  <RadioGroup defaultValue="html" id="email-format" className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="html" id="html" className="peer sr-only" />
                      <Label
                        htmlFor="html"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">HTML</span>
                        <span className="text-xs text-muted-foreground">Rich formatted emails</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="plain" id="plain" className="peer sr-only" />
                      <Label
                        htmlFor="plain"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="font-medium">Plain Text</span>
                        <span className="text-xs text-muted-foreground">Simple text emails</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email-digest">Email Digest</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger id="email-digest">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Send immediately</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                      <SelectItem value="weekly">Weekly digest</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Choose how frequently you want to receive email notifications
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Notifications</CardTitle>
                <CardDescription>Configure notifications for task-related events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <NotificationPreference
                  icon={<CheckCircle2 className="h-5 w-5 text-primary" />}
                  title="Task Assignments"
                  description="When you are assigned to a task"
                  defaultChecked={true}
                  id="task-assignments"
                />
                <Separator />
                <NotificationPreference
                  icon={<Clock className="h-5 w-5 text-amber-500" />}
                  title="Task Status Changes"
                  description="When a task's status is updated"
                  defaultChecked={true}
                  id="task-status"
                />
                <Separator />
                <NotificationPreference
                  icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
                  title="Task Due Date Approaching"
                  description="When a task is due within 48 hours"
                  defaultChecked={true}
                  id="task-due-date"
                />
                <Separator />
                <NotificationPreference
                  icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
                  title="Overdue Tasks"
                  description="When a task becomes overdue"
                  defaultChecked={true}
                  id="task-overdue"
                />
                <Separator />
                <NotificationPreference
                  icon={<BellOff className="h-5 w-5 text-muted-foreground" />}
                  title="Inactive Tasks"
                  description="When a task has had no updates for 7+ days"
                  defaultChecked={true}
                  id="task-inactive"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Notifications</CardTitle>
                <CardDescription>Configure notifications for project-related events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <NotificationPreference
                  icon={<UserPlus className="h-5 w-5 text-indigo-500" />}
                  title="Project Membership"
                  description="When you are added to or removed from a project"
                  defaultChecked={true}
                  id="project-membership"
                />
                <Separator />
                <NotificationPreference
                  icon={<UserPlus className="h-5 w-5 text-indigo-500" />}
                  title="Role Changes"
                  description="When your role in a project changes"
                  defaultChecked={true}
                  id="role-changes"
                />
                <Separator />
                <NotificationPreference
                  icon={<Calendar className="h-5 w-5 text-emerald-500" />}
                  title="Project Timeline Changes"
                  description="When a project's start or end date changes"
                  defaultChecked={false}
                  id="project-timeline"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Notifications</CardTitle>
                <CardDescription>Configure notifications for comments and messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <NotificationPreference
                  icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
                  title="Comments on Your Tasks"
                  description="When someone comments on a task you're assigned to"
                  defaultChecked={true}
                  id="comments-tasks"
                />
                <Separator />
                <NotificationPreference
                  icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
                  title="Mentions"
                  description="When someone mentions you in a comment"
                  defaultChecked={true}
                  id="mentions"
                />
                <Separator />
                <NotificationPreference
                  icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
                  title="Comments on Watched Tasks"
                  description="When someone comments on a task you're watching"
                  defaultChecked={false}
                  id="comments-watched"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Schedule</CardTitle>
                <CardDescription>Set your working hours for notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="do-not-disturb" />
                  <Label htmlFor="do-not-disturb">Enable Do Not Disturb mode during off hours</Label>
                </div>

                <div className="grid gap-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Select defaultValue="9">
                        <SelectTrigger id="start-time">
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
                    <div className="grid gap-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Select defaultValue="17">
                        <SelectTrigger id="end-time">
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

                  <div className="grid gap-2">
                    <Label>Working Days</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                        (day, index) => (
                          <div key={day} className="flex items-center space-x-2">
                            <Switch id={`day-${index}`} defaultChecked={index < 5} />
                            <Label htmlFor={`day-${index}`}>{day}</Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Frequency</CardTitle>
                <CardDescription>Control how often you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="reminder-frequency">Task Reminder Frequency</Label>
                  <Select defaultValue="24">
                    <SelectTrigger id="reminder-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 hours before</SelectItem>
                      <SelectItem value="24">24 hours before</SelectItem>
                      <SelectItem value="48">48 hours before</SelectItem>
                      <SelectItem value="72">72 hours before</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    How far in advance you want to be reminded of upcoming deadlines
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="digest-frequency">Digest Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="digest-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Real-time (immediate)</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">How often you want to receive notification digests</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="inactivity-threshold">Inactivity Reminder Threshold</Label>
                  <Select defaultValue="7">
                    <SelectTrigger id="inactivity-threshold">
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="5">5 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    When to be notified about tasks with no recent activity
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

function NotificationPreference({
  icon,
  title,
  description,
  defaultChecked,
  id,
}: {
  icon: React.ReactNode
  title: string
  description: string
  defaultChecked: boolean
  id: string
}) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Switch defaultChecked={defaultChecked} id={`${id}-app`} />
          <Label htmlFor={`${id}-app`} className="text-xs">
            App
          </Label>
        </div>
        <div className="flex items-center gap-1.5">
          <Switch defaultChecked={defaultChecked} id={`${id}-email`} />
          <Label htmlFor={`${id}-email`} className="text-xs">
            Email
          </Label>
        </div>
        <div className="flex items-center gap-1.5">
          <Switch defaultChecked={false} id={`${id}-push`} />
          <Label htmlFor={`${id}-push`} className="text-xs">
            Push
          </Label>
        </div>
      </div>
    </div>
  )
}

