"use client";

import { toast } from "sonner";

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email"));
    toast.success(`Thanks! ${email} has been subscribed.`);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="min-w-0 flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
        Join
      </button>
    </form>
  );
}
