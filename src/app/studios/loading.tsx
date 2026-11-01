import StudioCardSkeleton from "@/components/StudioCardSkeleton";

export default function StudiosLoading() {
  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-212.5 h-80 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        {/* 1. Header Section Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="space-y-3">
            {/* Tag badge skeleton */}
            <div className="h-6 w-36 rounded-full bg-slate-200/80 dark:bg-slate-800/80" />
            {/* Title skeleton */}
            <div className="h-10 w-64 sm:w-80 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            {/* Subtitle skeleton */}
            <div className="h-4 w-72 sm:w-96 rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
          </div>

          {/* "Host Your Space" CTA button skeleton */}
          <div className="h-11 w-40 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 shrink-0" />
        </div>

        {/* 2. Search Bar & Sort Dropdown Skeleton */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          {/* Search box placeholder */}
          <div className="flex-1 h-12 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center px-4">
            <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-800 mr-3" />
            <div className="h-4 w-1/2 rounded bg-slate-200/70 dark:bg-slate-800/70" />
          </div>

          {/* Sort dropdown placeholder */}
          <div className="h-12 w-full sm:w-52 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center px-4">
            <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-800 mr-3" />
            <div className="h-4 w-24 rounded bg-slate-200/70 dark:bg-slate-800/70" />
          </div>
        </div>

        {/* 3. Category Filter Chips Skeleton */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 select-none no-scrollbar">
          {[24, 28, 28, 32, 28, 30].map((w, idx) => (
            <div
              key={idx}
              className={`h-9 w-${w} rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shrink-0`}
            />
          ))}
        </div>

        {/* 4. Results Count Bar Skeleton */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <div className="h-4 w-32 rounded bg-slate-200/70 dark:bg-slate-800/70" />
        </div>

        {/* 5. 6-Card Studio Skeleton Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <StudioCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
