'use client'

import { Calendar, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProjectHeader({ name, description }) {

  const pathname = usePathname();

  // Extract project ID from the URL (e.g., /dashboard/projects/[id]/overview)
  const projectId = pathname.split('/')[3]; // index 3 = [id]

  return (
       
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
    <div className="flex items-center gap-2">
    <Link href={`/dashboard/projects/${projectId}/edit`}>
      <Button variant="outline">
        <Settings className="mr-2 h-4 w-4" />
        Project Settings
      </Button>
      </Link>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Task
      </Button>
    </div>
  </div>
  );
}