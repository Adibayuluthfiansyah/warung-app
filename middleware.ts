import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
const supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { user }, error } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // If user is not logged in and trying to access protected routes
  if (!user && !pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If user is logged in and trying to access login page
  if (user && pathname.startsWith('/login')) {
    // Redirect to their first warung dashboard or setup page
    try {
      const { data: warungAccess } = await supabase
        .from('warung_users')
        .select(`
          warung:warung_id (
            slug
          )
        `)
        .eq('user_id', user.id)
        .limit(1)

      const url = request.nextUrl.clone()
      
      if (warungAccess && warungAccess.length > 0) {
        url.pathname = `/${warungAccess[0].warung.slug}/dashboard`
      } else {
        url.pathname = '/setup-warung'
      }
      
      return NextResponse.redirect(url)
    } catch (error) {
      console.error('Error checking warung access:', error)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}