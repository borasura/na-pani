// components/PerformanceMetric.tsx
import { Progress } from "@/components/ui/progress";

export default function PerformanceMetric({ label, valueText, progressValue, insight }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-sm font-semibold">{valueText}</div>
      </div>
      <Progress value={progressValue} />
      {insight && <div className="text-xs text-muted-foreground italic">{insight}</div>}
    </div>
  );
}
