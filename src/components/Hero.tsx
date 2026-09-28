import React, { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CREATOR_ASSETS } from '../data/portfolioData';
import { getOptimizedVideoUrl, getVideoPosterUrl } from '../utils/videoUtils';

interface HeroProps {
  onPlayFeaturedVideo: (projectId?: string) => void;
  onOpenContact: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPlayFeaturedVideo,
  onOpenContact,
  onSelectCategory,
}) => {
  const { theme } = useTheme();
  const [bgLoaded, setBgLoaded] = useState(false);

  const handleCategoryClick = (categoryName: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    {
      name: 'Product Ads',
      sub: 'Showcase. Sell.',
      filter: 'Product',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#F5C542" strokeWidth="1.8" className="w-5 h-5">
          <path d="M12 2L14.2 8.8L21 11L14.2 13.2L12 20L9.8 13.2L3 11L9.8 8.8L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18" cy="5" r="1" fill="#F5C542" />
          <circle cx="5" cy="18" r="1" fill="#F5C542" />
        </svg>
      ),
    },
    {
      name: 'Fashion',
      sub: 'Style. Inspire.',
      filter: 'Fashion',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#F5C542" strokeWidth="1.8" className="w-5 h-5">
          <path d="M12 7a2 2 0 1 0-2-2" strokeLinecap="round" />
          <path d="M12 7l8.5 7.5a1.5 1.5 0 0 1-.9 2.5H4.4a1.5 1.5 0 0 1-.9-2.5L12 7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'Beauty',
      sub: 'Glow. Connect.',
      filter: 'Beauty',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#F5C542" strokeWidth="1.8" className="w-5 h-5">
          <path d="M12 4c-1.5 3-4 6-4 9a4 4 0 0 0 8 0c0-3-2.5-6-4-9z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 11c-2.5 1.5-4 4-4 6 0 2 2 3 5 2.5" strokeLinecap="round" />
          <path d="M17 11c2.5 1.5 4 4 4 6 0 2-2 3-5 2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Jewellery',
      sub: 'Luxury. Desire.',
      filter: 'Jewellery',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#F5C542" strokeWidth="1.8" className="w-5 h-5">
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 9h20" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 3l-2 6 4 12 4-12-2-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: '& More',
      sub: 'Any Brand. Any Niche.',
      filter: 'All',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#F5C542" strokeWidth="1.8" className="w-5 h-5">
          <path d="M3 9l9-6 9 6v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 9h18" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="home"
      className={`relative min-h-[96vh] pt-24 pb-12 lg:pt-28 lg:pb-16 flex flex-col justify-center overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black md:bg-[#070709]' : 'bg-[#FAF9F6] md:bg-[#FAF9F6]'
      }`}
    >
      {/* ================= FULL-BLEED CINEMATIC SCENE BACKGROUND (Hidden on mobile for clean background) ================= */}
      <div className="hidden md:block absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* The Right Cinematic Image (Model + warm studio atmosphere) */}
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[68%] xl:w-[64%] h-full">
          <img
            src={CREATOR_ASSETS.heroFullbleed || CREATOR_ASSETS.heroDirector}
            alt="Zentra Cinematic AI Video Set"
            referrerPolicy="no-referrer"
            onLoad={() => setBgLoaded(true)}
            className={`w-full h-full object-cover object-[center_28%] lg:object-center transition-opacity duration-1000 ${
              bgLoaded ? (theme === 'dark' ? 'opacity-95' : 'opacity-85') : 'opacity-0'
            }`}
          />

          {/* Left seamless gradient blend into text area */}
          <div
            className={`absolute inset-y-0 left-0 w-full sm:w-[55%] lg:w-[48%] ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-[#070709] via-[#070709]/80 to-transparent'
                : 'bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/90 to-transparent'
            }`}
          />

          {/* Top subtle scrim for header legibility */}
          <div
            className={`absolute inset-x-0 top-0 h-32 ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-[#070709] to-transparent'
                : 'bg-gradient-to-b from-[#FAF9F6] to-transparent'
            }`}
          />

          {/* Bottom scrim to blend seamlessly with subsequent sections */}
          <div
            className={`absolute inset-x-0 bottom-0 h-36 ${
              theme === 'dark'
                ? 'bg-gradient-to-t from-[#070709] via-[#070709]/75 to-transparent'
                : 'bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/85 to-transparent'
            }`}
          />
        </div>

        {/* Ambient Warm Golden Auras */}
        <div className="absolute top-1/4 right-[25%] w-[450px] h-[450px] rounded-full bg-[#F5C542]/15 blur-[150px]" />
        <div className="absolute bottom-1/4 right-[10%] w-[350px] h-[350px] rounded-full bg-[#F5C542]/10 blur-[130px]" />
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[78vh]">
          
          {/* ================= LEFT COLUMN: HEADLINE, COPY, CTA, NICHES ================= */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start justify-center space-y-6 pt-6 lg:pt-0 z-30">
            
            {/* Tagline Kicker */}
            <div
              className={`text-xs sm:text-[13px] font-bold tracking-[0.28em] uppercase ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
              }`}
            >
              AI VIDEO CREATOR
            </div>

            {/* Main Headline */}
            <h1
              className={`font-display text-4xl sm:text-5xl md:text-6xl xl:text-[4.5rem] font-extrabold tracking-tight leading-[1.05] ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}
              style={{ textWrap: 'balance' }}
            >
              Ideas Worth<br />
              <span className="text-[#F5C542]">Watching</span>
            </h1>

            {/* Supporting Copy */}
            <p
              className={`text-sm sm:text-base md:text-[17px] max-w-lg leading-relaxed font-normal ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
              }`}
            >
              I create cinematic AI ads for products and brands that grab attention, build trust and
              drive real results.
            </p>

            {/* Primary Action Button: "Get a Custom Video ->" */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold bg-[#F5C542] text-neutral-950 hover:bg-[#e5b634] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-[#F5C542]/25 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]"
              >
                <span>Get a Custom Video</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Categories / Niche Strip (Exact 5 columns matching reference) */}
            <div
              className={`w-full pt-8 sm:pt-10 border-t ${
                theme === 'dark' ? 'border-neutral-800/80' : 'border-neutral-300'
              }`}
            >
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-2">
                {categories.map((cat, idx) => (
                  <div
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.filter)}
                    className="flex flex-col items-start cursor-pointer group py-1 pr-2 relative transition-all"
                  >
                    {/* Golden Icon */}
                    <div className="mb-2 text-[#F5C542] transition-transform group-hover:scale-110">
                      {cat.icon}
                    </div>

                    {/* Category Title */}
                    <div
                      className={`font-display text-xs sm:text-[13px] font-bold tracking-tight transition-colors group-hover:text-[#F5C542] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-950'
                      }`}
                    >
                      {cat.name}
                    </div>

                    {/* Tagline */}
                    <div
                      className={`text-[10px] sm:text-[11px] mt-0.5 whitespace-nowrap font-medium ${
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                      }`}
                    >
                      {cat.sub}
                    </div>

                    {/* Thin vertical separator */}
                    {idx < categories.length - 1 && (
                      <div
                        className={`hidden sm:block absolute right-0 top-1 bottom-1 w-px ${
                          theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-300'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE FLOATING VIDEO TILES & CAMERA ================= */}
          <div className="lg:col-span-7 xl:col-span-7 relative h-[440px] sm:h-[540px] lg:h-[620px] w-full select-none z-20">
            
            {/* ================= FLOATING CARD 1: Artisan Coffee Video Commercial ================= */}
            <div
              onClick={() => onPlayFeaturedVideo('artisan-coffee-ad')}
              style={{ perspective: '800px' }}
              className="absolute top-[3%] left-[12%] sm:left-[16%] md:left-[18%] w-[130px] sm:w-[165px] md:w-[185px] z-30 transition-all duration-300 transform -rotate-3 hover:-rotate-1 hover:scale-105 group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden p-[1.5px] bg-gradient-to-br from-[#F5C542] via-[#F5C542]/60 to-transparent shadow-[0_0_25px_rgba(245,197,66,0.35)]">
                <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden bg-neutral-900">
                  <video
                    src={getOptimizedVideoUrl("https://res.cloudinary.com/ird6se3z/video/upload/v1790335046/COFFEE.mp4", 480)}
                    poster={getVideoPosterUrl("https://res.cloudinary.com/ird6se3z/video/upload/v1790335046/COFFEE.mp4", 480)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors pointer-events-none" />

                  {/* Play Button */}
                  <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#F5C542] group-hover:text-black transition-colors pointer-events-none">
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                  </div>

                  {/* 0:10 Pill */}
                  <span className="absolute bottom-2 right-2 text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-white border border-white/10 pointer-events-none">
                    0:10
                  </span>
                </div>
              </div>
            </div>

            {/* ================= FLOATING CARD 2: Fashion Editorial Commercial ================= */}
            <div
              onClick={() => onPlayFeaturedVideo('lumiere-fashion')}
              className="absolute top-[44%] left-[2%] sm:left-[6%] md:left-[10%] w-[135px] sm:w-[170px] md:w-[195px] z-30 transition-all duration-300 transform -rotate-2 hover:rotate-0 hover:scale-105 group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden p-[1.5px] bg-gradient-to-br from-[#F5C542] via-[#F5C542]/60 to-transparent shadow-[0_0_25px_rgba(245,197,66,0.35)]">
                <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden bg-neutral-900">
                  <video
                    src={getOptimizedVideoUrl("https://res.cloudinary.com/ird6se3z/video/upload/v1790336201/fashionn.mp4", 480)}
                    poster={getVideoPosterUrl("https://res.cloudinary.com/ird6se3z/video/upload/v1790336201/fashionn.mp4", 480)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors pointer-events-none" />

                  {/* Play Button */}
                  <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#F5C542] group-hover:text-black transition-colors pointer-events-none">
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                  </div>

                  {/* 0:10 Pill */}
                  <span className="absolute bottom-2 right-2 text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-white border border-white/10 pointer-events-none">
                    0:10
                  </span>
                </div>
              </div>
            </div>

            {/* ================= FLOATING CARD 3: Luxury Jewellery Commercial ================= */}
            <div
              onClick={() => onPlayFeaturedVideo('golden-hour-jewellery')}
              className="absolute top-[6%] right-[2%] sm:right-[4%] w-[135px] sm:w-[170px] md:w-[195px] z-30 transition-all duration-300 transform rotate-3 hover:rotate-1 hover:scale-105 group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden p-[1.5px] bg-gradient-to-br from-[#F5C542] via-[#F5C542]/60 to-transparent shadow-[0_0_25px_rgba(245,197,66,0.35)]">
                <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden bg-neutral-900">
                  <video
                    src={getOptimizedVideoUrl("https://res.cloudinary.com/ird6se3z/video/upload/v1790336116/JEWELLERY.mp4", 480)}
                    poster={getVideoPosterUrl("https://res.cloudinary.com/ird6se3z/video/upload/v1790336116/JEWELLERY.mp4", 480)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors pointer-events-none" />

                  {/* Play Button */}
                  <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#F5C542] group-hover:text-black transition-colors pointer-events-none">
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                  </div>

                  {/* 0:10 Pill */}
                  <span className="absolute bottom-2 right-2 text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-white border border-white/10 pointer-events-none">
                    0:10
                  </span>
                </div>
              </div>
            </div>

            {/* ================= FLOATING CARD 4: Kinetic Movement Commercial ================= */}
            <div
              onClick={() => onPlayFeaturedVideo('kinetic-lifestyle')}
              className="absolute top-[37%] right-[0%] sm:right-[1%] w-[135px] sm:w-[170px] md:w-[195px] z-30 transition-all duration-300 transform -rotate-1 hover:rotate-1 hover:scale-105 group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden p-[1.5px] bg-gradient-to-br from-[#F5C542] via-[#F5C542]/60 to-transparent shadow-[0_0_25px_rgba(245,197,66,0.35)]">
                <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden bg-neutral-900">
                  <video
                    src={getOptimizedVideoUrl("https://res.cloudinary.com/ird6se3z/video/upload/v1790336839/202609110555.mp4", 480)}
                    poster={getVideoPosterUrl("https://res.cloudinary.com/ird6se3z/video/upload/v1790336839/202609110555.mp4", 480)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors pointer-events-none" />

                  {/* Play Button */}
                  <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#F5C542] group-hover:text-black transition-colors pointer-events-none">
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                  </div>

                  {/* 0:10 Pill */}
                  <span className="absolute bottom-2 right-2 text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-white border border-white/10 pointer-events-none">
                    0:10
                  </span>
                </div>
              </div>
            </div>

            {/* ================= FLOATING CARD 5: Luxury Resort Video Commercial ================= */}
            <div
              onClick={() => onPlayFeaturedVideo('azure-resort-film')}
              className="absolute top-[67%] right-[1%] sm:right-[3%] w-[135px] sm:w-[170px] md:w-[195px] z-30 transition-all duration-300 transform rotate-2 hover:rotate-0 hover:scale-105 group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden p-[1.5px] bg-gradient-to-br from-[#F5C542] via-[#F5C542]/60 to-transparent shadow-[0_0_25px_rgba(245,197,66,0.35)]">
                <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden bg-neutral-900">
                  <video
                    src={getOptimizedVideoUrl("https://res.cloudinary.com/ird6se3z/video/upload/v1790337452/202609121334.mp4", 480)}
                    poster={getVideoPosterUrl("https://res.cloudinary.com/ird6se3z/video/upload/v1790337452/202609121334.mp4", 480)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors pointer-events-none" />

                  {/* Play Button */}
                  <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#F5C542] group-hover:text-black transition-colors pointer-events-none">
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                  </div>

                  {/* 0:10 Pill */}
                  <span className="absolute bottom-2 right-2 text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-white border border-white/10 pointer-events-none">
                    0:10
                  </span>
                </div>
              </div>
            </div>

            {/* ================= FOREGROUND CINEMA CAMERA & ON-SET MONITOR ================= */}
            <div
              onClick={() => onPlayFeaturedVideo('artisan-coffee-ad')}
              className="absolute bottom-[2%] left-[28%] sm:left-[32%] md:left-[36%] -translate-x-1/2 w-[180px] sm:w-[240px] md:w-[280px] z-40 select-none cursor-pointer transition-transform duration-300 hover:scale-105 group"
            >
              <div className="relative p-2 sm:p-2.5 rounded-2xl bg-neutral-950 border-2 border-neutral-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                
                {/* Screen Housing */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-neutral-800">
                  {/* Viewfinder live stream of model */}
                  <img
                    src={CREATOR_ASSETS.heroDirector || CREATOR_ASSETS.heroFullbleed}
                    alt="Camera Viewfinder Stream"
                    className="w-full h-full object-cover object-[center_35%] filter contrast-125 brightness-95 opacity-85 group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Camera Viewfinder OSD HUD Overlays */}
                  <div className="absolute inset-0 flex flex-col justify-between p-2 text-[8px] sm:text-[9px] font-mono text-white/90 pointer-events-none">
                    
                    {/* Top HUD: REC indicator + Timecode + Format */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-bold text-red-400 tracking-wider">REC</span>
                      </div>
                      <span className="text-neutral-200">00:04:12:18</span>
                      <span className="text-[#F5C542] font-bold">4K 60P</span>
                    </div>

                    {/* Center Focus Reticle */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 border border-white/30 rounded-sm relative">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/25" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/25" />
                      </div>
                    </div>

                    {/* Bottom HUD: Sensor telemetries */}
                    <div className="flex items-center justify-between text-[7px] sm:text-[8px] text-neutral-300">
                      <span>ISO 800</span>
                      <span>1/120</span>
                      <span>WB 5600K</span>
                      <span className="text-emerald-400">BAT 88%</span>
                    </div>

                  </div>
                </div>

                {/* Lower Cinema Monitor Hardware Buttons */}
                <div className="flex items-center justify-between px-2 pt-1.5 text-[7px] text-neutral-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                  </div>
                  <span className="tracking-widest uppercase">ATOMOS 4K MONITOR</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
