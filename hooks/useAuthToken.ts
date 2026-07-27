import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

export function useAuthToken() {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!url || !key) {
          setLoading(false)
          return
        }

        const supabase = createClient(url, key)
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.access_token) {
          setAuthToken(session.access_token)
        }
      } catch (error) {
        console.error("[v0] Error getting auth token:", error)
      } finally {
        setLoading(false)
      }
    }

    getAuthToken()
  }, [])

  return { authToken, loading }
}
