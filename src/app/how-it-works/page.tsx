import Link from "next/link";
import {
  FiHelpCircle,
  FiChevronDown,
  FiMessageCircle,
  FiArrowRight,
  FiCompass,
} from "react-icons/fi";
import HowBookingWorks from "@/components/HowBookingWorks";
import HostGuarantee from "@/components/HostGuarantee";

export const metadata = {
  title: "How It Works | StudioSpace",
  description:
    "Learn how to discover, reserve, and host creative production studios with conflict-free scheduling on StudioSpace.",
};

const faqs = [
  {
    q: "How do I book a studio?",
    a: "Browse our curated listings, select your desired studio, and pick your production date with start and end times. Once submitted, your request is marked as 'Pending' until the host approves it. You can track real-time progress under 'My Bookings'.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes. While your reservation is still in 'Pending' status, you can cancel it with one click from 'My Bookings' at zero penalty. For 'Confirmed' bookings, cancellation and refund timelines are managed in coordination with the host per our rental terms.",
  },
  {
    q: "What is the security deposit?",
    a: "A refundable protection amount set by the studio host to cover gear, cycloramas, and sound equipment. The deposit is held securely during production and refunded back to you within 48 hours post-checkout once the session wraps cleanly.",
  },
  {
    q: "How do I list my own studio?",
    a: "Log in to your account, click 'Add New Studio' in the navigation bar, provide space details (hourly rate, capacity, amenities, address), upload workspace photos, and publish. You can manage or edit your active stages anytime via 'My Studio Listings'.",
  },
  {
    q: "What happens if a desired time slot is already taken?",
    a: "Our automated double-booking prevention engine runs real-time collision detection. If an existing confirmed session overlaps with your chosen hours, a clear warning is displayed immediately so you can select another open slot.",
  },
  {
    q: "Are there overtime fees if my shoot runs late?",
    a: "Production sessions are scheduled with strict load-in and wrap-up times to respect upcoming crews. Overtime depends on host stage availability and is billed at 1.5x the listed hourly rate.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      {/* Decorative ambient background blur */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-212.5 h-96 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      {/* Hero Header */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-6">
          <FiCompass className="w-3.5 h-3.5" /> Simple & Transparent Process
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          How{" "}
          <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            StudioSpace
          </span>{" "}
          Works
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          From finding the ideal daylight cyclorama to locking in your
          production hours without scheduling collisions — here is how our
          ecosystem operates.
        </p>
      </section>

      {/* 4-Step Booking Workflow Component */}
      <div className="relative">
        <HowBookingWorks />
      </div>

      {/* Host Guarantee & Protection Component */}
      <div className="relative">
        <HostGuarantee />
      </div>

      {/* Modern FAQ Section */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            <FiHelpCircle className="w-3.5 h-3.5" /> Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Everything you need to know about booking rules, security deposits,
            and listing spaces.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4">
          {faqs.map((f, idx) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white/75 dark:bg-slate-900/60 backdrop-blur-md p-5 sm:p-6 shadow-sm transition-all duration-200 open:border-indigo-500/50 open:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900 dark:text-white list-none select-none text-base">
                <span className="flex items-center gap-3">
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{f.q}</span>
                </span>
                <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-200 text-slate-500">
                  <FiChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <p className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-sm leading-relaxed text-slate-600 dark:text-slate-300 pl-7">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        {/* Support Help Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-linear-to-br from-indigo-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Still have questions about booking?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Our 24/7 creator dispatch team is here to assist with stage specs
              and load-in coordination.
            </p>
          </div>
          <a
            href="mailto:support@studiospace.io"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 shrink-0"
          >
            <FiMessageCircle className="w-4 h-4" />
            <span>Chat With Support</span>
          </a>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="p-8 sm:p-12 rounded-3xl border border-indigo-200/80 dark:border-indigo-900/60 bg-linear-to-tr from-indigo-600 via-indigo-700 to-purple-800 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to begin your shoot?
            </h2>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Explore photo stages, sound suites, and podcast rooms with clear
              upfront pricing.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 text-xs sm:text-sm font-bold shadow-lg shadow-indigo-950/20 transition-all duration-200"
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
