"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Calendar, Utensils, Dumbbell, Users, TrendingUp, Clock, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { CalendarView } from "@/components/dashboard/calendar-view"

export default function DashboardPage() {
  const [progress, setProgress] = useState(0)
  const [currentCapacity, setCurrentCapacity] = useState(42)
  const [maxCapacity, setMaxCapacity] = useState(100)
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    const progressTimer = setTimeout(() => {
      setProgress(65)
    }, 500)

    return () => {
      clearTimeout(timer)
      clearTimeout(progressTimer)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const [time, setTime] = useState(getCurrentTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const isPeakHour = () => {
    const hour = new Date().getHours()
    return (hour >= 7 && hour <= 9) || (hour >= 18 && hour <= 20)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Welcome to your fitness journey dashboard"
      />
      <div className="grid gap-4 md:gap-6 lg:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="gradient-card p-4">
            <h3 className="gradient-text font-semibold">Today's Workouts</h3>
            <p className="text-3xl font-bold mt-2">3/5</p>
            <p className="text-sm text-muted-foreground">Completed exercises</p>
          </Card>
          <Card className="gradient-card p-4">
            <h3 className="gradient-text font-semibold">Weekly Progress</h3>
            <p className="text-3xl font-bold mt-2">85%</p>
            <p className="text-sm text-muted-foreground">Goal completion</p>
          </Card>
          <Card className="gradient-card p-4">
            <h3 className="gradient-text font-semibold">Active Streak</h3>
            <p className="text-3xl font-bold mt-2">12</p>
            <p className="text-sm text-muted-foreground">Days in a row</p>
          </Card>
          <Card className="gradient-card p-4">
            <h3 className="gradient-text font-semibold">Calories Burned</h3>
            <p className="text-3xl font-bold mt-2">750</p>
            <p className="text-sm text-muted-foreground">Today's total</p>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="gradient-card col-span-full lg:col-span-4">
            <div className="p-4">
              <h3 className="gradient-text font-semibold mb-4">Activity Overview</h3>
              <Overview />
            </div>
          </Card>
          <Card className="gradient-card col-span-full lg:col-span-3">
            <div className="p-4">
              <h3 className="gradient-text font-semibold mb-4">Recent Activities</h3>
              <RecentActivities />
            </div>
          </Card>
        </div>

        <Card className="gradient-card p-4">
          <h3 className="gradient-text font-semibold mb-4">Workout Schedule</h3>
          <CalendarView />
        </Card>
      </div>
    </DashboardShell>
  )
}
