import type { Metadata } from "next";
import "./gutschein.css";

export const metadata: Metadata = {
  title: "Gutschein-Druckvorlage | Heilmasseur Domenic Hacker",
  robots: "noindex, nofollow",
};

export default function GutscheinPrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="gutschein-body">{children}</div>;
}
