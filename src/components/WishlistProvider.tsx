"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

interface WishlistCtx {
  ids: string[];
  toggle: (studioId: string) => Promise<void>;
}

const Ctx = createContext<WishlistCtx>({ ids: [], toggle: async () => {} });

export const useWishlist = () => useContext(Ctx);

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = authClient.useSession();
  const email = session?.user.email;
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    if (!email) return;
    let active = true;
    apiFetch("/wishlist")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: string[]) => {
        if (active) setIds(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [email]);

  const toggle = useCallback(
    async (studioId: string) => {
      if (!email) {
        toast.error("Please log in to save studios.");
        return;
      }
      const saved = ids.includes(studioId);
      // সঙ্গে সঙ্গে UI বদলানো
      setIds((prev) =>
        saved ? prev.filter((i) => i !== studioId) : [...prev, studioId],
      );
      try {
        const res = await apiFetch(`/wishlist/${studioId}`, {
          method: saved ? "DELETE" : "POST",
        });
        if (!res.ok) throw new Error("Failed");
        toast.success(
          saved ? "Removed from your wishlist." : "Saved to your wishlist.",
        );
      } catch {
        setIds((prev) =>
          saved ? [...prev, studioId] : prev.filter((i) => i !== studioId),
        );
        toast.error("Could not update your wishlist.");
      }
    },
    [email, ids],
  );

  return (
    <Ctx.Provider value={{ ids: email ? ids : [], toggle }}>
      {children}
    </Ctx.Provider>
  );
}
