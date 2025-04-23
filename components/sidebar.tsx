"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useSidebar } from "./sidebar-provider"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Home, QrCode, Calendar, Utensils, Dumbbell, User, Menu, X, BarChart, Settings } from "lucide-react"

export function Sidebar() {
  const { isOpen, toggle, isMobile } = useSidebar()
  const pathname = usePathname()

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: QrCode, label: "QR System", href: "/qr-system" },
    { icon: Calendar, label: "Booking", href: "/booking" },
    { icon: BarChart, label: "Peak Hours", href: "/peak-hours" },
    { icon: Utensils, label: "Meal Prep", href: "/meal-prep" },
    { icon: Dumbbell, label: "Exercise Planner", href: "/exercise-planner" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  const sidebarVariants = {
    open: {
      width: isMobile ? "100%" : "280px",
      transition: { duration: 0.3 },
    },
    closed: {
      width: isMobile ? "0" : "80px",
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={toggle} />}

      <motion.div
        className={`fixed top-0 left-0 z-50 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden ${isMobile ? "w-[280px]" : ""}`}
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        initial={false}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 w-8 h-8 rounded-md flex items-center justify-center">
                    <Dumbbell className="text-white h-5 w-5" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Fitness Hub
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            <Button variant="ghost" size="icon" onClick={toggle} className="hover:bg-gray-100 dark:hover:bg-gray-800">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <li key={item.href}>
                    <Link href={item.href} passHref>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start ${isOpen ? "px-4" : "px-0 justify-center"} ${
                          isActive
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <item.icon className={`${isOpen ? "mr-2" : "mr-0"} h-5 w-5`} />
                        <AnimatePresence>
                          {isOpen && (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Button>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <ModeToggle />
            <AnimatePresence>
              {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Button variant="outline" size="sm" className="text-xs">
                    <User className="mr-1 h-3 w-3" /> Log out
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  )
}
