import type { Metadata } from "next";
import { BookingContent } from "./BookingContent";

export const metadata: Metadata = {
  title: "Termin buchen | Heilmasseur Domenic Hacker – Wien 1080",
  description:
    "Buchen Sie jetzt Ihren Termin bei Heilmasseur Domenic Hacker in Wien 1080. Heilmassage, Lymphdrainage & Klassische Massage. Online-Terminbuchung.",
};

export default function BuchenPage() {
  return <BookingContent />;
}
