"use client"

import { useEffect } from "react"

// This component suppresses the benign ResizeObserver loop error
// that occurs with animations and dynamic content
export function ResizeObserverFix() {
  useEffect(() => {
    const resizeObserverErr = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.stopImmediatePropagation()
        e.preventDefault()
      }
    }

    window.addEventListener("error", resizeObserverErr)

    return () => {
      window.removeEventListener("error", resizeObserverErr)
    }
  }, [])

  return null
}
