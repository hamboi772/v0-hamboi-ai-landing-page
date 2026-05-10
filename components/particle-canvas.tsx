"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  decay: number
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colors = [
      "rgba(109, 40, 217,",  // hamboi-purple (#6D28D9)
      "rgba(16, 185, 129,",   // hamboi-green (#10B981)
    ]

    let particles: Particle[] = []
    let raf: number
    let W = 0
    let H = 0

    function resize() {
      if (!canvas) return
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
    }

    function spawnParticle(): Particle {
      const color = colors[Math.floor(Math.random() * colors.length)]
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1 + Math.random() * 2,
        color,
        alpha: 0.1 + Math.random() * 0.2,
        decay: 0.0005 + Math.random() * 0.001,
      }
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)

      if (particles.length < 50) {
        particles.push(spawnParticle())
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.alpha})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", opacity: 0.5 }}
    />
  )
}
