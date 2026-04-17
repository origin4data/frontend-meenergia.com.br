# Scroll-Driven Video Hero — Design Spec

## Overview

Replace the current `Hero.tsx` component with a new `ScrollVideoHero.tsx` that uses scroll-driven video playback (Apple-style). The video `video-sol.mp4` plays forward as the user scrolls down and rewinds as they scroll up. At the end of the video, the `logo-mundo-eletrico.png` fades in centered on screen, then fades out as the user scrolls into the next section.

## Decisions Made

| Decision | Choice |
|---|---|
| Position in page | Replaces current Hero (option A) |
| Logo behavior | Fade-in at video end, fade-out on continued scroll (option B) |
| Video sizing | Fullscreen — 100vw × 100vh, no borders |
| Text/CTAs from old hero | Removed entirely — clean cinematic look (option A) |
| Technical approach | `currentTime` via scroll using Framer Motion (approach A) |

## Architecture

### New Component: `ScrollVideoHero.tsx`

- **Directive:** `"use client"` (requires browser APIs: scroll events, video element)
- **Location:** `components/ScrollVideoHero.tsx`

### Structure

```
<section> (container — height: ~300vh, relative positioning)
  └── <div> (sticky wrapper — position: sticky, top: 0, height: 100vh)
      ├── <video> (fullscreen — 100vw × 100vh, object-fit: cover)
      └── <div> (logo overlay — absolute, centered, opacity animated)
          └── <Image> (logo-mundo-eletrico.png)
```

### Scroll Mechanics

1. The outer `<section>` has a height of approximately **300vh** (3× the viewport). This creates the scroll runway.
2. Inside, a `<div>` with `position: sticky; top: 0; height: 100vh` pins the video to the viewport as the user scrolls through the container.
3. `useScroll({ target: sectionRef })` from Framer Motion tracks scroll progress (0 to 1) within the section.
4. `useTransform` maps scroll progress `[0, 1]` to `[0, video.duration]`.
5. On each scroll tick, `video.currentTime` is set to the mapped value. The video is never "playing" — it's scrubbed frame by frame.
6. The `<video>` element attributes: `muted`, `playsInline`, `preload="auto"`. No `autoplay`, no `controls`.

### Logo Reveal

- The logo (`/logo-mundo-eletrico.png`) is positioned absolutely, centered both horizontally and vertically within the sticky wrapper.
- Uses `useTransform` to map scroll progress:
  - `[0, 0.85]` → opacity `0` (invisible during video)
  - `[0.85, 1.0]` → opacity `0→1` (fade-in at the end)
- The logo is rendered large (roughly 200-300px width) and centered.
- As the user continues scrolling past the section into CompaniesSlider, the entire sticky container scrolls out of view naturally, creating the fade-out effect.

### Video Requirements

- **File:** `/video-sol.mp4` (10.9 MB)
- The video should ideally have frequent keyframes for smooth seeking. If scrubbing is jerky, re-encoding with `keyint=1` (every-frame keyframes) would help, but we start with the existing file.

## Page Layout Changes

### `app/page.tsx`

```diff
- import Hero from "@/components/Hero";
+ import ScrollVideoHero from "@/components/ScrollVideoHero";

  <Header />
- <Hero />
+ <ScrollVideoHero />
  <CompaniesSlider />
  <ProjectsCarousel />
  <Footer />
```

### Files Modified

| File | Change |
|---|---|
| `components/ScrollVideoHero.tsx` | New file — scroll-driven video hero component |
| `app/page.tsx` | Replace `Hero` import with `ScrollVideoHero` |

### Files NOT Modified

| File | Reason |
|---|---|
| `components/Hero.tsx` | Kept in codebase but no longer imported (can be removed later) |
| `globals.css` | No new CSS needed — Tailwind + inline styles sufficient |
| `Header.tsx` | No changes — stays fixed with z-index above the video |

## Dependencies

- **framer-motion** (already installed) — `useScroll`, `useTransform`, `useMotionValueEvent`, `motion`
- **next/image** (built-in) — for the logo
- No new packages needed.

## Edge Cases

- **Mobile:** `playsInline` ensures iOS doesn't fullscreen the video. Scroll scrubbing works on touch via the same scroll events.
- **Video loading:** The video starts with `preload="auto"`. On slow connections, early frames may not be ready — the video element handles this gracefully by showing the last available frame.
- **Scroll direction:** Scrolling up naturally decreases `currentTime`, rewinding the video. No special handling needed.
- **Header z-index:** The Header component already uses a high z-index and will render above the sticky video.
