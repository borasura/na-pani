// src/components/dashboard/ActivityItem.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ActivityItemProps {
  id: string; // Added id for key prop when mapping
  username: string;
  email: string;
  type: "comment" | "task_history";
  content: string;
  project: string;
  task: string;
  time: string;
  avatar: string; // URL for the avatar image
}

export default function ActivityItem({ username, type, content, project, task, time, avatar }: ActivityItemProps) {
  // Fallback character for avatar
  const avatarFallback = username ? username.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex items-start space-x-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
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
  );
}
