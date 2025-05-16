// src/components/dashboard/UpcomingDeadlinesSection.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeadlineItem, { DeadlineItemProps } from "./DeadlineItem"; // Import the item component

interface UpcomingDeadlinesSectionProps {
  items: DeadlineItemProps[];
}

export default function UpcomingDeadlinesSection({ items }: UpcomingDeadlinesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>Tasks due in the next 7 days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <DeadlineItem
            key={item.id}
            id={item.id}
            title={item.title}
            project={item.project}
            dueDate={item.dueDate}
            priority={item.priority}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
