"use client";

import { useState } from "react";
import {
  FiMapPin,
  FiStar,
  FiUsers,
  FiCheck,
  FiShield,
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiMail,
  FiMessageSquare,
} from "react-icons/fi";
import StudioGallery from "./StudioGallery";
import BookingModal from "./BookingModal";
import type { Studio } from "@/lib/types";

const fallbackExtraImages = [
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
];

export default function StudioDetails({
  studio,
}: {
  studio: Studio & { image?: string; images?: string[] };
}) {
  const [open, setOpen] = useState(false);

  // Normalize images array to support single image string or array from database
  const primaryImage =
    Array.isArray(studio.images) && studio.images.length > 0
      ? studio.images[0]
      : studio.image ||
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200";

  const allImages =
    Array.isArray(studio.images) && studio.images.length > 1
      ? studio.images
      : [primaryImage, ...fallbackExtraImages];

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-10">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-212.5 h-80 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Gallery Showcase Component */}
        <StudioGallery images={allImages} title={studio.title} />

        {/* Main Details & Booking Sidebar Layout */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Specifications, Overview, Amenities (Col span: 8) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Specs Card */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                  {studio.category}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <FiStar className="h-3.5 w-3.5 fill-current" />
                  {(studio.rating ?? 5.0).toFixed(1)} Rating
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {studio.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                <span className="flex items-center gap-2">
                  <FiMapPin className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>{studio.location}</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-2">
                  <FiUsers className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span>Up to {studio.maxCapacity} Creators</span>
                </span>
              </div>
            </div>

            {/* Overview Section */}
            <section className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                About This Workspace
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                {studio.overview}
              </p>
            </section>

            {/* Amenities Grid */}
            <section className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  Included Production Amenities
                </h2>
                <span className="text-xs font-semibold text-slate-400">
                  {studio.amenities?.length ?? 0} features
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                {studio.amenities?.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-800/40 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/50">
                      <FiCheck className="w-3.5 h-3.5" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                Verified Reviews
              </h2>

              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <FiMessageSquare className="w-5 h-5" />
                </div>
                <p className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                  No written reviews yet
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Book this creative space and be the first verified filmmaker
                  or photographer to share feedback.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Pricing & Host Card (Col span: 4) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-5">
            {/* Booking Card */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <div>
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                    ${studio.hourlyRate}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 font-sans">
                    {" "}
                    / hour
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Deposit: ${studio.securityDeposit}
                </span>
              </div>

              {/* Booking Highlights */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-indigo-500" />
                    <span>Real-time Calendar</span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <FiClock className="w-4 h-4 text-indigo-500" />
                    <span>Scheduling Lock</span>
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    No Double-Booking
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <FiShield className="w-4 h-4 text-indigo-500" />
                    <span>Damage Coverage</span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    Escrow Protected
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Workspace Now</span>
                <FiArrowRight className="w-4 h-4" />
              </button>

              {/* Host Profile Box */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Verified Workspace Host
                </p>

                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-500 text-white font-bold flex items-center justify-center shadow-md shadow-indigo-600/20 text-sm">
                    {(studio.ownerName || "H").charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                      {studio.ownerName}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <FiMail className="w-3 h-3 text-slate-400" />
                      <span>{studio.ownerEmail}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
                  <FiShield className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>Backed by the StudioSpace Host Guarantee[cite: 1]</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Booking Modal */}
        {open && (
          <BookingModal studio={studio} onClose={() => setOpen(false)} />
        )}
      </div>
    </div>
  );
}
