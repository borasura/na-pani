// src/components/dashboard/NeedsAttentionSection.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AttentionItem, { AttentionItemProps } from "./AttentionItem"; // Import the item component and its props

interface NeedsAttentionSectionProps {
  items: AttentionItemProps[]; // Expect an array of attention items
}

export default function NeedsAttentionSection({ items }: NeedsAttentionSectionProps) {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Needs Attention</CardTitle>
        <CardDescription>Tasks that require your immediate attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* {items.map((item) => (
          <AttentionItem
            key={item.id} // Use a unique key, assuming items have an 'id'
            id={item.id}
            title={item.title}
            project={item.project}
            issue={item.issue}
            dueDate={item.dueDate}
            priority={item.priority}
          />
        ))} */}

      {items.map((item) => (
          <AttentionItem
            key={item.id} // Use a unique key, assuming items have an 'id'
            id={item.id}
            title={item.title}
            project={item.project}
            issue={item.issue}
            //dueDate={item.dueDate}
            //dueDate= "Apr 15, 2025"
            due_date={item.due_date}
            priority={item.priority}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Issues
        </Button>
      </CardFooter>
    </Card>
  );
}
