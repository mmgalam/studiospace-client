export default function StudioCardSkeleton() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md shadow-sm animate-pulse">
      {/* Thumbnail Skeleton with floating badges */}
      <div className="relative h-56 w-full bg-slate-200/80 dark:bg-slate-800/80">
        {/* Category Pill Placeholder */}
        <div className="absolute left-3.5 top-3.5 h-6 w-24 rounded-full bg-slate-300/80 dark:bg-slate-700/80" />

        {/* Top-Right Badges (Rating & Wishlist) */}
        <div className="absolute right-3.5 top-3.5 flex items-center gap-2">
          <div className="h-6 w-14 rounded-full bg-slate-300/80 dark:bg-slate-700/80" />
          <div className="h-8 w-8 rounded-full bg-slate-300/80 dark:bg-slate-700/80" />
        </div>

        {/* Bottom Location Placeholder */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center gap-2">
          <div className="h-3.5 w-3.5 rounded-full bg-slate-300/80 dark:bg-slate-700/80 shrink-0" />
          <div className="h-3.5 w-2/3 rounded-md bg-slate-300/80 dark:bg-slate-700/80" />
        </div>
      </div>

      {/* Card Body Skeleton */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between space-y-4">
        <div className="space-y-2">
          {/* Title Placeholder */}
          <div className="h-5 w-4/5 rounded-lg bg-slate-200 dark:bg-slate-800" />
          {/* Description Placeholder */}
          <div className="h-3.5 w-3/5 rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
        </div>

        {/* Pricing & CTA Button Row */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <div className="space-y-1.5">
            {/* Price */}
            <div className="h-6 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
            {/* Deposit */}
            <div className="h-3 w-14 rounded-md bg-slate-200/70 dark:bg-slate-800/70" />
          </div>

          {/* Details Button Placeholder */}
          <div className="h-9 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
