"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiArrowRight,
  FiCamera,
  FiVideo,
  FiMic,
  FiShield,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1800",
    badge: "Daylight Lofts & Cyc Walls",
    icon: FiCamera,
    title: "Find the Perfect Space for Your Next Shoot",
    text: "Book verified photo studios and daylight lofts by the hour, with transparent pricing and instant confirmation.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1800",
    badge: "Cinema & Broadcast Stages",
    icon: FiVideo,
    title: "Sound Stages Engineered for Professional Cinema",
    text: "From commercial shoots to music videos, reserve soundproofed stages equipped with lighting grids and green screens.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1800",
    badge: "Podcast & Music Suites",
    icon: FiMic,
    title: "Record, Mix, and Broadcast Without Sound Limits",
    text: "Acoustically tuned podcast lounges and vocal suites equipped with broadcast-grade Shure mics, ready on demand.",
  },
];

const trendingTags = [
  { label: "Photo Studio", query: "Photo Studio" },
  { label: "Sound Stage", query: "Film Stage" },
  { label: "Podcast Room", query: "Podcast Lounge" },
  { label: "Music Suite", query: "Music Suite" },
];

export default function HeroSlider() {
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") || "").trim();
    router.push(
      q ? `/studios?search=${encodeURIComponent(q)}` : "/studios",
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-950">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletActiveClass: "!bg-indigo-500 !w-8 !rounded-full transition-all duration-300",
          bulletClass: "inline-block w-2.5 h-2.5 bg-white/50 rounded-full mx-1 cursor-pointer transition-all duration-300 hover:bg-white",
        }}
        loop
        className="h-[82vh] min-h-160 lg:min-h-175 max-h-215 w-full"
      >
        {slides.map((s) => {
          const BadgeIcon = s.icon;
          return (
            <SwiperSlide key={s.title}>
              <div
                className="relative h-full w-full bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{ backgroundImage: `url(${s.image})` }}
              >
                {/* Multi-layered cinematic gradient overlays */}
                <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/40" />

                {/* Content Container with increased bottom padding (pb-52 sm:pb-60) */}
                <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pt-10 pb-52 sm:pb-60 sm:px-6 lg:px-8">
                  <div className="max-w-3xl space-y-4 sm:space-y-5">
                    {/* Slide Tag Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md shadow-sm">
                      <BadgeIcon className="h-3.5 w-3.5 text-indigo-400" />
                      <span>{s.badge}</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                      {s.title}
                    </h1>

                    {/* Description Paragraph */}
                    <p className="max-w-xl text-xs sm:text-base leading-relaxed text-slate-300">
                      {s.text}
                    </p>

                    {/* CTA Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 sm:pt-2">
                      <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-700 hover:shadow-indigo-600/40 active:scale-95"
                      >
                        <span>Explore Studios</span>
                        <FiArrowRight className="h-4 w-4" />
                      </Link>

                      <Link
                        href="/add-studio"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:border-white/30 active:scale-95"
                      >
                        <span>Host Your Space</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Floating Glassmorphic Search & Quick Filter Capsule */}
      <div className="absolute inset-x-4 bottom-6 sm:bottom-8 z-20 mx-auto max-w-3xl">
        <div className="rounded-3xl border border-white/20 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/85 p-3 sm:p-4 shadow-2xl backdrop-blur-xl">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                name="q"
                type="text"
                placeholder="Search photo studios, sound stages, podcast rooms..."
                className="w-full rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/50 py-2.5 sm:py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/25 transition-all duration-200 hover:bg-indigo-700 active:scale-95 cursor-pointer shrink-0"
            >
              <span>Search Studios</span>
              <FiArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Trending Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-200/50 dark:border-slate-800/60 pt-2.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300 pr-1">
              Trending:
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() =>
                  router.push(`/studios?category=${encodeURIComponent(tag.query)}`)
                }
                className="rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-800/50 px-2.5 py-1 font-medium transition-colors hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mini Trust Signals */}
        <div className="mt-2.5 hidden sm:flex items-center justify-center gap-6 text-[11px] font-semibold text-slate-300 drop-shadow">
          <span className="inline-flex items-center gap-1.5">
            <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
            Verified Production Stages
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <FiClock className="h-3.5 w-3.5 text-indigo-400" />
            Zero Double-Booking Lock
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <FiShield className="h-3.5 w-3.5 text-purple-400" />
            Escrow Security Deposits
          </span>
        </div>
      </div>
    </section>
  );
}