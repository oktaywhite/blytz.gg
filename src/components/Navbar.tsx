import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { LogOut, User } from 'lucide-react'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-center">
      <div className="glass px-8 py-3 rounded-full flex items-center justify-between gap-12 border border-white/5 backdrop-blur-xl max-w-6xl w-full">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <img src="/logo.png" alt="NeoRank Logo" className="h-8 w-auto group-hover:scale-105 transition-transform" />
        </Link>
        <div className="hidden md:flex items-center gap-10 text-[12px] font-bold tracking-[0.2em] text-gray-500">
          <a href="#" className="hover:text-lime transition-colors">FEATURES</a>
          <a href="#" className="hover:text-lime transition-colors">GAME SUPPORT</a>
          <a href="#pricing" className="hover:text-lime transition-colors">PRICING</a>
          <a href="#" className="hover:text-lime transition-colors">DOCS</a>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link 
                href="/profile" 
                className="flex items-center gap-2 text-white hover:text-lime transition-colors text-sm font-bold"
              >
                <img 
                  src={user.user_metadata.avatar_url || '/logo.png'} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full border border-white/10"
                />
                <span className="hidden md:inline">{user.user_metadata.full_name || user.user_metadata.custom_claims?.global_name || 'Profilim'}</span>
              </Link>
              
              <form action={async () => {
                'use server'
                const supabase = await createClient()
                await supabase.auth.signOut()
              }}>
                <button 
                  type="submit"
                  className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors"
                  title="Çıkış Yap"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <Link 
              href="/login"
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-black hover:bg-lime transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
