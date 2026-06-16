import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, createSessionToken, COOKIE_NAME } from "@/lib/session";

export async function proxy(req: NextRequest) {
  const sessionToken = req.cookies.get(COOKIE_NAME)?.value;

  if (sessionToken && (await verifySessionToken(sessionToken))) {
    return NextResponse.next();
  }

  // Admin bypass: ?admin=<ADMIN_SECRET>
  const adminSecret = req.nextUrl.searchParams.get("admin");
  if (adminSecret && adminSecret === process.env.ADMIN_SECRET) {
    const token = await createSessionToken({ isAdmin: true });
    const dest = new URL(req.nextUrl.pathname, req.url);
    const response = NextResponse.redirect(dest);
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  }

  // One-time token: ?token=<TOKEN>
  const token = req.nextUrl.searchParams.get("token");
  if (token) {
    const redeemUrl = new URL("/api/redeem", req.url);
    redeemUrl.searchParams.set("token", token);
    const next = req.nextUrl.pathname;
    if (next !== "/") redeemUrl.searchParams.set("next", next);
    return NextResponse.redirect(redeemUrl);
  }

  return NextResponse.redirect(new URL("/gate", req.url));
}

export const config = {
  matcher: [
    "/((?!gate|api/redeem|api/admin|_next/static|_next/image|favicon\\.ico).*)",
  ],
};
