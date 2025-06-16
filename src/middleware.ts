import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Get token from the request
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Protected routes that require authentication
    const protectedRoutes = [
      "/profile",
      "/settings",
      "/playlists",
      "/upload",
      "/admin",
      "/artist",
    ];

    // Admin routes that require special permissions
    const adminRoutes = ["/admin"];
    const artistRoutes = ["/upload", "/artist"];

    // Check if user is trying to access protected route
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // Redirect to signin if accessing protected route without auth
    if (isProtectedRoute && !token) {
      const signInUrl = new URL("/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Check admin access
    const isAdminRoute = adminRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAdminRoute && token) {
      const userPermissions = (token.permissions as string[]) || [];
      const hasAdminAccess = userPermissions.some((permission) =>
        ["MANAGE_SYSTEM", "VIEW_ANALYTICS", "MODERATE_CONTENT"].includes(
          permission
        )
      );

      if (!hasAdminAccess) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Check artist access
    const isArtistRoute = artistRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isArtistRoute && token) {
      const userPermissions = (token.permissions as string[]) || [];
      const hasArtistAccess =
        token.isArtist || userPermissions.includes("UPLOAD_CONTENT");

      if (!hasArtistAccess) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to public routes
        if (
          pathname.startsWith("/auth/") ||
          pathname.startsWith("/api/auth/") ||
          pathname === "/" ||
          pathname.startsWith("/browse") ||
          pathname.startsWith("/_next") ||
          pathname.startsWith("/favicon")
        ) {
          return true;
        }

        // For protected routes, check if user has token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
