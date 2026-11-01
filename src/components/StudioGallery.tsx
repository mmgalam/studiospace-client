"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCamera,
  FiMaximize2,
  FiX,
} from "react-icons/fi";

const fallbackImage =
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600";

export default function StudioGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // নিরাপদ ইমেজ অ্যারে ফিল্টারিং
  const validImages =
    Array.isArray(images) && images.length > 0 ? images : [fallbackImage];

  const handleThumbnailClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  return (
    <div className="relative space-y-4">
      {/* 1. Main Showcase Carousel */}
      <div className="group relative w-full h-80 sm:h-115 lg:h-130 overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-slate-900 shadow-xl">
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          keyboard={{ enabled: true }}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full w-full"
        >
          {validImages.map((src, i) => (
            <SwiperSlide key={`${src}-${i}`}>
              <div className="relative h-full w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${title} view ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage;
                  }}
                />
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Floating Controls: Photo Counter & Fullscreen Trigger */}
        <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between pointer-events-none">
          <span className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide text-white bg-slate-950/70 border border-white/15 backdrop-blur-md shadow-md">
            <FiCamera className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              {activeIndex + 1} / {validImages.length} Photos
            </span>
          </span>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Expand image to fullscreen"
            className="pointer-events-auto w-9 h-9 rounded-full bg-slate-950/70 border border-white/15 backdrop-blur-md text-white flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-200 shadow-md cursor-pointer"
          >
            <FiMaximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Custom Navigation Arrows (Only shown when multiple images exist) */}
        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-950/90 border border-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-950/90 border border-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* 2. Interactive Thumbnail Bar */}
      {validImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 select-none no-scrollbar">
          {validImages.map((src, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={`thumb-${idx}`}
                type="button"
                onClick={() => handleThumbnailClick(idx)}
                aria-label={`Jump to photo ${idx + 1}`}
                className={`relative h-18 w-24 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-indigo-600 ring-2 ring-indigo-500/30 scale-105 shadow-md"
                    : "border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage;
                  }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close fullscreen view"
            className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Large Image Preview Container */}
          <div
            className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={validImages[activeIndex]}
              alt={`${title} enlarged`}
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {/* Lightbox Nav Buttons */}
            {validImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    const prev =
                      (activeIndex - 1 + validImages.length) %
                      validImages.length;
                    setActiveIndex(prev);
                    swiperInstance?.slideTo(prev);
                  }}
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 backdrop-blur-md cursor-pointer transition"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next = (activeIndex + 1) % validImages.length;
                    setActiveIndex(next);
                    swiperInstance?.slideTo(next);
                  }}
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 backdrop-blur-md cursor-pointer transition"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}