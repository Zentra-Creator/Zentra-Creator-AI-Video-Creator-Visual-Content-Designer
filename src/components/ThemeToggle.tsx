import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542] ${
        theme === 'dark'
          ? 'bg-[#18181B] border-white/10 text-white/80 hover:text-[#F5C542] hover:border-[#F5C542]/40'
          : 'bg-[#F4F4F5] border-black/10 text-neutral-800 hover:text-black hover:border-[#F5C542]'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`w-4 h-4 transition-all duration-300 absolute ${
            theme === 'dark'
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100 text-amber-500'
          }`}
        />
        <Moon
          className={`w-4 h-4 transition-all duration-300 absolute ${
            theme === 'dark'
              ? 'rotate-0 scale-100 opacity-100 text-[#F5C542]'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
};
