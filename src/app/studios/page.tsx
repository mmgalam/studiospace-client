import { Suspense } from "react";
import StudiosExplorer from "@/components/StudiosExplorer";
import StudioCardSkeleton from "@/components/StudioCardSkeleton";

export const metadata = {
  title: "Explore Studios | StudioSpace",
};

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <StudioCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <StudiosExplorer />
    </Suspense>
  );
}
