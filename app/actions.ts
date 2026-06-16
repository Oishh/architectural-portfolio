"use server";

import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/session";

export async function clearViewerSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
