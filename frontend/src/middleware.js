import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token;

    // Admin authorization check
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        // Redirect non-admins to homepage
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Authorized if user has a valid JWT token
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Apply middleware protection only to /dashboard and /admin routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

