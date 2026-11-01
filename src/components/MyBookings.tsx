"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import ConfirmModal from "./ConfirmModal";
import type { Booking } from "@/lib/types";
import { FiDownload } from "react-icons/fi";
import { downloadInvoice } from "@/lib/invoice";

const badgeStyle: Record<Booking["status"], string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Confirmed:
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  Completed: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export default function MyBookings() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user.email;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [target, setTarget] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!email) return;
    const controller = new AbortController();

    apiFetch("/my-bookings", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data: Booking[]) => {
        setBookings(data);
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
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message ?? "Could not cancel the booking.");
        return;
      }
      setBookings((prev) =>
        prev.map((b) =>
          b._id === target._id ? { ...b, status: "Cancelled" } : b,
        ),
      );
      toast.success("Booking cancelled.");
      setTarget(null);
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  const showSkeleton = isPending || (email && loading);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Track your studio reservations and their status.
        </p>
      </div>

      {showSkeleton ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <p className="font-medium">
            We couldn&apos;t load your bookings right now.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Please check your connection and refresh.
          </p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <p className="font-medium">
            You haven&apos;t booked any studios yet.
          </p>
          <Link
            href="/studios"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Explore Studios
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm sm:flex-row"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.studioImage}
                alt={b.studioTitle}
                className="h-40 w-full object-cover sm:h-auto sm:w-48"
              />
              <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/studios/${b.studioId}`}
                      className="truncate text-lg font-semibold hover:text-indigo-600"
                    >
                      {b.studioTitle}
                    </Link>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <p className="flex items-center gap-2">
                      <FiCalendar className="h-4 w-4" />
                      {b.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiClock className="h-4 w-4" />
                      {b.startTime} – {b.endTime} ({b.hours} hr)
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMapPin className="h-4 w-4" />
                      {b.studioLocation}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    ${b.totalPrice.toFixed(2)}
                  </p>
                  {b.status === "Pending" && (
                    <button
                      onClick={() => setTarget(b)}
                      className="rounded-lg border border-red-300 dark:border-red-800 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                    >
                      Cancel Booking
                    </button>
                  )}
                  {(b.status === "Confirmed" || b.status === "Completed") && (
                    <button
                      onClick={async () => {
                        try {
                          await downloadInvoice(
                            b,
                            session?.user.name ?? "Guest",
                            session?.user.email ?? "",
                          );
                          toast.success("Invoice downloaded.");
                        } catch {
                          toast.error("Could not generate the invoice.");
                        }
                      }}
                      className="flex items-center gap-2 rounded-lg border border-indigo-300 dark:border-indigo-800 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 cursor-pointer"
                    >
                      <FiDownload className="h-4 w-4" /> Invoice
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {target && (
        <ConfirmModal
          title="Cancel this booking?"
          message={`Your pending request for "${target.studioTitle}" on ${target.date} will be cancelled.`}
          confirmLabel="Yes, cancel"
          cancelLabel="Keep booking"
          loadingLabel="Cancelling..."
          loading={cancelling}
          onConfirm={handleCancel}
          onCancel={() => setTarget(null)}
        />
      )}
    </div>
  );
}
