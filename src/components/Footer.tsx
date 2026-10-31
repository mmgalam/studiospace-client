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
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400"
          >
            <FiAperture className="w-6 h-6" />
            <span>StudioSpace</span>
          </Link>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Our mission is to make every creative space accessible, so
            filmmakers, photographers, podcasters and musicians can focus on
            creating.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-600 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-indigo-600">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Popular Categories
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {categories.map((c) => (
              <li key={c.value}>
                <Link
                  href={`/studios?category=${encodeURIComponent(c.value)}`}
                  className="hover:text-indigo-600"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Get new studio listings and booking tips in your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 py-5 px-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} StudioSpace. All rights reserved. Use of
        this site is subject to our Terms of Service and Privacy Policy.
      </div>
    </footer>
  );
}
