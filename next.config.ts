import type { NextConfig } from "next";

const apiUrl = process.env.API_URL;

// production build-এ API_URL ভুল হলে build থামিয়ে দেওয়া
if (process.env.NODE_ENV === "production") {
  if (!apiUrl) {
    throw new Error(
      "API_URL is not set. Add it in Vercel Environment Variables.",
    );
  }
  if (/localhost|127\.0\.0\.1/.test(apiUrl)) {
    throw new Error(`API_URL must be a public URL, but got: ${apiUrl}`);
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/server-api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
