// src/components/dashboard/PerformanceSection.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface PerformanceMetricProps {
  label: string;
  valueText: string;
  progressValue: number;
}

function PerformanceMetric({ label, valueText, progressValue }: PerformanceMetricProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="font-medium">{label}</div>
        <div>{valueText}</div>
      </div>
      <Progress value={progressValue} />
    </div>
  );
}

export default function PerformanceSection() {
  // Data for this section could also be passed as props if dynamic
  const performanceData = {
    tasksCompleted: { label: "Tasks Completed", valueText: "24/32", progress: 75 },
    onTimeCompletion: { label: "On-time Completion", valueText: "92%", progress: 92 },
    responseTime: { label: "Response Time", valueText: "85%", progress: 85 },
    completedThisMonth: { value: "18", increasePercent: "15%" },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Performance</CardTitle>
        <CardDescription>Task completion metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PerformanceMetric
          label={performanceData.tasksCompleted.label}
          valueText={performanceData.tasksCompleted.valueText}
          progressValue={performanceData.tasksCompleted.progress}
        />
        <PerformanceMetric
          label={performanceData.onTimeCompletion.label}
          valueText={performanceData.onTimeCompletion.valueText}
          progressValue={performanceData.onTimeCompletion.progress}
        />
        <PerformanceMetric
          label={performanceData.responseTime.label}
          valueText={performanceData.responseTime.valueText}
          progressValue={performanceData.responseTime.progress}
        />
        <div className="pt-4">
          <div className="text-sm font-medium">Completed This Month</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="text-2xl font-bold">{performanceData.completedThisMonth.value}</div>
            <Badge variant="outline" className="text-xs font-normal">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              {performanceData.completedThisMonth.increasePercent} increase
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
