# Dark Forge Frontend Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the MTG random card viewer frontend with the "Dark Forge" visual identity — dark palette (`#1A1A1A`, `#F5901E`, `#832100`, `#AEACAC`), Planewalker typography, and a polished portfolio-grade UI — while keeping all existing Scryfall API functionality intact.

**Architecture:** Introduce shared `Header`, `CardPage`, `CardDisplay`, `DrawButton`, and `Spinner` components. `CardPage` owns all fetch logic and receives a `filterCard` prop, eliminating the duplicated code in `Legendary` and `Normal`. `Dashboard` becomes a CSS flex split-panel layout with no image assets.

**Tech Stack:** React 18, TypeScript, Vite 2, styled-components 5, React Router 6, Axios 0.27

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Modify | `src/assets/styles/main.css` | `@font-face`, body background/color, scrollbar |
| Create | `src/components/Header/index.tsx` | Logo + title, shared across all pages |
| Create | `src/components/Header/style.ts` | Header styled-components |
| Create | `src/components/Spinner/index.tsx` | Loading spinner component |
| Create | `src/components/Spinner/style.ts` | Spinner styled-components |
| Create | `src/components/DrawButton/index.tsx` | Draw button component |
| Create | `src/components/DrawButton/style.ts` | DrawButton styled-components |
| Create | `src/components/CardDisplay/index.tsx` | Renders two card images with hover effects |
| Create | `src/components/CardDisplay/style.ts` | CardDisplay styled-components |
| Create | `src/components/CardPage/index.tsx` | Shared layout + fetch logic for card pages |
| Create | `src/components/CardPage/style.ts` | CardPage styled-components |
| Rewrite | `src/components/Dashbord/index.tsx` | Split-panel Dashboard |
| Rewrite | `src/components/Dashbord/style.ts` | Dashboard styled-components |
| Rewrite | `src/components/Legendary/index.tsx` | Thin wrapper that passes filter to CardPage |
| Rewrite | `src/components/Normal/index.tsx` | Thin wrapper that passes filter to CardPage |

`src/services/api.ts`, `src/main.tsx`, `src/App.tsx` are **not touched**.

---

## Task 1: Global Styles

**Files:**
- Modify: `src/assets/styles/main.css`

- [ ] **Step 1: Replace the contents of `main.css`**

```css
@font-face {
    font-family: 'Planewalker';
    src: url('../fonts/Planewalker.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'Planewalker';
    src: url('../fonts/Planewalker Bold.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #1A1A1A;
    color: #FFFFFF;
    font-family: system-ui, -apple-system, sans-serif;
    min-height: 100vh;
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #1A1A1A;
}

::-webkit-scrollbar-thumb {
    background: #832100;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #F5901E;
}
```

- [ ] **Step 2: Start the dev server and verify no font-load errors in the browser console**

```bash
npm run dev
```

Open `http://localhost:5173` — background should be `#1A1A1A` (dark). No 404s for font files.

---

## Task 2: Header Component

**Files:**
- Create: `src/components/Header/index.tsx`
- Create: `src/components/Header/style.ts`

- [ ] **Step 1: Create `src/components/Header/style.ts`**

```ts
import styled from 'styled-components';

export const HeaderBar = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: rgba(26, 26, 26, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    padding: 0 2rem;
    z-index: 100;
    border-bottom: 1px solid rgba(174, 172, 172, 0.15);
`;

export const Logo = styled.span`
    font-family: 'Planewalker', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #F5901E;
    letter-spacing: 0.05em;
    user-select: none;
`;
```

- [ ] **Step 2: Create `src/components/Header/index.tsx`**

```tsx
import { HeaderBar, Logo } from './style';

export function Header() {
    return (
        <HeaderBar>
            <Logo>MTG Random</Logo>
        </HeaderBar>
    );
}
```

- [ ] **Step 3: Verify it renders — temporarily add `<Header />` to `App.tsx`, check the browser, then revert `App.tsx`**

In `src/App.tsx`, temporarily:
```tsx
import { Dashboard } from "./components/Dashbord"
import { Header } from "./components/Header"

function App() {
  return (
    <>
      <Header />
      <Dashboard/>
    </>
  )
}

