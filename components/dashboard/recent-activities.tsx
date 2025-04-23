import { Badge } from "@/components/ui/badge"
import { Clock, Dumbbell, Heart } from "lucide-react"

export function RecentActivities() {
  const activities = [
    {
      type: "Workout",
      name: "Upper Body Strength",
      time: "2 hours ago",
      duration: "45 min",
      intensity: "High"
    },
    {
      type: "Cardio",
      name: "Treadmill Run",
      time: "4 hours ago",
      duration: "30 min",
      intensity: "Medium"
    },
    {
      type: "Flexibility",
      name: "Yoga Session",
      time: "Yesterday",
      duration: "60 min",
      intensity: "Low"
    }
  ]

  const getIntensityColor = (intensity: string) => {
    switch (intensity.toLowerCase()) {
      case "high":
        return "badge-error"
      case "medium":
        return "badge-warning"
      case "low":
        return "badge-success"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full gradient-icon flex items-center justify-center">
              {activity.type === "Workout" ? (
                <Dumbbell className="h-5 w-5 text-white" />
              ) : activity.type === "Cardio" ? (
                <Heart className="h-5 w-5 text-white" />
              ) : (
                <Clock className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <div className="font-medium">{activity.name}</div>
              <div className="text-sm text-muted-foreground flex items-center space-x-2">
                <span>{activity.time}</span>
                <span>•</span>
                <span>{activity.duration}</span>
              </div>
            </div>
          </div>
          <Badge className={getIntensityColor(activity.intensity)}>
            {activity.intensity}
          </Badge>
        </div>
      ))}
    </div>
  )
} 