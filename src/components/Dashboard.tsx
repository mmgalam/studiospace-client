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
  FiArrowRight,
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

const badgeStyle: Record<Booking["status"], string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Confirmed:
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  Completed: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user.email;
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
          listings: studios.length,
          bookings: bookings.length,
          pendingRequests: requests.filter(
            (b: { status: string }) => b.status === "Pending",
          ).length,
          recent: (bookings as Booking[]).slice(0, 3),
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
      label: "My Listings",
      value: stats?.listings,
      href: "/my-listings",
      icon: FiLayers,
      tone: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    },
    {
      label: "My Bookings",
      value: stats?.bookings,
      href: "/my-bookings",
      icon: FiBookmark,
      tone: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    },
    {
      label: "Pending Requests",
      value: stats?.pendingRequests,
      href: "/booking-requests",
      icon: FiInbox,
      tone: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      label: "Saved Studios",
      value: ids.length,
      href: "/wishlist",
      icon: FiHeart,
      tone: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold">
        {isPending
          ? "Dashboard"
          : `Welcome back, ${session?.user.name ?? "Creator"}`}
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        A quick overview of your studios and reservations.
      </p>

      {error && (
        <p className="mt-6 text-sm text-red-600">
          We couldn&apos;t load your stats right now. Please refresh.
        </p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, href, icon: Icon, tone }) => (
          <Link
            key={label}
            href={href}
            className="flex h-full flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-3xl font-bold">
              {loading && label !== "Saved Studios" ? (
                <span className="inline-block h-8 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              ) : (
                (value ?? 0)
              )}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/add-studio"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <FiPlusCircle className="h-4 w-4" /> Add New Studio
        </Link>
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-medium hover:border-indigo-500"
        >
          Explore Studios
        </Link>
      </div>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent bookings</h2>
          <Link
            href="/my-bookings"
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
          >
            View all <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : !stats || stats.recent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
            <p className="font-medium">No bookings yet.</p>
            <Link
              href="/studios"
              className="mt-3 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Find a studio
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {stats.recent.map((b) => (
              <Link
                key={b._id}
                href="/my-bookings"
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition hover:border-indigo-500"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{b.studioTitle}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <FiCalendar className="h-4 w-4" />
                    {b.date}, {b.startTime} – {b.endTime}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle[b.status]}`}
                >
                  {b.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
