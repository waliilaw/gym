"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Utensils, ShoppingCart, Calculator, ChevronRight, Flame, Download, Plus, Minus, Check } from "lucide-react"

// Sample meal plans
const mealPlans = [
  {
    id: 1,
    name: "Weight Loss Plan",
    description: "Low-calorie meal plan designed for weight loss",
    calories: 1800,
    image: "/placeholder.svg?height=200&width=400",
    meals: [
      {
        name: "Breakfast",
        description: "Greek yogurt with berries and honey",
        calories: 320,
        protein: 20,
        carbs: 40,
        fat: 10,
      },
      {
        name: "Lunch",
        description: "Grilled chicken salad with olive oil dressing",
        calories: 450,
        protein: 35,
        carbs: 20,
        fat: 25,
      },
      { name: "Snack", description: "Apple with almond butter", calories: 200, protein: 5, carbs: 25, fat: 10 },
      {
        name: "Dinner",
        description: "Baked salmon with roasted vegetables",
        calories: 520,
        protein: 40,
        carbs: 30,
        fat: 25,
      },
      { name: "Evening Snack", description: "Protein shake", calories: 150, protein: 25, carbs: 5, fat: 2 },
    ],
  },
  {
    id: 2,
    name: "Muscle Building Plan",
    description: "High-protein meal plan for muscle growth",
    calories: 2800,
    image: "/placeholder.svg?height=200&width=400",
    meals: [
      {
        name: "Breakfast",
        description: "Protein pancakes with banana and maple syrup",
        calories: 550,
        protein: 35,
        carbs: 70,
        fat: 15,
      },
      {
        name: "Lunch",
        description: "Turkey and avocado wrap with sweet potato",
        calories: 650,
        protein: 45,
        carbs: 60,
        fat: 25,
      },
      { name: "Snack", description: "Protein bar and mixed nuts", calories: 350, protein: 20, carbs: 30, fat: 15 },
      {
        name: "Dinner",
        description: "Steak with quinoa and steamed broccoli",
        calories: 750,
        protein: 50,
        carbs: 50,
        fat: 35,
      },
      {
        name: "Evening Snack",
        description: "Cottage cheese with pineapple",
        calories: 250,
        protein: 25,
        carbs: 20,
        fat: 5,
      },
    ],
  },
  {
    id: 3,
    name: "Balanced Nutrition Plan",
    description: "Well-balanced meal plan for overall health",
    calories: 2200,
    image: "/placeholder.svg?height=200&width=400",
    meals: [
      {
        name: "Breakfast",
        description: "Oatmeal with fruits, nuts, and seeds",
        calories: 420,
        protein: 15,
        carbs: 60,
        fat: 15,
      },
      {
        name: "Lunch",
        description: "Quinoa bowl with mixed vegetables and tofu",
        calories: 550,
        protein: 25,
        carbs: 70,
        fat: 20,
      },
      {
        name: "Snack",
        description: "Hummus with carrot and celery sticks",
        calories: 180,
        protein: 5,
        carbs: 20,
        fat: 10,
      },
      {
        name: "Dinner",
        description: "Grilled fish with sweet potato and asparagus",
        calories: 580,
        protein: 35,
        carbs: 50,
        fat: 25,
      },
      { name: "Evening Snack", description: "Greek yogurt with honey", calories: 150, protein: 15, carbs: 15, fat: 5 },
    ],
  },
]

// Sample grocery items
const groceryItems = [
  {
    category: "Proteins",
    items: ["Chicken breast", "Salmon", "Turkey", "Tofu", "Greek yogurt", "Eggs", "Cottage cheese"],
  },
  {
    category: "Carbohydrates",
    items: ["Brown rice", "Quinoa", "Sweet potatoes", "Oats", "Whole grain bread", "Fruits", "Vegetables"],
  },
  { category: "Fats", items: ["Avocado", "Olive oil", "Nuts", "Seeds", "Nut butters"] },
  { category: "Other", items: ["Spices", "Herbs", "Low-sodium sauces", "Protein powder"] },
]

