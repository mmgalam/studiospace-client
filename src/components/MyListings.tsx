"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiEdit2, FiTrash2, FiMapPin } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import StudioCardSkeleton from "./StudioCardSkeleton";
import ConfirmModal from "./ConfirmModal";
import type { Studio } from "@/lib/types";

export default function MyListings() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user.email;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [target, setTarget] = useState<Studio | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!email) return;
    const controller = new AbortController();

    apiFetch("/my-studios", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data: Studio[]) => {
        setStudios(data);
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
      const data = await res.json();
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Studio Listings</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Manage the creative spaces you host on StudioSpace.
          </p>
        </div>
        <Link
          href="/add-studio"
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Add New Studio
        </Link>
      </div>

      {showSkeleton ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StudioCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <p className="font-medium">
            We couldn&apos;t load your listings right now.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Please check your connection and refresh.
          </p>
        </div>
      ) : studios.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <p className="font-medium">
            You haven&apos;t listed any studios yet.
          </p>
          <Link
            href="/add-studio"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            List your first studio
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((s) => (
            <div
              key={s._id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
            >
              <div className="relative h-48 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white">
                  {s.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-1 text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <FiMapPin className="h-4 w-4 shrink-0" />
                  <span className="line-clamp-1">{s.location}</span>
                </p>
                <p className="mt-3 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  ${s.hourlyRate}
                  <span className="text-sm font-normal text-slate-500">
                    {" "}
                    / hr
                  </span>
                </p>

                <div className="mt-auto flex gap-3 pt-5">
                  <Link
                    href={`/studios/edit/${s._id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 py-2 text-sm font-medium hover:border-indigo-500 hover:text-indigo-600"
                  >
                    <FiEdit2 className="h-4 w-4" /> Update
                  </Link>
                  <button
                    onClick={() => setTarget(s)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
                  >
                    <FiTrash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {target && (
        <ConfirmModal
          title="Delete this studio?"
          message={`"${target.title}" will be permanently removed from StudioSpace. This action cannot be undone.`}
          confirmLabel="Yes, delete"
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setTarget(null)}
        />
      )}
    </div>
  );
}
