import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get("admin_session");

  // Visiting /admin/login
  if (pathname === "/admin/login") {
    if (adminSession) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url)
      );
    }
    return NextResponse.next();
  }

  // Visiting any /admin page
  if (pathname.startsWith("/admin")) {
    if (!adminSession) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};