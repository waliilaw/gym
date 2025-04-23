"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { format } from "date-fns"

const DUMMY_CLASSES = [
  { id: 1, name: "Yoga Flow", time: "07:00", duration: "60min", instructor: "Sarah", spots: 5 },
  { id: 2, name: "HIIT", time: "08:30", duration: "45min", instructor: "Mike", spots: 3 },
  { id: 3, name: "Spin Class", time: "10:00", duration: "45min", instructor: "Emma", spots: 8 },
  { id: 4, name: "Strength Training", time: "12:00", duration: "60min", instructor: "John", spots: 6 }
]

const PEAK_HOURS = {
  morning: { start: 7, end: 9, capacity: 85 },
  evening: { start: 17, end: 20, capacity: 90 }
}

export default function SmartBooking() {
  const [date, setDate] = useState<Date>(new Date())
  const [currentHour] = useState(new Date().getHours())

  const getCapacityForHour = (hour: number) => {
    if (hour >= PEAK_HOURS.morning.start && hour <= PEAK_HOURS.morning.end) {
      return PEAK_HOURS.morning.capacity
    }
    if (hour >= PEAK_HOURS.evening.start && hour <= PEAK_HOURS.evening.end) {
      return PEAK_HOURS.evening.capacity
    }
    return Math.floor(Math.random() * 40) + 20 // Random capacity between 20-60% for non-peak hours
  }

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Smart Booking
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Book classes and track gym capacity in real-time
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Class Schedule</CardTitle>
                  <CardDescription>
                    Available classes for {date ? format(date, 'MMMM d, yyyy') : 'today'}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {DUMMY_CLASSES.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                        {classItem.time}
                      </div>
                      <div>
                        <h3 className="font-medium">{classItem.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {classItem.duration} with {classItem.instructor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">
                        {classItem.spots} spots left
                      </Badge>
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500">
                        Book Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>
                Choose a date to view available classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Peak Hours</CardTitle>
              <CardDescription>
                Real-time gym capacity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{i.toString().padStart(2, '0')}:00</span>
                      <span className="text-gray-500">{getCapacityForHour(i)}% full</span>
                    </div>
                    <Progress
                      value={getCapacityForHour(i)}
                      className="h-2"
                    />
                    {i === currentHour && (
                      <Badge variant="secondary" className="mt-1">Current Time</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 