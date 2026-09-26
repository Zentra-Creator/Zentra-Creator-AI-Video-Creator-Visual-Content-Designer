import React, { useState } from 'react';
import { Play, Volume2, VolumeX, Maximize2, Sparkles, Film } from 'lucide-react';
import { CREATOR_ASSETS } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface ShowreelProps {
  onOpenFullscreen: () => void;
}

export const Showreel: React.FC<ShowreelProps> = ({ onOpenFullscreen }) => {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="showreel" className="py-24 sm:py-32 scroll-mt-20 relative overflow-hidden">
      {/* Subtle backdrop ambient illumination */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-transparent via-[#F5C542]/5 to-transparent'
            : 'bg-gradient-to-b from-transparent via-[#F5C542]/10 to-transparent'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5C542] mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>Cinematic Reel</span>
          </div>

          <h2
            className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}
          >
            The Zentra Showreel
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg transition-colors duration-200 ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            A high-impact montage of AI video ads, luxury fashion films, product commercials,
            and visual storytelling crafted for premier brands.
          </p>
        </div>

        {/* Master Large Video Player Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Subtle outer golden glow */}
          <div
            className={`absolute -inset-1.5 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-75 transition duration-1000 ${
              theme === 'dark' ? 'bg-[#F5C542]/20' : 'bg-[#F5C542]/30'
            }`}
          />

          <div
            className={`relative rounded-[2rem] overflow-hidden border transition-all duration-500 shadow-2xl group ${
              theme === 'dark'
                ? 'bg-neutral-950 border-white/10 shadow-black/80'
                : 'bg-neutral-900 border-black/10 shadow-neutral-900/40'
            }`}
          >
            {/* 16:9 Video Canvas Viewport */}
            <div className="relative aspect-[16/9] w-full overflow-hidden select-none">
              <img
                src={CREATOR_ASSETS.heroVisual}
                alt="The Zentra Showreel"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02] ${
                  isPlaying ? 'brightness-105' : 'brightness-90'
                }`}
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 group-hover:opacity-80 transition-opacity" />

              {/* Top metadata tags */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5C542] animate-ping" />
                  <span className="text-xs sm:text-sm font-bold font-display uppercase tracking-widest text-[#F5C542]">
                    Official 2026 Showreel
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/60 border border-white/10 text-neutral-200">
                    4K UHD · 60 FPS
                  </span>
                </div>
              </div>

              {/* Center Golden Yellow Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button
                  type="button"
                  onClick={onOpenFullscreen}
                  aria-label="Play The Zentra Showreel"
                  className="group/btn relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#F5C542] text-neutral-950 flex items-center justify-center transition-all duration-300 transform group-hover/btn:scale-110 active:scale-95 shadow-2xl shadow-[#F5C542]/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
                >
                  {/* Subtle pulsing outer ring */}
                  <div className="absolute -inset-3 rounded-full border-2 border-[#F5C542]/40 group-hover/btn:border-[#F5C542] animate-ping pointer-events-none" />
                  <Play className="w-8 h-8 sm:w-12 sm:h-12 fill-current ml-1 transition-transform group-hover/btn:scale-105" />
                </button>
              </div>

              {/* Bottom Cinema Bar */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white z-20">
                <div>
                  <h3 className="font-display text-base sm:text-2xl font-bold tracking-tight text-white">
                    Zentra Creator — Visual Master Reel
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 hidden sm:block">
                    Featuring work for luxury fashion, skincare, horology, and digital campaigns.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-[#F5C542]" />}
                  </button>

                  <button
                    type="button"
                    onClick={onOpenFullscreen}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white transition-colors"
                    aria-label="Full-Screen View"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Reel Highlights Ticker */}
            <div
              className={`p-4 sm:px-8 sm:py-5 flex flex-wrap items-center justify-between gap-4 text-xs ${
                theme === 'dark' ? 'bg-[#121217] text-neutral-400' : 'bg-neutral-900 text-neutral-300'
              }`}
            >
              <div className="flex items-center gap-6">
                <span>Runway Gen-3 Alpha</span>
                <span className="text-neutral-600">/</span>
                <span>Midjourney v6.1</span>
                <span className="text-neutral-600">/</span>
                <span>Luma Dream Machine</span>
                <span className="text-neutral-600">/</span>
                <span>DaVinci Studio Finishing</span>
              </div>

              <button
                type="button"
                onClick={onOpenFullscreen}
                className="font-bold text-[#F5C542] hover:underline flex items-center gap-1.5"
              >
                <span>Launch Interactive Player</span>
                <span>→</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
