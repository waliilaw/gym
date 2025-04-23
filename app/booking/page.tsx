"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format, addDays, startOfWeek } from "date-fns"
import { CalendarIcon, Clock, Users, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Sample class data
const classes = [
  { id: 1, name: "HIIT Workout", instructor: "Alex Johnson", time: "07:00", duration: 45, capacity: 20, booked: 12 },
  { id: 2, name: "Yoga Flow", instructor: "Sarah Miller", time: "09:00", duration: 60, capacity: 15, booked: 10 },
  { id: 3, name: "Spin Class", instructor: "Mike Peters", time: "12:00", duration: 45, capacity: 25, booked: 20 },
  { id: 4, name: "Pilates", instructor: "Emma Wilson", time: "15:00", duration: 60, capacity: 15, booked: 5 },
  { id: 5, name: "Boxing", instructor: "James Rodriguez", time: "18:00", duration: 60, capacity: 20, booked: 18 },
  { id: 6, name: "Zumba", instructor: "Lisa Chen", time: "19:30", duration: 45, capacity: 30, booked: 25 },
]

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState<number | null>(null)

  // For week view
  const today = new Date()
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 })
  const [weekStart, setWeekStart] = useState(startOfCurrentWeek)

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const handlePrevWeek = () => {
    setWeekStart(addDays(weekStart, -7))
  }

  const handleNextWeek = () => {
    setWeekStart(addDays(weekStart, 7))
  }

  const handleBookClass = (classId: number) => {
    setSelectedClass(classId)
  }

  const confirmBooking = () => {
    if (selectedClass !== null) {
      setBookingConfirmed(selectedClass)
      setSelectedClass(null)

      // Reset after 3 seconds
      setTimeout(() => {
        setBookingConfirmed(null)
      }, 3000)
    }
  }

  const getAvailabilityColor = (booked: number, capacity: number) => {
    const percentage = (booked / capacity) * 100
    if (percentage < 50) return "bg-green-500"
    if (percentage < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 gradient-text">Class Booking</h1>
        <p className="text-gray-500 dark:text-gray-400">Book fitness classes and track gym capacity in real-time</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>Choose a date to view available classes</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </CardContent>
            <CardContent className="pt-0">
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Availability Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Available (Less than 50% booked)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Filling up (50-80% booked)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Almost full (Over 80% booked)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 mt-6">
            <CardHeader>
              <CardTitle>Current Capacity</CardTitle>
              <CardDescription>Real-time gym occupancy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Gym Floor</span>
                <span className="text-sm">42/100</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "42%" }}></div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pool Area</span>
                <span className="text-sm">18/30</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Cardio Zone</span>
                <span className="text-sm">25/40</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "62%" }}></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Weekly Schedule</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleNextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{format(day, "EEE")}</div>
                    <Button
                      variant={date && format(date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") ? "default" : "outline"}
                      className={cn(
                        "w-full",
                        date && format(date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "",
                      )}
                      onClick={() => setDate(day)}
                    >
                      {format(day, "d")}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Classes for {date ? format(date, "EEEE, MMMM d") : "Today"}</h3>

                {classes.map((cls) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "p-4 rounded-lg border border-gray-200 dark:border-gray-800 transition-all",
                      selectedClass === cls.id ? "ring-2 ring-blue-500 shadow-blue-glow" : "hover:shadow-md",
                      bookingConfirmed === cls.id
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-white dark:bg-gray-900",
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{cls.name}</h4>
                          <div
                            className={cn("w-2 h-2 rounded-full ml-2", getAvailabilityColor(cls.booked, cls.capacity))}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Instructor: {cls.instructor}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {cls.time} ({cls.duration} min)
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <Users className="h-3 w-3 mr-1" />
                          {cls.booked}/{cls.capacity} booked
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {cls.duration} minutes
                      </Badge>

                      {bookingConfirmed === cls.id ? (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <Check className="h-3 w-3 mr-1" /> Booked Successfully
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleBookClass(cls.id)}
                          className={selectedClass === cls.id ? "bg-blue-700" : ""}
                        >
                          {selectedClass === cls.id ? "Selected" : "Book Class"}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-md"
                disabled={selectedClass === null}
                onClick={confirmBooking}
              >
                Confirm Booking
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
