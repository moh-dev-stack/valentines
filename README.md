# Valentine Hearts

A mobile-first Valentine's Day web app with floating hearts, a sweet message, and interactive tap/scroll animations. Built for phones—optimized for hosting and "Add to Home Screen" as a PWA.

## Tech Stack

- **Vite** — Fast dev server and build
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Smooth, declarative animations
- **vite-plugin-pwa** — PWA support for install-on-phone

## What the App Should Entail

### 1. Core Experience

- **Floating hearts** — 15–25 heart elements drifting across the screen with gentle vertical movement, rotation, and opacity pulse
- **Sweet message** — Centered romantic text (e.g., "Will you be my Valentine?") with a soft, readable font
- **Interactive triggers** — Tap anywhere to spawn new hearts; scroll (if applicable) to reveal additional content

### 2. Visual Design (Mobile-First)

- **Background** — Soft gradient (pink/rose/coral tones)
- **Hearts** — Varied sizes, pink/red gradients, subtle shadows
- **Typography** — Romantic, readable font (e.g., Dancing Script, Great Vibes, or Caveat from Google Fonts)
- **Layout** — Single full-viewport screen, portrait-first, touch-friendly (min 44px tap targets)

### 3. Components to Build

| Component | Purpose |
|-----------|---------|
| `FloatingHearts` | Renders ambient hearts with Framer Motion `animate` (y drift, rotation, opacity). Staggered delays for natural motion |
| `SweetMessage` | Centered message with fade-in animation. Optional tap-to-reveal second line |
| `InteractiveOverlay` | Handles `onTouchStart` / `onClick` to spawn hearts at tap coordinates. Optional "Tap anywhere for hearts" hint |

### 4. Interaction Flow

1. **Load** — Ambient hearts float; main message fades in
2. **Tap** — New heart spawns at tap position, animates upward and fades out
3. **Scroll** (optional) — If content extends beyond viewport, scroll triggers message reveal or secondary content

### 5. PWA Behavior

- **Installable** — Users can "Add to Home Screen" on mobile
- **Standalone** — Runs in fullscreen (no browser chrome)
- **Portrait** — `orientation: portrait` in manifest
- **Offline** — Service worker caches assets for offline use

### 6. Hosting & Deployment

- **Build** — `npm run build` → outputs to `dist/`
- **Deploy** — Static files; deploy to Vercel, Netlify, GitHub Pages, or Cloudflare Pages
- **URL** — Share link; open on phone; optionally add to home screen

## Project Structure

