"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  FiPlusCircle,
  FiImage,
  FiMapPin,
  FiDollarSign,
  FiUsers,
  FiShield,
  FiTag,
  FiCheck,
  FiInfo,
  FiUser,
  FiMail,
  FiArrowRight,
  FiLayers,
} from "react-icons/fi";

const CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const PRESET_AMENITIES = [
  "Lighting Kit",
  "Cyclorama Wall",
  "Soundproofing",
  "WiFi 6",
  "Air Conditioning",
  "Audio Interface",
  "4K Broadcast Cameras",
  "Green Screen",
  "Dressing Room",
  "Free On-site Parking",
  "Lounge Area",
  "Props & Backdrops",
];

export default function AddStudioForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Photo Studio",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    imageUrl: "",
    overview: "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "Lighting Kit",
    "WiFi 6",
    "Air Conditioning",
  ]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      toast.error("Please provide a workspace photo direct URL.");
      return;
    }

    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one workspace amenity.");
      return;
    }

    setLoading(true);

    const payload = {
      title: formData.title,
      category: formData.category,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      location: formData.location,
      images: [formData.imageUrl],
      amenities: selectedAmenities,
      overview: formData.overview,
      rating: 5.0,
      ownerName: user?.name || "Verified Host",
      ownerEmail: user?.email || "host@studiospace.io",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/studios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(
          "Studio published successfully! Redirecting to your listings...",
        );
        router.push("/my-listings");
        router.refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || "Failed to publish studio workspace.");
      }
    } catch {
      toast.error("Server connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12 sm:py-16">
      {/* Decorative ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-225 h-96 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-600/15 blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            <FiLayers className="w-3.5 h-3.5" /> Host Onboarding
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            List a New Creative Studio
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Monetize idle production hours. Share your cyc wall, podcast lounge,
            or sound stage with creators worldwide.
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl space-y-8"
        >
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              General Studio Information
            </h2>

            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-700 dark:text-slate-300">
                Studio Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. Daylight Cyclorama Infinity Stage"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-700 dark:text-slate-300">
                  Category *
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer appearance-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="dark:bg-slate-900"
                      >
                        {cat}
                      </option>
                    ))}
                  </select>
                  <FiTag className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-700 dark:text-slate-300">
                  Max Capacity (Persons) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.maxCapacity}
                    onChange={(e) =>
                      setFormData({ ...formData, maxCapacity: e.target.value })
                    }
                    placeholder="15"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <FiUsers className="absolute left-3.5 top-3.5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Location */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              Pricing & Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-700 dark:text-slate-300">
                  Hourly Rate ($ USD) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={5}
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      setFormData({ ...formData, hourlyRate: e.target.value })
                    }
                    placeholder="75"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <FiDollarSign className="absolute left-3.5 top-3.5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-700 dark:text-slate-300">
                  Refundable Security Deposit ($ USD) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.securityDeposit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        securityDeposit: e.target.value,
                      })
                    }
                    placeholder="150"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <FiShield className="absolute left-3.5 top-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-700 dark:text-slate-300">
                Location / Full Address *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. 128 Hudson Yards, Tribeca, New York, NY"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <FiMapPin className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Section 3: Workspace Imagery & Live Preview */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              Workspace Imagery
            </h2>

            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase text-slate-700 dark:text-slate-300">
                Direct Image URL (ImgBB, Unsplash, or CDN) *
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <FiImage className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            {/* Live Card Preview */}
            {formData.imageUrl && (
              <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                  <FiInfo className="w-3.5 h-3.5" /> Workspace Thumbnail Preview
                </p>
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <Image
                    src={formData.imageUrl}
                    alt="Studio preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800";
                    }}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-sm">
                    {formData.category}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Amenities Checklist */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                Included Amenities
              </h2>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {selectedAmenities.length} selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PRESET_AMENITIES.map((amenity) => {
                const active = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-indigo-50/80 border-indigo-400 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-600 dark:text-indigo-300 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <span>{amenity}</span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                        active
                          ? "bg-indigo-600 text-white"
                          : "border border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {active && <FiCheck className="w-2.5 h-2.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Detailed Overview */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              Detailed Studio Overview
            </h2>

            <textarea
              rows={4}
              required
              value={formData.overview}
              onChange={(e) =>
                setFormData({ ...formData, overview: e.target.value })
              }
              placeholder="Describe access protocols, electrical supply, lighting gear, loading dock instructions, and house rules..."
              className="w-full p-4 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Section 6: Read-Only Host Credentials */}
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
                  {user?.name || "Alam Creator"}
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
                  {user?.email || "alam@studiospace.io"}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FiPlusCircle className="w-4 h-4" />
                <span>Publish Studio Space</span>
                <FiArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
