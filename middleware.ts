import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/telegram";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.nextUrl.href));
  }

  const tokenData = await verifyToken(token.value);

  if (
    !tokenData ||
    !tokenData.exp ||
    !tokenData.sub ||
    tokenData.exp * 1000 <= new Date().getTime()
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl.href));
  }

  const response = NextResponse.next();
  response.headers.set("x-chat-id", tokenData.sub.toString());
  return response;
}

export const config = {
  matcher: [
    "/home",
    "/exams/:path*",
    "/homework/:path*",
    "/info",
    "/leaders/:path*",
    "/news/:path*",
    "/reviews",
    "/schedule/:path*",
    "/api/homework",
    "/api/schedule",
  ],
};
