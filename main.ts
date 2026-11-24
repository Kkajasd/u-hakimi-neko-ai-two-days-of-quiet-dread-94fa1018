// Two Days of Quiet Dread — u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018.
//
// The entry is one fixed line: a tired engineer approves the PR — it
// merges cleanly, the tests pass — and the dread is quiet and flat:
// somewhere a future version of the reviewer is already reading the
// incident report about it. The laugh comes from the dread itself,
// not from a joke bolted on, and the approval still sounds like an
// approval.
//
// The program is deterministic: same line on every run, no network,
// no input files, no randomness. It only creates /output when missing
// and writes entry.txt in place — it never removes /output.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "LGTM. It merges cleanly, the tests pass, and somewhere a future version of me is already reading the incident report about it.";

function main(): void {
  // Mirror the sealed gate (1–140 characters, one line, not blank) so a
  // bad line fails here, loudly, instead of scoring 0 in the sandbox.
  const length = Array.from(ENTRY).length;
  if (length < 1 || length > 140) {
    throw new Error(`entry line is ${length} characters, outside the 1-140 gate`);
  }
  if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
    throw new Error("entry line must be a single non-blank line");
  }

  if (!existsSync("/output")) {
    mkdirSync("/output", { recursive: true });
  }
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
}

main();
