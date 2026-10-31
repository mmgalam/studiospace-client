import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <svg
        viewBox="0 0 320 220"
        className="mx-auto h-56 w-auto"
        role="img"
        aria-label="A clapperboard in a studio spotlight"
      >
        {/* স্পটলাইটের আলো */}
        <polygon points="160,0 60,200 260,200" className="fill-indigo-500/10" />
        <ellipse
          cx="160"
          cy="200"
          rx="100"
          ry="12"
          className="fill-indigo-500/20"
        />

        {/* ক্ল্যাপারবোর্ডের নিচের অংশ */}
        <rect
          x="90"
          y="95"
          width="140"
          height="85"
          rx="8"
          className="fill-slate-800 dark:fill-slate-200"
        />
        <text
          x="160"
          y="148"
          textAnchor="middle"
          fontSize="34"
          fontWeight="700"
          className="fill-white dark:fill-slate-900"
        >
          404
        </text>

        {/* ক্ল্যাপারবোর্ডের উপরের ঢাকনা */}
        <g transform="rotate(-12 90 95)">
          <rect
            x="90"
            y="68"
            width="140"
            height="26"
            rx="6"
            className="fill-indigo-600"
          />
          <polygon points="105,68 125,68 110,94 90,94" className="fill-white" />
          <polygon
            points="145,68 165,68 150,94 130,94"
            className="fill-white"
          />
          <polygon
            points="185,68 205,68 190,94 170,94"
            className="fill-white"
          />
        </g>
      </svg>

      <h1 className="mt-6 text-3xl font-bold">Scene not found</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        The page you are looking for has wrapped up or never made it to the set.
        Let&apos;s get you back to the studio.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Return to Home
        </Link>
        <Link
          href="/studios"
          className="rounded-lg border border-slate-300 dark:border-slate-700 px-6 py-3 font-medium hover:border-indigo-500"
        >
          Explore Studios
        </Link>
      </div>
    </div>
  );
}
