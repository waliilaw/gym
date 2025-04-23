interface DashboardHeaderProps {
  heading: string
  text?: string
}

export function DashboardHeader({
  heading,
  text
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <h1 className="text-3xl font-bold tracking-tight gradient-text">{heading}</h1>
      {text && <p className="text-muted-foreground">{text}</p>}
    </div>
  )
} 