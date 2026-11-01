"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FiSearch,
  FiX,
  FiSliders,
  FiCompass,
  FiRefreshCw,
  FiPlus,
  FiLayers,
} from "react-icons/fi";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";
import type { Studio } from "@/lib/types";

const categories = [
  { label: "All Spaces", value: "" },
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

  // Search input state
  const [searchInput, setSearchInput] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);

  // URL search param পরিবর্তন হলে Effect ছাড়াই রেন্ডার চলাকালীন স্টেট সিঙ্ক (React Recommended Pattern)
  if (prevSearch !== search) {
    setPrevSearch(search);
    setSearchInput(search);
  }

  // Fetch studios when category or search query changes
  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams();
    if (category) query.set("category", category);
    if (search) query.set("search", search);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/studios?${query.toString()}`,
      { signal: controller.signal },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load studios");
        return res.json();
      })
      .then((data: Studio[]) => {
        setStudios(Array.isArray(data) ? data : []);
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
    if (sort === "price-asc") return (a.hourlyRate ?? 0) - (b.hourlyRate ?? 0);
    if (sort === "price-desc") return (b.hourlyRate ?? 0) - (a.hourlyRate ?? 0);
    return (b.rating ?? 5) - (a.rating ?? 5);
  });

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12">
      {/* Decorative ambient background blur */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-212.5 h-80 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <FiCompass className="w-3.5 h-3.5" /> Studio Discovery
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Explore Studios
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Discover, compare, and reserve cyclorama stages, podcast suites,
              and audio booths with conflict-free scheduling[cite: 1].
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer shrink-0"
          >
            <FiPlus className="w-4 h-4" />
            <span>Host Your Space</span>
          </Link>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <form
            onSubmit={handleSearch}
            className="flex-1 relative flex items-center"
          >
            <FiSearch className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search studios by title, amenities, or location..."
              className="w-full pl-10 pr-24 py-2.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition shadow-inner"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  updateParams({ search: "" });
                }}
                className="absolute right-20 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                aria-label="Clear search"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-sm transition cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Sort Dropdown */}
          <div className="relative min-w-50">
            <FiSliders className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={sort}
              onChange={(e) =>
                updateParams({
                  sort: e.target.value === "rating" ? "" : e.target.value,
                })
              }
              className="w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 cursor-pointer appearance-none shadow-sm"
              aria-label="Sort studios"
            >
              {sortOptions.map((o) => (
                <option
                  key={o.value}
                  value={o.value}
                  className="dark:bg-slate-900"
                >
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 select-none no-scrollbar">
          {categories.map((c) => {
            const active = category === c.value;
            return (
              <button
                key={c.label}
                onClick={() => updateParams({ category: c.value })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                  active
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25"
                    : "bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Active Query Badges / Result Count */}
        {!loading && !error && (
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-4">
            <p>
              Showing{" "}
              <strong className="text-slate-900 dark:text-white font-mono font-bold">
                {sorted.length}
              </strong>{" "}
              {sorted.length === 1 ? "studio" : "studios"}
            </p>

            {(category || search) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                <FiX className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        )}

        {/* Results / Feedback States */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <StudioCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 p-12 text-center space-y-4 max-w-md mx-auto">
            <FiRefreshCw className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Failed to load studios
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Could not retrieve listings from the server. Please check your
              connection and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : sorted.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-12 text-center backdrop-blur-sm space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-100 dark:border-indigo-900/60 shadow-sm">
              <FiLayers className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                No studios matched your filters
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching with a different studio keyword or browse another
                category.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
              >
                Clear Filters
              </button>
              <Link
                href="/add-studio"
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-400 transition"
              >
                List Your Own Studio
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((s) => (
              <StudioCard key={s._id} studio={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
