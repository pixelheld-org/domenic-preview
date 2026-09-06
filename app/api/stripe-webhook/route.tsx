import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ error: "Testvorschau: Buchungen, Zahlungen und Versand sind deaktiviert." }, { status: 409 });
}