export default App
```

Confirm: fixed bar at top, "MTG Random" in orange. Then revert to the original `App.tsx` (Header will be added properly in Task 7).

---

## Task 3: Spinner Component

**Files:**
- Create: `src/components/Spinner/index.tsx`
- Create: `src/components/Spinner/style.ts`

- [ ] **Step 1: Create `src/components/Spinner/style.ts`**

```ts
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const SpinnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

export const Ring = styled.span`
    display: block;
    width: 3rem;
    height: 3rem;
    border: 4px solid rgba(174, 172, 172, 0.2);
    border-top-color: #F5901E;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;

export const SpinnerLabel = styled.p`
    font-family: 'Planewalker', sans-serif;
    font-size: 0.9rem;
    color: #AEACAC;
    letter-spacing: 0.08em;
`;
```

- [ ] **Step 2: Create `src/components/Spinner/index.tsx`**

```tsx
import { SpinnerWrapper, Ring, SpinnerLabel } from './style';

export function Spinner() {
    return (
        <SpinnerWrapper>
            <Ring />
            <SpinnerLabel>Invoking...</SpinnerLabel>
        </SpinnerWrapper>
    );
}
```

---

## Task 4: DrawButton Component

**Files:**
- Create: `src/components/DrawButton/index.tsx`
- Create: `src/components/DrawButton/style.ts`

- [ ] **Step 1: Create `src/components/DrawButton/style.ts`**

```ts
import styled from 'styled-components';

export const Button = styled.button`
    font-family: 'Planewalker', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: 0.1em;
    color: #FFFFFF;
    background: #832100;
    border: 2px solid #F5901E;
    border-radius: 6px;
    padding: 0.75rem 3rem;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
    margin-top: 2.5rem;

    &:hover:not(:disabled) {
        background: #F5901E;
        color: #1A1A1A;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
```

- [ ] **Step 2: Create `src/components/DrawButton/index.tsx`**

```tsx
import { Button } from './style';

interface DrawButtonProps {
    onClick: () => void;
    loading: boolean;
}

export function DrawButton({ onClick, loading }: DrawButtonProps) {
    return (
        <Button type="button" onClick={onClick} disabled={loading}>
            DRAW
        </Button>
    );
}
```

---

## Task 5: CardDisplay Component

**Files:**
- Create: `src/components/CardDisplay/index.tsx`
- Create: `src/components/CardDisplay/style.ts`

- [ ] **Step 1: Create `src/components/CardDisplay/style.ts`**

```ts
import styled from 'styled-components';

export const CardsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3rem;
`;

export const CardImage = styled.img`
    width: 20rem;
    border-radius: 12px;
    border: 1px solid rgba(245, 144, 30, 0.2);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.8);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: scale(1.03);
        border-color: rgba(245, 144, 30, 0.7);
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.8), 0 0 24px rgba(245, 144, 30, 0.35);
    }
`;

export const EmptyPrompt = styled.p`
    font-family: 'Planewalker', sans-serif;
    font-size: 1.2rem;
    color: #AEACAC;
    text-align: center;
    letter-spacing: 0.05em;
`;
```

- [ ] **Step 2: Create `src/components/CardDisplay/index.tsx`**

```tsx
import { CardsWrapper, CardImage, EmptyPrompt } from './style';

interface CardDisplayProps {
    card1: string | undefined;
    card2: string | undefined;
}

export function CardDisplay({ card1, card2 }: CardDisplayProps) {
    if (!card1 && !card2) {
        return <EmptyPrompt>Press DRAW to invoke your cards</EmptyPrompt>;
    }

    return (
        <CardsWrapper>
            {card1 && <CardImage src={card1} alt="Card 1" />}
            {card2 && <CardImage src={card2} alt="Card 2" />}
        </CardsWrapper>
    );
}
```

---

## Task 6: CardPage Component (shared fetch + layout)

**Files:**
- Create: `src/components/CardPage/index.tsx`
- Create: `src/components/CardPage/style.ts`

- [ ] **Step 1: Create `src/components/CardPage/style.ts`**

```ts
import styled from 'styled-components';

export const PageWrapper = styled.div`
    min-height: 100vh;
    background: #1A1A1A;
    display: flex;
    flex-direction: column;
