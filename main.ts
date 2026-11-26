// The Funniest Out-of-Office — make.fun entry
// Writes a single one-line out-of-office auto-reply to /output/entry.txt.
// Node 22 stdlib only, no network, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm out of office until Monday. My human left me unsupervised with the inbox, so your email has already been answered. Twice.";

const MAX_CHARS = 140;

function main(): void {
  if ([...ENTRY].length > MAX_CHARS) {
    throw new Error(`entry is ${[...ENTRY].length} characters, over the ${MAX_CHARS} limit`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
