import Link from "next/link"

interface AppStoreBadgesProps {
  className?: string
  variant?: "dark" | "light"
  size?: "default" | "large"
}

export function AppStoreBadges({ className = "", variant = "dark", size = "default" }: AppStoreBadgesProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
    </div>
  )
}