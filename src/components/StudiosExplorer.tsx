"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";
import type { Studio } from "@/lib/types";

const categories = [
  { label: "All", value: "" },
  { label: "Photo Studios", value: "Photo Studio" },
  { label: "Sound Stages", value: "Film Stage" },
  { label: "Podcast Rooms", value: "Podcast Lounge" },
  { label: "Music Suites", value: "Music Suite" },
  { label: "Art Workshops", value: "Workshop" },
];

const sortOptions = [
  { label: "Top Rated", value: "rating" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function StudiosExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const category = params.get("category") ?? "";
  const search = params.get("search") ?? "";
  const sort = params.get("sort") ?? "rating";

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchInput, setSearchInput] = useState(search);

  // URL-এর query বদলালে নতুন করে ডেটা আনা
  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams();
    if (category) query.set("category", category);
    if (search) query.set("search", search);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/studios?${query.toString()}`,
      {
        signal: controller.signal,
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data: Studio[]) => {
        setStudios(data);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, [category, search]);

  const updateParams = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    setLoading(true);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateParams({ search: searchInput.trim() });
  };

  const clearFilters = () => {
    setSearchInput("");
    setLoading(true);
    router.replace(pathname, { scroll: false });
  };

  const sorted = [...studios].sort((a, b) => {
    if (sort === "price-asc") return a.hourlyRate - b.hourlyRate;
    if (sort === "price-desc") return b.hourlyRate - a.hourlyRate;
    return b.rating - a.rating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore Studios</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Find the right space for your next shoot, session or workshop.
        </p>
      </div>

      {/* Search + sort */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <form onSubmit={handleSearch} className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search studios by name..."
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 cursor-pointer">
            Search
          </button>
        </form>

        <select
          value={sort}
          onChange={(e) =>
            updateParams({
              sort: e.target.value === "rating" ? "" : e.target.value,
            })
          }
          className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Sort studios"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = category === c.value;
          return (
            <button
              key={c.label}
              onClick={() => updateParams({ category: c.value })}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition cursor-pointer ${
                active
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <StudioCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <p className="font-medium">
            We couldn&apos;t load the studios right now.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Please check your connection and try again.
          </p>
        </div>
      ) : sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <p className="font-medium">No studios match your search.</p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different keyword or category.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={clearFilters}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 cursor-pointer"
            >
              Clear filters
            </button>
            <Link
              href="/add-studio"
              className="rounded-lg border border-slate-300 dark:border-slate-700 px-5 py-2 text-sm font-medium hover:border-indigo-500"
            >
              List your own studio
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {sorted.length} {sorted.length === 1 ? "studio" : "studios"} found
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((s) => (
              <StudioCard key={s._id} studio={s} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
