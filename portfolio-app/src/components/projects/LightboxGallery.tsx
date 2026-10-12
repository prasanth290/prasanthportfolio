"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Lock,
  Play,
  Pause,
  Monitor,
  Sparkles,
} from "lucide-react";

interface LightboxGalleryProps {
  images: string[];
  title: string;
}

export function LightboxGallery({ images, title }: LightboxGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const totalImages = images?.length || 0;

  // Safe navigation helpers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    setZoomLevel(1);
  }, [totalImages]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    setZoomLevel(1);
  }, [totalImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") {
        setIsModalOpen(false);
        setZoomLevel(1);
        setIsPlaying(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((z) => Math.min(z + 0.5, 2.5));
      } else if (e.key === "-") {
        setZoomLevel((z) => Math.max(z - 0.5, 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, handlePrev, handleNext]);

  // Slideshow auto-play effect
  useEffect(() => {
    if (!isPlaying || !isModalOpen) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, isModalOpen, handleNext]);

  // Mobile touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50) {
      handleNext();
    } else if (diffX < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (!images || images.length === 0) return null;

  const activeImage = images[currentIndex] || images[0];

  return (
    <div className="space-y-6">
      {/* Pro Level App/Browser Frame Showcase */}
      <div className="rounded-3xl overflow-hidden glass-card border border-slate-700/60 bg-gradient-to-b from-slate-900 via-slate-950 to-[#070b13] shadow-2xl relative group">
        {/* Sleek MacOS / Pro IDE Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
          {/* Traffic light window controls */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/30" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/30" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/30" />
          </div>

          {/* Central Security & URL Mockup Pill */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-mono shadow-inner">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-500">https://</span>
            <span className="text-slate-200 font-semibold">{title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 26)}</span>
            <span className="text-emerald-400 font-bold">.live-system</span>
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-3">
            {totalImages > 1 && (
              <span className="text-xs font-mono text-slate-400 px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800">
                {currentIndex + 1} / {totalImages}
              </span>
            )}
            <button
              onClick={() => {
                setIsModalOpen(true);
                setZoomLevel(1);
              }}
              className="px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Expand to Fullscreen HD Inspector"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Inspect HD</span>
            </button>
          </div>
        </div>

        {/* Main Stage Image Preview */}
        <div
          className="relative aspect-[16/9] w-full overflow-hidden cursor-pointer select-none bg-slate-950"
          onClick={() => {
            setIsModalOpen(true);
            setZoomLevel(1);
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={activeImage}
            alt={`${title} Preview Screen ${currentIndex + 1}`}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.015]"
            priority
          />

          {/* Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />

          {/* Interactive Hover Center CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="px-5 py-2.5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 text-white text-xs font-bold flex items-center gap-2.5 shadow-2xl backdrop-blur-md transform group-hover:translate-y-0 translate-y-2 transition-all">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Click To Enlarge & Inspect System UI</span>
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Floating Next/Previous Controls on Preview Stage */}
          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all shadow-xl backdrop-blur-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-slate-200" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all shadow-xl backdrop-blur-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-slate-200" />
              </button>
            </>
          )}

          {/* Bottom Title Bar Over Preview */}
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-slate-300 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-white">{title}</span>
              <span className="text-slate-500 font-mono">• Screen {currentIndex + 1}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md text-[11px] text-slate-400 font-mono">
              <span>HD Production View</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Gallery Strip */}
      {totalImages > 1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold text-slate-300">System Screenshots & Views</span>
            <span>Click thumbnail to switch preview</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3.5">
            {images.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setZoomLevel(1);
                  }}
                  className={`group relative aspect-[16/10] rounded-2xl overflow-hidden border transition-all duration-300 text-left ${
                    isActive
                      ? "border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10 scale-[1.02]"
                      : "border-slate-800/90 hover:border-slate-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${title} screenshot ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 220px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-2 left-2.5 right-2 flex items-center justify-between text-[10px] font-mono">
                    <span className={`px-1.5 py-0.5 rounded ${isActive ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900/90 text-slate-300 border border-slate-800"}`}>
                      #{idx + 1}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Pro Fullscreen Lightbox Modal (Next-Gen UI/UX) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between animate-in fade-in duration-200 select-none"
          onClick={() => {
            setIsModalOpen(false);
            setZoomLevel(1);
            setIsPlaying(false);
          }}
        >
          {/* Top HUD Toolbar */}
          <div
            className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Project title & Slide Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Monitor className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-md">
                  {title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="text-emerald-400 font-semibold">HD Inspector</span>
                  <span>•</span>
                  <span>Screen {currentIndex + 1} of {totalImages}</span>
                </div>
              </div>
            </div>

            {/* Center: Zoom & Slideshow Controls */}
            <div className="hidden md:flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.5, 1))}
                disabled={zoomLevel <= 1}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Reset Zoom (100%)"
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.5, 2.5))}
                disabled={zoomLevel >= 2.5}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-5 bg-slate-800 mx-1" />

              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className={`p-2 rounded-xl transition-colors ${isPlaying ? "bg-emerald-500 text-slate-950" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
                title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>

            {/* Right: Close with keyboard hint */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setZoomLevel(1);
                  setIsPlaying(false);
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 transition-all shadow-lg group"
              >
                <span className="text-xs font-semibold">Close</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
                  ESC
                </span>
                <X className="w-4 h-4 text-slate-300 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </div>

          {/* Central Main Stage with Interactive Navigation */}
          <div
            className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Prev Button */}
            {totalImages > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-13 h-13 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:scale-110 transition-all shadow-2xl backdrop-blur-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-slate-100" />
              </button>
            )}

            {/* High-Resolution Zoomable Image Canvas */}
            <div
              className="relative max-w-6xl w-full h-[65vh] sm:h-[72vh] flex items-center justify-center transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage}
                alt={`${title} fullscreen inspection`}
                fill
                sizes="(max-width: 1536px) 95vw, 1400px"
                className="object-contain rounded-2xl drop-shadow-2xl"
                priority
              />
            </div>

            {/* Next Button */}
            {totalImages > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-13 h-13 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:scale-110 transition-all shadow-2xl backdrop-blur-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-slate-100" />
              </button>
            )}
          </div>

          {/* Bottom Floating Navigation Dock */}
          <div
            className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl z-20 flex flex-col sm:flex-row items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Keyboard Shortcuts Guide */}
            <div className="hidden lg:flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-300">←</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-300">→</kbd>
                Navigate
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-300">+</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-300">-</kbd>
                Zoom
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-300">ESC</kbd>
                Exit
              </span>
            </div>

            {/* Modal Bottom Thumbnail Strip */}
            {totalImages > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setZoomLevel(1);
                    }}
                    className={`relative w-16 sm:w-20 aspect-[16/10] rounded-xl overflow-hidden border transition-all shrink-0 ${
                      idx === currentIndex
                        ? "border-emerald-500 ring-2 ring-emerald-500/50 scale-105"
                        : "border-slate-800 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Current Status Pill */}
            <div className="text-xs font-mono text-slate-400">
              <span className="text-white font-bold">{currentIndex + 1}</span> of{" "}
              <span>{totalImages} Views</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