```
valentines/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── icons/              # PWA icons (192x192, 512x512)
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── FloatingHearts.tsx
    │   ├── SweetMessage.tsx
    │   └── InteractiveOverlay.tsx
    └── vite-env.d.ts
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Animation Reference

A detailed catalogue of every animation in the app, including duration and trigger.

---

### FloatingHearts (ambient background)

| Animation | Description | Duration | Repeat | Notes |
|-----------|-------------|----------|--------|-------|
| **Heart float** | Each of 28 hearts drifts vertically, pulses opacity, and rotates gently | **11.25s** per cycle | Infinite | `y: [0, -12, -22, -12, 0]`, `opacity: [0.6, 0.9, 0.6, 0.8, 0.6]`, `rotate: [0, 5, -4, 5, 0]` |
| **Text exclusion** | Hearts avoid centre zone (left 20–80%, top 30–75%) so they don’t overlap text | — | — | — |
| **Stagger delay** | Hearts start at different times for natural spread | 0–3s (based on index) | — | `delay: (i / 28) * 3` |
| **Easing** | easeInOut | — | — | — |

---

### InteractiveOverlay (tap-to-spawn hearts)

| Animation | Description | Duration | Trigger |
|-----------|-------------|----------|---------|
| **Tap heart spawn** | Heart appears at tap position, scales up, floats up 80px, fades out | **2.85s** | User taps anywhere |
| **Scale** | `[0, 1.15, 1]` — pop in then settle | 2.85s | — |
| **Opacity** | `[1, 1, 0]` — fades out at end | 2.85s | — |
| **Y movement** | `[0, -80]` — floats upward | 2.85s | — |
| **Easing** | easeOut | — | — |
| **Cleanup** | Heart removed from DOM | After 3.15s | — |

---

### SweetMessage — Pre-acceptance (pressing "No")

#### Message container animations (triggered by noCount)

| noCount | Animation | Description | Duration | Easing |
|---------|-----------|-------------|----------|--------|
| **1** | Vertical bounce | `y: [0, 10, -6, 0]`, `scale: [1, 1.02, 0.98, 1]` — soft "nope" bob | **1.05s** | easeOut |
| **2** | Horizontal shake | `x: [-14, 14, -14, 14, 0]` — decisive "no" shake | **0.675s** | easeOut |
| **3** | Recoil | `scale: [1, 0.95, 1.02, 1]` — shrink then settle (during HeartBurst) | **0.9s** | easeOut |
| **4** | Sway | `rotate: [-4, 4, -3, 0]`, `y: [0, 4, 0]` — gentle tilt (during ConfettiRain) | **1.2s** | easeInOut |
| **5** | Swell + pulse | `scale: [1, 1.18, 1.12, 1.15]`, `opacity: [1, 1, 0.95, 1]` — "ready" breathing | **1.05s** | easeOut |

#### HeartBurst (noCount === 3)

| Animation | Description | Duration | Trigger |
|-----------|-------------|----------|---------|
| **8 hearts explode** | Hearts burst outward from centre in 8 directions | **1.8s** | 3rd "No" press |
| **Scale** | `[0, 1.1, 0.9]` per heart | 1.8s | — |
| **Position** | Each moves 120px at its angle | 1.8s | — |
| **Opacity** | `[1, 1, 0]` — fades out | 1.8s | — |
| **Easing** | easeOut | — | — |

#### ConfettiRain (noCount === 4)

| Animation | Description | Duration | Delay | Trigger |
|-----------|-------------|----------|-------|---------|
| **24 pieces fall** | Confetti (rectangles + circles) fall from top to bottom | **4.2s** | 0–0.3s random per piece | 4th "No" press |
| **Y movement** | `0 → 100vh` | 4.2s | — | — |
| **Rotate** | 360° spin while falling | 4.2s | — | — |
| **Opacity** | `[1, 1, 0]` — fades at bottom | 4.2s | — | — |
| **Easing** | linear | — | — | — |
| **Visibility** | Confetti overlay hidden | After 4.8s | — | — |

#### Counter and hint (noCount 1–4)

| Animation | Description | Duration | Notes |
|-----------|-------------|----------|-------|
| **Counter container** | Fade + scale in | — | `opacity: 0→1`, `scale: 0.8→1` (default spring) |
| **"Keep going..." hint** | Fade in | **0.75s** | `delay: 0.3s` |

#### Yes button

| Animation | Description | Duration | Notes |
|-----------|-------------|----------|-------|
| **Yes button appear** | Scale + fade in (spring) | — | `stiffness: 300`, `damping: 20` |
| **Yes button tap** | Scale down to 0.95 | — | whileTap |
| **No button tap** | Scale down to 0.95 | — | whileTap |

---

### SweetMessage — Accepted state (after "Yes")

#### Accepted container

| Animation | Description | Duration | Notes |
|-----------|-------------|----------|-------|
| **Accepted block enter** | Scale 0.8→1, opacity 0→1 (spring) | — | `stiffness: 200`, `damping: 20` |

#### Continue button (per press)

| Press | Animation | Description |
|-------|-----------|-------------|
| **1st** | Spin | `rotate: 360` on tap |
| **2nd** | Bounce | `scale: [1, 0.9, 1.15, 1]` on tap |
| **3rd** | Shake | `x: [0, -8, 8, -4, 4, 0]` on tap |
| **4th** | Scale + rotate | `scale: [1, 1.2, 0.95, 1]`, `rotate: [0, 10, -10, 0]` on tap |
| **Hover** | Scale up | `scale: 1.05` |
| **Transition** | Spring | `stiffness: 300`, `damping: 20` |

#### Accepted paragraphs (revealed per Continue press)

| Step | Content | Animation | Duration | Easing |
|------|---------|-----------|----------|--------|
| **1** | "Wait - you're not just a Valentine..." | Slide up + fade: `y: 24→0`, `opacity: 0→1` | **0.9s** | easeOut |
| **2** | "And it's an easy date to remember too :D" | Bouncy pop + wiggle: `scale: [0, 1.25, 0.9, 1.08, 1]`, `rotate: [0, 8, -6, 4, 0]` | **1.2s** | `[0.34, 1.56, 0.64, 1]` (bouncy) |
| **3** | "P.S. I also want to apologise..." | Shy slide + settle: `x: [-50, 0, 4, -2, 0]`, `rotate: [0, -2, 2, 0]`; Caveat font | **0.975s** | easeOut |
| **4** | "For a happy marriage and happy life" | Soft bloom: `scale: [0.6, 1.12, 0.98, 1]`, `opacity: [0, 1, 1, 1]`, `y: 12→0`; text shadow glow | **1.2s** | easeOut |

---

## Development Notes

- **Mobile testing** — Use `npm run dev` and open the local URL on your phone (same network) or use Chrome DevTools device emulation
- **Desktop** — Layout is mobile-first; desktop may show extra space but is not the primary target
