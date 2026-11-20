// gta6-clipper-01 entry: validate VIDEO.json, then copy it to /output
//
// This is the whole program. The entry is the YouTube video itself: an agent
// found a GTA 6 moment in Rockstar's GTA VI Trailer 2, cut it into a vertical
// Short that hooks with the moment and then pitches make.fun, and the video's
// address goes in VIDEO.json at this repository's root. The house reads the
// video's views through the YouTube Data API; nothing this program writes
// about the video is scored.
//
// Before copying, the program reads VIDEO.json and checks it is a JSON object
// with a string "url" that is a YouTube Shorts address, so a bad or mistyped
// VIDEO.json fails loudly instead of being published silently. After copying,
// it reads the output back and confirms it is byte-identical to the source.
// On success it prints the video URL and the output path.
//
// Node 22, standard library only. No network, no wall clock, no files
// outside this repository. The two runs of an entry must write the same bytes.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const srcPath = join(botDir, 'VIDEO.json');
const dstPath = join(outDir, 'VIDEO.json');

// 1. Read and validate VIDEO.json before copying anything.
let raw: Buffer;
try {
  raw = readFileSync(srcPath);
} catch (err) {
  console.error(`could not read VIDEO.json from ${srcPath}: ${(err as Error).message}`);
  process.exit(1);
}

let data: unknown;
try {
  data = JSON.parse(raw.toString('utf8'));
} catch (err) {
  console.error(`VIDEO.json at ${srcPath} is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof data !== 'object' || data === null || Array.isArray(data)) {
  console.error(`VIDEO.json at ${srcPath} must be a JSON object, got ${Array.isArray(data) ? 'an array' : typeof data}`);
  process.exit(1);
}

const url = (data as Record<string, unknown>).url;
if (typeof url !== 'string') {
  console.error(`VIDEO.json at ${srcPath} must have a string "url" field, got ${typeof url}`);
  process.exit(1);
}

const shortsPattern = /^https:\/\/www\.youtube\.com\/shorts\/[A-Za-z0-9_-]{11}$/;
if (!shortsPattern.test(url)) {
  console.error(`VIDEO.json "url" must be a YouTube Shorts URL of the form https://www.youtube.com/shorts/<11-character video id>, got ${url}`);
  process.exit(1);
}

// 2. Copy, then verify the copy is byte-identical to the source.
mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(srcPath, dstPath);
} catch (err) {
  console.error(`could not copy VIDEO.json from ${srcPath} to ${dstPath}: ${(err as Error).message}`);
  process.exit(1);
}

let copied: Buffer;
try {
  copied = readFileSync(dstPath);
} catch (err) {
  console.error(`could not read back the copied VIDEO.json at ${dstPath}: ${(err as Error).message}`);
  process.exit(1);
}

if (!copied.equals(raw)) {
  console.error(`copied VIDEO.json at ${dstPath} differs from the source at ${srcPath}`);
  process.exit(1);
}

// 3. Confirm what was published.
console.log(`published video ${url} to ${dstPath}`);
