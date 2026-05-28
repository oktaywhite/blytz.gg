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
    redirect(data.url)
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


const ALLOWED_AVATAR_HOSTS = [
  'supabase.co',
  'lh3.googleusercontent.com',
  'cdn.discordapp.com',
  'avatars.githubusercontent.com',
]

export async function updateUsername(formData: FormData) {
  const username = formData.get('username') as string
  const avatarUrl = formData.get('avatarUrl') as string

  if (!username) {
    return { error: 'Kullanıcı adı boş bırakılamaz.' }
  }

  // avatarUrl güvenlik kontrolü
  if (avatarUrl && avatarUrl !== '/logo.png') {
    try {
      const url = new URL(avatarUrl)
      const isAllowed = ALLOWED_AVATAR_HOSTS.some(host => url.hostname.endsWith(host))
      if (!isAllowed) {
        return { error: 'Geçersiz avatar kaynağı.' }
      }
    } catch {
      return { error: 'Geçersiz URL formatı.' }
    }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Oturum açık değil.' }
  }

  // Kullanıcı adının benzersiz olup olmadığını kontrol et
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle()

  if (existingUser && existingUser.id !== user.id) {
    return { error: 'Bu kullanıcı adı zaten başka bir oyuncu tarafından alınmış.' }
  }

  const updateData: any = { username: username }
  if (avatarUrl) {
    updateData.avatar_url = avatarUrl
  }

  const { error } = await supabase.auth.updateUser({
    data: updateData
  })

  if (error) {
    return { error: error.message }
  }

  // Profil tablosunu da güncelle
  const profileUpdate: any = { username: username }
  if (avatarUrl) {
    profileUpdate.avatar_url = avatarUrl
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .update(profileUpdate)
    .eq('id', user.id)

  if (profileError) {
    console.error('Profile update error:', profileError)
  }

  return { success: true }
}
