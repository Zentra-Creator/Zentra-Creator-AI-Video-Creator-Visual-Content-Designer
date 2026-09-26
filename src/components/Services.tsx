import React, { useState, useRef, useEffect } from 'react';
import {
  Clapperboard,
  Box,
  Sparkles,
  Image,
  Smartphone,
  Flame,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES_LIST, PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { useTheme } from '../context/ThemeContext';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
  onOpenProject?: (project: Project) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenProject }) => {
  const { theme } = useTheme();

  // Active service slot selected in the showcase div box
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES_LIST[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const showcaseVideoRef = useRef<HTMLVideoElement>(null);

  const activeService = SERVICES_LIST.find((s) => s.id === activeServiceId) || SERVICES_LIST[0];
  const activeMatchingProject = PORTFOLIO_PROJECTS.find((p) => p.id === activeService.projectId);

  // Auto-play active showcase video whenever active service changes
  useEffect(() => {
    if (showcaseVideoRef.current) {
      showcaseVideoRef.current.currentTime = 0;
      showcaseVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [activeServiceId]);

  const togglePlay = () => {
    if (showcaseVideoRef.current) {
      if (showcaseVideoRef.current.paused) {
        showcaseVideoRef.current.play();
        setIsPlaying(true);
      } else {
        showcaseVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (showcaseVideoRef.current) {
      showcaseVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Clapperboard':
        return <Clapperboard className="w-5 h-5 text-[#F5C542]" />;
      case 'Box':
        return <Box className="w-5 h-5 text-[#F5C542]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#F5C542]" />;
      case 'Image':
        return <Image className="w-5 h-5 text-[#F5C542]" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[#F5C542]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#F5C542]" />;
      default:
        return <Clapperboard className="w-5 h-5 text-[#F5C542]" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-14 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5C542] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Specialized Capabilities</span>
          </div>

          <h2
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}
          >
            What I Create
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg transition-colors duration-200 ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            End-to-end AI video and visual content production tailored for commercial brands,
            high-growth direct-to-consumer labels, and modern digital campaigns.
          </p>
        </div>

        {/* Master Interactive Service Slot Div Box */}
        <div className="mb-16">
          <div
            className={`rounded-3xl border overflow-hidden transition-all duration-300 shadow-2xl ${
              theme === 'dark'
                ? 'bg-[#121217] border-white/10 shadow-black/80'
                : 'bg-white border-black/10 shadow-xl shadow-black/5'
            }`}
          >
            {/* Slot Header & Service Selector Pills */}
            <div className="p-5 sm:p-6 border-b border-white/[0.08] dark:border-white/[0.08] border-black/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#F5C542] flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#F5C542] animate-pulse" />
                  <span>Featured Service Reel Player</span>
                </div>
                <h3
                  className={`text-lg sm:text-xl font-display font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  Watch All Service Videos in Action
                </h3>
              </div>

              {/* Service Navigation Slots */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {SERVICES_LIST.map((service, idx) => {
                  const isActive = service.id === activeServiceId;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveServiceId(service.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-[#F5C542] text-neutral-950 border-[#F5C542] shadow-sm font-bold scale-[1.02]'
                          : theme === 'dark'
                          ? 'bg-neutral-900/80 text-neutral-300 border-white/10 hover:border-white/25 hover:text-white'
                          : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <span className="text-[10px] opacity-75">0{idx + 1}</span>
                      <span>{service.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video Slot Player & Detail Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* Left / Top: Master Video Screen */}
              <div className="lg:col-span-7 relative bg-black flex items-center justify-center min-h-[300px] sm:min-h-[420px] overflow-hidden group">
                {activeService.videoUrl ? (
                  <video
                    ref={showcaseVideoRef}
                    key={activeService.videoUrl}
                    src={activeService.videoUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover max-h-[500px]"
                  />
                ) : (
                  <div className="text-neutral-500 text-sm">No video preview available</div>
                )}

                {/* Video Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-semibold text-[#F5C542] border border-[#F5C542]/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-ping" />
                    <span>{activeService.videoLabel || 'Service Video Reel'}</span>
                  </span>
                </div>

                {/* Player Controls Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="p-2.5 rounded-full bg-black/70 hover:bg-[#F5C542] hover:text-neutral-950 backdrop-blur-md transition-all border border-white/20"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="p-2.5 rounded-full bg-black/70 hover:bg-white/20 backdrop-blur-md transition-all border border-white/20 text-neutral-300 hover:text-white"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {activeMatchingProject && onOpenProject && (
                    <button
                      type="button"
                      onClick={() => onOpenProject(activeMatchingProject)}
                      className="px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-[#F5C542] hover:text-neutral-950 backdrop-blur-md text-xs font-semibold transition-all border border-white/20 flex items-center gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full Screen</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right / Bottom: Service Breakdown & Inquiry CTA */}
              <div
                className={`lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between border-t lg:border-t-0 lg:border-l ${
                  theme === 'dark' ? 'border-white/[0.08] bg-[#0d0d10]' : 'border-black/[0.08] bg-neutral-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        theme === 'dark' ? 'bg-[#F5C542]/10' : 'bg-[#F5C542]/20'
                      }`}
                    >
                      {getServiceIcon(activeService.iconName)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#F5C542] uppercase tracking-wider block">
                        Service Slot Active
                      </span>
                      <h4
                        className={`text-xl font-display font-extrabold tracking-tight ${
                          theme === 'dark' ? 'text-white' : 'text-neutral-950'
                        }`}
                      >
                        {activeService.title}
                      </h4>
                    </div>
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {activeService.description}
                  </p>

                  {/* Deliverables for this slot */}
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                      Included Deliverables
                    </span>
                    <ul className="space-y-2">
                      {activeService.deliverables.map((item) => (
                        <li
                          key={item}
                          className={`text-xs flex items-center gap-2.5 ${
                            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#F5C542] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/80 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectService(activeService.title)}
                    className="w-full py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#F5C542] text-neutral-950 hover:bg-[#e5b634] active:scale-95 transition-all shadow-md shadow-[#F5C542]/20 flex items-center justify-center gap-2"
                  >
                    <span>Book {activeService.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* 6 Service Cards Grid with Video Slots in Each Div Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service, index) => {
            const matchingProject = PORTFOLIO_PROJECTS.find((p) => p.id === service.projectId);

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.title)}
                className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  theme === 'dark'
                    ? 'bg-neutral-900/60 hover:bg-neutral-900 border-white/[0.08] hover:border-[#F5C542]/50 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-[#F5C542]/5'
                    : 'bg-white hover:bg-neutral-50/80 border-black/[0.08] hover:border-[#F5C542]/70 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top row: Icon & Index */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        theme === 'dark' ? 'bg-white/5 group-hover:bg-[#F5C542]/10' : 'bg-neutral-100 group-hover:bg-[#F5C542]/15'
                      }`}
                    >
                      {getServiceIcon(service.iconName)}
                    </div>

                    <span className="text-xs font-mono font-semibold text-neutral-400 group-hover:text-[#F5C542] transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Video Slot in the Div Box */}
                  {service.videoUrl && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 bg-neutral-950 group/video border border-white/10 shadow-md">
                      <video
                        src={service.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                      {/* Video Slot Badge */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-semibold text-[#F5C542] border border-[#F5C542]/30 flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542] animate-pulse" />
                        <span>{service.videoLabel || 'Service Video Reel'}</span>
                      </div>

                      {/* Video Slot Modal Trigger */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (matchingProject && onOpenProject) {
                            onOpenProject(matchingProject);
                          } else {
                            onSelectService(service.title);
                          }
                        }}
                        className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/80 hover:bg-[#F5C542] hover:text-neutral-950 text-white text-[11px] font-semibold transition-all backdrop-blur-md flex items-center gap-1.5 border border-white/20 shadow-lg"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Watch Reel</span>
                      </button>
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className={`font-display text-xl font-bold tracking-tight mb-2.5 transition-colors duration-200 group-hover:text-[#F5C542] ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-950'
                    }`}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed mb-5 transition-colors duration-200 ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-2.5">
                    Key Deliverables
                  </span>
                  <ul className="space-y-1.5 mb-5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className={`text-xs flex items-center gap-2 ${
                          theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Link */}
                  <div className="flex items-center justify-between text-xs font-semibold text-[#F5C542] group-hover:translate-x-1 transition-transform">
                    <span>Start this service</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
