"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import {
  FiAperture,
  FiSun,
  FiMoon,
  FiLogOut,
  FiPlusCircle,
  FiBookmark,
  FiLayers,
  FiMenu,
  FiX,
  FiGrid,
  FiInbox,
  FiHeart,
  FiChevronDown,
} from "react-icons/fi";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: FiGrid },
  { label: "Add New Studio", href: "/add-studio", icon: FiPlusCircle },
  { label: "My Studio Listings", href: "/my-listings", icon: FiLayers },
  { label: "My Bookings", href: "/my-bookings", icon: FiBookmark },
  { label: "Booking Requests", href: "/booking-requests", icon: FiInbox },
  { label: "Saved Studios", href: "/wishlist", icon: FiHeart },
];

const subscribe = () => () => {};

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const closeMenus = () => {
    setDropdownOpen(false);
    setMobileOpen(false);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    try {
      await clearToken();
      await authClient.signOut();
      closeMenus();
      toast.success("You have been logged out successfully.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/75 dark:bg-slate-950/75 border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="group flex items-center gap-2.5 text-xl font-black tracking-tight text-slate-900 dark:text-white"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/25 group-hover:scale-105 group-hover:rotate-12 transition-all duration-300">
            <FiAperture className="w-5 h-5" />
          </div>
          <span className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent">
            StudioSpace
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full border border-slate-200/70 dark:border-slate-800/70 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-md">
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  active
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Profile Area */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          {mounted ? (
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-10 h-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FiSun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-90" />
              ) : (
                <FiMoon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
          )}

          {/* User Auth Section */}
          {isPending ? (
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="group flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200 cursor-pointer shadow-sm"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
              >
                <div className="relative">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name ?? "User avatar"}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                    />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center text-xs font-bold shadow-inner">
                      {(user.name ?? user.email ?? "U").charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </div>

                <FiChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>

              {/* Elevated Dropdown Menu */}
              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-64 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {/* User Profile Header */}
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/80">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {user.email}
                    </p>
                    <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      Creator Account
                    </span>
                  </div>

                  {/* Menu List */}
                  <div className="py-2">
                    {menuItems.map(({ label, href, icon: Icon }) => {
                      const active = isActive(href);
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeMenus}
                          className={`flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-all duration-150 ${
                            active
                              ? "bg-indigo-50/80 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 font-semibold"
                              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:translate-x-1"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`}
                          />
                          <span>{label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Logout Button */}
                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50/70 dark:hover:bg-rose-950/30 text-left transition-colors cursor-pointer"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden w-10 h-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 flex items-center justify-center text-slate-700 dark:text-slate-300 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Modern Mobile Navigation Panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-5 space-y-4">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {!user && !isPending && (
            <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <Link
                href="/login"
                onClick={closeMenus}
                className="flex-1 text-center py-2.5 text-xs font-semibold border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={closeMenus}
                className="flex-1 text-center py-2.5 text-xs font-semibold bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-600/20"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
