import React, { useState, useMemo } from 'react';
import { ProjectCategory, Project } from '../types/portfolio';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioFilter } from './PortfolioFilter';
import { PortfolioCard } from './PortfolioCard';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, ChevronDown, ChevronUp, Film, LayoutGrid, Smartphone, Tv } from 'lucide-react';

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

const INITIAL_DISPLAY_LIMIT = 12;

type AspectRatioFilter = 'all' | '9:16' | '16:9' | '4:3';

// Aspect ratio ordering weight to cluster matching ratios together seamlessly
const RATIO_ORDER: Record<string, number> = {
  '9:16': 1,
  '16:9': 2,
  '4:3': 3,
  '4:5': 4,
  '1:1': 5,
};

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  onOpenProject,
  activeCategory: externalCategory,
  onSelectCategory: externalSetCategory,
}) => {
  const { theme } = useTheme();
  const [internalCategory, setInternalCategory] = useState<ProjectCategory>('All');
  const [showAllVideos, setShowAllVideos] = useState<boolean>(false);
  const [activeRatio, setActiveRatio] = useState<AspectRatioFilter>('all');

  const activeCategory = externalCategory ?? internalCategory;
  const setActiveCategory = (category: ProjectCategory) => {
    setShowAllVideos(false);
    if (externalSetCategory) {
      externalSetCategory(category);
    } else {
      setInternalCategory(category);
    }
  };

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

  // Filter projects based on activeCategory, optional format ratio, and sort so identical aspect ratios cluster together
  const filteredProjects = useMemo(() => {
    let result = PORTFOLIO_PROJECTS;

    if (activeCategory === 'AI Video') {
      result = result.filter((p) => p.isVideo);
    } else if (activeCategory === 'AI Images') {
      result = result.filter((p) => !p.isVideo || p.category === 'AI Images');
    } else if (activeCategory !== 'All') {
      result = result.filter(
        (p) => p.category === activeCategory || p.secondaryCategories?.includes(activeCategory)
      );
    }

    if (activeRatio !== 'all') {
      result = result.filter((p) => p.aspectRatio === activeRatio);
    }

    // Cluster items with identical aspect ratios together to eliminate jagged visual imbalance
    return [...result].sort((a, b) => {
      const orderA = RATIO_ORDER[a.aspectRatio] ?? 99;
      const orderB = RATIO_ORDER[b.aspectRatio] ?? 99;
      if (orderA !== orderB) return orderA - orderB;
      // Preserve featured order within the same ratio group
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [activeCategory, activeRatio]);

  // Ratio counts for gallery quick-switches
  const ratioCounts = useMemo(() => {
    const counts = { '9:16': 0, '16:9': 0, '4:3': 0 };
    PORTFOLIO_PROJECTS.forEach((p) => {
      if (p.aspectRatio === '9:16') counts['9:16']++;
      if (p.aspectRatio === '16:9') counts['16:9']++;
      if (p.aspectRatio === '4:3') counts['4:3']++;
    });
    return counts;
  }, []);

  // Displayed projects: limit to maximum 12 items unless "View All Videos" is active
  const displayedProjects = useMemo(() => {
    if (showAllVideos) return filteredProjects;
    return filteredProjects.slice(0, INITIAL_DISPLAY_LIMIT);
  }, [filteredProjects, showAllVideos]);

  const hasMoreThanLimit = filteredProjects.length > INITIAL_DISPLAY_LIMIT;

  // Group displayed projects by aspect ratio for structured editorial presentation
  const verticalProjects = useMemo(
    () => displayedProjects.filter((p) => p.aspectRatio === '9:16'),
    [displayedProjects]
  );
  const widescreenProjects = useMemo(
    () => displayedProjects.filter((p) => p.aspectRatio === '16:9'),
    [displayedProjects]
  );
  const standardProjects = useMemo(
    () => displayedProjects.filter((p) => p.aspectRatio === '4:3' || p.aspectRatio === '1:1' || p.aspectRatio === '4:5'),
    [displayedProjects]
  );

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
              className={`mt-4 text-base sm:text-lg transition-colors duration-200 text-center font-normal ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
              }`}
            >
              A selection of AI-powered visuals created for products, brands and creative campaigns.
            </p>
          </div>

          <div className={`flex items-center justify-center gap-2 text-xs font-mono ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700 font-medium'
          }`}>
            <span>Showing</span>
            <span className="font-bold text-[#F5C542]">{displayedProjects.length}</span>
            <span>of {filteredProjects.length} projects</span>
          </div>
        </div>

        {/* Filter System */}
        <div className="mb-8">
          <PortfolioFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            projectCounts={projectCounts}
          />
        </div>

        {/* Aspect Ratio Format Segmented Control */}
        <div className="flex items-center justify-center mb-10">
          <div
            className={`inline-flex items-center p-1 rounded-full text-xs font-medium border backdrop-blur-md transition-all ${
              theme === 'dark'
                ? 'bg-neutral-900/90 border-white/10 text-neutral-400'
                : 'bg-neutral-100 border-black/10 text-neutral-600'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveRatio('all')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                activeRatio === 'all'
                  ? 'bg-[#F5C542] text-neutral-950 font-bold shadow-sm'
                  : 'hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Formats</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRatio('9:16')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                activeRatio === '9:16'
                  ? 'bg-[#F5C542] text-neutral-950 font-bold shadow-sm'
                  : 'hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 Vertical ({ratioCounts['9:16']})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRatio('16:9')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                activeRatio === '16:9'
                  ? 'bg-[#F5C542] text-neutral-950 font-bold shadow-sm'
                  : 'hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>16:9 Cinema ({ratioCounts['16:9']})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRatio('4:3')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                activeRatio === '4:3'
                  ? 'bg-[#F5C542] text-neutral-950 font-bold shadow-sm'
                  : 'hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span>4:3 Editorial ({ratioCounts['4:3']})</span>
            </button>
          </div>
        </div>

        {/* Responsive Gallery Presentation: Clustered by identical aspect ratios to ensure perfect visual balance */}
        <div className="space-y-12">
          {/* Vertical 9:16 Mobile & Social Commercials Section */}
          {verticalProjects.length > 0 && activeRatio === 'all' && (
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#F5C542]" />
                  <h3 className={`text-sm sm:text-base font-bold font-display uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Vertical Ads & Social Reels (9:16)
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-500">
                  {verticalProjects.length} videos
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
                {verticalProjects.map((project) => (
                  <PortfolioCard
                    key={project.id}
                    project={project}
                    onOpen={onOpenProject}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Widescreen 16:9 Cinematic Broadcast Films Section */}
          {widescreenProjects.length > 0 && activeRatio === 'all' && (
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-[#F5C542]" />
                  <h3 className={`text-sm sm:text-base font-bold font-display uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Cinematic Broadcast Commercials (16:9)
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-500">
                  {widescreenProjects.length} videos
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                {widescreenProjects.map((project) => (
                  <PortfolioCard
                    key={project.id}
                    project={project}
                    onOpen={onOpenProject}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Standard 4:3 Editorial & Product Showcases Section */}
          {standardProjects.length > 0 && activeRatio === 'all' && (
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-[#F5C542]" />
                  <h3 className={`text-sm sm:text-base font-bold font-display uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Editorial & Studio Showcases (4:3)
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-500">
                  {standardProjects.length} videos
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                {standardProjects.map((project) => (
                  <PortfolioCard
                    key={project.id}
                    project={project}
                    onOpen={onOpenProject}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Single format grid when a specific aspect ratio filter is selected */}
          {activeRatio !== 'all' && (
            <div className={`grid gap-6 sm:gap-8 items-start ${
              activeRatio === '9:16'
                ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {displayedProjects.map((project) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  onOpen={onOpenProject}
                />
              ))}
            </div>
          )}
        </div>

        {/* "View All Videos" Button Action */}
        {hasMoreThanLimit && (
          <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setShowAllVideos((prev) => !prev);
                if (showAllVideos) {
                  const el = document.getElementById('work');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg ${
                showAllVideos
                  ? theme === 'dark'
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-white border border-white/15 hover:border-[#F5C542]/50 shadow-black/40'
                    : 'bg-white hover:bg-neutral-50 text-neutral-900 border border-black/15 hover:border-[#F5C542]/70 shadow-black/10'
                  : 'bg-[#F5C542] hover:bg-[#e5b634] text-neutral-950 hover:shadow-[#F5C542]/30 shadow-[#F5C542]/20'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>{showAllVideos ? 'Show Less Videos (12)' : `View All Videos (${filteredProjects.length})`}</span>
              {showAllVideos ? (
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
              {showAllVideos
                ? `Displaying all ${filteredProjects.length} videos in the collection`
                : `Showing top 12 of ${filteredProjects.length} videos`}
            </p>
          </div>
        )}

        {/* Empty state fallback if none match */}
        {filteredProjects.length === 0 && (
          <div
            className={`py-16 text-center rounded-2xl border ${
              theme === 'dark' ? 'bg-neutral-900/50 border-white/10 text-neutral-400' : 'bg-neutral-100 border-black/10 text-neutral-600'
            }`}
          >
            <p className="text-base font-medium">No projects found in this category or format.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setActiveRatio('all');
              }}
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
