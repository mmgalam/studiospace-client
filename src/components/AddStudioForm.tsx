"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

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

export default function AddStudioForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      toast.error("Please upload an image or paste an image URL.");
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
      amenities,
      overview: String(form.get("overview")),
    };

    setSubmitting(true);
    try {
      const res = await apiFetch("/studios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message ?? "Could not save the studio.");
        return;
      }
      toast.success("Studio listed successfully!");
      router.push("/my-listings");
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const input =
    "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const readOnly = `${input} bg-slate-100 dark:bg-slate-800 cursor-not-allowed`;
  const label = "mb-1 block text-sm font-medium";

  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading your account...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold">Add New Studio</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Share your creative space with filmmakers, photographers and musicians.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className={label}>Studio title</label>
          <input
            name="title"
            required
            placeholder="e.g. Lumen Cyc Wall Photo Studio"
            className={input}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Category</label>
            <select
              name="category"
              required
              defaultValue=""
              className={`${input} bg-white dark:bg-slate-900`}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Location / address</label>
            <input
              name="location"
              required
              placeholder="e.g. Gulshan 2, Dhaka"
              className={input}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={label}>Hourly rate ($)</label>
            <input
              name="hourlyRate"
              type="number"
              min="1"
              step="0.01"
              required
              className={input}
            />
          </div>
          <div>
            <label className={label}>Security deposit ($)</label>
            <input
              name="securityDeposit"
              type="number"
              min="0"
              step="0.01"
              required
              className={input}
            />
          </div>
          <div>
            <label className={label}>Max capacity</label>
            <input
              name="maxCapacity"
              type="number"
              min="1"
              required
              className={input}
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className={label}>Studio image</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-400 dark:border-slate-600 px-4 py-2 text-sm font-medium hover:border-indigo-500">
              <FiUploadCloud className="h-4 w-4" />
              {uploading ? "Uploading..." : "Upload image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="url"
              placeholder="...or paste an image URL"
              className={input}
            />
          </div>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Studio preview"
              className="mt-3 h-40 w-full rounded-xl object-cover sm:w-72"
            />
          )}
        </div>

        {/* Amenities */}
        <div>
          <label className={label}>Amenities</label>
          <div className="flex flex-wrap gap-2">
            {defaultAmenities.map((a) => {
              const active = amenities.includes(a);
              return (
                <button
                  type="button"
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`rounded-full border px-3 py-1 text-sm transition cursor-pointer ${
                    active
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 dark:border-slate-700 hover:border-indigo-500"
                  }`}
                >
                  {a}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomAmenity();
                }
              }}
              placeholder="Add a custom amenity"
              className={input}
            />
            <button
              type="button"
              onClick={addCustomAmenity}
              className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 text-sm font-medium hover:border-indigo-500 cursor-pointer"
            >
              Add
            </button>
          </div>

          {amenities.filter((a) => !defaultAmenities.includes(a)).length >
            0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {amenities
                .filter((a) => !defaultAmenities.includes(a))
                .map((a) => (
                  <span
                    key={a}
                    className="flex items-center gap-1 rounded-full bg-indigo-100 dark:bg-indigo-950 px-3 py-1 text-sm text-indigo-700 dark:text-indigo-300"
                  >
                    {a}
                    <button
                      type="button"
                      onClick={() => toggleAmenity(a)}
                      aria-label={`Remove ${a}`}
                      className="cursor-pointer"
                    >
                      <FiX className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
            </div>
          )}
        </div>

        <div>
          <label className={label}>Detailed overview</label>
          <textarea
            name="overview"
            required
            rows={5}
            placeholder="Describe the space, equipment, ideal use cases and house rules."
            className={input}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Host name</label>
            <input
              value={session?.user.name ?? ""}
              readOnly
              className={readOnly}
            />
          </div>
          <div>
            <label className={label}>Host email</label>
            <input
              value={session?.user.email ?? ""}
              readOnly
              className={readOnly}
            />
          </div>
        </div>

        <button
          disabled={submitting || uploading}
          className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-60 cursor-pointer"
        >
          {submitting ? "Saving..." : "List This Studio"}
        </button>
      </form>
    </div>
  );
}
