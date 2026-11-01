"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiHeart,
  FiCompass,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useWishlist } from "./WishlistProvider";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";
import type { Studio } from "@/lib/types";

export default function WishlistPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;
  const { ids } = useWishlist();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // ইমেইল না থাকলে ফেচিং করার দরকার নেই
    if (!email) return;

    const controller = new AbortController();

    apiFetch("/wishlist/studios", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load saved studios");
        return r.json();
      })
      .then((data: Studio[]) => {
        setStudios(Array.isArray(data) ? data : []);
        setFetching(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setFetching(false);
      });

    return () => controller.abort();
  }, [email]);

  // Derived state: effect-এর ভেতরে setState(false) কল না করে রেন্ডারে ক্যালকুলেট করা হয়েছে
  const showSkeleton = isPending || (Boolean(email) && fetching);

  // হার্ট আইকনে আনচেক করলে তালিকা থেকে সঙ্গে সঙ্গে সরে যাবে
  const visible = studios.filter((s) => ids.includes(s._id));

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-200 h-80 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60">
              <FiHeart className="w-3.5 h-3.5 fill-current" /> Saved Collection
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Saved Studios
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Your bookmarked cyclorama lofts, sound stages, and podcast rooms ready for your next production.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {!showSkeleton && !error && (
              <span className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md text-xs font-bold text-slate-700 dark:text-slate-300">
                {visible.length} {visible.length === 1 ? "Space" : "Spaces"} Saved
              </span>
            )}
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all duration-200"
            >
              <FiCompass className="h-4 w-4" />
              <span>Explore More</span>
            </Link>
          </div>
        </div>

        {/* 1. Loading Skeleton */}
        {showSkeleton && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <StudioCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* 2. Error State */}
        {!showSkeleton && error && (
          <div className="rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 p-12 text-center space-y-4 max-w-lg mx-auto">
            <FiAlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Failed to load saved studios
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              We couldn&apos;t connect to the server to fetch your saved spaces. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer"
            >
              <FiRefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        )}

        {/* 3. Empty State */}
        {!showSkeleton && !error && visible.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-12 text-center backdrop-blur-sm space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto border border-rose-100 dark:border-rose-900/60 shadow-sm">
              <FiHeart className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                No saved studios yet
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Click the heart icon on any studio card to keep track of spaces you want to book later.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all duration-200"
              >
                <FiCompass className="w-4 h-4" />
                <span>Explore Studios</span>
              </Link>
            </div>
          </div>
        )}

        {/* 4. Saved Studios Grid */}
        {!showSkeleton && !error && visible.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((s) => (
              <StudioCard key={s._id} studio={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}