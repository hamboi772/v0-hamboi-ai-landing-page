"use client"

import dynamic from "next/dynamic"

export const DailyWellnessTipWrapper = dynamic(
  () => import("@/components/daily-wellness-tip").then((mod) => ({ default: mod.DailyWellnessTip })),
  { ssr: false },
)
