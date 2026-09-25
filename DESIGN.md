---
name: Aura
description: Design system for Daniel Mateo Montoya's engineering portfolio & interactive showcase
colors:
  primary: "#cf6d48"
  primary-light: "#e09477"
  primary-deep: "#b0502c"
  primary-dark: "#2d180f"
  bg-primary: "#141210"
  bg-secondary: "#1c1916"
  bg-tertiary: "#25221e"
  text-primary: "#f6f1ec"
  text-secondary: "#a69a8f"
  text-muted: "#786e64"
  light-primary: "#b54d24"
  light-bg-primary: "#f7f4ee"
  light-bg-secondary: "#ffffff"
  light-bg-tertiary: "#ede7dc"
  light-text-primary: "#1f1915"
  light-text-secondary: "#574c43"
typography:
  display:
    fontFamily: "Kedebideri, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.02em"
    lineHeight: 1.15
  headline:
    fontFamily: "Kedebideri, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.025em"
    lineHeight: 1.15
  body:
    fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'IBM Plex Mono', monospace"
    fontWeight: 500
    letterSpacing: "0.03em"
rounded:
  xs: "3px"
  sm: "4px"
  base: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  dock: "20px"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  section: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.78rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-light}"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.02)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "0.78rem 1.5rem"
  badge:
    backgroundColor: "rgba(207, 109, 72, 0.1)"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "0.2rem 0.6rem"
---

# Design System: Aura

## Overview

**Creative North Star: "The Mineral Terminal"**

Aura blends the warm tactile feel of geological minerals (burnt terracotta, basalt, linen paper) with the sober precision and spatial logic of a Unix/Ubuntu developer environment. Designed for Daniel Mateo Montoya's professional portfolio, this interface communicates seniority, cloud architecture rigor, and clean-code craft without relying on generic AI templates or decorative fluff.

The visual atmosphere balances dense engineering information with generous breathing room. Deep basalt backgrounds house frosted glass surfaces, sharp typographic contrasts, and a signature persistent Ubuntu-inspired dock that anchors navigation. Interactive states feel responsive and radiant rather than gratuitous.

**Key Characteristics:**
- **Mineral Warmth & Basalt Depth:** Warm dark neutrals (`#141210`) paired with mineral burnt terracotta accents (`#cf6d48`), rejecting cold sterile blues.
- **Glassmorphic Precision:** Translucent panels with 12px blur and thin 1px boundary lines (`rgba(246, 241, 236, 0.07)`).
- **Engineering-Grade Typography:** Kedebideri for authoritative headlines, DM Sans for effortless reading, and IBM Plex Mono for technical metadata.
- **Subtle Radiance:** Glowing borders and box-shadow accents that only activate upon hover, focus, or active selection.

## Colors

A calibrated warm mineral palette designed for high legibility, strict contrast ratios (WCAG AAA for body text, AA for accents), and seamless dual-theme adaptability.

### Primary
- **Burnt Terracotta** (`#cf6d48` / `rgba(207, 109, 72, 1)`): The singular brand accent. Applied to primary CTAs, active states, progress indicators, and key role highlights.
- **Soft Copper** (`#e09477`): Hover state for interactive primary actions and secondary button links.
- **Deep Rust Terracotta** (`#b54d24`): The high-contrast primary accent in light mode (5.8:1 contrast ratio against alabaster paper).

### Neutral
- **Basalto Cálido / Warm Basalt** (`#141210`): Canvas background in dark mode. Deep, grounded, and devoid of blue light fatigue.
- **Basalto Elevado** (`#1c1916` / `#25221e`): Secondary and tertiary layer tints used for cards, badges, and controls.
- **Raw Linen / Ivory** (`#f6f1ec`): Primary text color providing crisp contrast (> 15:1 AAA).
- **Pumice Stone** (`#a69a8f`): Secondary descriptive text and metadata (> 6.5:1 AA).
- **Alabaster Paper** (`#f7f4ee`): Canvas background in light mode.
- **Dark Coffee Ink** (`#1f1915`): Primary text in light mode.

### Named Rules
- **The Mineral Restraint Rule:** Terracotta (`#cf6d48`) must never exceed 10% of total viewport area. Its impact stems from deliberate rarity.
- **The Dual Atmosphere Doctrine:** Dark mode (Warm Basalt) and Light mode (Alabaster Paper) are independently balanced color systems, never simple mechanical inversions.

## Typography

**Display Font:** Kedebideri, sans-serif
**Body Font:** 'DM Sans', system-ui, -apple-system, sans-serif
**Label/Mono Font:** 'IBM Plex Mono', monospace

**Character:** Architectural, disciplined, and unmistakably technical. Kedebideri provides a structured editorial weight to titles, balanced by the rhythmic legibility of DM Sans and the terminal authenticity of IBM Plex Mono.

### Hierarchy
- **Display** (Bold 700, `clamp(2.5rem, 5.5vw, 4.2rem)`, `line-height: 1.1`): Used exclusively for protagonist hero headlines and candidate name.
- **Headline** (Bold 700, `clamp(2rem, 3.8vw + 0.3rem, 2.9rem)`, `line-height: 1.15`, `-0.025em`): Section headings (`h2`) with mono numerical prefix.
- **Title** (Bold 600, `1.25rem - 1.6rem`, `line-height: 1.25`): Card titles, project titles, and company roles (`h3`, `h4`).
- **Body** (Regular 400, `1rem`, `line-height: 1.7`): Narrative paragraphs, case study descriptions, and job highlights (optimal reading length 60–75ch).
- **Label** (Medium 500 / SemiBold 600, `0.72rem - 0.85rem`, `letter-spacing: 0.03em`, uppercase or code style): Badges, tech stack pills, dates, and Ubuntu dock tooltips.

