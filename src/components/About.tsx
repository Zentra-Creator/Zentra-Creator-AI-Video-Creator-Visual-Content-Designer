import React, { useState } from 'react';
import { CREATOR_ASSETS } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface AboutProps {
  onOpenContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenContact }) => {
  const { theme } = useTheme();
  const [portraitLoaded, setPortraitLoaded] = useState(false);

  const focusAreas = [
    { title: 'AI Video', subtitle: 'Cinematic Motion' },
    { title: 'Product Ads', subtitle: 'Macro Tactile Detail' },
    { title: 'Creative Visuals', subtitle: 'Art Direction' },
    { title: 'Brand Content', subtitle: 'Social & Digital' },
  ];

  const tools = [
    'Runway Gen-3',
    'Midjourney v6.1',
    'Luma Dream Machine',
    'Kling AI',
    'Topaz Video AI',
    'DaVinci Resolve Studio',
  ];

  return (
    <section id="about" className="py-24 sm:py-32 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait Visual */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            {/* Ambient golden aura behind portrait */}
            <div
              className={`absolute -inset-4 rounded-3xl blur-2xl pointer-events-none ${
                theme === 'dark' ? 'bg-[#F5C542]/10' : 'bg-[#F5C542]/15'
              }`}
            />

            <div
              className={`relative rounded-3xl overflow-hidden border shadow-2xl ${
                theme === 'dark'
                  ? 'bg-neutral-900 border-white/10 shadow-black/80'
                  : 'bg-white border-black/10 shadow-neutral-900/10'
              }`}
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                <img
                  src={CREATOR_ASSETS.creatorPortrait}
                  alt="Oluwatobiloba — AI Video Creator & Visual Content Designer"
                  referrerPolicy="no-referrer"
                  onLoad={() => setPortraitLoaded(true)}
                  className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${
                    portraitLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
              </div>

              {/* Creator signature card overlay at bottom */}
              <div
                className={`p-5 border-t ${
                  theme === 'dark' ? 'bg-[#121216] border-white/10' : 'bg-neutral-50 border-black/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`font-display text-lg font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-950'
                      }`}
                    >
                      Oluwatobiloba
                    </h3>
                    <p className="text-xs text-[#F5C542] font-semibold">
                      Founder & Lead AI Creator, Zentra
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F5C542]" />
                    <span>Commercial Grade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Confident Personal Narrative */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5C542]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Behind The Visuals</span>
            </div>

            <h2
              className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}
            >
              I Turn Ideas Into Visuals.
            </h2>

            <div
              className={`space-y-4 text-base sm:text-lg leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
              }`}
            >
              <p>
                I'm <strong className="font-semibold text-[#F5C542]">Oluwatobiloba</strong>, an AI video
                creator focused on creating realistic, cinematic and attention-grabbing visual content
                for brands.
              </p>

              <p>
                From product advertisements and fashion campaigns to beauty, jewellery and lifestyle
                content, I use AI to turn ideas into visuals that look and feel like real commercial
                productions.
              </p>

              <p className="text-sm sm:text-base text-neutral-400 dark:text-neutral-400">
                Traditional commercial production often locks brands into rigid timelines and
                unforgiving budgets. By combining cutting-edge diffusion synthesis, 3D spatial
                guidance, and professional color grading, I deliver the high-caliber aesthetics
                of a major studio at the speed of modern digital commerce.
              </p>
            </div>

            {/* Core Statistics & Focus Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              {focusAreas.map((stat) => (
                <div key={stat.title} className="flex flex-col">
                  <span className="font-display font-bold text-lg sm:text-xl text-[#F5C542]">
                    {stat.title}
                  </span>
                  <span
                    className={`text-xs mt-0.5 ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {stat.subtitle}
                  </span>
                </div>
              ))}
            </div>

            {/* Creative Toolkit */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-3">
                Core Production Pipeline
              </span>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t}
                    className={`text-xs px-3 py-1 rounded-full border ${
                      theme === 'dark'
                        ? 'bg-neutral-900 border-white/10 text-neutral-300'
                        : 'bg-neutral-100 border-black/10 text-neutral-700'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-[#F5C542] text-neutral-950 hover:bg-[#e5b634] active:scale-95 transition-all shadow-md shadow-[#F5C542]/20"
              >
                <span>Let's Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
