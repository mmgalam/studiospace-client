import Link from "next/link";
import { Suspense } from "react";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";
import type { Studio } from "@/lib/types";

async function FeaturedList() {
  let studios: Studio[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/studios/featured`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Failed to load");
    studios = await res.json();
  } catch {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
        <p className="font-medium">
          We couldn&apos;t load the featured studios right now.
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Please check your connection and refresh the page.
        </p>
      </div>
    );
  }

  if (studios.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
        <p className="font-medium">No studios have been listed yet.</p>
        <Link
          href="/add-studio"
          className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          List the first studio
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((s) => (
        <StudioCard key={s._id} studio={s} />
      ))}
    </div>
  );
}

export default function FeaturedStudios() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Featured Studios</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Our top-rated creative spaces, loved by filmmakers, photographers
            and musicians.
          </p>
        </div>
        <Link
          href="/studios"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          View all studios →
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <StudioCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <FeaturedList />
      </Suspense>
    </section>
  );
}
