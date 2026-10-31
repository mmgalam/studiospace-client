"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import type { Booking } from "@/lib/types";

const badgeStyle: Record<Booking["status"], string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Confirmed:
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  Completed: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export default function HostBookings() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user.email;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busyId, setBusyId] = useState("");

  useEffect(() => {
    if (!email) return;
    const controller = new AbortController();

    apiFetch("/host-bookings", { signal: controller.signal })
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

  const updateStatus = async (
    id: string,
    status: "Confirmed" | "Completed",
  ) => {
    setBusyId(id);
    try {
      const res = await apiFetch(`/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message ?? "Could not update the booking.");
        return;
      }
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b)),
      );
      toast.success(
        status === "Confirmed"
          ? "Booking confirmed."
          : "Booking marked as completed.",
      );
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setBusyId("");
    }
  };

  const showSkeleton = isPending || (email && loading);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Booking Requests</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Review and manage reservations for the studios you host.
        </p>
      </div>

      {showSkeleton ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <p className="font-medium">
            We couldn&apos;t load booking requests right now.
          </p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <p className="font-medium">No booking requests yet.</p>
          <Link
            href="/my-listings"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            View My Listings
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="truncate text-lg font-semibold">
                    {b.studioTitle}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle[b.status]}`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <p className="flex items-center gap-2">
                    <FiUser className="h-4 w-4" />
                    {b.userName} ({b.userEmail})
                  </p>
                  <p className="flex items-center gap-2">
                    <FiCalendar className="h-4 w-4" />
                    {b.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiClock className="h-4 w-4" />
                    {b.startTime} – {b.endTime} ({b.hours} hr)
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  ${b.totalPrice.toFixed(2)}
                </p>
                {b.status === "Pending" && (
                  <button
                    disabled={busyId === b._id}
                    onClick={() => updateStatus(b._id, "Confirmed")}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60 cursor-pointer"
                  >
                    Confirm
                  </button>
                )}
                {b.status === "Confirmed" && (
                  <button
                    disabled={busyId === b._id}
                    onClick={() => updateStatus(b._id, "Completed")}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
