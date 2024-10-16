import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const x = request.cookies.get("mechat_token");
  const token = x && typeof x === "object" ? x.value : x;
  const reqpath = request.nextUrl.pathname;

  console.log("middleware", reqpath);

  const isLoggedInPath = ["/chat", "/profile"];
  const isNonLoggedInPath = [
    "/",
    "/home",
    "/login",
    "/about",
    "/register",
    "/contact",
    "/forget_password",
    "/privacy-policy",
  ];

  const isLoggedInRequired = isLoggedInPath.some((path) =>
    reqpath.startsWith(path)
  );
  const isNonLoggedInRequired = isNonLoggedInPath.some((path) =>
    reqpath.startsWith(path)
  );

  const isValidToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded?.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  // Handle root path separately
  if (reqpath === "/") {
    if (!token || !isValidToken(token)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isLoggedInRequired) {
    if (!token || !isValidToken(token)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isNonLoggedInRequired) {
    if (token && isValidToken(token)) {
      return NextResponse.redirect(new URL("/chat", request.url));
    }
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
    "/profile",
    "/register",
    "/login",
    "/forget_password/:path*",
  ],
};
