import React, { useState, useRef, useEffect } from 'react';
import { PROCESS_STEPS, CREATOR_ASSETS } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';

interface ProcessProps {
  onOpenFeaturedVideo?: (projectId?: string) => void;
}

export const Process: React.FC<ProcessProps> = ({ onOpenFeaturedVideo }) => {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Guarantee autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Inline autoplay deferred by browser:', err);
        });
      }
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleFullscreen = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const video = videoRef.current;
    if (!video) {
      onOpenFeaturedVideo?.('idea-to-execution');
      return;
    }

    // Ensure playback continues
    if (video.paused) {
      video.play().catch(() => {});
    }

    const requestFS =
      video.requestFullscreen ||
      (video as any).webkitRequestFullscreen ||
      (video as any).webkitEnterFullscreen ||
      (video as any).mozRequestFullScreen ||
      (video as any).msRequestFullscreen;

    if (requestFS) {
      try {
        const res = requestFS.call(video);
        if (res && res.catch) {
          res.catch(() => {
            onOpenFeaturedVideo?.('idea-to-execution');
          });
        }
      } catch {
        onOpenFeaturedVideo?.('idea-to-execution');
      }
    } else {
      onOpenFeaturedVideo?.('idea-to-execution');
    }
  };

  return (
    <section id="workflow" className="py-24 sm:py-32 relative overflow-hidden scroll-mt-20">
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow & Collaboration</span>
          </div>

          <h2
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}
          >
            From Idea to Final Visual
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg transition-colors duration-200 ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            A streamlined, collaborative 4-step system designed to deliver commercial-grade
            visuals with precision, agility, and uncompromising aesthetic rigor.
          </p>
        </div>

        {/* Master Large Video Player Container — Positioned between Header & 4-Step Boxes */}
        <div id="showreel" className="relative max-w-5xl mx-auto mb-16 sm:mb-20 scroll-mt-28">
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
            {/* 16:9 Video Canvas Viewport — Autoplays, clicks directly to Fullscreen */}
            <div
              className="relative aspect-[16/9] w-full overflow-hidden select-none cursor-pointer"
              onClick={() => handleFullscreen()}
              title="Click to view in fullscreen"
            >
              <video
                ref={videoRef}
                src={CREATOR_ASSETS.ideaToExecutionVideo || 'https://res.cloudinary.com/ird6se3z/video/upload/v1790359247/idea_to_execution.mp4'}
                poster={CREATOR_ASSETS.heroVisual}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 group-hover:opacity-80 transition-opacity pointer-events-none" />

              {/* Top metadata tags */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white z-20 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5C542] animate-ping" />
                  <span className="text-xs sm:text-sm font-bold font-display uppercase tracking-widest text-[#F5C542]">
                    From Idea to Execution
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/60 border border-white/10 text-neutral-200">
                    4K UHD · 60 FPS
                  </span>
                </div>
              </div>

              {/* Center Fullscreen Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <button
                  type="button"
                  onClick={handleFullscreen}
                  aria-label="View video in fullscreen"
                  className="pointer-events-auto group/btn relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F5C542] text-neutral-950 flex flex-col items-center justify-center transition-all duration-300 transform group-hover/btn:scale-110 active:scale-95 shadow-2xl shadow-[#F5C542]/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
                >
                  <div className="absolute -inset-3 rounded-full border-2 border-[#F5C542]/40 group-hover/btn:border-[#F5C542] animate-ping pointer-events-none" />
                  <Maximize2 className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover/btn:scale-110" />
                  <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 opacity-90 hidden sm:block">Full Screen</span>
                </button>
              </div>

              {/* Bottom Cinema Bar */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white z-20">
                <div>
                  <h3 className="font-display text-base sm:text-2xl font-bold tracking-tight text-white">
                    Idea to Execution — Workflow Reel
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 hidden sm:block">
                    From creative concept and prompt engineering to final commercial-grade delivery.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white transition-colors"
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-[#F5C542]" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white transition-colors"
                    aria-label="Full-Screen View"
                    title="Fullscreen"
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
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                <span>Runway Gen-3 Alpha</span>
                <span className="text-neutral-600 hidden sm:inline">/</span>
                <span>Midjourney v6.1</span>
                <span className="text-neutral-600 hidden sm:inline">/</span>
                <span>Luma Dream Machine</span>
                <span className="text-neutral-600 hidden sm:inline">/</span>
                <span>DaVinci Studio Finishing</span>
              </div>

              <button
                type="button"
                onClick={handleFullscreen}
                className="font-bold text-[#F5C542] hover:underline flex items-center gap-1.5"
              >
                <span>Launch Fullscreen Player</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Step Concept to Final Delivery Process Boxes */}
        <div className="relative">
          {/* Desktop Horizontal Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'bg-[#121216] border-white/10 hover:border-[#F5C542]/50 shadow-lg shadow-black/20'
                    : 'bg-white border-black/10 hover:border-[#F5C542]/70 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#F5C542] group-hover:scale-110 transition-transform origin-left">
                      {item.step}
                    </span>

                    <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                      Phase 0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-display text-xl font-bold tracking-tight mb-2 transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-950'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Core Description */}
                  <p className="text-sm font-medium text-[#F5C542] mb-3">
                    {item.description}
                  </p>

                  {/* Detailed explanation */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                    }`}
                  >
                    {item.detail}
                  </p>
                </div>

                {/* Step Indicator Arrow on Desktop */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-neutral-400 dark:text-neutral-600">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-[#F5C542]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
