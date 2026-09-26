import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ArrowUp, Instagram, Mail, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-[#0a0a0c] border-white/10 text-neutral-400'
          : 'bg-[#F9F9F8] border-black/10 text-neutral-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Brand & Descriptor */}
          <div className="md:col-span-6 space-y-4">
            <span className="font-display font-bold text-2xl tracking-tight block">
              <span className={theme === 'dark' ? 'text-white' : 'text-neutral-950'}>Zentra</span>{' '}
              <span className="text-[#F5C542]">Creator</span>
            </span>

            {/* Credibility descriptor */}
            <p className="text-sm font-semibold tracking-wider uppercase text-[#F5C542]">
              AI Video • Creative Ads • Visual Content
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              Crafting cinematic AI-generated commercial campaigns, product advertisements,
              and fashion visuals that give forward-thinking brands an unfair advantage.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-[#F5C542] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-[#F5C542] transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F5C542] transition-colors">
                  What I Create
                </a>
              </li>
              <li>
                <a href="#showreel" className="hover:text-[#F5C542] transition-colors">
                  Showreel
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#F5C542] transition-colors">
                  About Oluwatobiloba
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#F5C542] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
              Direct Channels
            </span>
            <div className="flex flex-col space-y-2.5 text-xs sm:text-sm">
              <a
                href="https://wa.me/2348126561993"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp (08126561993)</span>
              </a>

              <a
                href="mailto:oluwatobilobaodedoyin@gmail.com"
                className="flex items-center gap-2 hover:text-[#F5C542] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#F5C542] shrink-0" />
                <span>oluwatobilobaodedoyin@gmail.com</span>
              </a>

              <a
                href="https://www.instagram.com/zentra_creator/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#E1306C] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>@zentra_creator</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Row: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-neutral-500">
            © 2026 Zentra Creator. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-400 hover:text-[#F5C542] transition-colors p-1"
          >
            <span>Back to top</span>
            <div className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center">
              <ArrowUp className="w-3 h-3 text-[#F5C542]" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};
