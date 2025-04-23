"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Target, History, Dumbbell, Clock, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

const SAMPLE_PLAN = {
  goal: "Build Muscle",
  duration: "60 minutes",
  difficulty: "Intermediate",
  exercises: [
    { name: "Barbell Squats", sets: 4, reps: "8-10", rest: "90s" },
    { name: "Romanian Deadlifts", sets: 3, reps: "10-12", rest: "60s" },
    { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s" },
    { name: "Bent Over Rows", sets: 3, reps: "10-12", rest: "60s" },
    { name: "Shoulder Press", sets: 3, reps: "10-12", rest: "60s" }
  ]
}

export default function AiPlanner() {
  const [generatingPlan, setGeneratingPlan] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<typeof SAMPLE_PLAN | null>(null)
  const [fitnessLevel, setFitnessLevel] = useState(50)
  const [goal, setGoal] = useState("muscle")
  const [duration, setDuration] = useState("60")

  const generatePlan = () => {
    setGeneratingPlan(true)
    // Simulate AI plan generation
    setTimeout(() => {
      setCurrentPlan(SAMPLE_PLAN)
      setGeneratingPlan(false)
    }, 2000)
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
          AI Exercise Planner
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Get personalized workout plans powered by AI
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
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Create Your Plan</CardTitle>
                  <CardDescription>
                    Tell us about your goals and preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Fitness Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="muscle">Build Muscle</SelectItem>
                    <SelectItem value="strength">Increase Strength</SelectItem>
                    <SelectItem value="endurance">Improve Endurance</SelectItem>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Workout Duration (minutes)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Fitness Level</Label>
                <Slider
                  value={[fitnessLevel]}
                  onValueChange={(value) => setFitnessLevel(value[0])}
                  max={100}
                  step={1}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                </div>
              </div>

              <Button
                onClick={generatePlan}
                disabled={generatingPlan}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
              >
                {generatingPlan ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-pulse" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Workout Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {currentPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Workout Plan</CardTitle>
                      <CardDescription>
                        AI-generated plan based on your preferences
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{currentPlan.difficulty}</Badge>
                      <Badge variant="secondary">{currentPlan.duration}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentPlan.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <Dumbbell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">{exercise.name}</h3>
                            <p className="text-sm text-gray-500">
                              {exercise.sets} sets × {exercise.reps} reps
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{exercise.rest} rest</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500">
                    Start Workout <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Progress</CardTitle>
                  <CardDescription>Your fitness journey</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Weekly Goal</span>
                    <span className="text-blue-600">4/5 workouts</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Monthly Progress</span>
                    <span className="text-blue-600">16/20 workouts</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <History className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Recent Plans</CardTitle>
                  <CardDescription>Previously generated plans</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Upper Body Focus", date: "Yesterday", type: "Strength" },
                  { name: "HIIT Cardio", date: "2 days ago", type: "Endurance" },
                  { name: "Full Body", date: "4 days ago", type: "Muscle" },
                ].map((plan, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors cursor-pointer"
                  >
                    <div>
                      <h3 className="font-medium">{plan.name}</h3>
                      <p className="text-sm text-gray-500">{plan.date}</p>
                    </div>
                    <Badge variant="secondary">{plan.type}</Badge>
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