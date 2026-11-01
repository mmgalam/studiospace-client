import {
  FiSearch,
  FiClock,
  FiCheckCircle,
  FiVideo,
  FiArrowRight,
  FiCompass,
} from "react-icons/fi";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Discover Spaces",
    text: "Filter by production discipline, cyc wall dimensions, acoustic specs, and upfront hourly rates.",
    icon: FiSearch,
    tag: "Search & Filter",
  },
  {
    step: "02",
    title: "Select Shoot Hours",
    text: "Choose your production date, load-in and wrap times with automated double-booking lockout.",
    icon: FiClock,
    tag: "Real-time Slot",
  },
  {
    step: "03",
    title: "Book Instantly",
    text: "Submit your request with transparent pricing and escrow-protected security deposits.",
    icon: FiCheckCircle,
    tag: "Zero Surprises",
  },
  {
    step: "04",
    title: "Create & Produce",
    text: "Receive direct studio access instructions, load in your crew, and focus on capturing your vision.",
    icon: FiVideo,
    tag: "Production Ready",
  },
];

export default function HowBookingWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white/60 dark:bg-slate-950 py-20 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-180 h-72 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-70"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <FiCompass className="w-3.5 h-3.5" /> 4-Step Production Flow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              How Booking Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              From scouting the right sound stage to final wrap-up — a seamless,
              conflict-free workflow built for creative crews.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group shrink-0"
          >
            <span>Explore available stages</span>
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
          {steps.map(({ step, title, text, icon: Icon, tag }, i) => (
            <div
              key={title}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 p-7 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-indigo-500/60 dark:hover:border-indigo-500/60 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="relative">
                {/* Header row: Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/60 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
                    {tag}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="mt-6 text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {i + 1}. {title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {text}
                </p>
              </div>

              {/* Progress indicator bottom bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                <span>Phase {step}</span>
                <span className="w-8 h-1 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
