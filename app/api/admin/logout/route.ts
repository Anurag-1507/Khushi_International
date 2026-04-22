import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Build redirect URL using current domain
  const loginUrl = new URL("/admin/login", req.url);

  const res = NextResponse.redirect(loginUrl);

  // Clear admin session cookie
  res.cookies.set("admin_session", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
}
