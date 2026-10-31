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
];

const subscribe = () => () => {};

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // server-এ false, client-এ true (effect-এর ভেতরে setState ছাড়াই)
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // বাইরে ক্লিক বা Escape চাপলে মেনু বন্ধ
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
      await authClient.signOut();
      closeMenus();
      toast.success("You have been logged out successfully.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const linkClass = (href: string) =>
    `relative text-sm font-medium transition-colors py-1 ${
      isActive(href)
        ? "text-indigo-600 dark:text-indigo-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-indigo-600 dark:after:bg-indigo-400"
        : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
    }`;

  const itemClass =
    "flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800";

  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400"
        >
          <FiAperture className="w-6 h-6" />
          <span>StudioSpace</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          {mounted ? (
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FiSun className="w-4 h-4 text-amber-400" />
              ) : (
                <FiMoon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          ) : (
            <div className="w-9 h-9" />
          )}

          {/* Auth area */}
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center p-0.5 rounded-full border border-slate-300 dark:border-slate-700 cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name ?? "User avatar"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                    {(user.name ?? user.email ?? "U").charAt(0).toUpperCase()}
                  </span>
                )}
              </button>

              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2"
                >
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-semibold truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  {menuItems.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMenus}
                      className={itemClass}
                    >
                      <Icon className="w-4 h-4" /> {label}
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-left cursor-pointer"
                  >
                    <FiLogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer"
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

      {/* Mobile panel */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className={`${linkClass(item.href)} w-fit`}
            >
              {item.label}
            </Link>
          ))}
          {!user && !isPending && (
            <div className="flex gap-2 pt-2 sm:hidden">
              <Link
                href="/login"
                onClick={closeMenus}
                className="flex-1 text-center px-4 py-2 text-sm font-medium border border-slate-300 dark:border-slate-700 rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={closeMenus}
                className="flex-1 text-center px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
