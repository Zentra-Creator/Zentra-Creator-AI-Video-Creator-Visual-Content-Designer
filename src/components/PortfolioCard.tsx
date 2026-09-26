import React, { useState, useEffect, useRef } from 'react';
import { Play, Eye, Film, Sparkles } from 'lucide-react';
import { Project } from '../types/portfolio';
import { useTheme } from '../context/ThemeContext';

interface PortfolioCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, onOpen }) => {
  const { theme } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Guarantee autoplay on mount and when video source changes
  useEffect(() => {
    if (videoRef.current && project.videoUrl) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [project.videoUrl]);

  // Aspect ratio classes
  const aspectClasses = {
    '16:9': 'aspect-[16/9]',
    '4:5': 'aspect-[4/5]',
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '9:16': 'aspect-[9/16]',
  }[project.aspectRatio] || 'aspect-[16/9]';

  return (
    <div
      onClick={() => onOpen(project)}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1 self-start w-full ${
        theme === 'dark'
          ? 'bg-neutral-900 border border-white/[0.08] hover:border-[#F5C542]/50 shadow-md shadow-black/40 hover:shadow-xl hover:shadow-[#F5C542]/10'
          : 'bg-white border border-black/[0.08] hover:border-[#F5C542]/70 shadow-sm hover:shadow-lg hover:shadow-black/10'
      }`}
    >
      {/* Media container */}
      <div className={`relative w-full overflow-hidden bg-neutral-950 ${aspectClasses}`}>
        {project.videoUrl ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : !imageError ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 text-neutral-400 p-6 text-center">
            <Sparkles className="w-8 h-8 text-[#F5C542] mb-2" />
            <span className="text-xs font-medium">{project.title}</span>
          </div>
        )}

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges (Category & Video indicator) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90">
            {project.category}
          </span>

          {project.isVideo && (
            <span className="flex items-center gap-1.5 text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[#F5C542]">
              <Film className="w-3 h-3" />
              <span>{project.videoDuration || 'AI VIDEO'}</span>
            </span>
          )}
        </div>

        {/* Center Hover Action (Play button for video, Eye for images) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <div className="relative transform scale-90 group-hover:scale-100 transition-transform duration-300">
            {project.isVideo ? (
              <div className="w-14 h-14 rounded-full bg-[#F5C542] text-neutral-950 flex items-center justify-center shadow-lg shadow-[#F5C542]/40 transition-transform hover:scale-110">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#F5C542] text-neutral-950 flex items-center justify-center shadow-lg shadow-[#F5C542]/40 transition-transform hover:scale-110">
                <Eye className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Overlay Title & Metadata inside media container */}
        <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none z-10">
          <h3 className="font-display text-sm sm:text-base font-bold tracking-tight text-white line-clamp-1 group-hover:text-[#F5C542] transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center justify-between text-xs mt-1 text-white/80 font-mono text-[11px]">
            <span>{project.category} · {project.year || '2026'}</span>
            <span className="font-semibold text-xs text-[#F5C542] flex items-center gap-1 group-hover:underline">
              {project.isVideo ? 'Watch Video' : 'View Visual'} →
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Footer (only for non-video projects with description) */}
      {!project.isVideo && project.description && (
        <div className="p-3.5 sm:p-4 flex flex-col justify-between">
          <p
            className={`text-xs sm:text-sm line-clamp-2 leading-relaxed transition-colors duration-200 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            {project.description}
          </p>
        </div>
      )}
    </div>
  );
};
