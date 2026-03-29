"use client"

import dynamic from "next/dynamic"

export const DailyWellnessTipWrapper = dynamic(
  () => import("@/components/did-you-know-card"),
  { ssr: false }
)