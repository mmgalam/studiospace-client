"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiDollarSign,
  FiCheck,
  FiX,
  FiCheckCircle,
  FiInbox,
  FiLoader,
  FiFilter,
  FiArrowRight,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import type { Booking } from "@/lib/types";

// এক্সটেন্ডেড টাইপ সাপোর্ট যাতে ফিল্ড নেম অমিল হলেও এরর না আসে
type SafeBooking = Booking & {
  bookingDate?: string;
  totalCost?: number;
  totalHours?: number;
};

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

export default function HostBookings() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [bookings, setBookings] = useState<SafeBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  useEffect(() => {
    if (!email) return;
    const controller = new AbortController();

    apiFetch("/host-bookings", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load host reservations");
        return res.json();
      })
      .then((data: SafeBooking[]) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, [email]);

  const updateStatus = async (
    id: string,
    status: "Confirmed" | "Completed" | "Cancelled",
  ) => {
    setBusyId(id);
    try {
      const res = await apiFetch(`/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.message ?? "Could not update the booking status.");
        return;
      }

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b)),
      );

      if (status === "Confirmed") toast.success("Booking request approved!");
      else if (status === "Completed")
        toast.success("Marked as shoot completed.");
      else if (status === "Cancelled") toast.info("Booking request declined.");
    } catch {
      toast.error("Could not reach the server. Please check your connection.");
    } finally {
      setBusyId("");
    }
  };

  const showSkeleton = isPending || (email && loading);

  // ফিল্টার লজিক
  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === "All") return true;
    return b.status === statusFilter;
  });

  // কাউন্টার ক্যালকুলেশন
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const confirmedCount = bookings.filter(
    (b) => b.status === "Confirmed",
  ).length;

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-175 h-72 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-2">
              <FiInbox className="w-3.5 h-3.5" /> Host Operations
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Booking Requests
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Review, approve, and manage incoming reservations for your studio
              spaces.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-sm">
              <span className="block text-xs font-medium text-slate-500">
                Pending
              </span>
              <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                {pendingCount}
              </span>
            </div>
            <div className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-sm">
              <span className="block text-xs font-medium text-slate-500">
                Active
              </span>
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                {confirmedCount}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        {!showSkeleton && !error && bookings.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs font-semibold select-none no-scrollbar">
            <span className="flex items-center gap-1 text-slate-400 pr-1">
              <FiFilter className="w-3.5 h-3.5" /> Filter:
            </span>
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    statusFilter === tab
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        )}

        {/* Content Body */}
        {showSkeleton ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-dashed border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 p-12 text-center">
            <p className="font-semibold text-red-600 dark:text-red-400">
              We couldn&apos;t load booking requests right now.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 p-12 text-center backdrop-blur-sm">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <FiInbox className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {statusFilter === "All"
                ? "No booking requests yet"
                : `No ${statusFilter.toLowerCase()} requests`}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              When creators schedule time at your workspaces, their production
              requests will appear here.
            </p>
            {statusFilter === "All" && (
              <Link
                href="/my-listings"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
              >
                <span>View My Studio Listings</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => {
              const displayDate = b.date || b.bookingDate || "Date TBD";
              const totalAmount = Number(b.totalPrice ?? b.totalCost ?? 0);
              const durationHours = b.hours ?? b.totalHours;

              return (
                <div
                  key={b._id}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700"
                >
                  {/* Reservation Details */}
                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="truncate text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {b.studioTitle || "Creative Stage Booking"}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${badgeStyle[b.status] || "bg-slate-100 text-slate-700"}`}
                      >
                        {b.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
                      <p className="flex items-center gap-2">
                        <FiUser className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="truncate">
                          <strong className="text-slate-700 dark:text-slate-300 font-medium">
                            {b.userName || "Creator"}
                          </strong>{" "}
                          ({b.userEmail || "No email"})
                        </span>
                      </p>

                      <p className="flex items-center gap-2">
                        <FiCalendar className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>{displayDate}</span>
                      </p>

                      <p className="flex items-center gap-2">
                        <FiClock className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>
                          {b.startTime} – {b.endTime}{" "}
                          {durationHours ? `(${durationHours} hrs)` : ""}
                        </span>
                      </p>

                      <p className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-200">
                        <FiDollarSign className="h-4 w-4 text-indigo-500 shrink-0" />
                        <span>Total: ${totalAmount.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex shrink-0 items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                    {/* Pending Actions: Confirm & Decline */}
                    {b.status === "Pending" && (
                      <>
                        <button
                          type="button"
                          disabled={busyId === b._id}
                          onClick={() => updateStatus(b._id, "Cancelled")}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {busyId === b._id ? (
                            <FiLoader className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <FiX className="w-3.5 h-3.5" />
                          )}
                          <span>Decline</span>
                        </button>

                        <button
                          type="button"
                          disabled={busyId === b._id}
                          onClick={() => updateStatus(b._id, "Confirmed")}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {busyId === b._id ? (
                            <FiLoader className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <FiCheck className="w-3.5 h-3.5" />
                          )}
                          <span>Approve Slot</span>
                        </button>
                      </>
                    )}

                    {/* Confirmed Action: Mark Completed */}
                    {b.status === "Confirmed" && (
                      <button
                        type="button"
                        disabled={busyId === b._id}
                        onClick={() => updateStatus(b._id, "Completed")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {busyId === b._id ? (
                          <FiLoader className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FiCheckCircle className="w-3.5 h-3.5" />
                        )}
                        <span>Mark Completed</span>
                      </button>
                    )}

                    {/* Terminal States */}
                    {(b.status === "Completed" || b.status === "Cancelled") && (
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 italic">
                        Archived
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
