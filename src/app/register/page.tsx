"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FiUser,
  FiMail,
  FiImage,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiCheck,
  FiX,
  FiAperture,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");

  // Password rules validation
  const validatePassword = (pw: string) => {
    if (!/[A-Z]/.test(pw))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(pw))
      return "Password must contain at least one lowercase letter.";
    if (pw.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const hasUpper = /[A-Z]/.test(formData.password);
  const hasLower = /[a-z]/.test(formData.password);
  const hasLength = formData.password.length >= 6;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const err = validatePassword(formData.password);
    setPasswordError(err);
    if (err) {
      toast.error(err);
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        image: formData.photo.trim(),
      });

      if (error) {
        toast.error(error.message ?? "Registration failed.");
        return;
      }

      toast.success("Account created successfully! Please log in.");
      router.push("/login");
    } catch {
      toast.error("Could not reach the authentication service.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-in could not be initiated.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-hidden">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-180 h-80 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-80"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        {/* Glassmorphic Card Container */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 sm:p-10 shadow-2xl space-y-6">
          {/* Header & Logo */}
          <div className="text-center space-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-black tracking-tight text-slate-900 dark:text-white group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/25 group-hover:rotate-12 transition-transform duration-300">
                <FiAperture className="w-5 h-5" />
              </div>
              <span className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent">
                StudioSpace
              </span>
            </Link>

            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white pt-2">
              Create Your Account
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Join thousands of creators, filmmakers, and studio hosts today.
            </p>
          </div>

          {/* Google SSO Button */}
          <div>
            <button
              type="button"
              disabled={loading || googleLoading}
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="grow border-t border-slate-200 dark:border-slate-800" />
            <span className="shrink mx-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Or with email
            </span>
            <div className="grow border-t border-slate-200 dark:border-slate-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Creator"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:bg-white dark:focus:bg-slate-800 transition shadow-inner"
                />
                <FiUser className="absolute left-3.5 top-3 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="creator@studiospace.io"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:bg-white dark:focus:bg-slate-800 transition shadow-inner"
                />
                <FiMail className="absolute left-3.5 top-3 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Avatar Photo URL
              </label>
              <div className="relative">
                <input
                  name="photo"
                  type="url"
                  required
                  value={formData.photo}
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:bg-white dark:focus:bg-slate-800 transition shadow-inner"
                />
                <FiImage className="absolute left-3.5 top-3 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({ ...formData, password: val });
                    setPasswordError(validatePassword(val));
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:bg-white dark:focus:bg-slate-800 transition shadow-inner"
                />
                <FiLock className="absolute left-3.5 top-3 text-slate-400 w-4 h-4 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Requirement Badges */}
              <div className="mt-2.5 flex flex-wrap gap-2 text-[11px]">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border transition-colors ${
                    hasLength
                      ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                      : "border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/40 text-slate-500"
                  }`}
                >
                  {hasLength ? (
                    <FiCheck className="w-3 h-3" />
                  ) : (
                    <FiX className="w-3 h-3" />
                  )}{" "}
                  6+ chars
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border transition-colors ${
                    hasUpper
                      ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                      : "border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/40 text-slate-500"
                  }`}
                >
                  {hasUpper ? (
                    <FiCheck className="w-3 h-3" />
                  ) : (
                    <FiX className="w-3 h-3" />
                  )}{" "}
                  1 uppercase
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border transition-colors ${
                    hasLower
                      ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                      : "border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/40 text-slate-500"
                  }`}
                >
                  {hasLower ? (
                    <FiCheck className="w-3 h-3" />
                  ) : (
                    <FiX className="w-3 h-3" />
                  )}{" "}
                  1 lowercase
                </span>
              </div>

              {passwordError && (
                <p className="text-xs text-rose-500 mt-1.5 font-medium">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Assurance */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <FiShield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted credentials & secure JWT sessions</span>
          </div>

          {/* Sign In Link */}
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
