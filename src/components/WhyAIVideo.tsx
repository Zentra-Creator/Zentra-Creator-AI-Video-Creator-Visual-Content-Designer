import React from 'react';
import { Zap, Compass, Layers, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const WhyAIVideo: React.FC = () => {
  const { theme } = useTheme();

  const points = [
    {
      icon: <Zap className="w-6 h-6 text-[#F5C542]" />,
      title: 'Faster Production',
      description: 'Create polished visual concepts without traditional production logistics.',
      detail:
        'Skip months of scouting, crew booking, weather delays, and expensive stage rentals. Go from initial treatment to broadcast-ready assets in days.',
    },
    {
      icon: <Compass className="w-6 h-6 text-[#F5C542]" />,
      title: 'Creative Freedom',
      description: 'Visualize concepts, environments and campaigns that would otherwise be difficult to produce.',
      detail:
        'Zero physical constraints. Impossible camera motions, exotic architectural sets, micro-scale liquid physics, and hyper-stylized worlds become immediate realities.',
    },
    {
      icon: <Layers className="w-6 h-6 text-[#F5C542]" />,
      title: 'Content Variety',
      description: 'Create multiple creative directions and variations for different platforms and campaigns.',
      detail:
        'Test dozens of hooks, colorways, aspect ratios (16:9, 9:16, 4:5, 1:1), and lighting setups tailored for paid ads across Instagram, TikTok, and web.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#F5C542] mb-3">
            <span>The New Era of Commercial Production</span>
          </div>

          <h2
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}
            style={{ textWrap: 'balance' }}
          >
            More Creative Possibilities.{' '}
            <span className="text-[#F5C542]">Less Production Friction.</span>
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg transition-colors duration-200 ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            Why leading brands and high-growth consumer labels are switching from traditional six-figure
            agency shoots to dedicated AI video creators.
          </p>
        </div>

        {/* 3 Main Points Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {points.map((point) => (
            <div
              key={point.title}
              className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-neutral-900/60 border-white/[0.08] hover:border-[#F5C542]/40 shadow-lg shadow-black/20'
                  : 'bg-white border-black/[0.08] hover:border-[#F5C542]/60 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    theme === 'dark' ? 'bg-white/5' : 'bg-neutral-100'
                  }`}
                >
                  {point.icon}
                </div>

                <h3
                  className={`font-display text-xl font-bold tracking-tight mb-3 transition-colors duration-200 ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-950'
                  }`}
                >
                  {point.title}
                </h3>

                <p
                  className={`text-sm font-medium mb-3 text-[#F5C542] leading-snug`}
                >
                  {point.description}
                </p>

                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  }`}
                >
                  {point.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Callout: AI Video vs Traditional Shoots */}
        <div
          className={`rounded-2xl p-6 sm:p-8 border ${
            theme === 'dark'
              ? 'bg-[#121217] border-white/10 text-neutral-300'
              : 'bg-neutral-50 border-black/10 text-neutral-800'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-semibold text-[#F5C542] uppercase tracking-wider block mb-2">
                Production Efficiency
              </span>
              <h4
                className={`font-display text-xl sm:text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-950'
                }`}
              >
                Zero Compromise on Commercial Quality
              </h4>
              <p className="mt-2 text-sm text-neutral-400">
                You get the cinematic polish of multi-camera studio productions without the 6-week
                delays, travel overhead, and rigid single-angle limitations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border ${
                  theme === 'dark' ? 'bg-black/30 border-white/5' : 'bg-white border-black/5'
                }`}
              >
                <div className="text-xs font-semibold text-neutral-400 mb-1">Traditional Shoot</div>
                <div className="text-base font-bold text-red-400 line-through">4–8 Weeks</div>
                <div className="text-xs text-neutral-500 mt-1">Permits, cast, weather risk</div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  theme === 'dark' ? 'bg-[#F5C542]/10 border-[#F5C542]/30' : 'bg-[#F5C542]/15 border-[#F5C542]/40'
                }`}
              >
                <div className="text-xs font-semibold text-[#F5C542] mb-1">With Zentra Creator</div>
                <div className="text-base font-bold text-[#F5C542]">3–7 Days</div>
                <div className="text-xs text-neutral-400 dark:text-neutral-300 mt-1">Multi-format delivered</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
