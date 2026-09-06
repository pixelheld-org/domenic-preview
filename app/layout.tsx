import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { EditKit } from "@/editkit/edit-kit";
import { PreviewSafety } from "@/components/PreviewSafety";
import { JsonLd } from "@/components/JsonLd";
import Script from "next/script";
import { SanityLive } from "@/sanity/lib/live";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Heilmasseur Domenic Hacker | Heilmassage Wien 1080",
  description:
    "Diplomierter Heilmasseur in Wien 1080 (Josefstadt). Heilmassage, Lymphdrainage & Klassische Massage. Termine online buchen. Krankenkasse erstattet.",
  openGraph: {
    title: "Heilmasseur Domenic Hacker | Heilmassage Wien 1080",
    description:
      "Diplomierter Heilmasseur in Wien 1080. Heilmassage, Lymphdrainage & Klassische Massage. Jetzt Termin buchen.",
    url: "https://heilmasseur-domenic.at",
    siteName: "Heilmasseur Domenic Hacker",
    locale: "de_AT",
    type: "website",
  },
  alternates: {
    canonical: "https://heilmasseur-domenic.at",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialPathname = (await headers()).get("x-pathname") ?? "/";
  return (
    <html
      lang="de"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
        {/* Google Consent Mode v2 — must run before any GA tag loads */}
        <Script id="google-consent-mode" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;

            var analytics_storage = "denied";

            try {
              var match = document.cookie.match(/(?:^|;\\s*)cc_cookie=([^;]*)/);
              if (match) {
                var cookieValue = JSON.parse(decodeURIComponent(match[1]));
                if (cookieValue.categories && cookieValue.categories.includes("analytics")) {
                  analytics_storage = "granted";
                }
              }
            } catch (e) {
              // ignore parsing errors
            }

            gtag("consent", "default", {
              analytics_storage: analytics_storage,
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
              security_storage: "granted",
              wait_for_update: 2000,
            });
          `}
        </Script>
        {/* Google Analytics 4 — gtag.js (only loads when Measurement ID is set) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              id="ga4-src"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  anonymize_ip: true
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar initialPathname={initialPathname} />
        {children}
        <SanityLive />
        <EditKit />
        <PreviewSafety />
      </body>
    </html>
  );
}
