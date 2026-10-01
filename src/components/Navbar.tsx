import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section
      const sections = ['home', 'about', 'work', 'services', 'showreel', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Portfolio', href: '#work', id: 'work' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#contact') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onOpenContact();
      }
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-[#09090b]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20'
            : 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-black/[0.08] shadow-sm shadow-black/5'
          : theme === 'dark'
          ? 'bg-transparent border-b border-transparent'
          : 'bg-[#FAF9F6]/80 md:bg-transparent border-b border-black/[0.04] md:border-transparent backdrop-blur-sm md:backdrop-blur-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Geometric Logo & Brand Wordmark (Exact match to reference image) */}
          <a
            href="#home"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542] rounded-md p-1"
          >
            {/* Geometric stylized Z logo mark - Bold, thick, proper Z */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(245,197,66,0.45)]"
              >
                {/* Thick, powerful, proper geometric Z */}
                <path
                  d="M 5 5 H 35 V 14 L 18 26 H 35 V 35 H 5 V 26 L 22 14 H 5 Z"
                  fill="#F5C542"
                />
              </svg>
            </div>

            <div className="flex flex-col leading-none">
              <span className={`font-display font-extrabold text-base sm:text-lg tracking-wider ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                ZENTRA
              </span>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#F5C542]">
                CREATOR
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Clean text with golden accent underline) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative py-1.5 transition-colors duration-200 group ${
                    isActive
                      ? 'text-[#F5C542] font-bold'
                      : theme === 'dark'
                      ? 'text-neutral-300 hover:text-white'
                      : 'text-neutral-900 font-semibold hover:text-black'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5C542] rounded-full" />
                  )}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5C542] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Action Controls (Theme Toggle + "Let's Create ->" button with gold border) */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <button
              type="button"
              onClick={onOpenContact}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 border border-[#F5C542] active:scale-[0.98] shadow-sm hover:shadow-[#F5C542]/20 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542] ${
                theme === 'dark'
                  ? 'bg-black/60 text-white hover:bg-[#F5C542] hover:text-neutral-950'
                  : 'bg-white text-neutral-900 hover:bg-[#F5C542] hover:text-neutral-950'
              }`}
            >
              <span>Let's Create</span>
              <ArrowUpRight className="w-4 h-4 text-[#F5C542] group-hover:text-inherit" />
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-white/80 hover:text-white bg-white/5'
                  : 'text-neutral-800 hover:text-black bg-neutral-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 pt-4 pb-8 border-b transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-[#0e0e11] border-white/10 text-white'
              : 'bg-white border-neutral-200 text-neutral-900'
          }`}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-base py-2 transition-colors flex items-center justify-between ${
                  activeSection === link.id
                    ? 'text-[#F5C542] font-bold'
                    : theme === 'dark'
                    ? 'text-neutral-300 hover:text-white font-medium'
                    : 'text-neutral-900 hover:text-black font-semibold'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
                )}
              </a>
            ))}

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-[#F5C542] text-neutral-950 hover:bg-[#e5b634] transition-all shadow-md shadow-[#F5C542]/20"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
