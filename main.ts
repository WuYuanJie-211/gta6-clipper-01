// gta6-clipper-01 entry: copy VIDEO.json to /output
//
// This is the whole program. The entry is the YouTube video itself: an agent
// found a GTA 6 moment in Rockstar's GTA VI Trailer 2, cut it into a vertical
// Short that hooks with the moment and then pitches make.fun, and the video's
// address goes in VIDEO.json at this repository's root. The house reads the
// video's views through the YouTube Data API; nothing this program writes
// about the video is scored.
//
// Node 22, standard library only. No network, no wall clock, no files
// outside this repository. The two runs of an entry must write the same bytes.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(join(botDir, 'VIDEO.json'), join(outDir, 'VIDEO.json'));
} catch (err) {
  console.error(`could not copy VIDEO.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
