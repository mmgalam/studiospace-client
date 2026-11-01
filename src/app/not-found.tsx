import Link from "next/link";
import { FiHome, FiCompass, FiFilm } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-hidden">
      {/* Decorative ambient background blur */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-180 h-80 bg-linear-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 dark:from-indigo-600/20 dark:via-purple-600/20 dark:to-pink-600/20 blur-3xl opacity-80"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl text-center space-y-8">
        {/* Thematic Clapperboard & Spotlight Illustration */}
        <div className="relative mx-auto flex items-center justify-center">
          <svg
            viewBox="0 0 320 220"
            className="h-56 sm:h-64 w-auto drop-shadow-xl select-none"
            role="img"
            aria-label="A studio clapperboard in a spotlight"
          >
            {/* Spotlight cone */}
            <polygon
              points="160,0 45,210 275,210"
              className="fill-indigo-500/10 dark:fill-indigo-500/15"
            />
            {/* Stage light base reflection */}
            <ellipse
              cx="160"
              cy="210"
              rx="115"
              ry="10"
              className="fill-indigo-500/20 dark:fill-indigo-500/25"
            />

            {/* Clapperboard Body */}
            <rect
              x="90"
              y="98"
              width="140"
              height="88"
              rx="12"
              className="fill-slate-900 dark:fill-slate-100 shadow-2xl"
            />

            {/* Slate lines */}
            <line
              x1="90"
              y1="126"
              x2="230"
              y2="126"
              stroke="#6366f1"
              strokeWidth="2"
              strokeOpacity="0.4"
            />

            {/* 404 Slate Code */}
            <text
              x="160"
              y="168"
              textAnchor="middle"
              fontSize="38"
              fontWeight="900"
              fontFamily="monospace"
              className="fill-white dark:fill-slate-950 tracking-wider"
            >
              404
            </text>

            {/* Clapperboard Slate Top Stick (Rotated) */}
            <g transform="rotate(-14 90 98)">
              <rect
                x="90"
                y="68"
                width="140"
                height="28"
                rx="6"
                className="fill-indigo-600"
              />
              {/* White chevron slate stripes */}
              <polygon
                points="105,68 122,68 108,96 91,96"
                className="fill-white"
              />
              <polygon
                points="142,68 159,68 145,96 128,96"
                className="fill-white"
              />
              <polygon
                points="179,68 196,68 182,96 165,96"
                className="fill-white"
              />
              <polygon
                points="216,68 230,68 219,96 202,96"
                className="fill-white"
              />
            </g>

            {/* Clapperboard screw pivot */}
            <circle cx="94" cy="98" r="4" className="fill-indigo-400" />
          </svg>
        </div>

        {/* Content Box */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            <FiFilm className="w-3.5 h-3.5" /> Production Cut
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Scene Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            The creative space you are looking for has wrapped up, been
            relocated, or never made it to the final cut.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 cursor-pointer"
          >
            <FiHome className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 cursor-pointer"
          >
            <FiCompass className="w-4 h-4" />
            <span>Explore Studios</span>
          </Link>
        </div>
      </div>
    </div>
  );
}