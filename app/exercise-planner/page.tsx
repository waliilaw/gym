"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

// Sample workout plans
const workoutPlans = [
  {
    id: 1,
    name: "HIIT Cardio Blast",
    description: "High-intensity interval training to maximize calorie burn",
    duration: 30,
    level: "Intermediate",
    goal: "Fat Loss",
    image: "/placeholder.svg?height=200&width=400",
    exercises: [
      { name: "Jumping Jacks", duration: "45 sec", rest: "15 sec", sets: 3 },
      { name: "Mountain Climbers", duration: "45 sec", rest: "15 sec", sets: 3 },
      { name: "Burpees", duration: "45 sec", rest: "15 sec", sets: 3 },
      { name: "High Knees", duration: "45 sec", rest: "15 sec", sets: 3 },
      { name: "Plank Jacks", duration: "45 sec", rest: "15 sec", sets: 3 },
      { name: "Jump Squats", duration: "45 sec", rest: "15 sec", sets: 3 },
    ],
  },
  {
    id: 2,
    name: "Full Body Strength",
    description: "Comprehensive strength training for all major muscle groups",
    duration: 45,
    level: "Beginner",
    goal: "Strength",
    image: "/placeholder.svg?height=200&width=400",
    exercises: [
      { name: "Push-ups", reps: "10-12", rest: "60 sec", sets: 3 },
      { name: "Bodyweight Squats", reps: "15", rest: "60 sec", sets: 3 },
      { name: "Dumbbell Rows", reps: "12 each side", rest: "60 sec", sets: 3 },
      { name: "Lunges", reps: "10 each leg", rest: "60 sec", sets: 3 },
      { name: "Plank", duration: "30-60 sec", rest: "60 sec", sets: 3 },
      { name: "Glute Bridges", reps: "15", rest: "60 sec", sets: 3 },
    ],
  },
  {
    id: 3,
    name: "Core Crusher",
    description: "Focused abdominal and core workout for a stronger midsection",
    duration: 20,
    level: "All Levels",
    goal: "Core Strength",
    image: "/placeholder.svg?height=200&width=400",
    exercises: [
      { name: "Crunches", reps: "20", rest: "30 sec", sets: 3 },
      { name: "Russian Twists", reps: "16 total", rest: "30 sec", sets: 3 },
      { name: "Plank", duration: "45 sec", rest: "30 sec", sets: 3 },
      { name: "Bicycle Crunches", reps: "20 total", rest: "30 sec", sets: 3 },
      { name: "Mountain Climbers", duration: "30 sec", rest: "30 sec", sets: 3 },
      { name: "Leg Raises", reps: "12", rest: "30 sec", sets: 3 },
    ],
  },
]

