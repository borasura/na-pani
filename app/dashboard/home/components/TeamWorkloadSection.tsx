// src/components/dashboard/TeamWorkloadSection.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WorkloadItem, { WorkloadItemProps } from "./WorkloadItem"; // Import the item component

interface TeamWorkloadSectionProps {
  items: WorkloadItemProps[];
}

export default function TeamWorkloadSection({ items }: TeamWorkloadSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Workload</CardTitle>
        <CardDescription>Task distribution across team members</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <WorkloadItem
            key={item.id}
            id={item.id}
            name={item.name}
            role={item.role}
            tasks={item.tasks}
            avatar={item.avatar}
            completion={item.completion}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Manage Team
        </Button>
      </CardFooter>
    </Card>
  );
}
