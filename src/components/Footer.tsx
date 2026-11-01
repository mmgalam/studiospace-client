import Link from "next/link";
import { FiAperture } from "react-icons/fi";
import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa6";
import NewsletterForm from "./NewsletterForm";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

const categories = [
  { label: "Photo Studios", value: "Photo Studio" },
  { label: "Sound Stages", value: "Film Stage" },
  { label: "Podcast Rooms", value: "Podcast Lounge" },
  { label: "Music Suites", value: "Music Suite" },
  { label: "Art Workshops", value: "Workshop" },
];

const socials = [
  { label: "X", href: "https://x.com", icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 dark:border-slate-800 bg-linear-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 text-slate-600 dark:text-slate-400">
      {/* Background Decorative Blur */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-175 h-60 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-70"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Info (Col span: 4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-2xl font-black tracking-tight text-slate-900 dark:text-white group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-105 group-hover:rotate-12 transition-transform duration-300">
                <FiAperture className="w-5 h-5" />
              </div>
              <span className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent">
                StudioSpace
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-sm">
              Our mission is to make every creative space accessible, empowering
              filmmakers, photographers, and audio artists to turn vision into
              reality.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-600 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Col span: 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-1 transition-all duration-200"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories (Col span: 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {categories.map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(cat.value)}`}
                    className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-1 transition-all duration-200"
                  >
                    <span>{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Card Box (Col span: 4) */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-sm space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400">
                  Stay Updated
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                  Studio Space Insider
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Get curated new studio drops and host discounts directly in
                  your inbox.
                </p>
              </div>

              {/* Newsletter Component Wrapper */}
              <div className="pt-1">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>All StudioSpace systems operational</span>
          </div>

          {/* Legal Links & Copyright */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500 dark:text-slate-400">
            <Link
              href="/privacy"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Terms of Service
            </Link>
            <span>© {new Date().getFullYear()} StudioSpace Inc.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
