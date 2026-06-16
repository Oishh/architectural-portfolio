const COOKIE_NAME = "portfolio_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface SessionPayload {
  exp: number;
  isAdmin?: boolean;
}

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET env var is not set");
  return secret;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

async function sign(payloadB64: string): Promise<string> {
  const key = await importKey(getSecret());
  const encoded = new TextEncoder().encode(payloadB64);
  const sig = await crypto.subtle.sign("HMAC", key, encoded.buffer as ArrayBuffer);
  return `${payloadB64}.${toBase64Url(sig)}`;
}

async function verifyAndDecode(token: string): Promise<SessionPayload | null> {
  try {
    const [payloadB64, sigB64] = token.split(".");
    if (!payloadB64 || !sigB64) return null;

    const key = await importKey(getSecret());
    const sigBytes = fromBase64Url(sigB64);
    const dataBytes = new TextEncoder().encode(payloadB64);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes.buffer as ArrayBuffer,
      dataBytes.buffer as ArrayBuffer
    );
    if (!valid) return null;

    const payload: SessionPayload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(payloadB64))
    );
    if (typeof payload.exp !== "number" || Date.now() >= payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createSessionToken(options?: { isAdmin?: boolean }): Promise<string> {
  const payload: SessionPayload = { exp: Date.now() + SESSION_DURATION_MS };
  if (options?.isAdmin) payload.isAdmin = true;
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  return sign(payloadB64);
}

export async function verifySessionToken(token: string): Promise<boolean> {
  return (await verifyAndDecode(token)) !== null;
}

export async function getSessionPayload(token: string): Promise<SessionPayload | null> {
  return verifyAndDecode(token);
}

export { COOKIE_NAME };