`;

export const BackButton = styled.button`
    background: transparent;
    border: none;
    color: #AEACAC;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.5rem 0;
    width: fit-content;
    transition: color 0.2s ease;

    &:hover {
        color: #F5901E;
    }
`;

export const TopBar = styled.div`
    padding: 0.75rem 2rem;
    margin-top: 56px; /* header height */
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;
```

- [ ] **Step 2: Create `src/components/CardPage/index.tsx`**

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Header } from '../Header';
import { CardDisplay } from '../CardDisplay';
import { DrawButton } from '../DrawButton';
import { Spinner } from '../Spinner';
import { PageWrapper, BackButton, TopBar, Content } from './style';

interface CardPageProps {
    filterCard: (card: any) => boolean;
}

export function CardPage({ filterCard }: CardPageProps) {
    const [card1, setCard1] = useState<string | undefined>();
    const [card2, setCard2] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCard = async (): Promise<string> => {
        while (true) {
            const response = await api.get('/cards/random', {
                params: { q: 'legal:historic' },
            });
            const card = response.data;
            if (filterCard(card)) {
                return card.image_uris?.normal ?? card.image_uris?.png;
            }
        }
    };

    const draw = async () => {
        setLoading(true);
        try {
            const [img1, img2] = await Promise.all([fetchCard(), fetchCard()]);
            setCard1(img1);
            setCard2(img2);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <Header />
            <TopBar>
                <BackButton type="button" onClick={() => navigate('/')}>
                    ← Back
                </BackButton>
            </TopBar>
            <Content>
                {loading ? <Spinner /> : <CardDisplay card1={card1} card2={card2} />}
                <DrawButton onClick={draw} loading={loading} />
            </Content>
        </PageWrapper>
    );
}
```

- [ ] **Step 3: Verify the dev server still compiles with no errors**

```bash
npm run dev
```

No TypeScript or import errors in the terminal.

---

## Task 7: Dashboard Redesign

**Files:**
- Rewrite: `src/components/Dashbord/style.ts`
- Rewrite: `src/components/Dashbord/index.tsx`

- [ ] **Step 1: Rewrite `src/components/Dashbord/style.ts`**

```ts
import styled from 'styled-components';

export const PageWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #1A1A1A;
    overflow: hidden;
`;

export const PanelsRow = styled.div`
    flex: 1;
    display: flex;
    margin-top: 56px; /* header height */
`;

export const Divider = styled.div`
    width: 3px;
    background: #832100;
    flex-shrink: 0;
`;

interface PanelProps {
    $expanded: boolean;
    $left: boolean;
}

export const Panel = styled.a<PanelProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: ${({ $expanded }) => ($expanded ? '1.2' : '1')};
    background: ${({ $expanded }) => ($expanded ? '#242424' : '#1A1A1A')};
    border-left: ${({ $expanded, $left }) =>
        $expanded && $left ? '3px solid #F5901E' : '3px solid transparent'};
    border-right: ${({ $expanded, $left }) =>
        $expanded && !$left ? '3px solid #F5901E' : '3px solid transparent'};
    transition: flex 0.4s ease, background 0.4s ease, border-color 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    gap: 0.75rem;
    padding: 2rem;
`;

interface PanelLabelProps {
    $active: boolean;
}

export const PanelLabel = styled.span<PanelLabelProps>`
    font-family: 'Planewalker', sans-serif;
    font-weight: 700;
    font-size: 3rem;
    color: ${({ $active }) => ($active ? '#F5901E' : '#AEACAC')};
    letter-spacing: 0.05em;
    transition: color 0.3s ease;
    user-select: none;
    text-align: center;
`;

export const PanelSub = styled.span`
    font-size: 0.9rem;
    color: #AEACAC;
    letter-spacing: 0.04em;
    user-select: none;
`;
```

- [ ] **Step 2: Rewrite `src/components/Dashbord/index.tsx`**

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import {
    PageWrapper,
    PanelsRow,
    Divider,
    Panel,
    PanelLabel,
    PanelSub,
} from './style';

