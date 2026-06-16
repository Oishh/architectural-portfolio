import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getSessionPayload, COOKIE_NAME } from "@/lib/session";
import { addToken } from "@/lib/token-store";

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get(COOKIE_NAME)?.value;
  const payload = sessionToken ? await getSessionPayload(sessionToken) : null;

  if (!payload?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = randomBytes(32).toString("hex");
  await addToken(token);

  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
  const url = `${siteUrl}/?token=${token}`;

  return NextResponse.json({ url });
}
