import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fitness Hub",
  description: "Your all-in-one fitness management solution",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.className,
        "min-h-screen gradient-background antialiased",
        "transition-colors duration-300"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="glass-effect rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
