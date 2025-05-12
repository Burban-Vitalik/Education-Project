import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { TextEncoder } from "util";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const publicPaths = ["/login", "/auth", "/public"];
  const pathname = req.nextUrl.pathname;

  if (!token) {
    if (!publicPaths.includes(pathname)) {
      console.log("Token not found. Redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next(); // Allow access to public routes
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    console.log("Token valid. Proceeding.");
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/users"],
};
