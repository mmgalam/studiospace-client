"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  FiEdit2,
  FiTrash2,
  FiMapPin,
  FiPlus,
  FiEye,
  FiLayers,
  FiRefreshCw,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import StudioCardSkeleton from "./StudioCardSkeleton";
import ConfirmModal from "./ConfirmModal";
import type { Studio } from "@/lib/types";

// ডাটাবেসের উভয় ফিল্ড (image ও images) সাপোর্ট করার জন্য সেফ টাইপ
type SafeStudio = Studio & {
  image?: string;
  images?: string[];
};

export default function MyListings() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [studios, setStudios] = useState<SafeStudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [target, setTarget] = useState<SafeStudio | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!email) return;
    const controller = new AbortController();

    apiFetch("/my-studios", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load your studios");
        return res.json();
      })
      .then((data: SafeStudio[]) => {
        setStudios(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, [email]);

  const handleDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/studios/${target._id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.message ?? "Could not delete the studio.");
        return;
      }

      setStudios((prev) => prev.filter((s) => s._id !== target._id));
      toast.success("Studio deleted successfully.");
      setTarget(null);
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const showSkeleton = isPending || (email && loading);

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-180 h-72 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <FiLayers className="w-3.5 h-3.5" /> Workspace Management
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              My Studio Listings
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Inspect, update equipment details, or manage creative spaces you
              host on StudioSpace[cite: 1].
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 active:scale-[0.98] transition-all cursor-pointer shrink-0"
          >
            <FiPlus className="h-4 w-4" />
            <span>Add New Studio</span>
          </Link>
        </div>

        {/* Content Section */}
        {showSkeleton ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <StudioCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-dashed border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 p-12 text-center">
            <p className="font-semibold text-red-600 dark:text-red-400">
              We couldn&apos;t load your studio listings right now.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Please check your network connection and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
            >
              <FiRefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        ) : studios.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-12 text-center backdrop-blur-sm">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <FiLayers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              You haven&apos;t listed any studios yet.
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Share your photo sets, podcast suites, or sound stages to start
              hosting creator productions[cite: 1].
            </p>
            <Link
              href="/add-studio"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition"
            >
              <FiPlus className="w-3.5 h-3.5" /> List your first studio
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((s) => {
              // ইমেজ অ্যারে বা স্ট্রিং যেকোনো ফরম্যাট সমর্থন
              const thumbnail =
                s.images?.[0] ||
                s.image ||
                "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800";

              return (
                <div
                  key={s._id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-500/50"
                >
                  {/* Studio Image Header */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnail}
                      alt={s.title || "Studio thumbnail"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-slate-950/75 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/10">
                      {s.category}
                    </span>

                    {/* Quick View Public Listing Link */}
                    <Link
                      href={`/studios/${s._id}`}
                      target="_blank"
                      className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
                      title="View public page"
                    >
                      <FiEye className="w-3.5 h-3.5" /> View
                    </Link>
                  </div>

                  {/* Studio Info Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-1 text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {s.title}
                    </h3>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <FiMapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">
                        {s.location || "Location not set"}
                      </span>
                    </p>

                    <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3">
                      <div>
                        <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                          ${s.hourlyRate}
                        </span>
                        <span className="text-xs text-slate-500 font-normal">
                          {" "}
                          / hr
                        </span>
                      </div>
                      {s.securityDeposit ? (
                        <span className="text-[11px] font-medium text-slate-400">
                          Dep: ${s.securityDeposit}
                        </span>
                      ) : null}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto flex gap-2.5 pt-5">
                      <Link
                        href={`/studios/edit/${s._id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <FiEdit2 className="h-3.5 w-3.5" /> Update
                      </Link>

                      <button
                        type="button"
                        onClick={() => setTarget(s)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200/60 dark:border-red-900/60 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {target && (
          <ConfirmModal
            title="Delete this studio?"
            message={`"${target.title}" will be permanently removed from StudioSpace[cite: 1]. Active reservations may be affected.`}
            confirmLabel="Yes, delete"
            cancelLabel="Keep listing"
            loading={deleting}
            onConfirm={handleDelete}
            onCancel={() => setTarget(null)}
          />
        )}
      </div>
    </div>
  );
}
