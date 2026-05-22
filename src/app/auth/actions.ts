'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signInWithDiscord() {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${origin}/auth/callback?next=/`,
    },
  })

  if (error) {
    console.error('Discord login error:', error)
    return redirect('/login?error=Could not login with Discord')
  }

  if (data.url) {
    redirect(data.url) // Navigate to the provider's authentication URL
  }
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback?next=/`,
    },
  })

  if (error) {
    console.error('Google login error:', error)
    return redirect('/login?error=Could not login with Google')
  }

  if (data.url) {
    redirect(data.url)
  }
}
