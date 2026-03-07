// middleware.ts (taruh di root project, sejajar dengan app/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const shiftId = request.cookies.get("shift_id")?.value;
  const { pathname } = request.nextUrl;

  // Protect all /dashboard/* routes
  if (pathname.startsWith("/dashboard") && !shiftId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect away from login if already logged in
  if (pathname === "/" && shiftId) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};