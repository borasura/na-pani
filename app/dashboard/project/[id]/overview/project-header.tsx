'use client'

import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"

export default function ProjectHeader({ name, description }) {

  return (
       
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="outline">
        <Calendar className="mr-2 h-4 w-4" />
        View Timeline
      </Button>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Task
      </Button>
    </div>
  </div>
  );
}