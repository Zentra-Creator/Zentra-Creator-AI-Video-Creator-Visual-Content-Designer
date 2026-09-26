import React from 'react';
import { ProjectCategory } from '../types/portfolio';
import { useTheme } from '../context/ThemeContext';

interface PortfolioFilterProps {
  categories: ProjectCategory[];
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  projectCounts: Record<ProjectCategory, number>;
}

export const PortfolioFilter: React.FC<PortfolioFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  projectCounts,
}) => {
  const { theme } = useTheme();

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-none">
      <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const count = projectCounts[cat] || 0;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542] ${
                isActive
                  ? 'bg-[#F5C542] text-neutral-950 shadow-md shadow-[#F5C542]/20 font-bold scale-[1.02]'
                  : theme === 'dark'
                  ? 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-white/5'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 border border-black/5'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-neutral-950/20 text-neutral-950'
                    : theme === 'dark'
                    ? 'bg-white/10 text-neutral-400'
                    : 'bg-black/10 text-neutral-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
