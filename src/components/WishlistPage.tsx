"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useWishlist } from "./WishlistProvider";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";
import type { Studio } from "@/lib/types";

export default function WishlistPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user.email;
  const { ids } = useWishlist();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!email) return;
    const controller = new AbortController();
    apiFetch("/wishlist/studios", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((data: Studio[]) => {
        setStudios(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });
    return () => controller.abort();
  }, [email]);

  // হার্ট বন্ধ করলে তালিকা থেকে সঙ্গে সঙ্গে সরে যাবে
  const visible = studios.filter((s) => ids.includes(s._id));
  const showSkeleton = isPending || (email && loading);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold">Saved Studios</h1>
      <p className="mt-2 mb-8 text-slate-600 dark:text-slate-400">
        Your favourite creative spaces, all in one place.
      </p>

      {showSkeleton ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StudioCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <p className="font-medium">
            We couldn&apos;t load your saved studios.
          </p>
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <p className="font-medium">You haven&apos;t saved any studios yet.</p>
          <Link
            href="/studios"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Explore Studios
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <StudioCard key={s._id} studio={s} />
          ))}
        </div>
      )}
    </div>
  );
}
