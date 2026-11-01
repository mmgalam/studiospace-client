"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiLayers,
  FiBookmark,
  FiInbox,
  FiHeart,
  FiPlusCircle,
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiGrid,
  FiAlertCircle,
  FiRefreshCw,
  FiCompass,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useWishlist } from "./WishlistProvider";
import type { Booking } from "@/lib/types";

interface Stats {
  listings: number;
  bookings: number;
  pendingRequests: number;
  recent: Booking[];
}

const badgeStyle: Record<string, string> = {
  Pending:
    "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/60",
  Confirmed:
    "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60",
  Completed:
    "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60",
  Cancelled:
    "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/60",
};

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;
  const { ids } = useWishlist();

  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!email) return;
    const controller = new AbortController();
    const get = (path: string) =>
      apiFetch(path, { signal: controller.signal }).then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      });

    Promise.all([
      get("/my-studios"),
      get("/my-bookings"),
      get("/host-bookings"),
    ])
      .then(([studios, bookings, requests]) => {
        setStats({
          listings: Array.isArray(studios) ? studios.length : 0,
          bookings: Array.isArray(bookings) ? bookings.length : 0,
          pendingRequests: Array.isArray(requests)
            ? requests.filter((b: { status: string }) => b.status === "Pending").length
            : 0,
          recent: Array.isArray(bookings) ? (bookings as Booking[]).slice(0, 3) : [],
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
      });

    return () => controller.abort();
  }, [email]);

  const loading = !stats && !error;

  const cards = [
    {
      label: "My Studio Listings",
      value: stats?.listings,
      href: "/my-listings",
      icon: FiLayers,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/70",
      borderColor: "border-indigo-100 dark:border-indigo-900/50",
      subtext: "Published workspaces",
    },
    {
      label: "My Bookings",
      value: stats?.bookings,
      href: "/my-bookings",
      icon: FiBookmark,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/70",
      borderColor: "border-emerald-100 dark:border-emerald-900/50",
      subtext: "Reserved productions",
    },
    {
      label: "Pending Requests",
      value: stats?.pendingRequests,
      href: "/booking-requests",
      icon: FiInbox,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/70",
      borderColor: "border-amber-100 dark:border-amber-900/50",
      subtext: "Awaiting your review",
    },
    {
      label: "Saved Studios",
      value: ids.length,
      href: "/wishlist",
      icon: FiHeart,
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/70",
      borderColor: "border-rose-100 dark:border-rose-900/50",
      subtext: "In your wishlist",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12">
      {/* Decorative ambient background blur */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-212.5 h-80 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Greeting & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <FiGrid className="w-3.5 h-3.5" /> Workspace Hub
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {isPending
                ? "Creator Dashboard"
                : `Welcome back, ${session?.user?.name ?? "Creator"}`}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Overview of your studio operations, incoming requests, and shoot schedules.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/add-studio"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all duration-200"
            >
              <FiPlusCircle className="h-4 w-4" />
              <span>List Space</span>
            </Link>
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
            >
              <FiCompass className="h-4 w-4" />
              <span>Explore</span>
            </Link>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="flex items-center justify-between p-5 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300">
            <div className="flex items-center gap-3">
              <FiAlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <p className="text-xs sm:text-sm font-semibold">
                Could not load your workspace metrics right now. Please refresh to try again.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition"
            >
              <FiRefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        )}

        {/* 4 Stat Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ label, value, href, icon: Icon, color, bgColor, borderColor, subtext }) => (
            <Link
              key={label}
              href={href}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 p-6 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-500/60 dark:hover:border-indigo-500/60"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bgColor} ${color} border ${borderColor} transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <FiArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="mt-6">
                <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                  {loading && label !== "Saved Studios" ? (
                    <span className="inline-block h-8 w-14 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                  ) : (
                    (value ?? 0)
                  )}
                </p>
                <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {label}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {subtext}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Bookings Section */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Recent Bookings
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Latest production schedules and reservation statuses.
              </p>
            </div>
            <Link
              href="/my-bookings"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
            >
              <span>View all bookings</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800"
                />
              ))}
            </div>
          ) : !stats || stats.recent.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 p-10 text-center backdrop-blur-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                <FiBookmark className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No bookings scheduled yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Discover equipped cyclorama lofts, sound stages, or podcast rooms for your next shoot.
              </p>
              <div className="pt-2">
                <Link
                  href="/studios"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition"
                >
                  <FiCompass className="w-3.5 h-3.5" />
                  <span>Find a Studio</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recent.map((b) => (
                <Link
                  key={b._id}
                  href="/my-bookings"
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 p-5 backdrop-blur-md shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all duration-200"
                >
                  <div className="min-w-0 space-y-1.5">
                    <h3 className="truncate text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {b.studioTitle || "Creative Studio Session"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{b.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <FiClock className="w-3.5 h-3.5 text-indigo-500" />
                        <span>
                          {b.startTime} – {b.endTime}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold border ${badgeStyle[b.status] || "bg-slate-100 text-slate-700"}`}
                    >
                      {b.status}
                    </span>
                    <FiArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}