"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FiUploadCloud,
  FiX,
  FiCheck,
  FiImage,
  FiMapPin,
  FiDollarSign,
  FiShield,
  FiUsers,
  FiTag,
  FiUser,
  FiMail,
  FiArrowRight,
  FiEdit3,
  FiAlertCircle,
  FiPlus,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import type { Studio } from "@/lib/types";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const defaultAmenities = [
  "Wi-Fi",
  "Air Conditioning",
  "Power Backup",
  "Parking",
  "Changing Room",
  "Soundproofing",
  "Lighting Kit",
  "Green Screen",
  "Coffee Bar",
  "Restroom",
];

export default function EditStudioForm({ id }: { id: string }) {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    const fetchUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/studios/${id}`
      : `/api/studios/${id}`;

    fetch(fetchUrl, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Studio not found");
        return res.json();
      })
      .then((data: Studio & { images?: string[] }) => {
        setStudio(data);
        const resolvedImage =
          data.image || (Array.isArray(data.images) && data.images[0]) || "";
        setImage(resolvedImage);
        setAmenities(data.amenities ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("We could not find this studio.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  const toggleAmenity = (name: string) => {
    setAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name],
    );
  };

  const addCustomAmenity = () => {
    const value = customAmenity.trim();
    if (!value) return;
    if (amenities.includes(value)) {
      toast.error("That amenity is already added.");
      return;
    }
    setAmenities((prev) => [...prev, value]);
    setCustomAmenity("");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!key) {
      toast.error(
        "Image upload is not configured. Paste an image URL instead.",
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: "POST",
        body,
      });
      const json = await res.json();
      if (!res.ok || !json?.data?.url) throw new Error("Upload failed");
      setImage(json.data.url);
      toast.success("Image uploaded successfully.");
    } catch {
      toast.error(
        "Image upload failed. Please try again or paste an image URL.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("Please log in first.");
      return;
    }
    if (!image) {
      toast.error("Please upload an image or provide an image URL.");
      return;
    }
    if (amenities.length === 0) {
      toast.error("Select at least one amenity.");
      return;
    }

    const form = new FormData(e.currentTarget);
    const payload = {
      title: String(form.get("title")),
      category: String(form.get("category")),
      hourlyRate: Number(form.get("hourlyRate")),
      securityDeposit: Number(form.get("securityDeposit")),
      maxCapacity: Number(form.get("maxCapacity")),
      location: String(form.get("location")),
      image,
      images: [image],
      amenities,
      overview: String(form.get("overview")),
    };

    setSubmitting(true);
    try {
      const res = await apiFetch(`/studios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.message ?? "Could not update the studio.");
        return;
      }
      toast.success("Studio workspace updated successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isSessionPending || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500">
          Loading studio details...
        </p>
      </div>
    );
  }

  if (error || !studio) {
    return (
      <div className="max-w-lg mx-auto my-16 p-8 rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 text-center space-y-4">
        <FiAlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Studio Not Found
        </h2>
        <p className="text-xs text-slate-500">
          {error || "We could not find this studio listing."}
        </p>
        <button
          onClick={() => router.push("/my-listings")}
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
        >
          Return to My Listings
        </button>
      </div>
    );
  }

  // Security guard for host verification
  if (session?.user?.email !== studio.ownerEmail) {
    return (
      <div className="max-w-lg mx-auto my-16 p-8 rounded-3xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-center space-y-3">
        <FiShield className="w-10 h-10 text-amber-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Permission Denied
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          You can only edit creative spaces that are published under your host
          account.
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12 sm:py-16">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-225 h-96 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            <FiEdit3 className="w-3.5 h-3.5" /> Workspace Settings
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Update Studio Listing
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Keep your amenities, rate cards, and photos up to date so creators
            can book with confidence.
          </p>
        </div>

        {/* Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl space-y-8"
        >
          {/* General Specs */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              General Studio Information
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Studio Title *
              </label>
              <input
                name="title"
                type="text"
                required
                defaultValue={studio.title}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Category *
                </label>
                <div className="relative">
                  <select
                    name="category"
                    required
                    defaultValue={studio.category}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer appearance-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="dark:bg-slate-900">
                        {c}
                      </option>
                    ))}
                  </select>
                  <FiTag className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Max Capacity (Persons) *
                </label>
                <div className="relative">
                  <input
                    name="maxCapacity"
                    type="number"
                    min="1"
                    required
                    defaultValue={studio.maxCapacity}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <FiUsers className="absolute left-3.5 top-3.5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Location */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              Pricing & Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Hourly Rate ($ USD) *
                </label>
                <div className="relative">
                  <input
                    name="hourlyRate"
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    defaultValue={studio.hourlyRate}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <FiDollarSign className="absolute left-3.5 top-3.5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Security Deposit ($ USD) *
                </label>
                <div className="relative">
                  <input
                    name="securityDeposit"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    defaultValue={studio.securityDeposit}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <FiShield className="absolute left-3.5 top-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Location / Full Address *
              </label>
              <div className="relative">
                <input
                  name="location"
                  type="text"
                  required
                  defaultValue={studio.location}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <FiMapPin className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Photo Showcase & Live Preview */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              Workspace Imagery
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-5 py-3 text-xs font-semibold hover:border-indigo-500 transition shrink-0 bg-slate-50/50 dark:bg-slate-800/40">
                <FiUploadCloud className="h-4 w-4 text-indigo-500" />
                <span>
                  {uploading ? "Uploading to ImgBB..." : "Upload New Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              <div className="relative flex-1">
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  type="url"
                  placeholder="...or paste a direct image URL"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <FiImage className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            {image && (
              <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  Thumbnail Preview
                </p>
                <div className="relative h-48 w-full sm:w-80 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt="Studio preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Amenities Management */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                Amenities
              </h2>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {amenities.length} selected
              </span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {defaultAmenities.map((a) => {
                const active = amenities.includes(a);
                return (
                  <button
                    type="button"
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                    }`}
                  >
                    {active && <FiCheck className="w-3 h-3" />}
                    <span>{a}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Amenity Adder */}
            <div className="flex gap-2 pt-2">
              <input
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomAmenity();
                  }
                }}
                placeholder="Add a custom amenity (e.g. Fog Machine, C-Stands)"
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button
                type="button"
                onClick={addCustomAmenity}
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold hover:border-indigo-500 transition cursor-pointer"
              >
                <FiPlus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Custom Amenities Active Badges */}
            {amenities.filter((a) => !defaultAmenities.includes(a)).length >
              0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {amenities
                  .filter((a) => !defaultAmenities.includes(a))
                  .map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200/60 dark:border-indigo-800/60"
                    >
                      <span>{a}</span>
                      <button
                        type="button"
                        onClick={() => toggleAmenity(a)}
                        aria-label={`Remove ${a}`}
                        className="hover:text-rose-500 transition cursor-pointer"
                      >
                        <FiX className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
              </div>
            )}
          </div>

          {/* Overview */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              Detailed Studio Overview
            </h2>

            <textarea
              name="overview"
              required
              rows={4}
              defaultValue={studio.overview}
              className="w-full p-4 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Read-Only Host Credentials */}
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900">
                <FiUser className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Host Name (Read-Only)
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {studio.ownerName || "Alam Creator"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900">
                <FiMail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Host Email (Read-Only)
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {studio.ownerEmail || "alam@studiospace.io"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/my-listings")}
              className="flex-1 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="flex-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Save Listing Changes</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
