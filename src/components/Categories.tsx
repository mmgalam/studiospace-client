import Link from "next/link";
import {
  FiCamera,
  FiFilm,
  FiMic,
  FiMusic,
  FiEdit3,
  FiArrowUpRight,
  FiGrid,
} from "react-icons/fi";

const categories = [
  {
    label: "Photo Studios",
    value: "Photo Studio",
    icon: FiCamera,
    text: "Cyc walls, daylight lofts, strobes and backdrop setups",
    badge: "Most Popular",
  },
  {
    label: "Sound Stages",
    value: "Film Stage",
    icon: FiFilm,
    text: "Soundproofed stages for cinema, green screen and commercials",
  },
  {
    label: "Podcast Rooms",
    value: "Podcast Lounge",
    icon: FiMic,
    text: "Acoustically treated lounges with broadcast mics and video switchers",
  },
  {
    label: "Music Suites",
    value: "Music Suite",
    icon: FiMusic,
    text: "Vocal recording booths, mixing consoles and rehearsal rooms",
  },
  {
    label: "Art Workshops",
    value: "Workshop",
    icon: FiEdit3,
    text: "Sunlit flexible spaces for tactile making, sculpting and teaching",
  },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-slate-50/70 dark:bg-slate-950 py-20 border-y border-slate-200/80 dark:border-slate-800/80">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-180 h-72 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <FiGrid className="w-3.5 h-3.5" /> Curated Production Spaces
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Browse by Studio Category
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
              Filter by production discipline and jump directly into verified,
              acoustically tuned workspaces.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
          >
            <span>Explore all categories</span>
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 5-Column Responsive Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(({ label, value, icon: Icon, text, badge }) => (
            <Link
              key={value}
              href={`/studios?category=${encodeURIComponent(value)}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 p-6 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/80 dark:hover:border-indigo-500/80 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              {/* Optional Highlight Tag */}
              {badge && (
                <span className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {badge}
                </span>
              )}

              <div>
                {/* Category Icon Badge */}
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Category Title */}
                <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {label}
                </h3>

                {/* Descriptive Specs */}
                <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {text}
                </p>
              </div>

              {/* Action Hint */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <span>View spaces</span>
                <FiArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
