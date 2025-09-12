import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './db-types'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // Handle cookie setting errors in middleware
            console.error('Error setting cookies:', error)
          }
        },
      },
    }
  )
}

// Helper functions for server components
export async function getUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export async function getUserWithWarung() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) return { user: null, error }

  try {
    const { data: warungAccess } = await supabase
      .from('warung_users')
      .select(`
        role,
        warung:warung_id (
          id,
          slug,
          nama,
          status
        )
      `)
      .eq('user_id', user.id)

    const userWithWarung = {
      ...user,
      warung: warungAccess?.map(access => ({
        id: access.warung.id,
        slug: access.warung.slug,
        nama: access.warung.nama,
        status: access.warung.status,
        role: access.role
      })) || []
    }

    return { user: userWithWarung, error: null }
  } catch (err) {
    console.error('Error in getUserWithWarung:', err)
    return { user: { ...user, warung: [] }, error: null }
  }
}

export default createClient