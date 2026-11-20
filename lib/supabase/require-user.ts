import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"

export async function getAuthenticatedSupabase(): Promise<{
  supabase: Awaited<ReturnType<typeof createClient>>
  user: User | null
}> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  return { supabase, user: error ? null : data.user }
}
