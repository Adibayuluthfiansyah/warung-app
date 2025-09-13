import supabase from './db'
import type { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  warung?: {
    id: string
    slug: string
    nama: string
    role: string
    status: string
  }[]
}

export const auth = {
  // Sign up
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  // Sign in
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get user with warung access
  async getUserWithWarung() {
   const { data: { user }, error } = await supabase.auth.getUser()
  
  console.log('Auth: Current user:', user);
  
  if (error || !user) return { user: null, error }

  try {
    console.log('Auth: Fetching warung for user:', user.id);
    
    // Get warung access for this user
    const { data: warungAccess, error: warungError } = await supabase
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

    console.log('Auth: Warung query result:', warungAccess);
    console.log('Auth: Warung query error:', warungError);

    if (warungError) {
      console.error('Error fetching warung access:', warungError)
      return { user: { ...user, warung: [] }, error: null }
    }

    const processedWarung = warungAccess?.map(access => {
      console.log('Auth: Processing access:', access);
      return {
        id: access.warung.id,
        slug: access.warung.slug,
        nama: access.warung.nama,
        status: access.warung.status,
        role: access.role
      }
    }) || []

    console.log('Auth: Processed warung:', processedWarung);

    const userWithWarung: AuthUser = {
      ...user,
      warung: processedWarung
    }

    console.log('Auth: Final user with warung:', userWithWarung);
    return { user: userWithWarung, error: null }
  } catch (err) {
    console.error('Error in getUserWithWarung:', err)
    return { user: { ...user, warung: [] }, error: null }
  }
},

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}