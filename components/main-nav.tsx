"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Calendar, 
  Dumbbell, 
  User, 
  BarChart, 
  Settings,
  Menu
} from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/"
    },
    {
      href: "/workouts",
      label: "Workouts",
      icon: Dumbbell,
      active: pathname === "/workouts"
    },
    {
      href: "/schedule",
      label: "Schedule",
      icon: Calendar,
      active: pathname === "/schedule"
    },
    {
      href: "/progress",
      label: "Progress",
      icon: BarChart,
      active: pathname === "/progress"
    },
    {
      href: "/profile",
      label: "Profile",
      icon: User,
      active: pathname === "/profile"
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/settings"
    }
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {routes.map((route) => {
        const Icon = route.icon
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              route.active 
                ? "text-primary" 
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4 mr-2" />
            <span className="hidden md:block">{route.label}</span>
          </Link>
        )
      })}
    </nav>
  )
} 