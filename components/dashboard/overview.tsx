import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function Overview() {
  const activities = [
    { name: "Cardio", progress: 75, goal: "30 mins/day" },
    { name: "Strength", progress: 60, goal: "3 sets/exercise" },
    { name: "Flexibility", progress: 45, goal: "15 mins/day" },
    { name: "Steps", progress: 85, goal: "10,000/day" }
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{activity.name}</div>
              <div className="text-xs text-muted-foreground">Goal: {activity.goal}</div>
            </div>
            <div className="text-sm font-medium">{activity.progress}%</div>
          </div>
          <Progress 
            value={activity.progress} 
            className="progress-gradient h-2"
          />
        </div>
      ))}
    </div>
  )
} 