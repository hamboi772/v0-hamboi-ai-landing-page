"use client"

import { useEffect } from "react"

/**
 * Attach IntersectionObserver to all `.reveal` elements.
 * Adds `.visible` class when they enter the viewport.
 * Call once at the page/layout level.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            // Unobserve after first trigger for performance
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 }
    )

    // Observe all .reveal elements that don't yet have .visible
    const elements = document.querySelectorAll(".reveal:not(.visible)")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
