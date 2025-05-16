import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import PerformanceMetric from "./PerformanceMetric";

const sampData = {
  "onTimeCompletion": {
    "percent": 92,
    "insight": "Excellent discipline"
  },
  "overdueTasks": {
    "count": 3,
    "percent": 12,
    "insight": "A few tasks need attention"
  },
  "completedThisMonth": {
    "count": 18,
    "percent": 60,
    "trend": "+15%",
    "insight": "Up from last month"
  },
  "avgCompletionTime": {
    "value": 2.4,
    "percent": 80,
    "insight": "Faster than team average"
  },
  "activeTasks": {
    "count": 12,
    "percent": 50,
    "insight": "Balanced workload"
  },
  "collaboration": {
    "percent": 47,
    "insight": "Solid collaboration rate"
  }
}

export default function PerformanceSection({data}) {


  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Performance</CardTitle>
        <CardDescription>Last 30 days overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PerformanceMetric
          label="On-Time Completion"
          valueText={`${data.onTimeCompletion.percent}%`}
          progressValue={data.onTimeCompletion.percent}
          insight={data.onTimeCompletion.insight}
        />
        <PerformanceMetric
          label="Overdue Tasks"
          valueText={`${data.overdueTasks.count}`}
          progressValue={data.overdueTasks.percent}
          insight={data.overdueTasks.insight}
        />
        <PerformanceMetric
          label="Tasks Completed This Month"
          valueText={`${data.completedThisMonth.count} (${data.completedThisMonth.trend})`}
          progressValue={data.completedThisMonth.percent}
          insight={data.completedThisMonth.insight}
        />
        <PerformanceMetric
          label="Avg. Completion Time"
          valueText={`${data.avgCompletionTime.value} days`}
          progressValue={data.avgCompletionTime.percent}
          insight={data.avgCompletionTime.insight}
        />
        <PerformanceMetric
          label="Active Tasks"
          valueText={`${data.activeTasks.count}`}
          progressValue={data.activeTasks.percent}
          insight={data.activeTasks.insight}
        />
        <PerformanceMetric
          label="Collaboration Index"
          valueText={`${data.collaboration.percent}%`}
          progressValue={data.collaboration.percent}
          insight={data.collaboration.insight}
        />
      </CardContent>
    </Card>
  );
}
