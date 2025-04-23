import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface DashboardNavProps {
  items: {
    href: string
    title: string
  }[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent" : "transparent"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
} 