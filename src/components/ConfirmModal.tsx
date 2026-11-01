"use client";

import React, { useEffect } from "react";
import { FiAlertTriangle, FiLoader } from "react-icons/fi";

interface Props {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  loadingLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmLabel,
  cancelLabel = "Keep it",
  loadingLabel = "Deleting...",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  // ESC key প্রেস করলে মডাল ক্লোজ হবে
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel, loading]);

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 transition-all duration-200"
      onClick={!loading ? onCancel : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon Badge */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100/80 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50">
          <FiAlertTriangle className="h-6 w-6" />
        </div>

        {/* Modal Title & Message */}
        <h2
          id="confirm-modal-title"
          className="mt-4 text-lg font-bold text-slate-900 dark:text-white"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-600/20 hover:bg-red-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                <span>{loadingLabel}</span>
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
