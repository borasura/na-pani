// src/components/dashboard/DeadlineItem.tsx
import { Clock, Flag } from "lucide-react";

export interface DeadlineItemProps {
  id: string; // Added id for key prop when mapping
  title: string;
  project: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low" | string;
}

export default function DeadlineItem({ title, project, dueDate, priority }: DeadlineItemProps) {
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
              className={`mr-1 h-3 w-3 ${
                priority === "High"
                  ? "text-destructive"
                  : priority === "Medium"
                  ? "text-amber-500"
                  : "text-emerald-500"
              }`}
            />
            <span className="text-xs">{priority}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
