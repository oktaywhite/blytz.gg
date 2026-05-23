# PRD - Blytz: Next-Gen Gaming Identity Platform

## 1. Project Overview
**Blytz** (formerly NeoRank) is a high-performance, futuristic landing page designed for a "Living Gaming Profile" platform. It allows gamers to create a centralized digital identity that syncs their stats, ranks, and achievements across multiple gaming universes into a single, premium "bio-link" style profile.

## 2. Target Audience
- **Core Gamers:** Looking to showcase their ranks and stats in a professional manner.
- **Streamers & Creators:** Needing a sleek "link-in-bio" that integrates with their gaming persona.
- **Esports Professionals:** For building a digital legacy and verified gaming ID.

## 3. Design Philosophy (Protocol Aesthetic)
The project follows a strict **"S-Tier Minimalist / Protocol"** aesthetic:
- **Primary Palette:** Deep Charcoal (`#0A0A0A`), Electric Lime (`#CCFF00`), Cyber Magenta (`#FF00FF`).
- **Visual Language:** Glassmorphism, holographic overlays, technical data nodes, and 3D geometric artifacts.
- **Interactivity:** Fluid scroll animations, mouse trails, and reactive 2D/3D background grids.

## 4. Functional Requirements

### 4.1 Hero Section
- **Dynamic URL Claim:** A prominent input field for users to check and claim their `blytz.lol/username`.
- **3D Tech Artifact:** A floating, interactive 3D core (Three.js) that reacts to hover/scroll.
- **2D Interactive Grid:** A canvas-based background grid that tracks mouse movement (disabled on mobile for performance).

### 4.2 Game Support & Stats
- **Multi-Game Integration:** Sections showcasing compatibility with major titles like League of Legends, Valorant, etc.
- **Live Stats Mockup:** A high-fidelity "Player Card" demonstrating how live API data (ranks, champion mastery, win rates) will be displayed.

### 4.3 Feature Discovery (Bento Grid)
- **Bento Layout:** Use of organized, glassmorphic "cards" to highlight platform capabilities:
    - Unified Stats Sync.
    - Premium Theme Customization.
    - Verified Identity Badging.
    - Custom URL Management.

### 4.4 System Access (Pricing)
- **Node-Based Tiers:**
    - **Base Protocol (€0):** Basic ID sync and themes.
    - **Elite Matrix (€5 Lifetime):** Unlimited sync, Pro themes, custom URLs, and Verified ID.
- **Visuals:** High-contrast cards with scanning animations and 3D perspective transforms on desktop.

### 4.5 Neural Interface CTA
- **Abstract Redesign:** A non-traditional, creative section for final conversion.
- **Asymmetric Typography:** High-impact text ("SYNC OR BE DELETED").
- **Holographic Input:** A tilted, skewed data slate for username input.

## 5. Technical Requirements

### 5.1 Tech Stack
- **Framework:** Next.js 15 (App Router).
- **Language:** TypeScript (Strict mode).
- **Styling:** Tailwind CSS (v4 compatible).
- **3D Engine:** React Three Fiber (Three.js).
- **Animations:** Framer Motion.
- **Icons:** Lucide React.

### 5.2 Performance Optimizations
- **Mobile First:** Reduced CSS blur filters and simplified 3D materials on mobile devices.
- **Visibility-Based Rendering:** 3D and Canvas elements only render when in the viewport (Intersection Observer) to save GPU/Battery.
- **Hydration Safety:** Suppression of browser-extension-induced hydration mismatches.

## 6. Project Structure
- `/src/app`: Next.js App Router pages and global styles.
- `/src/components`: Modular, reusable UI components.
- `/src/lib`: Utility functions and shared logic.
- `/public`: Static assets and textures.

## 7. Roadmap & Future Enhancements
- **Live API Integration:** Real-time fetching from Riot Games, Steam, and Epic APIs.
- **User Dashboard:** Profile editor with drag-and-drop bento blocks.
- **Theme Engine:** Customizable CSS variables for Elite users.
