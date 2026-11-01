"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1800",
    title: "Find the Perfect Space for Your Next Shoot",
    text: "Book verified photo studios by the hour, with transparent pricing and instant confirmation.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1800",
    title: "Sound Stages Built for Cinema",
    text: "From short films to commercials, reserve fully equipped stages with lighting grids and green screens.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1800",
    title: "Record, Mix and Create Without Limits",
    text: "Podcast lounges and music suites with studio-grade gear, ready when you are.",
  },
];

export default function HeroSlider() {
  const router = useRouter();
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-[70vh] min-h-120"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div
              className="h-full w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${s.image})` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-slate-950/85 via-slate-950/55 to-transparent" />
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-28">
                <h1 className="max-w-2xl text-3xl sm:text-5xl font-bold text-white leading-tight">
                  {s.title}
                </h1>
                <p className="mt-4 max-w-xl text-base sm:text-lg text-slate-200">
                  {s.text}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/studios"
                    className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                  >
                    Explore Studios
                  </Link>
                  <Link
                    href="/add-studio"
                    className="px-6 py-3 rounded-lg border border-white/70 text-white font-medium hover:bg-white/10"
                  >
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = String(new FormData(e.currentTarget).get("q")).trim();
          router.push(
            q ? `/studios?search=${encodeURIComponent(q)}` : "/studios",
          );
        }}
        className="absolute inset-x-4 bottom-14 z-10 mx-auto flex max-w-2xl gap-2 rounded-2xl bg-white/95 p-2 shadow-2xl backdrop-blur dark:bg-slate-900/95"
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            placeholder="Search photo studios, podcast rooms..."
            className="w-full bg-transparent py-3 pl-10 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
          />
        </div>
        <button className="rounded-xl bg-indigo-600 px-6 text-sm font-medium text-white hover:bg-indigo-700 cursor-pointer">
          Search
        </button>
      </form>
    </section>
  );
}
