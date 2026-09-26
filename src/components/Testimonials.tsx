import React from 'react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#F5C542] mb-3">
            <span>Client Feedback & Partnerships</span>
          </div>

          <h2
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}
          >
            What Clients Say
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg transition-colors duration-200 ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            Trusted by direct-to-consumer innovators, fashion houses, and digital agency partners.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-neutral-900/60 border-white/[0.08] hover:border-[#F5C542]/40 shadow-lg shadow-black/20'
                  : 'bg-white border-black/[0.08] hover:border-[#F5C542]/60 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <Quote className="w-8 h-8 text-[#F5C542] mb-6 opacity-80" />

                {/* Testimonial Quote */}
                <p
                  className={`text-base sm:text-lg italic font-medium leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
                  }`}
                >
                  "{t.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`font-display text-sm font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-950'
                      }`}
                    >
                      {t.role}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {t.company}
                    </p>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#F5C542]/10 border border-[#F5C542]/20 text-[#F5C542]">
                    {t.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
