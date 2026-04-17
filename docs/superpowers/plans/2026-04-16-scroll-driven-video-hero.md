# Scroll-Driven Video Hero — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Hero with a scroll-driven video section where `video-sol.mp4` plays/rewinds based on scroll position, with `logo-mundo-eletrico.png` fading in at the end.

**Architecture:** A single client component (`ScrollVideoHero.tsx`) uses Framer Motion's `useScroll` to map scroll progress to `video.currentTime`. A sticky wrapper pins the video to the viewport while a tall container (300vh) provides the scroll runway. The logo fades in at 85-100% progress via `useTransform`.

**Tech Stack:** Next.js 16 (App Router), React 19, Framer Motion 12, TypeScript, Tailwind CSS 4

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `components/ScrollVideoHero.tsx` | Create | Scroll-driven video hero with logo reveal |
| `app/page.tsx` | Modify (lines 2, 10) | Swap Hero import for ScrollVideoHero |

---

### Task 1: Create ScrollVideoHero component

**Files:**
- Create: `components/ScrollVideoHero.tsx`

- [ ] **Step 1: Create the component file with full implementation**

```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const logoOpacity = useTransform(scrollYProgress, [0.85, 1.0], [0, 1]);
  const logoScale = useTransform(scrollYProgress, [0.85, 1.0], [0.8, 1]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = progress * video.duration;
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/video-sol.mp4"
          muted
          playsInline
          preload="auto"
        />

        {/* Logo overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: logoOpacity }}
        >
          <motion.div style={{ scale: logoScale }}>
            <Image
              src="/logo-mundo-eletrico.png"
              alt="Mundo Elétrico"
              width={280}
              height={280}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `cat components/ScrollVideoHero.tsx | head -5`
Expected: `"use client";` on line 1, imports on following lines.

- [ ] **Step 3: Commit**

```bash
git add components/ScrollVideoHero.tsx
git commit -m "feat: add ScrollVideoHero component with scroll-driven video playback"
```

---

### Task 2: Wire up ScrollVideoHero in page.tsx

**Files:**
- Modify: `app/page.tsx:2,10`

- [ ] **Step 1: Replace Hero import with ScrollVideoHero**

In `app/page.tsx`, change line 2:

```diff
- import Hero from "@/components/Hero";
+ import ScrollVideoHero from "@/components/ScrollVideoHero";
```

- [ ] **Step 2: Replace Hero usage with ScrollVideoHero**

In `app/page.tsx`, change line 10:

```diff
-       <Hero />
+       <ScrollVideoHero />
```

The final `app/page.tsx` should be:

```tsx
import Header from "@/components/Header";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import CompaniesSlider from "@/components/CompaniesSlider";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <ScrollVideoHero />
      <CompaniesSlider />
      <ProjectsCarousel />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: swap Hero for ScrollVideoHero in home page"
```

---

### Task 3: Verify in browser

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Open browser and test**

Open `http://localhost:3000` and verify:
1. The video fills the entire viewport (no borders, no background visible)
2. Scrolling down advances the video frame by frame
3. Scrolling up rewinds the video
4. At ~85% scroll progress the logo-mundo-eletrico fades in centered
5. The logo scales from 0.8 to 1.0 during the fade-in
6. Continuing to scroll past the section naturally scrolls the logo out of view
7. The Header remains visible above the video at all times
8. CompaniesSlider, ProjectsCarousel, and Footer render normally below

- [ ] **Step 3: Test mobile viewport**

In browser DevTools, toggle device toolbar (responsive mode) and verify:
1. Video covers the full viewport on mobile sizes
2. Scroll scrubbing works via touch/trackpad
3. Logo is appropriately sized on smaller screens

- [ ] **Step 4: Final commit if any adjustments were needed**

```bash
git add -A
git commit -m "fix: adjust ScrollVideoHero after browser testing"
```

(Skip this step if no adjustments were needed.)
