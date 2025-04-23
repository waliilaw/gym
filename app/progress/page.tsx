"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProgressPage() {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 gradient-text">Progress Tracking</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Track your fitness journey and achievements
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This page is under construction</CardDescription>
          </CardHeader>
          <CardContent>
            Check back later for progress tracking features
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 