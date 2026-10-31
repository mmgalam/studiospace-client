"use client";

import { FiAlertTriangle } from "react-icons/fi";

interface Props {
  title: string;
  message: string;
  confirmLabel: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmLabel,
  loading,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950 text-red-600">
          <FiAlertTriangle className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-lg font-bold">{title}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {message}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            Keep it
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
