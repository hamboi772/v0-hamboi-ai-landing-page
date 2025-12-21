export class APIKeyRotation {
  private keys: string[]
  private currentIndex = 0
  private usageCounts: Map<string, number> = new Map()
  private lastResetDate: string = new Date().toDateString()

  constructor(apiKeys: string[]) {
    this.keys = apiKeys.filter((key) => key && key.length > 0)
    if (this.keys.length === 0) {
      throw new Error("No API keys provided for rotation")
    }
    // Initialize usage counts
    this.keys.forEach((key) => this.usageCounts.set(key, 0))
  }

  // Get the next available API key with available quota
  getNextKey(): string {
    // Check if we need to reset daily counts (midnight Pacific time)
    this.checkAndResetDailyCounts()

    // Try to find a key that hasn't hit the 20 request limit
    let attempts = 0
    while (attempts < this.keys.length) {
      const currentKey = this.keys[this.currentIndex]
      const usage = this.usageCounts.get(currentKey) || 0

      // If this key hasn't hit 20 requests today, use it
      if (usage < 20) {
        this.usageCounts.set(currentKey, usage + 1)
        return currentKey
      }

      // Move to next key
      this.currentIndex = (this.currentIndex + 1) % this.keys.length
      attempts++
    }

    // All keys exhausted, return first key anyway (will handle error gracefully)
    console.log("[v0] All API keys exhausted for today")
    return this.keys[0]
  }

  // Reset counts at midnight Pacific time
  private checkAndResetDailyCounts() {
    const today = new Date().toDateString()
    if (today !== this.lastResetDate) {
      this.lastResetDate = today
      this.keys.forEach((key) => this.usageCounts.set(key, 0))
      this.currentIndex = 0
      console.log("[v0] API key usage counts reset for new day")
    }
  }

  // Get current status
  getStatus() {
    return {
      totalKeys: this.keys.length,
      currentIndex: this.currentIndex,
      usageByKey: Array.from(this.usageCounts.entries()).map(([key, count]) => ({
        keyPreview: `${key.substring(0, 10)}...`,
        usage: count,
        remaining: Math.max(0, 20 - count),
      })),
      totalRemaining: Array.from(this.usageCounts.values()).reduce((sum, count) => sum + Math.max(0, 20 - count), 0),
    }
  }
}

// Singleton instance
let rotationInstance: APIKeyRotation | null = null

export function initializeAPIKeyRotation(keys: string[]) {
  rotationInstance = new APIKeyRotation(keys)
  return rotationInstance
}

export function getAPIKeyRotation(): APIKeyRotation {
  if (!rotationInstance) {
    throw new Error("API Key Rotation not initialized")
  }
  return rotationInstance
}
