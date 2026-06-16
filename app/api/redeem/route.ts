import { NextRequest, NextResponse } from "next/server";
import { isValidToken, burnToken } from "@/lib/token-store";
import { createSessionToken, COOKIE_NAME } from "@/lib/session";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const next = req.nextUrl.searchParams.get("next") ?? "/";

  if (!token || !(await isValidToken(token))) {
    return NextResponse.redirect(new URL("/gate?reason=invalid", req.url));
  }

  const burned = await burnToken(token);
  if (!burned) {
    return NextResponse.redirect(new URL("/gate?reason=invalid", req.url));
  }

  const sessionToken = await createSessionToken();
  const response = NextResponse.redirect(new URL(next, req.url));

  // No maxAge — session cookie only, dies when the browser is closed
  response.cookies.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}
