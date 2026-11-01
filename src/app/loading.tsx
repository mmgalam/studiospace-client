import { FiAperture } from "react-icons/fi";

export default function Loading() {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Decorative ambient background blur */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137.5 h-72 bg-linear-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 dark:from-indigo-600/20 dark:via-purple-600/20 dark:to-pink-600/20 blur-3xl opacity-80"
        aria-hidden="true"
      />

      {/* Glassmorphic Loader Card */}
      <div className="relative flex flex-col items-center gap-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 p-8 sm:p-10 backdrop-blur-xl shadow-xl text-center max-w-sm w-full animate-fade-up">
        {/* Animated Aperture Icon with pulse halo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full bg-indigo-500/20 dark:bg-indigo-400/20 animate-ping [animation-duration:2.5s]" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-800/60 shadow-inner">
            <FiAperture className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400 [animation-duration:3s]" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-1.5">
          <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
            Setting up the lights...
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Preparing your studio stage and checking availability.
          </p>
        </div>

        {/* Progress Bar Indicator */}
        <div className="w-36 h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className="h-full w-full bg-indigo-600 dark:bg-indigo-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
