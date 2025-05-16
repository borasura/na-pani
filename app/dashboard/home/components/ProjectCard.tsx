// src/components/dashboard/ProjectCard.tsx
// This component was already defined in the original file but is moved here for better organization.
// It's not directly used in the main DashboardPage example above but is good to keep separate.

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  name: string;
  description: string;
  progress: number;
  status: string;
  priority: "High" | "Medium" | "Low" | string;
  tasks: { total: number; completed: number };
  dueDate: string;
  role: string;
  color: string; // For status badge border/text color
}

export default function ProjectCard({
  name,
  description,
  progress,
  status,
  priority,
  tasks,
  dueDate,
  role,
  color,
}: ProjectCardProps) {
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
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">Progress</div>
            <div className="text-sm font-medium">{progress}%</div>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="mt-4 grid grid-cols-2 gap-4">
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
                  ? "border-destructive text-destructive"
                  : priority === "Medium"
                  ? "border-amber-500 text-amber-500"
                  : "border-emerald-500 text-emerald-500"
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
  );
}
