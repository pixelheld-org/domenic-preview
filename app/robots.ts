import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/", "/gutscheine/danke", "/gutschein-print"],
      },
    ],
    sitemap: "https://heilmasseur-domenic.at/sitemap.xml",
  };
}