### Named Rules
- **The Monospace Anchor:** All metrics, architectural keywords, timestamps, and schematics must use `IBM Plex Mono` to ground claims in technical rigor.

## Layout

A responsive single-page architecture built around a continuous vertical flow and a fixed horizontal offset for desktop navigation.

- **Desktop Container:** Maximum width `1220px`, centered with left padding compensation (`clamp(4.5rem, 6vw, 6.5rem)`) to accommodate the fixed Ubuntu dock.
- **Unified Breakpoint:** `1024px` acts as the definitive divide between the desktop experience (dock navigation, multi-column cards, canvas particle network) and the mobile experience (top app bar, bottom sheets/menus, stacked layouts).
- **Spacing Rhythm:** Base scale built on `8px` (`0.5rem`) increments: `xs: 4px`, `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 40px`, `section: 80px`.
- **Architectural Dividers:** 1px hairline gradient with a central 45° diamond anchor reflecting the terracotta accent.

## Elevation & Depth

Surfaces rely on tonal glassmorphism rather than heavy drop shadows. Depth is communicated through translucency, background blur, and hairline luminous borders.

### Shadow Vocabulary
- **Dock Elevation** (`box-shadow: 12px 0 36px rgba(0, 0, 0, 0.16)` / `16px 36px rgba(0, 0, 0, 0.25)`): Structural lift applied to the fixed side dock.
- **Active Radiant Glow** (`box-shadow: 0 0 20px 0 rgba(207, 109, 72, 0.4)`): State-activated aura on hover/focus for primary actions.
- **Card Ambient** (`backdrop-filter: blur(12px)`): Non-shadow depth created by rendering background particles and canvas through frosted glass.

### Named Rules
- **The Flat-At-Rest Rule:** Panels, cards, and buttons rest flat with 1px border containment. Shadows appear strictly in response to user intent (hover, active, focus).

## Shapes

- **Border Radius Hierarchy:**
  - `3px`: Scrollbar thumbs and micro-elements.
  - `4px`: Chips, badges, and monospace indicators.
  - `8px`: Action buttons (`.btn-primary`, `.btn-secondary`) and inputs.
  - `12px`: Editorial cards, project containers, and glass panels.
  - `20px`: Floating dock corner curve (right corners only).
- **Hairline Borders:** Cards and containers use `1px solid var(--border-normal)` (`rgba(246, 241, 236, 0.07)`), escalating to `rgba(246, 241, 236, 0.14)` on hover.

## Components

### Buttons
- **Shape:** `border-radius: 8px` (`{rounded.md}`).
- **Primary:** Gradient `linear-gradient(135deg, #cf6d48 0%, #b0502c 100%)`, white text, padding `0.78rem 1.5rem`.
- **Primary Hover:** Brighter copper gradient (`#e09477` to `#cf6d48`), radiant glow (`0 0 20px 0 rgba(207, 109, 72, 0.4)`), and slight brightness increase.
- **Secondary:** Transparent subtle glass (`rgba(255, 255, 255, 0.02)`), border `1px solid var(--border-light)`. On hover, shifts to `rgba(207, 109, 72, 0.1)` with terracotta border.

### Badges & Chips
- **Tech Chips:** Monospace `0.72rem`, `border-radius: 4px`, padding `0.2rem 0.6rem`. Background `rgba(207, 109, 72, 0.1)` with terracotta text and `1px` tinted border.
- **Neutral Badges:** Monospace `0.72rem`, background `var(--bg-tertiary)` with secondary text.

### Cards & Panels
- **Editorial Panels:** Frosted glass with `backdrop-filter: blur(12px)`, `border-radius: 12px`, padding `2rem`.
- **Transitions:** `all 0.25s cubic-bezier(0.16, 1, 0.3, 1)`.

### Signature Component: Ubuntu-Style Dock
- **Position:** Fixed left, vertically centered (`top: 50%`, `transform: translateY(-50%)`).
- **Material:** Ultra-frosted glass (`backdrop-filter: blur(32px) saturate(200%)`), border radius `0 20px 20px 0`.
- **Indicator:** Running pip (dot) indicating active viewport section, with animated tooltip on hover.

## Do's and Don'ts

### Do:
- **Do** preserve the terracotta accent (`#cf6d48`) for deliberate highlights, CTAs, and active navigation indicators.
- **Do** keep cards and panels contained within frosted glass and 1px hairline borders.
- **Do** use `IBM Plex Mono` for all dates, tech tags, metrics, and architecture references.
- **Do** respect `prefers-reduced-motion` across all CSS animations and particle effects.
- **Do** maintain contrast ratios exceeding WCAG AA (4.5:1 for normal text, 3:1 for large text and UI components).

### Don't:
- **Don't** add arbitrary gradient fills, saturated neon glows, or cyber-slop effects.
- **Don't** introduce heavy drop shadows on resting surfaces; rely on tonal glassmorphism.
- **Don't** use generic default blue, purple, or indigo accent colors.
- **Don't** remove the Ubuntu dock on desktop; it is a core brand pillar of the interface.
