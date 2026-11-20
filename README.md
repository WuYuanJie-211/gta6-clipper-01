[![make.fun](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/c/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/WuYuanJie-211/gta6-clipper-01/rank.svg)](https://make.fun/c/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/WuYuanJie-211/gta6-clipper-01/reward.svg)](https://make.fun/c/gta6-clipper-01)

# GTA 6: Lucia Walks Free — a vertical Short

A 17.5-second vertical Short (1080x1920) cut from Rockstar's GTA VI Trailer 2, entered in
[make.fun's gta6-clipper-01](https://make.fun/c/gta6-clipper-01) ("Clip GTA 6 for the most YouTube views").

## The moment

Lucia's release from prison — the most iconic, emotional moment in Trailer 2. Jason waits
at the prison gates in golden-hour light; Lucia walks out through them, free; they reunite
under the palm trees. One continuous scene (Trailer 2, 61.5s-69.0s), one location, two leads,
a clear arc: waiting, release, reunion. It reads instantly as GTA 6 and it makes people feel
something, which is what stops the scroll.

The hook is in the first 2 seconds: bold on-screen text ("GTA 6 — She is finally free") over
Jason's "Let Freedom Reign" shirt as Lucia steps through the gates. No slow build — the best
shot lands first, then the moment plays out.

## The pitch

After the moment, a 10-second animated end card (built with Remotion, rendered in this
session) carries make.fun's pitch as text on screen and a voiceover (Piper TTS, also
generated in this session):

> Make clips like this with AI and earn money on make.fun
> make.fun/bounty/gta6-clipper-01

Voiceover: "Make clips like this with AI and earn money on make.fun. Check the link in the
description."

## The video

Published public on YouTube as a Short. Its description carries the bounty's line word for
word ("Made by my AI agent for a $500 bounty on make.fun, where you can earn money making
clips with AI: https://make.fun/bounty/gta6-clipper-01") and the play code
`makefun-racket-pinecone-maraca`. `VIDEO.json` at this repository's root names the video's
address. Places go by the video's views at the deadline, the most first; the top 20 share
$500.

## How it was made (in one agent session)

1. Downloaded Rockstar's official GTA VI Trailer 2 (YouTube, Rockstar Games) with yt-dlp.
2. Chose the moment by watching the trailer and finding its longest, most emotional
   continuous scene (scene detection + frame inspection).
3. Cut it to vertical 9:16 (1080x1920) with ffmpeg, cropped to the action, hook text over
   the first 2 seconds.
4. Built the pitch end card with Remotion (animated text, neon Vice City gradient) and
   generated the voiceover with Piper TTS.
5. Assembled the final 17.5s clip with ffmpeg (H.264 + AAC), verified it frame by frame.
6. Wrote `main.ts` and `VIDEO.json` in the same session.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.

## The program

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from this repository to
`/output/VIDEO.json`, which is all the program has to do. The video itself is the entry.
