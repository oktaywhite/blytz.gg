'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { User, ArrowRight, Camera, Gamepad2, CheckCircle2, AlertCircle, Link as LinkIcon, Upload } from 'lucide-react'
import { updateUsername } from '@/app/auth/actions'
import { createClient } from '@/utils/supabase/client'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  // Profile Data
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('/logo.png')
  const [userEmail, setUserEmail] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email || '')
        if (user.user_metadata?.avatar_url) {
          setAvatarUrl(user.user_metadata.avatar_url)
        }
        if (user.user_metadata?.username) {
          // If they already have a username, we can either skip step 1 or pre-fill it
          setUsername(user.user_metadata.username)
        }
      } else {
        router.push('/login')
      }
      setLoading(false)
    }
    fetchUser()
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 50 * 1024 * 1024) {
        setError("Fotoğraf boyutu 50MB'dan küçük olmalıdır.")
        return
      }
      setAvatarFile(file)
      setAvatarUrl(URL.createObjectURL(file))
      setError('')
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || username.length < 5) {
      setError('Kullanıcı adı en az 5 karakter olmalıdır.')
      return
    }
    
    setSubmitting(true)
    setError('')
    
    const formData = new FormData()
    formData.append('username', username)
    
    // Upload avatar to Supabase Storage if a new file is selected
    if (avatarFile) {
      const supabase = createClient()
      const fileExt = avatarFile.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile)

      if (uploadError) {
        setError('Fotoğraf yüklenirken bir hata oluştu. "avatars" adında bir Storage bucket\'ı açtığınızdan emin olun.')
        setSubmitting(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)
        
      formData.append('avatarUrl', publicUrl)
    } else {
      // If they didn't upload a new file, we can still pass the existing avatarUrl
      formData.append('avatarUrl', avatarUrl)
    }
    
    const result = await updateUsername(formData)
    
    if (result?.error) {
      setError(result.error)
      setSubmitting(false)
    } else {
      setSubmitting(false)
      setStep(2)
    }
  }

  const handleFinish = () => {
    router.push(`/${username}`)
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-lime-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-lime-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-fuchsia-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex-grow flex flex-col pt-12 px-6">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Blytz Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold tracking-tighter">BLYTZ</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-lime-500 shadow-[0_0_10px_rgba(132,204,22,0.5)]' : 'bg-zinc-800'}`} />
            <div className={`w-8 h-[2px] ${step >= 2 ? 'bg-lime-500' : 'bg-zinc-800'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-lime-500 shadow-[0_0_10px_rgba(132,204,22,0.5)]' : 'bg-zinc-800'}`} />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent" />
                
                <h2 className="text-2xl font-bold mb-2">Profilini Oluştur</h2>
                <p className="text-zinc-400 text-sm mb-8">
                  Blytz ekosisteminde seni temsil edecek oyuncu adını ve avatarını belirle.
                </p>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  {/* Avatar Upload Area */}
                  <div className="flex flex-col items-center gap-4">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/jpeg, image/png, image/gif, image/webp" 
                      onChange={handleFileChange} 
                    />
                    <div 
                      className="relative group cursor-pointer" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-lime-500 transition-colors">
                        <img src={avatarUrl} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                        <Upload className="w-5 h-5 text-white mb-1" />
                        <span className="text-[10px] font-bold">DEĞİŞTİR</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-zinc-500">JPG, PNG, WEBP veya GIF (Maks 50MB)</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5 ml-1">
                      <label className="block text-sm font-medium text-zinc-400">Blytz Kullanıcı Adı</label>
                      <span className="text-xs text-zinc-600 font-medium">{username.length}/15</span>
                    </div>
                    <div className="flex bg-black/50 border border-zinc-800 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-lime-500/50 focus-within:border-lime-500/50 transition-all">
                      <div className="flex items-center pl-4 pr-1 text-zinc-500 select-none font-medium">
                        blytz.lol/
                      </div>
                      <input
                        type="text"
                        value={username}
                        maxLength={15}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        className="block w-full py-3 pr-4 bg-transparent text-white placeholder-zinc-600 focus:outline-none"
                        placeholder="oyuncu_adi"
                        autoFocus
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || !username}
                    className="w-full relative flex items-center justify-center gap-2 px-4 py-3 bg-lime-500 hover:bg-lime-400 text-black font-semibold rounded-xl transition-all duration-300 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    <span>{submitting ? 'Kaydediliyor...' : 'Devam Et'}</span>
                    {!submitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
                
                <h2 className="text-2xl font-bold mb-2">Oyun Hesaplarını Bağla</h2>
                <p className="text-zinc-400 text-sm mb-8">
                  İstatistiklerini otomatik çekmek için hesaplarını Blytz profiline entegre et.
                </p>

                <div className="space-y-3 mb-8">
                  {/* League of Legends */}
                  <div className="p-4 border border-zinc-800 rounded-xl bg-black/30 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#0AC8B9]/10 flex items-center justify-center">
                        <Gamepad2 className="w-5 h-5 text-[#0AC8B9]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">League of Legends</h3>
                        <p className="text-xs text-zinc-500">Riot hesabını bağla</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-bold hover:bg-zinc-700 transition-colors flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" />
                      Bağla
                    </button>
                  </div>

                  {/* Valorant */}
                  <div className="p-4 border border-zinc-800 rounded-xl bg-black/30 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#FF4655]/10 flex items-center justify-center">
                        <Gamepad2 className="w-5 h-5 text-[#FF4655]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">Valorant</h3>
                        <p className="text-xs text-zinc-500">Riot hesabını bağla</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-bold hover:bg-zinc-700 transition-colors flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" />
                      Bağla
                    </button>
                  </div>

                  {/* Steam */}
                  <div className="p-4 border border-zinc-800 rounded-xl bg-black/30 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <Gamepad2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">Steam</h3>
                        <p className="text-xs text-zinc-500">Kütüphaneni sergile</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-bold hover:bg-zinc-700 transition-colors flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" />
                      Bağla
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    Geri Dön
                  </button>
                  <button
                    onClick={handleFinish}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold rounded-xl transition-all duration-300 group"
                  >
                    <span>Profili Tamamla</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-center text-xs text-zinc-600 mt-4">
                  Hesaplarını daha sonra profil ayarlarından da bağlayabilirsin.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
