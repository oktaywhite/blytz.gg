import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Gamepad2, Eye, Calendar, Trophy, Link as LinkIcon, Share2 } from 'lucide-react'
import MouseTrail from '@/components/MouseTrail'

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params
  const username = resolvedParams.username
  
  const supabase = await createClient()

  // Fetch the profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username.toLowerCase())
    .single()

  // If no profile found, trigger 404
  if (!profile) {
    notFound()
  }

  // Update view count (fire and forget)
  // In a real app, you might want to prevent self-views or use an edge function
  // await supabase.rpc('increment_view_count', { profile_id: profile.id })

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-lime-500/30">
      <Navbar variant="minimal" />
      <MouseTrail />

      {/* Profile Header Background */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] z-10" />
        <div className="absolute inset-0 bg-zinc-900">
          {/* Default cover pattern */}
          <div className="w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-lime-500/20 to-fuchsia-600/20 mix-blend-overlay" />
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 relative z-20 -mt-24 md:-mt-32 pb-24">
        {/* Profile Card */}
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#050505] shadow-[0_0_0_2px_rgba(132,204,22,0.3)] bg-zinc-900">
              <img 
                src={profile.avatar_url || '/logo.png'} 
                alt={`${profile.username} avatar`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-lime-500 rounded-full border-4 border-[#050505]" title="Online" />
          </div>

          {/* User Info */}
          <div className="flex-grow text-center md:text-left mt-2 md:mt-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {profile.full_name || profile.username}
            </h1>
            <p className="text-lime-400 font-medium text-lg mb-4 flex items-center justify-center md:justify-start gap-1">
              @<span className="tracking-wide">{profile.username}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Eye className="w-4 h-4" />
                <span>{profile.view_count || 0} Görüntülenme</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Calendar className="w-4 h-4" />
                <span>Katılım: {new Date(profile.updated_at || Date.now()).getFullYear()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-lime-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Bağlantı Kur
            </button>
            <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white" title="Profili Paylaş">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Connected Games Grid */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-lime-400" />
            Oyun Hesapları
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* League of Legends Card Placeholder */}
            <div className="group relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-[#0AC8B9]/50 transition-colors overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0AC8B9]/10 rounded-full blur-[40px] group-hover:bg-[#0AC8B9]/20 transition-colors" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0AC8B9]/10 flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-[#0AC8B9]" />
                  </div>
                  <div>
                    <h3 className="font-bold">League of Legends</h3>
                    <p className="text-xs text-zinc-500">EUW • Seviye 420</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
                <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblems/emblem-diamond.png" alt="Rank" className="w-12 h-12" />
                <div>
                  <div className="text-sm font-bold text-[#0AC8B9]">Diamond II</div>
                  <div className="text-xs text-zinc-400">65 LP • %58 WR</div>
                </div>
              </div>
            </div>

            {/* Valorant Card Placeholder */}
            <div className="group relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-[#FF4655]/50 transition-colors overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4655]/10 rounded-full blur-[40px] group-hover:bg-[#FF4655]/20 transition-colors" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FF4655]/10 flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-[#FF4655]" />
                  </div>
                  <div>
                    <h3 className="font-bold">Valorant</h3>
                    <p className="text-xs text-zinc-500">TR • Jett Main</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-8 mt-6 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                 <div>
                   <div className="text-xl font-black text-white">1.24</div>
                   <div className="text-[10px] text-zinc-500 font-bold tracking-wider">K/D RATIO</div>
                 </div>
                 <div className="w-px h-8 bg-white/10" />
                 <div>
                   <div className="text-xl font-black text-[#FF4655]">165</div>
                   <div className="text-[10px] text-zinc-500 font-bold tracking-wider">AVG DMG</div>
                 </div>
              </div>
            </div>

            {/* Empty Slot Placeholder */}
            <div className="group relative bg-black/20 border border-white/5 border-dashed rounded-2xl p-6 hover:border-lime-500/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px]">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-lime-500/20 transition-all">
                <LinkIcon className="w-5 h-5 text-zinc-500 group-hover:text-lime-400" />
              </div>
              <h3 className="font-bold text-zinc-400 group-hover:text-white transition-colors">Yeni Hesap Bağla</h3>
              <p className="text-xs text-zinc-600 mt-2">Steam, Riot, Epic Games...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