export function Dashboard() {
    const [hovered, setHovered] = useState<'legendary' | 'normal' | null>(null);

    return (
        <PageWrapper>
            <Header />
            <PanelsRow>
                <Panel
                    as={Link}
                    to="/Legendary"
                    $expanded={hovered === 'legendary'}
                    $left={true}
                    onMouseEnter={() => setHovered('legendary')}
                    onMouseLeave={() => setHovered(null)}
                >
                    <PanelLabel $active={hovered === 'legendary'}>Legendary</PanelLabel>
                    <PanelSub>Click to draw</PanelSub>
                </Panel>
                <Divider />
                <Panel
                    as={Link}
                    to="/Normal"
                    $expanded={hovered === 'normal'}
                    $left={false}
                    onMouseEnter={() => setHovered('normal')}
                    onMouseLeave={() => setHovered(null)}
                >
                    <PanelLabel $active={hovered === 'normal'}>Normal</PanelLabel>
                    <PanelSub>Click to draw</PanelSub>
                </Panel>
            </PanelsRow>
        </PageWrapper>
    );
}
```

- [ ] **Step 3: Open the app and verify the Dashboard**

Navigate to `http://localhost:5173`. Confirm:
- Dark background, two panels side by side
- "Legendary" and "Normal" labels in gray
- On hover: panel expands, label turns orange, accent border appears
- Clicking navigates to the correct route

---

## Task 8: Wire Up Legendary and Normal

**Files:**
- Rewrite: `src/components/Legendary/index.tsx`
- Rewrite: `src/components/Normal/index.tsx`

- [ ] **Step 1: Rewrite `src/components/Legendary/index.tsx`**

```tsx
import { CardPage } from '../CardPage';

const LEGENDARY_TYPES = ['Legendary Creature', 'Legendary Planeswalker', 'Legendary Artifact'];

function isLegendary(card: any): boolean {
    const type = card.type_line?.split(' — ')[0] ?? '';
    return LEGENDARY_TYPES.includes(type);
}

export function Legendary() {
    return <CardPage filterCard={isLegendary} />;
}
```

- [ ] **Step 2: Rewrite `src/components/Normal/index.tsx`**

```tsx
import { CardPage } from '../CardPage';

const EXCLUDED_TYPES = [
    'Sorcery',
    'Instant',
    'Legendary Sorcery',
    'Snow Sorcery',
    'Land',
    'Snow Land',
    'Legendary Land',
    'Basic Snow Land',
];

function isNormal(card: any): boolean {
    const type = card.type_line?.split(' — ')[0] ?? '';
    return !EXCLUDED_TYPES.includes(type);
}

export function Normal() {
    return <CardPage filterCard={isNormal} />;
}
```

- [ ] **Step 3: Delete now-unused style files for Legendary and Normal**

```bash
rm src/components/Legendary/style.ts
rm src/components/Normal/style.ts
```

- [ ] **Step 4: Test the full flow in the browser**

1. `http://localhost:5173` → Dashboard loads, hover effects work
2. Click "Legendary" → `/Legendary` loads, press DRAW → spinner appears → two legendary card images appear with hover glow
3. Click "← Back" → returns to Dashboard
4. Click "Normal" → `/Normal` loads, press DRAW → two normal cards appear
5. No errors in browser console

---

## Self-Review Notes

- All spec color tokens are used: `#1A1A1A` (bg), `#242424` (surface), `#F5901E` (accent), `#832100` (accent-dark), `#AEACAC` (muted), glow rgba values
- Dashboard split-panel expand behavior: covered in Task 7 via flex ratio + styled-components props
- Header fixed 56px + backdrop blur: covered in Task 2
- Card images: width `20rem`, border-radius `12px`, hover glow + scale: covered in Task 5
- DrawButton: pure CSS, `#832100` bg, `#F5901E` border, hover swaps bg: covered in Task 4
- Spinner: `#F5901E` stroke + "Invoking..." label: covered in Task 3
- Back button: `← Back`, `#AEACAC` → `#F5901E` hover: covered in Task 6
- Initial empty state: "Press DRAW to invoke your cards": covered in Task 5
- Shared CardPage eliminating duplicated fetch logic: covered in Task 6
- `@font-face` declarations: covered in Task 1
- No image assets used in navigation or button: Dashboard uses CSS panels, button is pure CSS
- `src/services/api.ts`, `src/main.tsx`, `src/App.tsx` untouched ✓
