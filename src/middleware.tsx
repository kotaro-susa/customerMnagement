import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard", "/user/:path*"],
};

const adminOnly = [new RegExp("/user/register")];

export default withAuth(function middleware(req) {
  const { pathname } = req.nextUrl;
  if (
    req.nextauth.token?.isRole !== "admin" &&
    adminOnly.some((url) => url.test(pathname))
  ) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }
});
