# Behind the Price

Automated video-production engine for a faceless YouTube channel that explains the hidden money and business logic behind everyday things.

Output target: **1920×1080**, 30 fps, H.264 + AAC.

## Layout

```text
episodes/                 one folder per episode
  001-costco-receipt/
    research.md           sourced notes only
    script.md             spoken narration
    scenes.json           timed visual plan
    assets/               episode media
    thumbnail/
video-engine/
  src/                    Remotion bundle
    components/           reusable visuals
    compositions/         renderable videos
    scenes/               scene-kind renderers
    theme/                brand tokens + fonts
    types/                shared contracts
    schemas/              Zod validation
    utils/                Remotion-safe helpers
  pipeline/               Node-only TTS / stock / FFmpeg
public/                   Remotion staticFile() root
output/                   rendered files
```

This is not a slideshow generator. Each scene kind has a purpose-built visual: receipts, price tags, charts, comparisons, timelines, source cards, and timed narration.

## Commands

```bash
npm install
npm run studio          # Remotion preview
npm run render:test     # smoke-test composition → output/test.mp4
npm run typecheck
```

Pass an episode plan into the `Episode` composition later with:

```bash
npx remotion render Episode output/episode.mp4 --props=./episodes/001-costco-receipt/scenes.json
```

## Local / free media

- **TTS:** `video-engine/pipeline/tts.ts` uses macOS `say` first, then Piper if installed.
- **Stock:** `video-engine/pipeline/stock.ts` points at Pexels, Pixabay, and Wikimedia.
- **Audio finish:** Remotion ships FFmpeg. Optional loudnorm lives in `video-engine/pipeline/ffmpeg.ts`.
