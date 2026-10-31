import { FiShield, FiUserCheck, FiTool, FiHeadphones } from "react-icons/fi";

const items = [
  {
    title: "Liability Protection",
    text: "Every booking is covered, so hosts and creators can work with peace of mind.",
    icon: FiShield,
  },
  {
    title: "Verified Profiles",
    text: "Hosts and creators are identity-checked before they can list or book.",
    icon: FiUserCheck,
  },
  {
    title: "Equipment Safety",
    text: "Security deposits and damage policies keep gear protected.",
    icon: FiTool,
  },
  {
    title: "24/7 Host Support",
    text: "Our support team is available any time, before and during your session.",
    icon: FiHeadphones,
  },
];

export default function HostGuarantee() {
  return (
    <section id="host-guarantee" className="bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Host Guarantee & Creator Support
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Built-in protections for both sides of every booking.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, text, icon: Icon }) => (
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
  );
}
