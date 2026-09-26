# Zentra Creator — AI Video Creator & Visual Content Designer

> **Premium digital portfolio for Oluwatobiloba (Zentra Creator)** — crafting high-converting AI commercial advertisements, luxury fashion films, product commercials, and cinematic brand visual direction.

---

## 🌟 Overview

**Zentra Creator** is a modern, high-performance portfolio application built for **Oluwatobiloba**, an AI video creator and visual content designer. The website is engineered to showcase high-fidelity AI-generated commercials and visual campaigns for modern direct-to-consumer (DTC) brands, luxury apparel houses, and digital agencies.

### 🎨 Brand Identity & Aesthetic
- **Primary Palette**: Deep Cinematic Obsidian (`#09090B`), Charcoal Surface (`#121217`), and Signature Warm Gold (`#F5C542`).
- **Typography**: Montserrat (Bold, high-impact headlines) paired with Open Sans (clean, legible editorial body copy).
- **Interactive Experience**: Seamless video loops, responsive media lightbox, interactive service slots, and a dark/light mode toggle with persistent state.

---

## 🚀 Key Features & Website Architecture

### 1. Navigation Header (`Navbar.tsx`)
- **Geometric Z Logo**: Custom vector stylized Z logo mark with golden ambient drop-shadow.
- **Section Anchors**: Smooth-scrolling links to `#work`, `#workflow`, `#services`, `#about`, and `#contact`.
- **Theme Switcher**: Instant Dark / Light mode toggle with local storage persistence and system preference detection.
- **Mobile Drawer**: Responsive sliding sheet menu for smartphone viewports.

### 2. Cinematic Hero Section (`Hero.tsx`)
- **Full-Bleed Atmosphere**: High-resolution video and visual background showcase.
- **Category Deep-Links**: Direct quick-launch chips to filter portfolio items (`AI Video Ads`, `Product Commercials`, `Fashion & Beauty`, `Kinetic Movement`).
- **Dual CTAs**: Instant trigger for the full-screen master showreel and direct scroll to the project inquiry form.

### 3. Selected Work Portfolio (`PortfolioGrid.tsx`)
- **Filter System**: Instant category switching across `All`, `AI Video Ads`, `Product Commercials`, `Fashion & Beauty`, `Kinetic Movement`, and `Brand Storytelling`.
- **Interactive Video Cards**: Embedded video reels that play on hover/scroll, featuring resolution tags (4K UHD), aspect ratio badges (16:9, 9:16), and duration metadata.
- **Lightbox Integration**: Clicking any card opens the dedicated Cinema Modal.

### 4. Full-Screen Cinema Lightbox (`VideoLightbox.tsx`)
- High-definition video player with play/pause, mute, timeline scrub bar, and keyboard shortcuts (`Escape` to close).
- Project breakdown: Director notes, tools used (Midjourney, Runway Gen-3, Luma Dream Machine, Kling, Topaz Video AI), deliverables, and category badges.
- **Instant Inquiry Action**: One-click button to pre-fill the contact form with the specific project name.

### 5. Idea to Execution — Workflow Pipeline (`Process.tsx`)
Reveals the exact 4-stage creative pipeline from concept to final delivery:
1. `01` **Creative Strategy & Brief**: Aligning brand goals, visual mood, target audience, and key messaging.
2. `02` **Visual Conception & Storyboarding**: Generating scene treatments, character styling, and shot lists.
3. `03` **High-Fidelity AI Generation**: Diffusion synthesis, multi-stage 4K upscaling, and optical flow stabilization.
4. `04` **Final Delivery & Color Grade**: Cinematic sound design, typography, and platform-specific formats.

### 6. What I Create — Services & Video Slots (`Services.tsx`)
- **Master Service Reel Player**: An interactive div slot player allowing clients to switch between all 6 core services and watch the corresponding live demonstration video.
- **In-Card Video Slots**: Every service card features an embedded 16:9 video player with a live reel preview and quick booking trigger:
  - `01` **AI Video Advertising** (Commercial spots)
  - `02` **Product Commercials** (360° lighting, macro material simulations)
  - `03` **Fashion & Beauty Content** (Editorial runway films, skincare emulsions)
  - `04` **AI Product Visuals** (High-resolution hero imagery and motion)
  - `05` **Social Media Ads** (Hook-driven 9:16 reels for Instagram/TikTok)
  - `06` **Creative Campaigns** (Turnkey concept direction and campaign assets)

