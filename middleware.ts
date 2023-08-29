import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAccessToken } from "./server/database/users";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (token) {
    const tokenData = await getAccessToken(token.value);

    if (tokenData && !tokenData.isExpired) {
      const response = NextResponse.next();
      response.headers.set("x-chat-id", tokenData.chatId.toString());
      return response;
    }
  }

  return NextResponse.redirect(new URL("/", request.nextUrl.href));
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
    "/api/user",
  ],
};
