"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiDownload,
  FiXCircle,
  FiBookmark,
  FiFilter,
  FiLoader,
  FiRefreshCw,
  FiCompass,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import ConfirmModal from "./ConfirmModal";
import type { Booking } from "@/lib/types";
import { downloadInvoice } from "@/lib/invoice";

type SafeBooking = Booking & {
  studioImage?: string;
  image?: string;
  images?: string[];
  studioLocation?: string;
  location?: string;
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

export default function MyBookings() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [bookings, setBookings] = useState<SafeBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [target, setTarget] = useState<SafeBooking | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  useEffect(() => {
    if (!email) return;
    const controller = new AbortController();

    apiFetch("/my-bookings", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load your reservations");
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

  const handleCancel = async () => {
    if (!target) return;
    setCancelling(true);
    try {
      const res = await apiFetch(`/bookings/${target._id}/cancel`, {
        method: "PATCH",
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.message ?? "Could not cancel the booking.");
        return;
      }

      setBookings((prev) =>
        prev.map((b) =>
          b._id === target._id ? { ...b, status: "Cancelled" } : b,
        ),
      );
      toast.success("Booking cancelled successfully.");
      setTarget(null);
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  const handleDownloadInvoice = async (b: SafeBooking) => {
    setDownloadingId(b._id);
    try {
      await downloadInvoice(
        b,
        session?.user?.name ?? "Creator",
        session?.user?.email ?? "",
      );
      toast.success("Invoice downloaded successfully.");
    } catch {
      toast.error("Could not generate the invoice.");
    } finally {
      setDownloadingId(null);
    }
  };

  const showSkeleton = isPending || (email && loading);

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === "All") return true;
    return b.status === statusFilter;
  });

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-200 h-80 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <FiBookmark className="w-3.5 h-3.5" /> Production Schedule
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              My Bookings
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Track studio reservation statuses, load-in timings, and download
              invoices[cite: 1, 3].
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer shrink-0"
          >
            <FiCompass className="w-4 h-4" />
            <span>Find a Studio</span>
          </Link>
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
                className="h-36 animate-pulse rounded-3xl bg-slate-200/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-dashed border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 p-12 text-center">
            <p className="font-semibold text-rose-600 dark:text-rose-400">
              We couldn&apos;t load your bookings right now.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Please check your connection and refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition"
            >
              <FiRefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-12 text-center backdrop-blur-sm space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FiBookmark className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {statusFilter === "All"
                ? "You haven't booked any studios yet"
                : `No ${statusFilter.toLowerCase()} bookings found`}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Explore photo lofts, podcast booths, or cycloramas to schedule
              your shoot[cite: 1, 3].
            </p>
            {statusFilter === "All" && (
              <div className="pt-2">
                <Link
                  href="/studios"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition"
                >
                  <FiCompass className="w-3.5 h-3.5" />
                  <span>Explore Studios</span>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => {
              const imageSrc =
                b.studioImage ||
                b.images?.[0] ||
                b.image ||
                "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800";

              const displayDate = b.date || b.bookingDate || "Date TBD";
              const totalAmount = Number(b.totalPrice ?? b.totalCost ?? 0);
              const durationHours = b.hours ?? b.totalHours;

              return (
                <div
                  key={b._id}
                  className="group flex flex-col sm:flex-row overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-xl hover:border-indigo-500/50"
                >
                  {/* Studio Image Thumbnail with Responsive Next.js Image */}
                  <div className="relative h-48 sm:h-auto sm:w-56 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={imageSrc}
                      alt={b.studioTitle || "Studio photo"}
                      fill
                      sizes="(max-width: 640px) 100vw, 224px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>

                  {/* Booking Details & Actions */}
                  <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6 sm:flex-row sm:items-center">
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={`/studios/${b.studioId}`}
                          className="truncate text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {b.studioTitle || "Creative Stage Booking"}
                        </Link>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${badgeStyle[b.status] || "bg-slate-100 text-slate-700"}`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        <p className="flex items-center gap-2">
                          <FiCalendar className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                          <span>{displayDate}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <FiClock className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                          <span>
                            {b.startTime} – {b.endTime}{" "}
                            {durationHours ? `(${durationHours} hrs)` : ""}
                          </span>
                        </p>
                        {(b.studioLocation || b.location) && (
                          <p className="flex items-center gap-2">
                            <FiMapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">
                              {b.studioLocation || b.location}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                      <div className="sm:text-right">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Amount Due
                        </p>
                        <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                          ${totalAmount.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Cancel Button (For Pending Bookings) */}
                        {b.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => setTarget(b)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
                          >
                            <FiXCircle className="w-3.5 h-3.5" />
                            <span>Cancel Booking</span>
                          </button>
                        )}

                        {/* Invoice Button (For Confirmed & Completed Bookings) */}
                        {(b.status === "Confirmed" ||
                          b.status === "Completed") && (
                          <button
                            type="button"
                            disabled={downloadingId === b._id}
                            onClick={() => handleDownloadInvoice(b)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                          >
                            {downloadingId === b._id ? (
                              <FiLoader className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <FiDownload className="w-3.5 h-3.5" />
                            )}
                            <span>Invoice</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {target && (
          <ConfirmModal
            title="Cancel this reservation?"
            message={`Your pending booking request for "${target.studioTitle}" on ${target.date || target.bookingDate} will be permanently cancelled.`}
            confirmLabel="Yes, cancel booking"
            cancelLabel="Keep reservation"
            loadingLabel="Cancelling..."
            loading={cancelling}
            onConfirm={handleCancel}
            onCancel={() => setTarget(null)}
          />
        )}
      </div>
    </div>
  );
}
