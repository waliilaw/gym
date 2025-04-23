"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, TrendingUp, Calendar } from "lucide-react"

// Sample data for peak hours
const weekdayData = [
  { hour: "5 AM", percentage: 15 },
  { hour: "6 AM", percentage: 35 },
  { hour: "7 AM", percentage: 65 },
  { hour: "8 AM", percentage: 85 },
  { hour: "9 AM", percentage: 75 },
  { hour: "10 AM", percentage: 55 },
  { hour: "11 AM", percentage: 45 },
  { hour: "12 PM", percentage: 60 },
  { hour: "1 PM", percentage: 50 },
  { hour: "2 PM", percentage: 40 },
  { hour: "3 PM", percentage: 45 },
  { hour: "4 PM", percentage: 55 },
  { hour: "5 PM", percentage: 70 },
  { hour: "6 PM", percentage: 90 },
  { hour: "7 PM", percentage: 80 },
  { hour: "8 PM", percentage: 60 },
  { hour: "9 PM", percentage: 40 },
  { hour: "10 PM", percentage: 20 },
]

const weekendData = [
  { hour: "5 AM", percentage: 5 },
  { hour: "6 AM", percentage: 15 },
  { hour: "7 AM", percentage: 25 },
  { hour: "8 AM", percentage: 45 },
  { hour: "9 AM", percentage: 65 },
  { hour: "10 AM", percentage: 85 },
  { hour: "11 AM", percentage: 90 },
  { hour: "12 PM", percentage: 80 },
  { hour: "1 PM", percentage: 75 },
  { hour: "2 PM", percentage: 70 },
  { hour: "3 PM", percentage: 65 },
  { hour: "4 PM", percentage: 60 },
  { hour: "5 PM", percentage: 50 },
  { hour: "6 PM", percentage: 40 },
  { hour: "7 PM", percentage: 30 },
  { hour: "8 PM", percentage: 25 },
  { hour: "9 PM", percentage: 15 },
  { hour: "10 PM", percentage: 10 },
]

// Sample data for weekly trends
const weeklyData = [
  { day: "Monday", count: 420 },
  { day: "Tuesday", count: 380 },
  { day: "Wednesday", count: 450 },
  { day: "Thursday", count: 410 },
  { day: "Friday", count: 390 },
  { day: "Saturday", count: 520 },
  { day: "Sunday", count: 480 },
]

// Sample data for monthly trends
const monthlyData = [
  { week: "Week 1", count: 1800 },
  { week: "Week 2", count: 2100 },
  { week: "Week 3", count: 1950 },
  { week: "Week 4", count: 2300 },
]

export default function PeakHoursPage() {
  const [activeTab, setActiveTab] = useState("daily")

  const getBarColor = (percentage: number) => {
    if (percentage < 40) return "bg-green-500"
    if (percentage < 70) return "bg-yellow-500"
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
        <h1 className="text-3xl font-bold mb-2 gradient-text">Peak Hours Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Track gym capacity and plan your visit during less crowded times
        </p>
      </motion.div>

      <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="daily" className="text-base py-3">
            <Clock className="mr-2 h-5 w-5" /> Daily Trends
          </TabsTrigger>
          <TabsTrigger value="weekly" className="text-base py-3">
            <Calendar className="mr-2 h-5 w-5" /> Weekly Analysis
          </TabsTrigger>
          <TabsTrigger value="monthly" className="text-base py-3">
            <TrendingUp className="mr-2 h-5 w-5" /> Monthly Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Weekday Peak Hours</CardTitle>
                  <CardDescription>Monday to Friday gym occupancy by hour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weekdayData.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.hour}</span>
                          <span className="text-sm text-gray-500">{item.percentage}% Capacity</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
                          <div
                            className={`${getBarColor(item.percentage)} h-2.5 rounded-full transition-all duration-500`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Weekday Peak Times</h4>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                        <span>7-9 AM</span>
                      </div>
                      <span>&</span>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                        <span>6-7 PM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Weekend Peak Hours</CardTitle>
                  <CardDescription>Saturday and Sunday gym occupancy by hour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weekendData.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.hour}</span>
                          <span className="text-sm text-gray-500">{item.percentage}% Capacity</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
                          <div
                            className={`${getBarColor(item.percentage)} h-2.5 rounded-full transition-all duration-500`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Weekend Peak Times</h4>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                        <span>10 AM - 12 PM</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Current Capacity</CardTitle>
                <CardDescription>Real-time gym occupancy by area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Main Floor</h3>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm font-medium">42/100</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      <span className="text-green-500 font-medium">Available</span> - Best time to visit
                    </p>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Cardio Zone</h3>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm font-medium">25/40</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full" style={{ width: "62%" }}></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      <span className="text-yellow-500 font-medium">Moderate</span> - Getting busy
                    </p>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Weight Area</h3>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm font-medium">28/30</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-red-500 h-3 rounded-full" style={{ width: "93%" }}></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      <span className="text-red-500 font-medium">Crowded</span> - Consider waiting
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Weekly Attendance Trends</CardTitle>
                <CardDescription>Total gym visits by day of the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end space-x-2">
                  {weeklyData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-lg relative overflow-hidden"
                        style={{ height: `${(item.count / 600) * 100}%` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-500"
                          style={{ height: "100%" }}
                        ></div>
                        <div className="absolute top-2 left-0 right-0 text-center text-white font-medium">
                          {item.count}
                        </div>
                      </div>
                      <div className="mt-2 text-xs font-medium">{item.day.substring(0, 3)}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Weekly Insights</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Weekends (Saturday and Sunday) are the busiest days</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Tuesday is typically the least crowded weekday</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Wednesday sees a mid-week spike in attendance</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="monthly" className="mt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Monthly Attendance Overview</CardTitle>
                <CardDescription>Total gym visits by week for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end space-x-6">
                  {monthlyData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-lg relative overflow-hidden"
                        style={{ height: `${(item.count / 2500) * 100}%` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-500"
                          style={{ height: "100%" }}
                        ></div>
                        <div className="absolute top-2 left-0 right-0 text-center text-white font-medium">
                          {item.count}
                        </div>
                      </div>
                      <div className="mt-2 text-sm font-medium">{item.week}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Monthly Trends</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Week 4 has the highest attendance this month</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Overall attendance is increasing throughout the month</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Week 3 showed a slight decrease from Week 2</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">Recommendations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Best time to visit: Weekdays between 10 AM - 4 PM</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Avoid peak hours: 7-9 AM and 6-7 PM on weekdays</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>For weekend visits, arrive before 9 AM for less crowding</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