### 7. About Oluwatobiloba (`About.tsx`)
- Highlights Oluwatobiloba's creative journey, philosophy on combining artificial intelligence with traditional cinematography, and technical toolchain.
- Features high-resolution studio creator portrait.

### 8. Project Inquiry & Booking (`ContactCTA.tsx`)
- **Fast Response Channels**:
  - **WhatsApp Direct**: [`https://wa.me/2348126561993`](https://wa.me/2348126561993) — Instant chat & DM at `08126561993`.
  - **Direct Email**: [`mailto:oluwatobilobaodedoyin@gmail.com`](mailto:oluwatobilobaodedoyin@gmail.com).
  - **Instagram**: [`https://www.instagram.com/zentra_creator/`](https://www.instagram.com/zentra_creator/) — `@zentra_creator`.
- **Target Budget Range**: Capped at **$1,500 maximum** with 4 accessible tiers:
  - `Under $500`
  - `$500 – $800` (Default selection)
  - `$800 – $1,200`
  - `$1,200 – $1,500` (Maximum tier)
- **Project Form**: Captures name, business email, brand name, service type, and project details with submission feedback.

### 9. Brand Footer (`Footer.tsx`)
- Quick navigation links, direct contact channels, back-to-top button, and copyright notice.

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Functional UI components and state management |
| **TypeScript** | Strict type-safety across models, props, and data structures |
| **Vite** | Blazing-fast build tool and development server |
| **Tailwind CSS** | Utility-first responsive styling and theme variables |
| **Lucide React** | Consistent, modern icon set |
| **Cloudinary** | High-performance global CDN for video streaming and media assets |

---

## 📂 Project Structure

```text
├── index.html                   # HTML entry point, SEO metadata, Schema.org JSON-LD & Favicon
├── metadata.json                # AI Studio application metadata
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration
├── public/
│   └── favicon.svg              # Custom geometric golden Z brand favicon
└── src/
    ├── App.tsx                  # Root application layout and modal state management
    ├── main.tsx                 # React DOM mount point
    ├── index.css                # Global CSS, font declarations, and Tailwind imports
    ├── assets/
    │   └── images/              # Local image assets and fallback media
    ├── context/
    │   └── ThemeContext.tsx     # Dark/Light theme state and provider
    ├── data/
    │   └── portfolioData.ts     # Portfolio projects, service data, video URLs, and workflow reels
    ├── types/
    │   └── portfolio.ts         # TypeScript definitions (Project, ServiceItem, ProcessStep, etc.)
    └── components/
        ├── Navbar.tsx           # Brand header with geometric logo, navigation, and theme switcher
        ├── Hero.tsx             # Cinematic hero section with video loop and quick chips
        ├── PortfolioGrid.tsx    # Filterable portfolio cards with hover video previews
        ├── VideoLightbox.tsx    # Full-screen cinema modal with custom media controls
        ├── Process.tsx          # 4-step "Idea to Execution" workflow reel showcase
        ├── Services.tsx         # What I Create: 6-slot Master Reel Player & video cards
        ├── About.tsx            # Creator story, studio setup, and creator portrait
        ├── ContactCTA.tsx       # Fast channels (WhatsApp, Gmail, Instagram) & budget inquiry form
        └── Footer.tsx           # Footer with direct links, socials, and back-to-top
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will run locally at `http://localhost:3000` (or `http://localhost:5173`).

### Building for Production

Compile and bundle the production build:
```bash
npm run build
```
The optimized production output will be generated in the `/dist` directory.

### Code Linting

Run TypeScript type checks:
```bash
npm run lint
```

---

## 📬 Direct Contact & Creator Information

- **Creator**: Oluwatobiloba
- **Brand**: Zentra Creator
- **WhatsApp**: [+234 812 656 1993](https://wa.me/2348126561993) (`08126561993`)
- **Direct Email**: [oluwatobilobaodedoyin@gmail.com](mailto:oluwatobilobaodedoyin@gmail.com)
- **Instagram**: [@zentra_creator](https://www.instagram.com/zentra_creator/)
- **Specialization**: AI Commercials, Product Commercials, High-Fashion Editorial Films, Brand Visual Campaigns

---

*Designed and developed for Zentra Creator.*
