"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { FiMail, FiArrowRight, FiCheck } from "react-icons/fi";

export default function NewsletterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    // সাবস্ক্রিপশন সিমিউলেশন ও ফিডব্যাক
    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success(
      `Thanks! ${email} has been subscribed to StudioSpace updates.`,
    );
    setSubscribed(true);
    setSubmitting(false);
    form.reset();

    // 4 সেকেন্ড পর বাটন রিস্টোর
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mt-3">
      <div className="relative flex items-center">
        {/* ইমেইল আইকন */}
        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-colors" />

        {/* ইনপুট ফিল্ড */}
        <input
          name="email"
          type="email"
          required
          placeholder="creator@studiospace.io"
          disabled={submitting || subscribed}
          className="w-full pl-10 pr-24 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all shadow-inner disabled:opacity-60"
        />

        {/* সাবমিট বাটন */}
        <button
          type="submit"
          disabled={submitting || subscribed}
          className={`absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm disabled:cursor-not-allowed ${
            subscribed
              ? "bg-emerald-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-indigo-600/20"
          }`}
        >
          {submitting ? (
            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : subscribed ? (
            <>
              <FiCheck className="w-3.5 h-3.5" />
              <span>Joined</span>
            </>
          ) : (
            <>
              <span>Join</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
      <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
        No spam ever. Unsubscribe anytime with a single click.
      </p>
    </form>
  );
}
