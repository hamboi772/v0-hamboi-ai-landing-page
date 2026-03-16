"use client"

import { useEffect, useRef } from "react"

/**
 * Lightweight CSS 3D tilt on pointer/touch move.
 * Works on mobile touch events too (important for Nigerian users).
 * Max tilt is capped at 8deg to stay subtle.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function applyTilt(clientX: number, clientY: number) {
      const rect = el!.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (clientX - cx) / (rect.width / 2)   // -1 to 1
      const dy = (clientY - cy) / (rect.height / 2)  // -1 to 1
      const MAX = 8
      const rx = -dy * MAX
      const ry =  dx * MAX
      el!.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`
    }

    function resetTilt() {
      el!.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    }

    const onMouseMove = (e: MouseEvent) => applyTilt(e.clientX, e.clientY)
    const onMouseLeave = () => resetTilt()
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) applyTilt(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchEnd = () => resetTilt()

    el.addEventListener("mousemove", onMouseMove)
    el.addEventListener("mouseleave", onMouseLeave)
    el.addEventListener("touchmove", onTouchMove, { passive: true })
    el.addEventListener("touchend", onTouchEnd)

    return () => {
      el.removeEventListener("mousemove", onMouseMove)
      el.removeEventListener("mouseleave", onMouseLeave)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  return ref
}
