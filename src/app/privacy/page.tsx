import Link from "next/link";
import {
  FiShield,
  FiLock,
  FiUserCheck,
  FiDatabase,
  FiEye,
  FiMail,
  FiArrowLeft,
} from "react-icons/fi";

export const metadata = {
  title: "Privacy Policy | StudioSpace",
  description:
    "Learn how StudioSpace collects, uses, and protects your creative workspace data.",
};

const sections = [
  {
    icon: FiDatabase,
    title: "1. Information We Collect",
    content: [
      "Account Information: When you register as a host or creator, we collect your name, email address, password hash, and profile image URL.",
      "Studio & Listing Details: Details you provide about your studio, including address, equipment amenities, hourly rates, security deposits, and workspace photographs.",
      "Booking & Transaction Data: Reservation timestamps, shoot hours, booking statuses, total rental fees, and payment confirmation tokens.",
      "Usage & Device Logs: IP addresses, browser types, operating systems, and page navigation metrics captured via secure session logs.",
    ],
  },
  {
    icon: FiUserCheck,
    title: "2. How We Use Your Information",
    content: [
      "To facilitate workspace reservations and verify scheduling availability to eliminate double-booking collisions.",
      "To authenticate account access and manage protected dashboard routes via secure, encrypted tokens.",
      "To send essential booking notifications, host reservation approvals, and listing management alerts.",
      "To improve platform performance, optimize studio discovery algorithms, and provide 24/7 creator support.",
    ],
  },
  {
    icon: FiLock,
    title: "3. Data Security & Storage",
    content: [
      "All persistent application records are safely stored in hardened MongoDB clusters with role-based access controls.",
      "Authentication tokens are issued as HTTPOnly cookies to protect your sessions against Cross-Site Scripting (XSS) threats.",
      "StudioSpace does not store raw credit card numbers; payment processing and deposit authorizations are routed through PCI-DSS compliant gateways.",
      "We perform routine database vulnerability scans and maintain automated backups to guard against service interruptions.",
    ],
  },
  {
    icon: FiEye,
    title: "4. Information Sharing & Disclosure",
    content: [
      "Between Hosts and Creators: Confirmed bookings reveal necessary operational details (such as host contact details and studio entry instructions) strictly to coordinate production access.",
      "Third-Party Service Providers: We integrate vetted cloud services (such as ImgBB/PostImage for CDN image delivery) solely to render your workspace media.",
      "Legal Compliance: We may disclose records if strictly required by applicable law, search warrant, or regulatory order.",
      "We never sell, rent, or trade your personal information to third-party advertisers or data brokers.",
    ],
  },
  {
    icon: FiShield,
    title: "5. Your Privacy Rights",
    content: [
      "Access & Portability: You may inspect and request an export of all personal data and workspace listings linked to your account.",
      "Correction & Updates: You can edit your active listings, studio specs, and account profile anytime directly from your dashboard.",
      "Account Deletion: You can request full erasure of your account, listed spaces, and inactive booking history by contacting our support team.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      {/* Decorative ambient background blur */}
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
            <FiShield className="w-3.5 h-3.5" /> Trust & Compliance
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            This Privacy Policy explains how StudioSpace collects, uses,
            protects, and discloses personal data when you explore, list, or
            reserve creative production studios.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
            <span>Effective Date: November 1, 2026</span>
            <span>•</span>
            <span>Last Updated: November 2026</span>
          </div>
        </header>

        {/* Policy Content Sections */}
        <div className="mt-12 space-y-10">
          {sections.map((section) => {
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

          {/* Contact Box */}
          <section className="p-8 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-linear-to-br from-indigo-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Have questions regarding your data?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Reach our data protection team directly for access, correction,
                or deletion inquiries.
              </p>
            </div>
            <a
              href="mailto:privacy@studiospace.io"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 shrink-0"
            >
              <FiMail className="w-4 h-4" />
              <span>Contact Privacy Desk</span>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
