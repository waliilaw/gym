import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Sample workout data
  const workouts = {
    [new Date().toDateString()]: [
      { name: "Morning Yoga", time: "07:00" },
      { name: "HIIT Session", time: "18:00" }
    ],
    [new Date(Date.now() + 86400000).toDateString()]: [
      { name: "Strength Training", time: "08:00" }
    ]
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
          components={{
            DayContent: ({ date }) => (
              <div className="relative w-full h-full p-2">
                <span>{date.getDate()}</span>
                {workouts[date.toDateString()]?.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                  </div>
                )}
              </div>
            )
          }}
        />
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <h3 className="font-medium">
            {date ? (
              <>
                Scheduled for{" "}
                {date.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric"
                })}
              </>
            ) : (
              "Select a date"
            )}
          </h3>
          {date && workouts[date.toDateString()]?.length ? (
            <div className="space-y-2">
              {workouts[date.toDateString()].map((workout, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg border border-border"
                >
                  <span className="font-medium">{workout.name}</span>
                  <Badge variant="outline">{workout.time}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No workouts scheduled for this day
            </p>
          )}
        </div>
      </Card>
    </div>
  )
} 