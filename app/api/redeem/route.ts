import { NextRequest, NextResponse } from "next/server";
import { isValidToken, burnToken } from "@/lib/token-store";

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

  // Signal to the client that access was just granted — no cookie needed
  const dest = new URL(next, req.url);
  dest.searchParams.set("_access", "1");
  return NextResponse.redirect(dest);
}
