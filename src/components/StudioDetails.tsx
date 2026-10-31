"use client";

import { useState } from "react";
import { FiMapPin, FiStar, FiUsers, FiCheck, FiShield } from "react-icons/fi";
import StudioGallery from "./StudioGallery";
import BookingModal from "./BookingModal";
import type { Studio } from "@/lib/types";

const extraImages = [
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
];

export default function StudioDetails({ studio }: { studio: Studio }) {
  const [open, setOpen] = useState(false);
  const images = [studio.image, ...extraImages];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <StudioGallery images={images} title={studio.title} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white">
            {studio.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold">{studio.title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <FiMapPin className="h-4 w-4" />
              {studio.location}
            </span>
            <span className="flex items-center gap-1.5">
              <FiStar className="h-4 w-4 text-amber-500" />
              {studio.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1.5">
              <FiUsers className="h-4 w-4" />
              Up to {studio.maxCapacity} people
            </span>
          </div>

          <h2 className="mt-8 text-xl font-semibold">Overview</h2>
          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
            {studio.overview}
          </p>

          <h2 className="mt-8 text-xl font-semibold">Amenities</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {studio.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm">
                <FiCheck className="h-4 w-4 text-indigo-600" />
                {a}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-semibold">Reviews</h2>
          <div className="mt-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center text-sm text-slate-500">
            No reviews yet. Be the first to book and share your experience.
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm lg:sticky lg:top-24">
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            ${studio.hourlyRate}
            <span className="text-base font-normal text-slate-500"> / hr</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Security deposit: ${studio.securityDeposit}
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-5 w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 cursor-pointer"
          >
            Book Workspace Now
          </button>

          <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Hosted by
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                {studio.ownerName.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium">{studio.ownerName}</p>
                <p className="truncate text-xs text-slate-500">
                  {studio.ownerEmail}
                </p>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <FiShield className="h-4 w-4" /> Covered by the StudioSpace Host
              Guarantee
            </p>
          </div>
        </aside>
      </div>

      {open && <BookingModal studio={studio} onClose={() => setOpen(false)} />}
    </div>
  );
}
