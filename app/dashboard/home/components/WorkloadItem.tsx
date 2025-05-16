// src/components/dashboard/WorkloadItem.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";

export interface WorkloadItemProps {
  id: string; // Added id for key prop when mapping
  name: string;
  role: string;
  tasks: number;
  avatar: string; // URL for the avatar image
  completion: number;
}

export default function WorkloadItem({ name, role, tasks, avatar, completion }: WorkloadItemProps) {
  const avatarFallback = name ? name.charAt(0).toUpperCase() : "U";
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
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
  );
}
