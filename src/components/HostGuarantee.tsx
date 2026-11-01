import {
  FiShield,
  FiUserCheck,
  FiTool,
  FiHeadphones,
  FiCheckCircle,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";

const items = [
  {
    title: "Liability Protection",
    text: "Every shoot is backed by escrowed deposits and host insurance mediation, so productions run with total peace of mind.",
    icon: FiShield,
    tag: "Full Coverage",
  },
  {
    title: "Verified Creator Profiles",
    text: "Both studio hosts and reserving creators complete identity and email verification before initiating or accepting bookings.",
    icon: FiUserCheck,
    tag: "100% Verified",
  },
  {
    title: "Gear & Equipment Safety",
    text: "Transparent upfront security deposits and clear house policies keep high-end lighting, cycloramas, and audio rigs safe.",
    icon: FiTool,
    tag: "Escrow Secured",
  },
  {
    title: "24/7 Producer Dispatch",
    text: "Our dedicated support team is available around the clock to assist with key handoffs, load-in delays, and stage questions.",
    icon: FiHeadphones,
    tag: "Always Active",
  },
];

export default function HostGuarantee() {
  return (
    <section
      id="host-guarantee"
      className="relative overflow-hidden bg-slate-50/70 dark:bg-slate-950/70 py-20 border-y border-slate-200/80 dark:border-slate-800/80"
    >
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-180 h-72 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <FiLock className="w-3.5 h-3.5" /> Trust & Platform Security
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Host Guarantee & Creator Protection
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Every production session booked on StudioSpace is backed by
              built-in safeguards, transparent security escrow, and dispute
              mediation.
            </p>
          </div>

          <Link
            href="/terms"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group shrink-0"
          >
            <span>Read full coverage policy</span>
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, text, icon: Icon, tag }) => (
            <div
              key={title}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 p-7 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-indigo-500/60 dark:hover:border-indigo-500/60 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* Header Row: Icon + Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/60 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
                    {tag}
                  </span>
                </div>

                {/* Card Title & Text */}
                <h3 className="mt-6 text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {text}
                </p>
              </div>

              {/* Bottom Feature Tick */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <FiCheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Active on every confirmed shoot</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Bar */}
        <div className="mt-12 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-linear-to-r from-indigo-50/60 via-white to-purple-50/40 dark:from-slate-900 dark:via-slate-900/80 dark:to-indigo-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
              <FiShield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Zero Double-Booking & Deposit Protection Guarantee
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Scheduling collisions are locked out instantly upon request
                submission.
              </p>
            </div>
          </div>

          <Link
            href="/add-studio"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition shrink-0"
          >
            Become a Protected Host
          </Link>
        </div>
      </div>
    </section>
  );
}
