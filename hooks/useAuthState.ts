import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { hasAnonymousSession } from '@/lib/anonymous-session'

export interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  isAnonymous: boolean
  userId?: string
  email?: string
  accessToken?: string
}

export function useAuthState() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    isAnonymous: false,
  })

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (!url || !key) {
          // Fallback to anonymous if Supabase not configured
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            isAnonymous: hasAnonymousSession() || true,
          })
          return
        }

        const supabase = createClient(url, key)
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          // User is authenticated
          setAuthState({
            isLoading: false,
            isAuthenticated: true,
            isAnonymous: false,
            userId: session.user.id,
            email: session.user.email,
            accessToken: session.access_token,
          })
        } else if (hasAnonymousSession()) {
          // User has anonymous session
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            isAnonymous: true,
          })
        } else {
          // No session at all - treat as anonymous
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            isAnonymous: true,
          })
        }
      } catch (error) {
        console.error('[v0] Error checking auth state:', error)
        // Fallback to anonymous on error
        setAuthState({
          isLoading: false,
          isAuthenticated: false,
          isAnonymous: true,
        })
      }
    }

    checkAuthState()
  }, [])

  return authState
}
