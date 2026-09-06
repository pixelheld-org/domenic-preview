import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  const passThrough = () => NextResponse.next({ request: { headers } });
  // This copy is accessible only inside an authenticated Pixelheld edit session.
  const expected = process.env.PIXELHELD_PREVIEW_TOKEN;
  if (process.env.PIXELHELD_EDIT_MODE !== "1" || !expected) {
    return new NextResponse("Diese Testvorschau wird über das Pixelheld-Portal geöffnet.", { status: 403 });
  }
  if (request.nextUrl.searchParams.get("pm_token") === expected) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("pm_token");
    const response = NextResponse.redirect(url);
    response.cookies.set("pm_token", expected, { httpOnly: true, secure: true, sameSite: "none", path: "/", partitioned: true });
    return response;
  }
  if (request.cookies.get("pm_token")?.value !== expected) return new NextResponse("Kein Zugriff", { status: 403 });
  return passThrough();
}
export const config = { matcher: ["/((?!_next/|favicon.ico).*)"] };
