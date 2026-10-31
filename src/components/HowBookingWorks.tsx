import { FiSearch, FiClock, FiCheckCircle, FiVideo } from "react-icons/fi";

const steps = [
  {
    title: "Discover Spaces",
    text: "Browse and filter studios by category, price and location.",
    icon: FiSearch,
  },
  {
    title: "Select Shoot Hours",
    text: "Pick your date and time slot from live availability.",
    icon: FiClock,
  },
  {
    title: "Book Instantly",
    text: "Reserve with transparent pricing and no hidden fees.",
    icon: FiCheckCircle,
  },
  {
    title: "Create & Produce",
    text: "Show up, set up and focus on making your work.",
    icon: FiVideo,
  },
];

export default function HowBookingWorks() {
  return (
    <section
      id="how-it-works"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-bold">How Booking Works</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          From search to set in four simple steps.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ title, text, icon: Icon }, i) => (
          <div
            key={title}
            className="relative flex h-full flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
          >
            <span className="absolute right-5 top-4 text-4xl font-bold text-slate-100 dark:text-slate-800">
              {i + 1}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">
              {i + 1}. {title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
