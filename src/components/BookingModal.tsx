"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FiX,
  FiCalendar,
  FiClock,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiMapPin,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import type { Studio } from "@/lib/types";
import Image from "next/image";

const toMinutes = (t: string) => {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export default function BookingModal({
  studio,
  onClose,
}: {
  studio: Studio;
  onClose: () => void;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("14:00");
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // ক্যালকুলেশন
  const durationMinutes =
    startTime && endTime && endTime > startTime
      ? toMinutes(endTime) - toMinutes(startTime)
      : 0;

  const hours = durationMinutes > 0 ? durationMinutes / 60 : 0;
  const rentalTotal = hours * studio.hourlyRate;
  const deposit = Number(studio.securityDeposit) || 0;
  const grandTotal = rentalTotal + deposit;

  // Escape কী চাপলে মডাল ক্লোজ
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please log in to book a studio.");
      router.push(`/login?redirect=/studios/${studio._id}`);
      return;
    }

    if (!date || !startTime || !endTime) {
      toast.error("Please select both a production date and time range.");
      return;
    }

    if (toMinutes(endTime) <= toMinutes(startTime)) {
      toast.error("Wrap-up end time must be after the start time.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch("/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studioId: studio._id,
          date,
          startTime,
          endTime,
          totalHours: hours,
          totalPrice: grandTotal,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 409) {
        toast.error(
          data.message ||
            "This time slot overlaps with an existing confirmed booking.",
        );
        return;
      }

      if (!res.ok) {
        toast.error(data.message ?? "Could not complete the booking request.");
        return;
      }

      toast.success("Booking request sent! The host will review and confirm.");
      onClose();
      router.push("/my-bookings");
      router.refresh();
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-32 bg-indigo-500/15 dark:bg-indigo-600/20 blur-2xl rounded-full"
          aria-hidden="true"
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
          <div className="flex items-center gap-3.5">
            {studio.images?.[0] && (
              <Image
                src={studio.images[0]}
                alt={studio.title}
                className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
              />
            )}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
                {studio.category || "Creative Studio"}
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                Reserve Studio Slot
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <FiMapPin className="w-3 h-3 text-slate-400" />
                <span className="line-clamp-1">
                  {studio.location || studio.title}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Production Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Production Date *
            </label>
            <div className="relative">
              <input
                type="date"
                required
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition"
              />
              <FiCalendar className="absolute left-3.5 top-3 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Shoot Hours Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Load-in Start *
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition"
                />
                <FiClock className="absolute left-3.5 top-3 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Wrap-up End *
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition"
                />
                <FiClock className="absolute left-3.5 top-3 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span>Studio Rental</span>
                <span className="px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                  {hours.toFixed(1)} hrs
                </span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                ${studio.hourlyRate} × {hours.toFixed(1)} = $
                {rentalTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <FiShield className="w-3.5 h-3.5" />
                <span>Security Deposit (Refundable)</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                ${deposit.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-slate-200/80 dark:border-slate-700/70 pt-2.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Total Amount Due
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Includes gear deposit hold
                </p>
              </div>
              <span className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Double-Booking Safety Note */}
          <div className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/20 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
            <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              Real-time slot lock active. Instant status tracking will be
              enabled in <strong>My Bookings</strong>.
            </span>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || hours <= 0}
              className="flex-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Confirm Booking Request</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
