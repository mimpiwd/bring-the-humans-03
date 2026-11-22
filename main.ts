// Bring the Humans 03 — TikTok ad entry.
// Copies VIDEO.json from the repository root into the output directory
// so the house can read the posted TikTok URL.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const source = join(repoRoot, "VIDEO.json");
// The runner may set MAKEFUN_OUTPUT_DIR to an empty string; treat that
// the same as unset so we never try to copy into "".
const outDir = (process.env.MAKEFUN_OUTPUT_DIR || "").trim() || "/output";

if (!existsSync(source)) {
  throw new Error(`VIDEO.json not found at ${source}`);
}

// The house checks the URL is well-formed before accepting the entry.
const parsed = JSON.parse(readFileSync(source, "utf8"));
if (typeof parsed.url !== "string" || !parsed.url.startsWith("https://")) {
  throw new Error("VIDEO.json must carry a https URL string");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "VIDEO.json"));
console.log(`Wrote VIDEO.json to ${join(outDir, "VIDEO.json")} (${parsed.url})`);
