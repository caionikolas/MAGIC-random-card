# Dark Forge — Frontend Redesign Spec

**Date:** 2026-04-06  
**Project:** MAGIC-random-card  
**Goal:** Portfolio-quality redesign of the MTG random card viewer frontend, maintaining the same functionality (fetch and display random cards via Scryfall API).

---

## 1. Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#1A1A1A` | Page background |
| `--surface` | `#242424` | Card panels, elevated surfaces |
| `--accent` | `#F5901E` | Primary accent: borders, hover glow, button hover bg |
| `--accent-dark` | `#832100` | Secondary accent: divider, button bg, destructive tones |
| `--text` | `#FFFFFF` | Primary text |
| `--text-muted` | `#AEACAC` | Secondary text, labels, loading state text |
| `--border-subtle` | `rgba(174,172,172,0.15)` | Resting card borders |
| `--glow` | `rgba(245,144,30,0.35)` | Card hover glow |

**Typography:** `Planewalker` (already in `src/assets/fonts/`) for headings, category labels, and button text. System sans-serif for smaller UI text.

---

## 2. Global Styles (`main.css`)

- Reset: `* { margin: 0; padding: 0; box-sizing: border-box; }`
- `body`: `background: #1A1A1A; color: #FFFFFF; font-family: system-ui, sans-serif;`
- `@font-face` declarations for Planewalker and Planewalker Bold
- Scrollbar styling to match dark theme

---

## 3. Dashboard (`/`)

**Layout:** Full-viewport two-panel split (flex row, each panel `flex: 1`).

**Resting state (per panel):**
- Background: `#1A1A1A`
- Category label centered vertically and horizontally, font Planewalker Bold, size `3rem`, color `#AEACAC`
- Small subtitle below label: "Click to draw" in `#AEACAC` at `0.9rem`
- A vertical divider `3px wide` in `#832100` between the two panels

**Hover state (panel):**
- Panel width expands from `50%` → `60%` (partner shrinks to `40%`) via `transition: flex 0.4s ease`
- Background shifts to `#242424`
- Left border `3px solid #F5901E` appears on the expanding panel
- Label color brightens to `#F5901E`
- Cursor: pointer

**Header (fixed, top):**
- Height `56px`, background `rgba(26,26,26,0.9)` with `backdrop-filter: blur(8px)`
- Title "MTG Random" in Planewalker Bold, `1.4rem`, color `#F5901E`, left-aligned with padding
- Sits above both panels (z-index higher)

**Navigation:** `<Link>` wraps the entire panel. No image files used for navigation.

---

## 4. Card Pages (`/Legendary` and `/Normal`)

**Layout:** Full-viewport, `#1A1A1A` background. Cards displayed in a horizontally centered flex row, vertically centered in the viewport. Header (same as Dashboard) remains visible.

**Card images:**
- Width: `20rem`, border-radius `12px`
- Gap between cards: `3rem`
- Resting: `box-shadow: 0 8px 40px rgba(0,0,0,0.8)`, border `1px solid rgba(245,144,30,0.2)`
- Hover: `transform: scale(1.03)`, border shifts to `rgba(245,144,30,0.7)`, `box-shadow` adds glow
- `transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease`

**No cards yet (initial state):** Show a centered prompt — "Press DRAW to invoke your cards" — in `#AEACAC` with Planewalker font. The button is always visible.

**Draw Button:**
- Position: centered below the cards (or below the prompt), `margin-top: 2.5rem`
- Background: `#832100`, border: `2px solid #F5901E`, border-radius: `6px`
- Text: "DRAW" in Planewalker Bold, `1.1rem`, color `#FFFFFF`, letter-spacing `0.1em`
- Padding: `0.75rem 3rem`
- Hover: background `#F5901E`, color `#1A1A1A`, transition `0.2s ease`
- No image file. Pure CSS button.

**Loading state:**
- Cards area replaced by a centered spinner: circular `border` animation, stroke `#F5901E`, size `3rem`
- Below spinner: text "Invoking..." in `#AEACAC`, `0.9rem`, Planewalker

**Back button:**
- Top-left corner, below the header
- Text "← Back" in `#AEACAC`, `0.9rem`, no border, transparent background
- Hover: color `#F5901E`
- Links back to `/`

---

## 5. Component Boundaries

| Component | Responsibility |
|---|---|
| `Header` | Logo + title, shared between all pages |
| `Dashboard` | Two-panel split layout + navigation |
| `CardPage` | Shared layout for Legendary and Normal (receives `filterCard` function as prop) |
| `CardDisplay` | Renders two card images with hover effects |
| `DrawButton` | Styled button, receives `onClick` and `loading` props |
| `Spinner` | Loading indicator |

`Legendary` and `Normal` will each pass their own `filterCard: (card: any) => boolean` prop to a shared `CardPage` component, which owns the fetch logic. This eliminates the duplicated fetch code that currently exists in both components.

---

## 6. What Changes, What Stays

**Stays the same:**
- Scryfall API integration (`src/services/api.ts`)
- Routing structure (`/`, `/Legendary`, `/Normal`)
- Filter logic (Legendary types, Normal type exclusions)
- React + TypeScript + Vite + styled-components stack

**Changes:**
- All styled-components rewritten with new palette
- Dashboard: from image-based blur reveal → CSS split-panel expand
- Button: from `button.png` image → pure CSS styled button
- Loading: spinner updated to use `#F5901E`
- Background: from image files → solid `#1A1A1A` + surface colors
- New shared `Header` component
- New shared `CardPage` component (removes duplicated fetch logic)
- `@font-face` declarations added to `main.css` for Planewalker fonts

---

## 7. Out of Scope

- Card name/text overlay on hover
- Favorites or history features
- Responsive/mobile layout (can be addressed later)
- Any changes to the Scryfall API query parameters
