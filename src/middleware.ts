import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const isPublicRoute = ["/sign-in", "/sign-up"]
    const isProtectedRoute = ["/dashboard"]
    const token = request.cookies.get('token');
    const path = request.nextUrl.pathname;

    if (isPublicRoute.includes(path) && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if ((isProtectedRoute.includes(path) || path.startsWith("/dashboard")) && !token) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
}

export const config = {
    matcher: [
        // Run on everything except static assets
        '/((?!_next/static|_next/image|favicon.ico|images|fonts|css|robots.txt).*)',
    ],
};
