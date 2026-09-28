import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { Project } from '../types/portfolio';
import { getOptimizedVideoUrl, getVideoPosterUrl } from '../utils/videoUtils';

interface VideoLightboxProps {
  project: Project | null;
  onClose: () => void;
  onInquire?: (projectTitle: string) => void;
}

export const VideoLightbox: React.FC<VideoLightboxProps> = ({ project, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackTime, setPlaybackTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCenterIcon, setShowCenterIcon] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hideControlsTimeoutRef = useRef<number | null>(null);
  const iconTimeoutRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Close on Escape key and track browser fullscreen changes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        } else {
          onClose();
        }
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onClose, isPlaying]);

  // Handle auto-hide controls after idle
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      window.clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (hideControlsTimeoutRef.current) {
        window.clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setIsPlaying(true);
      setIsMuted(false);
      setProgress(0);
      resetControlsTimeout();
    } else {
      document.body.style.overflow = '';
      setIsPlaying(false);
    }
    return () => {
      document.body.style.overflow = '';
      if (hideControlsTimeoutRef.current) clearTimeout(hideControlsTimeoutRef.current);
      if (iconTimeoutRef.current) clearTimeout(iconTimeoutRef.current);
    };
  }, [project]);

  // Sync real video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // If browser restricts unmuted autoplay, mute and retry
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Fallback timer simulation for image assets with no native video URL
  useEffect(() => {
    if (isPlaying && !project?.videoUrl) {
      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1.25;
        });
      }, 500);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, project?.videoUrl]);

  useEffect(() => {
    if (!project?.videoUrl) {
      const totalSeconds = 40;
      const currentSecs = Math.floor((progress / 100) * totalSeconds);
      const mins = Math.floor(currentSecs / 60);
      const secs = currentSecs % 60;
      setPlaybackTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
      setDuration('0:40');
    }
  }, [progress, project?.videoUrl]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    setShowCenterIcon(true);
    if (iconTimeoutRef.current) clearTimeout(iconTimeoutRef.current);
    iconTimeoutRef.current = window.setTimeout(() => {
      setShowCenterIcon(false);
    }, 600);
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onClick={resetControlsTimeout}
      className="fixed inset-0 z-[100] w-screen h-screen bg-black flex items-center justify-center overflow-hidden select-none animate-fadeIn cursor-default"
    >
      {/* Video / Visual Full Screen Container */}
      <div
        className="relative w-full h-full flex items-center justify-center bg-black cursor-pointer"
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
      >
        {project.videoUrl ? (
          <video
            ref={videoRef}
            src={getOptimizedVideoUrl(project.videoUrl, 1280)}
            poster={getVideoPosterUrl(project.videoUrl, 1280)}
            autoPlay
            loop
            playsInline
            preload="auto"
            muted={isMuted}
            onLoadedMetadata={() => {
              if (videoRef.current && videoRef.current.duration) {
                const total = Math.floor(videoRef.current.duration);
                const m = Math.floor(total / 60);
                const s = total % 60;
                setDuration(`${m}:${s < 10 ? '0' : ''}${s}`);
              }
            }}
            onTimeUpdate={() => {
              if (videoRef.current && videoRef.current.duration) {
                const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
                setProgress(pct);
                const cur = Math.floor(videoRef.current.currentTime);
                const m = Math.floor(cur / 60);
                const s = cur % 60;
                setPlaybackTime(`${m}:${s < 10 ? '0' : ''}${s}`);
              }
            }}
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={project.thumbnail}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        )}

        {/* Center Flash Play/Pause feedback icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            showCenterIcon ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#F5C542] shadow-2xl shadow-black/80">
            {isPlaying ? (
              <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-current ml-1" />
            ) : (
              <Pause className="w-10 h-10 sm:w-12 sm:h-12 fill-current" />
            )}
          </div>
        </div>
      </div>

      {/* Floating Close Button Top-Right (No descriptions, pure video player) */}
      <div
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-50 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (document.fullscreenElement) {
              document.exitFullscreen?.().catch(() => {});
            }
            onClose();
          }}
          aria-label="Close Fullscreen Video"
          className="p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-[#F5C542] backdrop-blur-xl border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542]"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Floating Control Bar (Auto-fades on idle) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 sm:pb-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-3 z-40 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Timeline Scrubber */}
        <div
          className="relative w-full h-2 bg-white/25 hover:h-2.5 rounded-full overflow-visible cursor-pointer transition-all group/scrubber"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
            setProgress(newProgress);
            if (videoRef.current && videoRef.current.duration) {
              videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
            }
          }}
        >
          <div
            className="h-full bg-[#F5C542] rounded-full transition-all duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#F5C542] shadow-lg shadow-black group-hover/scrubber:scale-125 transition-transform" />
          </div>
        </div>

        {/* Player Controls Row */}
        <div className="flex items-center justify-between text-white text-sm">
          {/* Left: Play/Pause, Mute/Audio, Time */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="p-1.5 rounded-full hover:text-[#F5C542] transition-colors focus:outline-none"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMuted((prev) => !prev)}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="flex items-center gap-2 p-1.5 rounded-full hover:text-[#F5C542] transition-colors focus:outline-none"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-neutral-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-[#F5C542]" />
              )}
              <span className="text-xs font-medium hidden sm:inline text-neutral-300">
                {isMuted ? 'Unmute' : 'Mute'}
              </span>
            </button>

            <span className="font-mono text-xs sm:text-sm text-neutral-300 tracking-wider">
              {playbackTime} / {duration || project.videoDuration || '0:40'}
            </span>
          </div>

          {/* Right: Fullscreen Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              className="p-2 rounded-full hover:text-[#F5C542] transition-colors focus:outline-none"
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
