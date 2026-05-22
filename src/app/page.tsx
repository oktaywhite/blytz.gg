import Hero from '@/components/Hero';
import StatsCard from '@/components/StatsCard';
import Features from '@/components/Features';
import GameSupport from '@/components/GameSupport';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Navbar from '@/components/Navbar';
import { Globe, MessageSquare as Discord, Code } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-lime selection:text-black">
      <Navbar />

      <Hero />

      <GameSupport />

      <div className="py-24">
        <StatsCard />
      </div>

      <HowItWorks />

      <Features />

      <Pricing />

      <CTA />

      {/* Improved Footer */}
      <footer className="py-20 border-t border-white/5 px-6 bg-black/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <img src="/logo.png" alt="Blytz Logo" className="h-10 w-auto" />
              </div>
              <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                Empowering gamers to build their digital legacy across the metaverse. The only living gaming profile you'll ever need.
              </p>
              <div className="flex gap-4">
                {[Globe, Discord, Code].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl glass border border-white/5 flex items-center justify-center hover:text-lime hover:border-lime/20 transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black mb-6 tracking-widest text-white">PLATFORM</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-lime transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Supported Games</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Profile Gallery</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Verified Program</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black mb-6 tracking-widest text-white">RESOURCES</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-lime transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-lime transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-xs font-bold tracking-widest">
              &copy; 2026 BLYTZ. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-8 text-xs font-bold tracking-widest text-gray-600">
              <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
