export default function StudioCardSkeleton() {
  return (
    <div className="h-full animate-pulse overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="h-52 w-full bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="flex items-center justify-between pt-4">
          <div className="h-6 w-20 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-9 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}
