import { NextResponse } from "next/server";

export function middleware(request) {
  const x = request.cookies.get("mechat_token");
  const token = x && typeof x === "object" ? x.value : x;
  const reqpath = request.nextUrl.pathname;

  // Paths that can be accessed without login
  const isUserLoginNotAccess =
    reqpath === "/login" ||
    reqpath === "/home" ||
    reqpath === "/about" ||
    reqpath === "/contact" ||
    reqpath === "/privacy-policy" ||
    reqpath === "/register" ||
    reqpath === "/forget_password";

  // Check if the user is trying to access a public path while logged in
  if (isUserLoginNotAccess) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protected paths that require a valid token
  const isProtectedPath = ["/", "/chat", "/me"];

  // Redirect to login if trying to access protected paths without a token
  if (isProtectedPath.some((path) => reqpath.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validate the token
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    // You can add additional checks here if needed
  } catch (error) {
    console.log("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/about",
    "/contact",
    "/chat",
    "/privacy-policy",
    "/me",
    "/register",
    "/login",
    "/forget_password/:path*",
    "/signup",
  ],
};
