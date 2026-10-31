"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLayers, FiBookmark, FiInbox, FiPlusCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

interface Stats {
  listings: number;
  bookings: number;
  pendingRequests: number;
}

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user.email;

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
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
      });

    return () => controller.abort();
  }, [email]);

  const cards = [
    {
      label: "My Listings",
      value: stats?.listings,
      href: "/my-listings",
      icon: FiLayers,
    },
    {
      label: "My Bookings",
      value: stats?.bookings,
      href: "/my-bookings",
      icon: FiBookmark,
    },
    {
      label: "Pending Requests",
      value: stats?.pendingRequests,
      href: "/booking-requests",
      icon: FiInbox,
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

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex h-full flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-3xl font-bold">
              {value === undefined ? (
                <span className="inline-block h-8 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              ) : (
                value
              )}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {label}
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/add-studio"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
      >
        <FiPlusCircle className="h-4 w-4" /> Add New Studio
      </Link>
    </div>
  );
}
