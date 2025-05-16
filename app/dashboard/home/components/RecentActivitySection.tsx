// src/components/dashboard/RecentActivitySection.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActivityItem, { ActivityItemProps } from "./ActivityItem"; // Import the item component and its props

interface RecentActivitySectionProps {
  items: ActivityItemProps[]; // Expect an array of activity items
}

export default function RecentActivitySection({ items }: RecentActivitySectionProps) {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates across your projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <ActivityItem
            key={item.id} // Use a unique key
            id={item.id}
            username={item.username}
            email={item.email}
            type={item.type}
            content={item.content}
            project={item.project}
            task={item.task}
            time={item.time}  
            avatar={item.avatar}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Activity
        </Button>
      </CardFooter>
    </Card>
  );
}
