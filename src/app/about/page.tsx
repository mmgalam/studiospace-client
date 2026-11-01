import Link from "next/link";
import { FiTarget, FiUsers, FiShield, FiHeart } from "react-icons/fi";

export const metadata = { title: "About Us | StudioSpace" };

const values = [
  {
    title: "Access for every creator",
    text: "Great work should not depend on owning expensive space. We make studios bookable by the hour.",
    icon: FiUsers,
  },
  {
    title: "Trust by design",
    text: "Clear pricing, security deposits and verified profiles protect both hosts and creators.",
    icon: FiShield,
  },
  {
    title: "Built with creators",
    text: "From photographers to podcasters, every feature starts from a real production workflow.",
    icon: FiHeart,
  },
  {
    title: "Focus on the work",
    text: "Less back-and-forth, more time shooting, recording and making.",
    icon: FiTarget,
  },
];

const stats = [
  { value: "5", label: "Studio categories" },
  { value: "24/7", label: "Host support" },
  { value: "100%", label: "Transparent pricing" },
];

export default function AboutPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold">About StudioSpace</h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-400">
          StudioSpace is a peer-to-peer marketplace for creative spaces. Studio
          owners list photo studios, sound stages, podcast lounges, music suites
          and art workshops, and creators discover, compare and reserve them in
          minutes with transparent hourly pricing.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-400">
          We started with a simple observation: finding the right space is often
          harder than the creative work itself. StudioSpace removes that
          friction for creators and gives hosts a reliable way to earn from
          spaces that would otherwise sit idle.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold">What we believe</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, text, icon: Icon }) => (
              <div
                key={title}
                className="flex h-full flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold">Ready to create?</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Find a space or list your own today.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/studios"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Explore Studios
          </Link>
          <Link
            href="/add-studio"
            className="rounded-lg border border-slate-300 dark:border-slate-700 px-6 py-3 font-medium hover:border-indigo-500"
          >
            Host Your Space
          </Link>
        </div>
      </section>
    </>
  );
}
