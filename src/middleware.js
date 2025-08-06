import { NextResponse } from "next/server";

export default function middleware(req) {
  const token = req.cookies.get("userToken");
  const isAuthenticated = !!token;

  const { pathname, origin } = req.nextUrl;

  // If not authenticated, block protected routes
  if (!isAuthenticated && ["/dashboard", "/pre-recorded"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  // If authenticated, block auth routes
  if (isAuthenticated && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/pre-recorded", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/pre-recorded", "/login", "/signup"],
};
