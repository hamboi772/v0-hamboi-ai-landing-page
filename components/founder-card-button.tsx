"use client"

import Link from "next/link"

interface FounderCardButtonProps {
  href: string
  text: string
}

export function FounderCardButton({ href, text }: FounderCardButtonProps) {
  return (
    <Link href={href}>
      <button
        className="text-sm font-medium px-4 py-2 border rounded-none transition-all"
        style={{
          borderColor: "#0CF2C8",
          color: "#0CF2C8",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(12, 242, 200, 0.08)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent"
        }}
      >
        {text}
      </button>
    </Link>
  )
}
