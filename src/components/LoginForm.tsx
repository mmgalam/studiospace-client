"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "Invalid email or password.");
      return;
    }
    toast.success("Welcome back!");
    router.push(redirect);
    router.refresh();
  };

  const input =
    "w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Login to StudioSpace
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className={input}
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className={input}
        />
        <button
          disabled={loading}
          className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        type="button"
        onClick={() =>
          authClient.signIn.social({
            provider: "google",
            callbackURL: redirect,
          })
        }
        className="w-full mt-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 font-medium cursor-pointer"
      >
        Continue with Google
      </button>

      <p className="text-sm text-center mt-6">
        New here?{" "}
        <Link href="/register" className="text-indigo-600 font-medium">
          Register
        </Link>
      </p>
    </div>
  );
}
