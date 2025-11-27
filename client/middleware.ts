import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Cho phép /admin và /employee đi thẳng
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/employee") ||
    pathname.startsWith("/user")
  ) {
    return NextResponse.next();
  }

  // Bỏ qua các static files, _next, api...
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }
  // Ví dụ: /abc → /abc (nhưng route xử lý bởi [slug])
  return NextResponse.rewrite(new URL(`/${pathname.slice(1)}`, req.url));
}

// Áp dụng middleware cho mọi route
export const config = {
  matcher: [
    "/manager/admin/:path*",
    "/manager/employee/:path*",
    "/user/:path*",
    "/about-us",
    "/contact-us",
    "/manager-login",
    "/login",
    "/",
  ],
};
