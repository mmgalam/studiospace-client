import { notFound } from "next/navigation";
import StudioDetails from "@/components/StudioDetails";
import type { Studio } from "@/lib/types";

async function getStudio(id: string): Promise<Studio | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/studios/${id}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function StudioDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studio = await getStudio(id);
  if (!studio) notFound();
  return <StudioDetails studio={studio} />;
}
