export async function GET() {
  try {
    // Free Positivity Tips API - completely free, no auth needed
    const response = await fetch("https://api.freewebapi.com/positivity-tips/daily-wellness")

    if (!response.ok) {
      throw new Error("Failed to fetch wellness tip")
    }

    const data = await response.json()

    return Response.json({
      tip: data.tip || data.message || "Take a deep breath and remember: you're doing better than you think.",
      category: data.category || "wellness",
    })
  } catch (error) {
    // Fallback tips if API fails
    const fallbackTips = [
      "Practice gratitude: Write down 3 things you're thankful for today.",
      "Take 5 deep breaths. Inhale for 4 counts, hold for 4, exhale for 4.",
      "Reach out to someone you trust. You don't have to face challenges alone.",
      "Move your body for 10 minutes. A short walk can boost your mood.",
      "Stay hydrated. Drink a glass of water and notice how you feel.",
      "Be kind to yourself. You deserve the same compassion you give others.",
    ]

    return Response.json({
      tip: fallbackTips[Math.floor(Math.random() * fallbackTips.length)],
      category: "wellness",
    })
  }
}
