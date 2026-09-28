import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to determine the device viewport default theme:
// - Dark theme default on desktop and tablet (width >= 768px or tablet user agent)
// - Light (white) theme default on mobile alone (width < 768px)
const getDefaultThemeByDevice = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  
  // Mobile viewport threshold: < 768px (standard Tailwind md: breakpoint separating mobile from tablet/desktop)
  const isMobile = window.innerWidth < 768;
  return isMobile ? 'light' : 'dark';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('zentra-theme') as Theme | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      return getDefaultThemeByDevice();
    }
    return 'dark';
  });

  // Track viewport changes if user hasn't explicitly set a theme preference yet
  useEffect(() => {
    const handleResize = () => {
      const savedTheme = localStorage.getItem('zentra-theme');
      if (!savedTheme) {
        setThemeState(getDefaultThemeByDevice());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('zentra-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
