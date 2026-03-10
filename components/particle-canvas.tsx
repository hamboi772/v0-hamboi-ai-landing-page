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

    // Colors: purple and green only — matches brand
    const colors = [
      "rgba(124, 58, 237,",  // hamboi-purple
      "rgba(34, 197, 94,",   // hamboi-green
      "rgba(6, 182, 212,",   // hamboi-cyan (accent)
    ]

    let particles: Particle[] = []
    let raf: number
    let W = 0
    let H = 0

    function resize() {
      W = canvas!.offsetWidth
      H = canvas!.offsetHeight
      canvas!.width = W
      canvas!.height = H
    }

    function spawnParticle(): Particle {
      const color = colors[Math.floor(Math.random() * colors.length)]
      return {
        x: Math.random() * W,
        y: H + 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.3 + Math.random() * 0.5),
        radius: 1.5 + Math.random() * 2.5,
        color,
        alpha: 0.5 + Math.random() * 0.5,
        decay: 0.003 + Math.random() * 0.003,
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      // Spawn ~1 particle per frame (lightweight — max 40 particles)
      if (particles.length < 40 && Math.random() < 0.4) {
        particles.push(spawnParticle())
      }

      particles = particles.filter((p) => p.alpha > 0.02)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `${p.color}${p.alpha.toFixed(2)})`
        ctx!.fill()
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
      style={{ width: "100%", height: "100%" }}
    />
  )
}
