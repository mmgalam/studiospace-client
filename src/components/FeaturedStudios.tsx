import Link from "next/link";
import { Suspense } from "react";
import {
  FiArrowRight,
  FiAward,
  FiAlertCircle,
  FiPlus,
  FiLayers,
} from "react-icons/fi";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";
import type { Studio } from "@/lib/types";

async function FeaturedList() {
  let studios: Studio[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/studios/featured`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Failed to load");
    studios = await res.json();
  } catch {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 p-10 text-center backdrop-blur-md space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
          <FiAlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          We couldn&apos;t load featured studios right now
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Please check your server connection or refresh the page to retry.
        </p>
      </div>
    );
  }

  if (studios.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-12 text-center backdrop-blur-md space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-100 dark:border-indigo-900/60 shadow-sm">
          <FiLayers className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No featured studios listed yet
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Be the first creator host to publish an equipped cyclorama loft or
            sound stage.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/add-studio"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all duration-200"
          >
            <FiPlus className="w-4 h-4" />
            <span>List the first studio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((s) => (
        <StudioCard key={s._id} studio={s} />
      ))}
    </div>
  );
}

export default function FeaturedStudios() {
  return (
    <section className="relative overflow-hidden py-20 bg-white/50 dark:bg-slate-950/40">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-180 h-72 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <FiAward className="w-3.5 h-3.5" /> Verified & Top Rated
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Featured Studios
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Top-rated creative spaces loved by filmmakers, photographers, and
              audio engineers.
            </p>
          </div>

          <Link
            href="/studios"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors shrink-0"
          >
            <span>View all workspaces</span>
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Studio Cards Grid with Skeleton Fallback */}
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <StudioCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <FeaturedList />
        </Suspense>
      </div>
    </section>
  );
}
