import type { NextConfig } from "next";

// Preview-Deployments (VERCEL_ENV=preview) leben unter Custom-Aliases wie
// domenic-snowy.vercel.app, für die Vercels Default-noindex NICHT greift.
// Wir blocken Indexing für alles außer Production, damit Preview-Inhalt
// nicht mit heilmasseur-domenic.at um SEO konkurriert.
// This repository is always an isolated preview, including its default branch.

const nextConfig: NextConfig = {
  reactCompiler: true,
  logging: {
    browserToTerminal: true,
  },
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Content-Security-Policy", value: "form-action 'none'; frame-src https://www.google.com; connect-src 'self'; frame-ancestors https://pixelheld.at https://preview.pixelheld.at http://localhost:3000" },
        ],
      },
    ];
  },
};

export default nextConfig;
