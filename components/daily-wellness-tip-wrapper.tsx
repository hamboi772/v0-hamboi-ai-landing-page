import dynamic from "next/dynamic"

export const DailyWellnessTipWrapper = dynamic(
  () => import("@/components/did-you-know-card").then((mod) => ({ default: mod.default })),
  { ssr: false },
)