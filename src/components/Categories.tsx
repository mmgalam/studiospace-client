import Link from "next/link";
import { FiCamera, FiFilm, FiMic, FiMusic, FiEdit3 } from "react-icons/fi";

const categories = [
  {
    label: "Photo Studios",
    value: "Photo Studio",
    icon: FiCamera,
    text: "Cyc walls, strobes and natural light",
  },
  {
    label: "Sound Stages",
    value: "Film Stage",
    icon: FiFilm,
    text: "Soundproofed stages for film and video",
  },
  {
    label: "Podcast Rooms",
    value: "Podcast Lounge",
    icon: FiMic,
    text: "Treated rooms with broadcast mics",
  },
  {
    label: "Music Suites",
    value: "Music Suite",
    icon: FiMusic,
    text: "Recording booths and rehearsal rooms",
  },
  {
    label: "Art Workshops",
    value: "Workshop",
    icon: FiEdit3,
    text: "Sunlit spaces for making and teaching",
  },
];

export default function Categories() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Browse by Studio Category</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Pick the kind of space you need and jump straight to matching
            studios.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(({ label, value, icon: Icon, text }) => (
            <Link
              key={value}
              href={`/studios?category=${encodeURIComponent(value)}`}
              className="group flex h-full flex-col items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 transition group-hover:bg-indigo-600 group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-semibold">{label}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