export default function ExercisePlannerPage() {
  const [activeTab, setActiveTab] = useState("ai-planner")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedWorkout, setGeneratedWorkout] = useState<any | null>(null)
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null)
  const [savedWorkouts, setSavedWorkouts] = useState<number[]>([])
  
  // Form state
  const [duration, setDuration] = useState("30")
  const [fitnessLevel, setFitnessLevel] = useState("intermediate")
  const [goal, setGoal] = useState("strength")
  const [equipment, setEquipment] = useState("minimal")
  const [additionalInfo, setAdditionalInfo] = useState("")
  
  const handleGenerateWorkout = () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      
      // Sample generated workout
      setGeneratedWorkout({
        name: `${goal.charAt(0).toUpperCase() + goal.slice(1)} Workout (${duration} min)`,
        description: `Custom ${fitnessLevel} level workout focused on ${goal} with ${equipment} equipment`,
        duration: Number.parseInt(duration),
        level: fitnessLevel.charAt(0).toUpperCase() + fitnessLevel.slice(1),
        goal: goal.charAt(0).toUpperCase() + goal.slice(1),
        exercises: [
          { name: "Warm-up", duration: "5 min", description: "Light cardio and dynamic stretching" },
          { name: "Squats", sets: 3, reps: "12", rest: "60 sec", description: "Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing" },
          { name: "Push-ups", sets: 3, reps: "10", rest: "60 sec", description: "Start in plank position, lower chest to floor, then push back up" },
          { name: "Dumbbell Rows", sets: 3, reps: "12 each side", rest: "60 sec", description: "Bend at waist with one hand on bench, pull dumbbell to hip with other hand" },
          { name: "Lunges", sets: 3, reps: "10 each leg", rest: "60 sec", description: "Step forward with one leg, lower until both knees are at 90 degrees, return to start" },
          { name: "Plank", sets: 3, duration: "30 sec", rest: "45 sec", description: "Hold a straight line from head to heels, engaging core muscles" },
          { name: "Cool-down", duration: "5 min", description: "Light stretching for all major muscle groups" },
        ]
      })
    }, 3000)
  }
  
  const toggleSaveWorkout = (id: number) => {
    if (savedWorkouts.includes(id)) {
      setSavedWorkouts(savedWorkouts.filter(workoutId => workoutId !== id))
    } else {
      setSavedWorkouts([...savedWorkouts, id])
    }
  }
  
  const toggleExpandExercise = (index: number) => {
    if (expandedExercise === index) {
      setExpandedExercise(null)
    } else {
      setExpandedExercise(index)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 gradient-text">AI Exercise Planner</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Generate personalized workout plans with Gemini AI integration
        </p>
      </motion.div>

      <Tabs defaultValue="ai-planner" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="ai-planner">AI Planner</TabsTrigger>
          <TabsTrigger value="preset-workouts">Preset Workouts</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-planner">
          <Card>
            <CardHeader>
              <CardTitle>Generate Your Workout</CardTitle>
              <CardDescription>
                Fill in your preferences to get a personalized workout plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    type="number"
                    min="10"
                    max="120"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fitnessLevel">Fitness Level</Label>
                  <select
                    id="fitnessLevel"
                    value={fitnessLevel}
                    onChange={(e) => setFitnessLevel(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal">Goal</Label>
                  <select
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background"
                  >
                    <option value="strength">Strength</option>
                    <option value="cardio">Cardio</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="weight-loss">Weight Loss</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment">Equipment</Label>
                  <select
                    id="equipment"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background"
                  >
                    <option value="none">No Equipment</option>
                    <option value="minimal">Minimal Equipment</option>
                    <option value="full">Full Gym</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="w-full p-2 rounded-md border border-input bg-background min-h-[100px]"
                  placeholder="Any injuries, preferences, or specific areas to focus on..."
                />
              </div>

              <Button
                onClick={handleGenerateWorkout}
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Workout"
                )}
              </Button>
            </CardContent>
          </Card>

          {generatedWorkout && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{generatedWorkout.name}</CardTitle>
                  <CardDescription>{generatedWorkout.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedWorkout.exercises.map((exercise: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => toggleExpandExercise(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{exercise.name}</h3>
                            {expandedExercise === index && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {exercise.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {exercise.sets && (
                              <Badge variant="outline">{exercise.sets} sets</Badge>
                            )}
                            {exercise.reps && (
                              <Badge variant="outline">{exercise.reps}</Badge>
                            )}
                            {exercise.duration && (
                              <Badge variant="outline">{exercise.duration}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="preset-workouts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <CardHeader>
                  <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{plan.level}</Badge>
                    <Badge variant="secondary">{plan.duration} min</Badge>
                    <Badge variant="secondary">{plan.goal}</Badge>
                  </div>
                  <Button
                    onClick={() => toggleSaveWorkout(plan.id)}
                    variant={savedWorkouts.includes(plan.id) ? "secondary" : "default"}
                    className="w-full"
                  >
                    {savedWorkouts.includes(plan.id) ? "Saved" : "Save Workout"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
