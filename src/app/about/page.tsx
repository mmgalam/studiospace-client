import Link from "next/link";
import {
  FiTarget,
  FiUsers,
  FiShield,
  FiHeart,
  FiArrowRight,
  FiCheckCircle,
  FiAward,
  FiClock,
  FiZap,
} from "react-icons/fi";

export const metadata = {
  title: "About Us | StudioSpace",
  description:
    "Learn about StudioSpace — the peer-to-peer workspace marketplace empowering filmmakers, photographers, and audio artists.",
};

const values = [
  {
    title: "Access for every creator",
    text: "Great work should never depend on owning expensive real estate. We make professional studio stages bookable by the hour.",
    icon: FiUsers,
  },
  {
    title: "Trust by design",
    text: "Clear transparent pricing, escrowed security deposits, and verified host profiles protect both parties at every stage.",
    icon: FiShield,
  },
  {
    title: "Built with creators",
    text: "From daylight cyc walls to soundproof podcast suites, every feature is tailored to realistic production workflows.",
    icon: FiHeart,
  },
  {
    title: "Focus on the craft",
    text: "Zero scheduling collisions and automated booking mean less back-and-forth and more time capturing your vision.",
    icon: FiTarget,
  },
];

const stats = [
  {
    value: "5+",
    label: "Studio Categories",
    detail: "Photo, Film, Audio & Arts",
  },
  {
    value: "0%",
    label: "Collision Rate",
    detail: "Guaranteed double-booking lock",
  },
  {
    value: "100%",
    label: "Transparent Pricing",
    detail: "Hourly rates & upfront deposits",
  },
  {
    value: "24/7",
    label: "Creator Support",
    detail: "Assistance for load-in & gear",
  },
];

const pillars = [
  "Verified studio hosts with verified equipment amenities",
  "Automated time-slot validation to eliminate scheduling conflicts",
  "Escrowed deposits returned swiftly upon completed production wrap",
  "Direct communication tools for smooth studio load-in protocols",
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      {/* 1. Hero & Mission Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            <FiZap className="w-3.5 h-3.5" /> Empowering Creative Workflows
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Where creative vision meets the{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              perfect studio
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            StudioSpace is a peer-to-peer marketplace connecting filmmakers,
            photographers, podcasters, and audio engineers with world-class
            production spaces on-demand.
          </p>
        </div>

        {/* 2. Interactive Stats Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white/75 dark:bg-slate-900/60 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <p className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                  {s.label}
                </p>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/70 pt-2">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Story & Platform Origin */}
      <section className="relative border-y border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Our Origin
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Eliminating the friction of traditional production rentals
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                We started with a simple observation: finding an equipped,
                available creative space with predictable rates was often harder
                than the actual filming or recording. Phone calls, hidden
                cleaning surcharges, and rigid long-term commercial leases
                blocked emerging talent.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                StudioSpace replaces administrative friction with instant,
                conflict-free scheduling. Hosts monetize idle stages with
                verified creators, and artists gain entry to industry-grade
                cycloramas, microphones, and acoustic rooms in minutes.
              </p>

              {/* Pillar Checklist */}
              <div className="grid sm:grid-cols-2 gap-3 pt-4">
                {pillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium"
                  >
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Feature Card */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 shadow-xl space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  <FiAward className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  The StudioSpace Standard
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every photo stage, audio booth, and film set listed under the
                  StudioSpace umbrella is audited for equipment readiness,
                  safety clearances, and host responsiveness.
                </p>
                <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                  <FiClock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Seamless Load-in Times
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Punctual production schedules with zero delay
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What we believe
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Foundational standards that guide our marketplace, booking tools,
            and host partnerships.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, text, icon: Icon }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-sm hover:border-indigo-500/60 dark:hover:border-indigo-500/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="p-8 sm:p-14 rounded-3xl border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-800 text-white text-center shadow-2xl relative overflow-hidden">
          {/* Decorative background circle */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Ready to create your next masterpiece?
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
              Find an equipped production space in minutes, or monetize your
              creative studio and welcome passionate creators.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 text-xs sm:text-sm font-bold shadow-lg shadow-indigo-950/20 hover:scale-105 transition-all duration-200"
              >
                <span>Explore Studios</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/add-studio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500/30 hover:bg-indigo-500/50 border border-white/30 text-white text-xs sm:text-sm font-bold backdrop-blur-md transition-all duration-200"
              >
                <span>Host Your Space</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
