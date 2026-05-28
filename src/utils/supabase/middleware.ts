import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        maxAge: 60 * 60 * 24 * 7, // 7 gün
      },
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, { ...options, maxAge: 60 * 60 * 24 * 7 }) // 7 gün
          )
        },
      },
    }
  )

  // refreshing the auth token
  const { data: { user } } = await supabase.auth.getUser()

  // Kullanıcı giriş yapmış ama henüz kullanıcı adı (username) belirlememişse onboarding'e yönlendir
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth') || 
                     request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register')
  const isOnboardingPage = request.nextUrl.pathname.startsWith('/onboarding')
  const isHomePage = request.nextUrl.pathname === '/'

  if (user) {
    const username = user.user_metadata?.username
    
    if (!username && !isAuthPage && !isOnboardingPage) {
      // Kullanıcı adı yoksa zorunlu kurulum ekranı
      const onboardingUrl = request.nextUrl.clone()
      onboardingUrl.pathname = '/onboarding'
      return NextResponse.redirect(onboardingUrl)
    } 
    else if (username && (isHomePage || isAuthPage)) {
      // Kullanıcı adı var ve ana sayfa veya login/register'daysa, direkt profiline at
      const profileUrl = request.nextUrl.clone()
      profileUrl.pathname = `/${username}`
      return NextResponse.redirect(profileUrl)
    }
  }

  return supabaseResponse
}
