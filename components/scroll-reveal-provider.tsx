"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

/**
 * Mounts the IntersectionObserver that drives `.reveal` → `.visible` transitions.
 * Rendered once at the top of the page so all sections benefit.
 */
export function ScrollRevealProvider() {
  useScrollReveal()
  return null
}
