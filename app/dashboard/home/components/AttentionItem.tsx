// src/components/dashboard/AttentionItem.tsx
import { Badge } from "@/components/ui/badge";
import { formatDateWithMonthName } from "@/lib/utils/date-utils";
import { CalendarClock, Flag } from "lucide-react";

export interface AttentionItemProps {
  id: string; // Added id for key prop when mapping
  title: string;
  project: string;
  issue: string;
  //dueDate: string;
  due_date: Date;
  priority: "High" | "Medium" | "Low" | string; // Allow string for flexibility if other priorities exist
}

export default function AttentionItem({ title, project, issue, due_date, priority }: AttentionItemProps) {
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
              <span className="text-xs text-muted-foreground">{formatDateWithMonthName(due_date)}</span>
              
              <div className="ml-auto flex items-center">
                <Flag
                  className={`mr-1 h-3 w-3 ${
                    priority === "High" ? "text-destructive" : priority === "Medium" ? "text-amber-500" : "text-emerald-500"
                  }`}
                />
                <span className="text-xs">{priority}</span>
              </div>
            </div>
          </div>
          </div>
        );
}
