import Link from "next/link";
import { FiMapPin, FiStar } from "react-icons/fi";
import type { Studio } from "@/lib/types";

export default function StudioCard({ studio }: { studio: Studio }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition">
      <div className="relative h-52 w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={studio.image}
          alt={studio.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white">
          {studio.category}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 dark:bg-slate-900/90 px-2.5 py-1 text-xs font-semibold">
          <FiStar className="h-3.5 w-3.5 text-amber-500" />
          {studio.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-semibold">{studio.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
          <FiMapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            ${studio.hourlyRate}
            <span className="text-sm font-normal text-slate-500"> / hr</span>
          </p>
          <Link
            href={`/studios/${studio._id}`}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
