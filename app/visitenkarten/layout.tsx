import type { Metadata } from "next";
import "./visitenkarte.css";

export const metadata: Metadata = {
  title: "Visitenkarten-Druckvorlage | Heilmasseur Domenic Hacker",
  robots: "noindex, nofollow",
};

export default function VisitenkartenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="visitenkarte-body">{children}</div>;
}
