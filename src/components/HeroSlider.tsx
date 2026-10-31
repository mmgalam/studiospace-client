"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1800",
    title: "Find the Perfect Space for Your Next Shoot",
    text: "Book verified photo studios by the hour, with transparent pricing and instant confirmation.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1800",
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
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-[70vh] min-h-[480px]"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div
              className="h-full w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${s.image})` }}
            >
              <div className="absolute inset-0 bg-slate-950/60" />
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                <h1 className="max-w-2xl text-4xl sm:text-5xl font-bold text-white leading-tight">
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
    </section>
  );
}
