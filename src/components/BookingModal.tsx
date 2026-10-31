"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import type { Studio } from "@/lib/types";

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
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const hours =
    startTime && endTime && endTime > startTime
      ? (Number(endTime.split(":")[0]) * 60 +
          Number(endTime.split(":")[1]) -
          (Number(startTime.split(":")[0]) * 60 +
            Number(startTime.split(":")[1]))) /
        60
      : 0;
  const total = hours * studio.hourlyRate;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please log in to book a studio.");
      router.push(`/login?redirect=/studios/${studio._id}`);
      return;
    }
    if (!date || !startTime || !endTime) {
      toast.error("Please choose a date and time range.");
      return;
    }
    if (endTime <= startTime) {
      toast.error("End time must be after the start time.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studioId: studio._id,
            date,
            startTime,
            endTime,
            userEmail: session.user.email,
            userName: session.user.name,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message ?? "Could not complete the booking.");
        return;
      }
      toast.success("Booking request sent! The host will confirm shortly.");
      onClose();
      router.push("/my-bookings");
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const input =
    "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">Book this studio</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {studio.title}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Date</label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={input}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Start time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={input}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">End time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={input}
              />
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-sm">
            <div className="flex justify-between">
              <span>
                ${studio.hourlyRate} × {hours.toFixed(1)} hr
              </span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-1 flex justify-between text-slate-500">
              <span>Security deposit (refundable)</span>
              <span>${studio.securityDeposit}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-semibold">
              <span>Due now</span>
              <span>${(total + studio.securityDeposit).toFixed(2)}</span>
            </div>
          </div>

          <button
            disabled={submitting}
            className="w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
