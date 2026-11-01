import Link from "next/link";
import {
  FiFileText,
  FiCheckSquare,
  FiCalendar,
  FiAlertTriangle,
  FiShield,
  FiDollarSign,
  FiArrowLeft,
  FiMail,
} from "react-icons/fi";

export const metadata = {
  title: "Terms of Service | StudioSpace",
  description:
    "Review the terms, studio rental conditions, host expectations, and liability agreements of StudioSpace.",
};

const termsSections = [
  {
    icon: FiCheckSquare,
    title: "1. Acceptance of Terms",
    content: [
      "By creating a StudioSpace account, listing a creative workspace, or reserving production shoot hours, you agree to comply with and be legally bound by these Terms of Service.",
      "If you represent a production company, media agency, or collective, you confirm that you hold the legal authority to bind that entity to these conditions.",
      "StudioSpace reserves the right to revise or update these terms periodically. Continued access to the platform following published amendments constitutes binding consent.",
    ],
  },
  {
    icon: FiCalendar,
    title: "2. Workspace Reservations & Scheduling",
    content: [
      "Scheduling Integrity: All production sessions are locked to exact calendar dates and load-in/wrap-up times. Double-booking collisions are strictly barred by automated scheduling algorithms.",
      "Booking Status Lifecycle: Submitting a request marks the slot as 'Pending' until confirmed by the host or verified automatically via instant-reserve criteria.",
      "Overtime Policy: Production wrap-ups exceeding confirmed reservation hours may incur overtime billing calculated at 1.5x the listed hourly rate, subject to host availability.",
      "Permitted Use: Bookings are strictly restricted to creative productions (photography, video, podcasting, audio sessions, rehearsals) declared during checkout.",
    ],
  },
  {
    icon: FiDollarSign,
    title: "3. Fees, Security Deposits & Payouts",
    content: [
      "Hourly Rates & Pricing: Hosts maintain full control over listed base rates. All displayed booking totals include the duration fee plus the refundable security deposit.",
      "Security Deposits: Held safely in escrow during production shoots to cover potential workspace damages, excessive cleanups, or equipment breakages. Deposits are released back to creators within 48 hours post-checkout if no damage claims arise.",
      "Host Payouts: Rental funds are disbursed to hosts following verified check-in without reported platform disputes.",
    ],
  },
  {
    icon: FiAlertTriangle,
    title: "4. Cancellations, Refunds & No-Shows",
    content: [
      "Pending Reservations: Creators may cancel any 'Pending' booking request directly from their dashboard at zero penalty before host acceptance.",
      "Confirmed Shoot Cancellations: Cancellations made at least 48 hours before load-in qualify for a full refund of rental fees and security deposits.",
      "Late Cancellations: Cancellations initiated within 24 hours of scheduled production forfeit 50% of base rental hours to reimburse the host for idle studio availability.",
      "Host Cancellations: If a host cancels a confirmed shoot, the creator receives a 100% refund plus priority assistance to secure comparable studio stages.",
    ],
  },
  {
    icon: FiShield,
    title: "5. Studio Care, Equipment & Liability",
    content: [
      "Care of Premises: Creators and production crews agree to operate on-site lighting, cyclorama walls, soundproofing, and audio gear with due diligence.",
      "Host Guarantee & Liability: StudioSpace provides platform liability mediation and verified security deposit coverage, but is not an insurer of record. Hosts are encouraged to maintain active commercial property and general production liability insurance.",
      "Prohibited Activities: Hazardous pyrotechnics, unauthorized open flames, smoke machines without advance host consent, or illegal filming activities on studio premises are strictly forbidden.",
    ],
  },
  {
    icon: FiFileText,
    title: "6. Account Suspension & Listing Termination",
    content: [
      "We reserve the right to suspend or permanently deactivate any creator or host profile that repeatedly generates disputes, initiates chargebacks, or misrepresents studio amenities.",
      "Hosts may unlist or delete their studios anytime, provided all currently confirmed future reservations are either completed or formally transferred.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-200 h-96 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-70"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            <FiFileText className="w-3.5 h-3.5" /> StudioSpace Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            Please read these terms carefully before booking, listing, or
            producing content within creative spaces on the StudioSpace network.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
            <span>Effective Date: November 1, 2026</span>
            <span>•</span>
            <span>Version 2.4</span>
          </div>
        </header>

        {/* Terms Sections */}
        <div className="mt-12 space-y-10">
          {termsSections.map((section) => {
            const Icon = section.icon;
            return (
              <section
                key={section.title}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-sm space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3 pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside marker:text-indigo-500">
                  {section.content.map((point, idx) => (
                    <li key={idx} className="pl-1">
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {/* Contact & Mediation Help Box */}
          <section className="p-8 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-linear-to-br from-indigo-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Dispute or Policy Clarification?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Our trust and legal team assists hosts and filmmakers with
                dispute mediation and contract terms.
              </p>
            </div>
            <a
              href="mailto:legal@studiospace.io"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 shrink-0"
            >
              <FiMail className="w-4 h-4" />
              <span>Contact Legal Support</span>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