export default function MealPrepPage() {
  const [activeTab, setActiveTab] = useState("meal-plans")
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState("male")
  const [activityLevel, setActivityLevel] = useState(1.4)
  const [goal, setGoal] = useState("maintain")

  const [groceryList, setGroceryList] = useState<string[]>([])
  const [addedToList, setAddedToList] = useState(false)

  const calculateBMR = () => {
    // Harris-Benedict Equation
    if (gender === "male") {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    } else {
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
    }
  }

  const calculateTDEE = () => {
    const bmr = calculateBMR()
    return Math.round(bmr * activityLevel)
  }

  const calculateCalories = () => {
    const tdee = calculateTDEE()

    switch (goal) {
      case "lose":
        return Math.round(tdee * 0.8)
      case "maintain":
        return tdee
      case "gain":
        return Math.round(tdee * 1.15)
      default:
        return tdee
    }
  }

  const handleAddToGroceryList = (planId: number) => {
    const plan = mealPlans.find((p) => p.id === planId)
    if (plan) {
      // Extract ingredients from meal descriptions (simplified)
      const newItems = plan.meals.flatMap((meal) => {
        const words = meal.description.split(" ")
        return words.filter((word) => word.length > 3 && !["with", "and", "the", "for"].includes(word.toLowerCase()))
      })

      setGroceryList([...new Set([...groceryList, ...newItems])])
      setAddedToList(true)

      // Reset after 2 seconds
      setTimeout(() => {
        setAddedToList(false)
      }, 2000)
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
        <h1 className="text-3xl font-bold mb-2 gradient-text">Meal Prep Module</h1>
        <p className="text-gray-500 dark:text-gray-400">Weekly meal plans, grocery lists, and calorie calculator</p>
      </motion.div>

      <Tabs defaultValue="meal-plans" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="meal-plans" className="text-base py-3">
            <Utensils className="mr-2 h-5 w-5" /> Meal Plans
          </TabsTrigger>
          <TabsTrigger value="grocery-list" className="text-base py-3">
            <ShoppingCart className="mr-2 h-5 w-5" /> Grocery List
          </TabsTrigger>
          <TabsTrigger value="calorie-calculator" className="text-base py-3">
            <Calculator className="mr-2 h-5 w-5" /> Calorie Calculator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meal-plans" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mealPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: plan.id * 0.1 }}
              >
                <Card
                  className={`card-3d border-0 shadow-lg bg-white dark:bg-gray-900 h-full ${selectedPlan === plan.id ? "ring-2 ring-blue-500" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
                      <img
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-600">{plan.calories} calories</Badge>
                      </div>
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      {plan.meals.map((meal, index) => (
                        <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{meal.name}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Flame className="h-3 w-3 mr-1 text-orange-500" />
                              {meal.calories} cal
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{meal.description}</p>
                          <div className="flex justify-between mt-2 text-xs">
                            <span>P: {meal.protein}g</span>
                            <span>C: {meal.carbs}g</span>
                            <span>F: {meal.fat}g</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex flex-col w-full gap-2">
                      <Button
                        className={`w-full ${selectedPlan === plan.id ? "bg-blue-700" : "bg-blue-600"}`}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => handleAddToGroceryList(plan.id)}>
                        {addedToList && selectedPlan === plan.id ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Added to List
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Grocery List
                          </>
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Weekly Meal Schedule</CardTitle>
                  <CardDescription>{mealPlans.find((p) => p.id === selectedPlan)?.name} - 7 Day Plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                      (day, index) => (
                        <div key={day} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h4 className="font-medium text-sm text-center mb-2">{day}</h4>
                          <div className="text-xs text-gray-500 space-y-2">
                            {mealPlans
                              .find((p) => p.id === selectedPlan)
                              ?.meals.map((meal, mealIndex) => (
                                <div
                                  key={mealIndex}
                                  className="p-2 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700"
                                >
                                  <div className="font-medium">{meal.name}</div>
                                  <div className="mt-1">{meal.description}</div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-md">
                    <Download className="mr-2 h-4 w-4" /> Download Meal Plan
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="grocery-list" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2"
            >
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900 h-full">
                <CardHeader>
                  <CardTitle>Grocery List</CardTitle>
                  <CardDescription>Items needed for your selected meal plan</CardDescription>
                </CardHeader>
                <CardContent>
                  {groceryList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {groceryItems.map((category) => (
                        <div key={category.category} className="space-y-2">
                          <h3 className="font-medium text-blue-600 dark:text-blue-400">{category.category}</h3>
                          <ul className="space-y-1">
                            {category.items.map((item) => (
                              <li key={item} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={item}
                                  className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor={item} className="text-sm">
                                  {item}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Your grocery list is empty
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Select a meal plan and add items to your grocery list
                      </p>
                      <Button
                        onClick={() => {
                          setActiveTab("meal-plans")
                        }}
                        className="bg-blue-600"
                      >
                        Browse Meal Plans
                      </Button>
                    </div>
                  )}
                </CardContent>
                {groceryList.length > 0 && (
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-md">
                      <Download className="mr-2 h-4 w-4" /> Download Grocery List
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Custom Items</CardTitle>
                  <CardDescription>Add your own items to the grocery list</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Enter item name" />
                      <Button className="shrink-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Shopping Tips</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Buy in bulk for items you use frequently</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Choose frozen vegetables for longer shelf life</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Prep and portion meals right after shopping</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="calorie-calculator" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Calorie Calculator</CardTitle>
                  <CardDescription>Calculate your daily calorie needs based on your stats and goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={() => setWeight(Math.max(40, weight - 1))}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="text-center"
                      />
                      <Button variant="outline" size="icon" onClick={() => setWeight(weight + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={() => setHeight(Math.max(140, height - 1))}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="text-center"
                      />
                      <Button variant="outline" size="icon" onClick={() => setHeight(height + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={() => setAge(Math.max(18, age - 1))}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="text-center"
                      />
                      <Button variant="outline" size="icon" onClick={() => setAge(age + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <div className="flex space-x-2">
                      <Button
                        variant={gender === "male" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setGender("male")}
                      >
                        Male
                      </Button>
                      <Button
                        variant={gender === "female" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setGender("female")}
                      >
                        Female
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Activity Level</Label>
                    <div className="space-y-4">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Sedentary</span>
                        <span>Moderate</span>
                        <span>Very Active</span>
                      </div>
                      <Slider
                        defaultValue={[1.4]}
                        min={1.2}
                        max={1.9}
                        step={0.1}
                        onValueChange={(value) => setActivityLevel(value[0])}
                      />
                      <div className="text-center text-sm">
                        {activityLevel < 1.4 && "Sedentary (little or no exercise)"}
                        {activityLevel >= 1.4 && activityLevel < 1.6 && "Lightly active (light exercise 1-3 days/week)"}
                        {activityLevel >= 1.6 &&
                          activityLevel < 1.8 &&
                          "Moderately active (moderate exercise 3-5 days/week)"}
                        {activityLevel >= 1.8 && "Very active (hard exercise 6-7 days/week)"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Goal</Label>
                    <div className="flex space-x-2">
                      <Button
                        variant={goal === "lose" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setGoal("lose")}
                      >
                        Lose Weight
                      </Button>
                      <Button
                        variant={goal === "maintain" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setGoal("maintain")}
                      >
                        Maintain
                      </Button>
                      <Button
                        variant={goal === "gain" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setGoal("gain")}
                      >
                        Gain Muscle
                      </Button>
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
                  <CardTitle>Your Results</CardTitle>
                  <CardDescription>Based on your stats and fitness goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Daily Calorie Target
                      </h3>
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                        {calculateCalories()} calories
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {goal === "lose" && "Calorie deficit for weight loss"}
                        {goal === "maintain" && "Maintenance calories"}
                        {goal === "gain" && "Calorie surplus for muscle gain"}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                        <div className="text-sm text-gray-500 mb-1">Protein</div>
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {Math.round(weight * (goal === "gain" ? 2.2 : 1.8))}g
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{goal === "gain" ? "2.2g" : "1.8g"}/kg</div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                        <div className="text-sm text-gray-500 mb-1">Carbs</div>
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {Math.round((calculateCalories() * (goal === "gain" ? 0.5 : 0.4)) / 4)}g
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{goal === "gain" ? "50" : "40"}% of calories</div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                        <div className="text-sm text-gray-500 mb-1">Fats</div>
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {Math.round((calculateCalories() * (goal === "lose" ? 0.25 : 0.3)) / 9)}g
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{goal === "lose" ? "25" : "30"}% of calories</div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                      <h4 className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">Recommendations</h4>
                      <ul className="space-y-2 text-sm">
                        {goal === "lose" && (
                          <>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>Focus on high protein foods to preserve muscle mass</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>Include plenty of fiber to stay full longer</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>Aim for a moderate deficit of 500 calories per day</span>
                            </li>
                          </>
                        )}

                        {goal === "maintain" && (
                          <>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>Balance macronutrients for overall health</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>Focus on nutrient-dense whole foods</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>Stay hydrated with at least 2-3 liters of water daily</span>
                            </li>
                          </>
                        )}

                        {goal === "gain" && (
                          <>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>Prioritize protein intake for muscle building</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>Increase carbohydrates to fuel workouts</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>Aim for a moderate surplus of 300-500 calories</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-md"
                    onClick={() => setActiveTab("meal-plans")}
                  >
                    <span className="flex items-center">
                      Find Suitable Meal Plan <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
