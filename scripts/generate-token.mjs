import { randomBytes } from "crypto";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "../..");
const tokenFile = join(root, "data", "tokens.json");

function readStore() {
  try {
    return JSON.parse(readFileSync(tokenFile, "utf8"));
  } catch {
    return {};
  }
}

const token = randomBytes(32).toString("hex");

if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  const { Redis } = await import("@upstash/redis");
  const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
  await redis.set(`portfolio:token:${token}`, { used: false, createdAt: Date.now() }, { ex: 30 * 24 * 60 * 60 });
} else {
  const store = readStore();
  store[token] = { used: false, createdAt: Date.now() };
  mkdirSync(dirname(tokenFile), { recursive: true });
  writeFileSync(tokenFile, JSON.stringify(store, null, 2));
}

const siteUrl = process.env.SITE_URL || "http://localhost:3000";
console.log(`\nOne-time access link:\n${siteUrl}/?token=${token}\n`);
console.log("Share this link with your viewer. It can only be used once.");
