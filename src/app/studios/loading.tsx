import StudioCardSkeleton from "@/components/StudioCardSkeleton";

export default function StudiosLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-3">
        <div className="h-8 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-80 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <StudioCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
