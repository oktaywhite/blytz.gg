import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import MouseTrail from '@/components/MouseTrail'
import ShareButton from '@/components/ShareButton'
import { headers } from 'next/headers'
import { Eye, Link as LinkIcon, ChevronRight, MessageSquare, Play, Tv, Globe } from 'lucide-react'

// ── Types ──────────────────────────────────────────────
type ConnectedGame = {
  id: string
  game: 'lol' | 'valorant'
  region: string
  gameName: string
  rank: string
  lp?: number
  top?: string
  emblemUrl?: string
  accentColor: string
  accentBg: string
  label: string
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params
  const username = resolvedParams.username
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles').select('*')
    .eq('username', username.toLowerCase()).single()

  if (!profile) notFound()

  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === profile.id

  if (!isOwner) {
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || headersList.get('x-real-ip') || 'unknown'
    await supabase.rpc('increment_view_count', { profile_id: profile.id, visitor_ip: ip })
  }

  const joinYear = new Date(profile.updated_at || Date.now()).getFullYear()
  const viewCount = profile.view_count || 0

  // ── Connected games from DB (empty = no connected accounts) ──
  // TODO: Replace with real DB query once game_accounts table exists
  const connectedGames: ConnectedGame[] = profile.connected_games ?? []

  // ── Placeholder for demo — remove when real API is integrated ──
  // const connectedGames: ConnectedGame[] = [
  //   {
  //     id: 'lol-1', game: 'lol', region: 'EUW', gameName: 'League of Legends',
  //     rank: 'Diamond II', lp: 65,
  //     emblemUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblems/emblem-diamond.png',
  //     accentColor: '#0AC8B9', accentBg: 'bento-cyan', label: 'LoL',
  //   },
  //   {
  //     id: 'val-1', game: 'valorant', region: 'TR', gameName: 'Valorant',
  //     rank: 'Immortal II', top: 'Top 8%',
  //     accentColor: '#FF4655', accentBg: 'bento-magenta', label: 'VAL',
  //   },
  // ]

  const hasGames = connectedGames.length > 0

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-lime-500/30 overflow-x-hidden">
      <Navbar variant="minimal" />
      <MouseTrail />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-lime-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/5 blur-[120px]" />
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-6 py-28">
        <div className="flex flex-col md:flex-row gap-3 items-start justify-center w-full max-w-[1000px]">

          {/* ── LEFT COLUMN: always visible ── */}
          <div className="w-full md:w-[300px] shrink-0 flex flex-col gap-3">

            {/* Profile Card */}
            <div className="glass-card bento-lime rounded-3xl p-5 relative overflow-hidden group flex flex-col gap-5">
              <div className="absolute inset-0 animate-shimmer pointer-events-none rounded-3xl" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-lime-500/8 rounded-full blur-[60px]" />

              {/* Top badges */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest text-lime-400/80 uppercase">Online</span>
                </div>
                <ShareButton username={profile.username} />
              </div>

              {/* Avatar + Name */}
              <div className="flex flex-col items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 animate-pulse-ring">
                    <img
                      src={profile.avatar_url || '/logo.png'}
                      alt={profile.username}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-lime-400 border-2 border-[#050505]" />
                </div>
                <div className="text-center">
                  <h1 className="text-xl font-black tracking-tight">{profile.full_name || profile.username}</h1>
                  <p className="text-lime-400 text-sm font-medium mt-0.5">@{profile.username}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 relative z-10">
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-black">{viewCount}</div>
                  <div className="text-[9px] text-zinc-500 uppercase font-bold flex items-center justify-center gap-1 mt-0.5">
                    <Eye className="w-2.5 h-2.5" /> Views
                  </div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-black">{joinYear}</div>
                  <div className="text-[9px] text-zinc-500 uppercase font-bold mt-0.5">Joined</div>
                </div>
              </div>
            </div>

            {/* Socials Card */}
            <div className="glass-card rounded-2xl p-4 flex items-center justify-between">
              <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">Sosyal Medya</span>
              <div className="flex items-center gap-2">
                {[
                  { Icon: MessageSquare, color: 'hover:text-sky-400', label: 'X' },
                  { Icon: Tv, color: 'hover:text-purple-400', label: 'Twitch' },
                  { Icon: Play, color: 'hover:text-red-400', label: 'YouTube' },
                  { Icon: Globe, color: 'hover:text-lime-400', label: 'Site' },
                ].map(({ Icon, color, label }) => (
                  <button key={label} title={label}
                    className={`w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 ${color} transition-colors`}>
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Add Account CTA */}
            <div className="glass-card rounded-2xl p-4 flex items-center justify-between border-dashed border-white/8 hover:border-lime-500/30 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-lime-500/10 group-hover:border-lime-500/30 transition-all">
                  <LinkIcon className="w-4 h-4 text-zinc-500 group-hover:text-lime-400 transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">Hesap Bağla</div>
                  <div className="text-[10px] text-zinc-600">Steam · Epic · Riot Games</div>
                </div>
              </div>
              <span className="text-xl font-bold text-zinc-700 group-hover:text-lime-400 transition-colors">+</span>
            </div>

          </div>

          {/* ── RIGHT COLUMN: only if connected games exist ── */}
          {hasGames && (
            <div className="flex-1 flex flex-col gap-3">
              {connectedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

// ── Game Rank Card ──────────────────────────────────────
function GameCard({ game }: { game: ConnectedGame }) {
  const isLol = game.game === 'lol'
  const color = game.accentColor

  return (
    <div
      className="glass-card rounded-3xl p-5 relative overflow-hidden group flex items-center justify-between cursor-pointer"
      style={{ borderColor: `${color}20` }}
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none"
        style={{ background: `${color}15` }} />

      {/* Left: Game identity */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Game badge */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black italic"
          style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
          {game.label}
        </div>

        <div>
          <div className="font-black text-sm text-white">{game.gameName}</div>
          <div className="text-[10px] text-zinc-500">{game.region}</div>
        </div>
      </div>

      {/* Center: Rank */}
      <div className="relative z-10 flex items-center gap-3">
        {isLol && game.emblemUrl && (
          <img
            src={game.emblemUrl}
            alt={game.rank}
            className="w-12 h-12 animate-float"
            style={{ filter: `drop-shadow(0 0 12px ${color}60)` }}
          />
        )}
        <div>
          <div className="text-xl font-black text-white">{game.rank}</div>
          <div className="text-sm font-bold" style={{ color }}>
            {isLol ? `${game.lp} LP` : game.top}
          </div>
        </div>
      </div>

      {/* Right: CTA */}
      <div className="relative z-10 flex items-center gap-1 text-zinc-600 group-hover:text-zinc-400 transition-colors">
        <span className="text-xs font-bold">Detaylar</span>
        <ChevronRight className="w-4 h-4" />
      </div>

      {/* Connected badge */}
      <div className="absolute top-3 right-14 flex items-center gap-1 bg-black/50 rounded-full px-2 py-0.5"
        style={{ border: `1px solid ${color}25` }}>
        <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: color }} />
        <span className="text-[9px] font-bold" style={{ color }}>Bağlı</span>
      </div>
    </div>
  )
}
