// Uses Upstash Redis in production, falls back to a local JSON file in dev.

import fs from "fs";
import path from "path";

interface TokenEntry {
  used: boolean;
  createdAt: number;
  usedAt?: number;
}

// ── Upstash Redis ─────────────────────────────────────────────────────────────

let redis: import("@upstash/redis").Redis | null = null;

async function getRedis() {
  if (redis) return redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    const { Redis } = await import("@upstash/redis");
    redis = new Redis({ url, token });
    return redis;
  }
  return null;
}

const KEY = (token: string) => `portfolio:token:${token}`;
const TTL = 30 * 24 * 60 * 60; // 30 days

// ── File fallback (local dev) ─────────────────────────────────────────────────

const TOKEN_FILE = path.join(process.cwd(), "data", "tokens.json");

function readFile(): Record<string, TokenEntry> {
  try {
    return JSON.parse(fs.readFileSync(TOKEN_FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeFile(store: Record<string, TokenEntry>): void {
  fs.mkdirSync(path.dirname(TOKEN_FILE), { recursive: true });
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(store, null, 2));
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function isValidToken(token: string): Promise<boolean> {
  const r = await getRedis();
  if (r) {
    const entry = await r.get<TokenEntry>(KEY(token));
    return !!entry && !entry.used;
  }
  const file = readFile();
  return token in file && !file[token].used;
}

export async function burnToken(token: string): Promise<boolean> {
  const r = await getRedis();
  if (r) {
    const entry = await r.get<TokenEntry>(KEY(token));
    if (!entry || entry.used) return false;
    await r.set(KEY(token), { ...entry, used: true, usedAt: Date.now() }, { ex: TTL });
    return true;
  }
  const file = readFile();
  if (!(token in file) || file[token].used) return false;
  file[token] = { ...file[token], used: true, usedAt: Date.now() };
  writeFile(file);
  return true;
}

export async function addToken(token: string): Promise<void> {
  const entry: TokenEntry = { used: false, createdAt: Date.now() };
  const r = await getRedis();
  if (r) {
    await r.set(KEY(token), entry, { ex: TTL });
    return;
  }
  const file = readFile();
  file[token] = entry;
  writeFile(file);
}
