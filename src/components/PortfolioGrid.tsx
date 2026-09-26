import React, { useState, useMemo } from 'react';
import { ProjectCategory, Project } from '../types/portfolio';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioFilter } from './PortfolioFilter';
import { PortfolioCard } from './PortfolioCard';
import { useTheme } from '../context/ThemeContext';
import { Sparkles } from 'lucide-react';

interface PortfolioGridProps {
  onOpenProject: (project: Project) => void;
  activeCategory?: ProjectCategory;
  onSelectCategory?: (category: ProjectCategory) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'AI Video',
  'Fashion',
  'Beauty',
  'Jewellery',
  'Product',
  'Lifestyle',
  'AI Images',
];

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  onOpenProject,
  activeCategory: externalCategory,
  onSelectCategory: externalSetCategory,
}) => {
  const { theme } = useTheme();
  const [internalCategory, setInternalCategory] = useState<ProjectCategory>('All');

  const activeCategory = externalCategory ?? internalCategory;
  const setActiveCategory = externalSetCategory ?? setInternalCategory;

  // Calculate project counts for each category
  const projectCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      All: PORTFOLIO_PROJECTS.length,
      'AI Video': 0,
      Fashion: 0,
      Beauty: 0,
      Jewellery: 0,
      Product: 0,
      Lifestyle: 0,
      'AI Images': 0,
    };

    PORTFOLIO_PROJECTS.forEach((p) => {
      if (p.isVideo) counts['AI Video']++;
      if (p.category === 'Fashion' || p.secondaryCategories?.includes('Fashion')) counts['Fashion']++;
      if (p.category === 'Beauty' || p.secondaryCategories?.includes('Beauty')) counts['Beauty']++;
      if (p.category === 'Jewellery' || p.secondaryCategories?.includes('Jewellery')) counts['Jewellery']++;
      if (p.category === 'Product' || p.secondaryCategories?.includes('Product')) counts['Product']++;
      if (p.category === 'Lifestyle' || p.secondaryCategories?.includes('Lifestyle')) counts['Lifestyle']++;
      if (p.category === 'AI Images' || !p.isVideo) counts['AI Images']++;
    });

    return counts;
  }, []);

  // Filter projects based on activeCategory
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PORTFOLIO_PROJECTS;
    if (activeCategory === 'AI Video') return PORTFOLIO_PROJECTS.filter((p) => p.isVideo);
    if (activeCategory === 'AI Images') return PORTFOLIO_PROJECTS.filter((p) => !p.isVideo || p.category === 'AI Images');

    return PORTFOLIO_PROJECTS.filter(
      (p) => p.category === activeCategory || p.secondaryCategories?.includes(activeCategory)
    );
  }, [activeCategory]);

  return (
    <section id="work" className="py-24 sm:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5C542] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Portfolio</span>
            </div>
            
            <h2
              className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors duration-200 text-center ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}
            >
              Selected Work
            </h2>
            
            <p
              className={`mt-4 text-base sm:text-lg transition-colors duration-200 text-center ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
              }`}
            >
              A selection of AI-powered visuals created for products, brands and creative campaigns.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 font-mono">
            <span>Showing</span>
            <span className="font-bold text-[#F5C542]">{filteredProjects.length}</span>
            <span>of {PORTFOLIO_PROJECTS.length} projects</span>
          </div>
        </div>

        {/* Filter System */}
        <div className="mb-10">
          <PortfolioFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            projectCounts={projectCounts}
          />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
              onOpen={onOpenProject}
            />
          ))}
        </div>

        {/* Empty state fallback if none match */}
        {filteredProjects.length === 0 && (
          <div
            className={`py-16 text-center rounded-2xl border ${
              theme === 'dark' ? 'bg-neutral-900/50 border-white/10 text-neutral-400' : 'bg-neutral-100 border-black/10 text-neutral-600'
            }`}
          >
            <p className="text-base font-medium">No projects found in this category.</p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-[#F5C542] text-neutral-950 hover:bg-[#e5b634]"
            >
              Show All Projects
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
