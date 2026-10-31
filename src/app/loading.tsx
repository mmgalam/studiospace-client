import { FiAperture } from "react-icons/fi";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <FiAperture className="h-12 w-12 animate-spin text-indigo-600 dark:text-indigo-400 [animation-duration:2s]" />
      <p className="text-sm font-medium text-slate-500">
        Setting up the lights...
      </p>
    </div>
  );
}
