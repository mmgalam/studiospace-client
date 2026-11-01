"use client";

import Link from "next/link";
import { FiMapPin, FiStar, FiHeart, FiArrowRight } from "react-icons/fi";
import type { Studio } from "@/lib/types";
import { useWishlist } from "./WishlistProvider";

// Data safe typing for both image and images array
type SafeStudio = Studio & {
  image?: string;
  images?: string[];
};

export default function StudioCard({ studio }: { studio: SafeStudio }) {
  const { ids, toggle } = useWishlist();
  const saved = ids.includes(studio._id);

  // Fallback safe image resolution
  const displayImage =
    Array.isArray(studio.images) && studio.images[0]
      ? studio.images[0]
      : studio.image ||
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-500/60 dark:hover:border-indigo-500/60">
      {/* Thumbnail Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayImage}
          alt={studio.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800";
          }}
        />

        {/* Gradient Contrast Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Category Pill */}
        <span className="absolute left-3.5 top-3.5 rounded-full border border-white/10 bg-slate-950/75 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-sm">
          {studio.category}
        </span>

        {/* Rating & Wishlist Controls */}
        <div className="absolute right-3.5 top-3.5 flex items-center gap-2">
          {/* Rating Badge */}
          <div className="flex items-center gap-1 rounded-full border border-slate-200/60 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/90 px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-100 backdrop-blur-md shadow-sm">
            <FiStar className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span>{(studio.rating ?? 5.0).toFixed(1)}</span>
          </div>

          {/* Floating Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggle(studio._id);
            }}
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/60 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 backdrop-blur-md shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <FiHeart
              className={`h-4 w-4 transition-colors ${
                saved
                  ? "fill-rose-500 text-rose-500"
                  : "text-slate-600 dark:text-slate-300 hover:text-rose-500"
              }`}
            />
          </button>
        </div>

        {/* Overlay Location Hint */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-1.5 text-xs font-medium text-white/90 drop-shadow-sm">
          <FiMapPin className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
          <span className="line-clamp-1">{studio.location}</span>
        </div>
      </div>

      {/* Body Details */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between space-y-4">
        <div>
          <h3 className="line-clamp-1 text-base sm:text-lg font-bold text-slate-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {studio.title}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Equipped creative space ready for immediate production booking.
          </p>
        </div>

        {/* Pricing & Call-To-Action Row */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <div>
            <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono leading-none">
              ${studio.hourlyRate}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400 font-sans">
                {" "}
                / hr
              </span>
            </p>
            {studio.securityDeposit ? (
              <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                ${studio.securityDeposit} dep.
              </p>
            ) : null}
          </div>

          <Link
            href={`/studios/${studio._id}`}
            className="group/btn inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-indigo-600/30 active:scale-95"
          >
            <span>View Details</span>
            <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}