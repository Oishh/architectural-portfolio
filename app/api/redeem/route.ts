import { NextRequest, NextResponse } from "next/server";
import { isValidToken, burnToken } from "@/lib/token-store";
import { createSessionToken, COOKIE_NAME } from "@/lib/session";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const next = req.nextUrl.searchParams.get("next") ?? "/";

  if (!token || !isValidToken(token)) {
    return NextResponse.redirect(new URL("/gate?reason=invalid", req.url));
  }

  const burned = burnToken(token);
  if (!burned) {
    return NextResponse.redirect(new URL("/gate?reason=invalid", req.url));
  }

  const sessionToken = await createSessionToken();
  const response = NextResponse.redirect(new URL(next, req.url));

  response.cookies.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return response;
}
