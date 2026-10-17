<div align="center">

# ⚡ PortfolioForge AI

### *Craft Dribbble-Grade Developer Portfolios in Minutes with AI*

[![Next.js 16](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-Passing-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <b>A modern, interactive AI-powered web studio to build, preview, customize, and export stunning personal portfolios for developers, engineers, and students.</b>
</p>

[Explore Features](#-key-features) • [Design Themes](#-dribbble-grade-themes) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack--architecture) • [Author](#-author)

</div>

---

## 🌟 Why PortfolioForge AI?

Traditional portfolio builders produce bland, cookie-cutter websites with dull templates. **PortfolioForge AI** combines **Dribbble-level aesthetics**, **smart onboarding tailoring (B.Tech College Students vs. Seasoned Pros)**, **GitHub profile & README data extraction**, and **live visual design editing** to deliver a portfolio that actually gets you hired.

```
       ┌────────────────┐
       │   Onboarding   │ ──► Tailored by role (College / Pro / Freelancer)
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │  GitHub Import │ ──► Pulls repositories + parses profile README.md
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │   AI Engine    │ ──► Generates bio, projects copy & skills breakdown
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │  Visual Studio │ ──► Live split-screen editor + responsive preview
       └───────┬────────┘
               │
       ┌───────▼────────┐
       │ Standalone Zip │ ──► 1-Click download of deployable HTML/CSS/Assets
       └────────────────┘
```

---

## 🚀 Key Features

### 🎨 1. Dribbble-Grade Themes & Design System
- **6 Distinct Aesthetics**: From *Neo-Brutalism* with hard drop shadows, to *Cyberpunk Neon*, *Dark Bento Grid*, *Glassmorphism*, *Aurora Waves*, and *Minimal Studio*.
- **Hero Cover Banners**: Upload custom cover banners or pick from 6 curated high-res presets.
- **Overlapping Avatars & Live Status**: Prominent profile avatar with customizable status badges (e.g., `🟢 Open to Work`, `⚡ Available for Freelance`).

### 🎓 2. Smart Role-Based Onboarding
- **College / B.Tech Students**: Dynamic presets tailored for academic coursework, college projects, internships, hackathons, and certifications.
- **Experienced Engineers**: Deep career trajectories, production metrics, tech lead achievements, and company contributions.

### 🐙 3. GitHub Profile & README.md Integration
- Connect any GitHub username to automatically fetch public repositories.
- **Intelligent README Parser**: Reads user's `username/README.md` to extract bio, tech stack, and featured projects automatically.

### 📄 4. PDF CV / Resume Support
- Upload PDF resumes directly (Base64 encoding).
- Generates a 1-click **"Download CV / Resume"** button on the hero section for recruiters.

### 📱 5. Real-Time Responsive Editor & Mobile Switcher
- Full real-time live preview with breakpoint simulation (**Desktop**, **Tablet**, **Mobile**).
- Floating **Edit ⇄ Preview** switcher on mobile screens for frictionless on-the-go editing.
- Drag-and-drop / toggle section ordering (Hero, About, Skills, Projects, Experience, Education, Certifications, Contact, Footer).

### 📦 6. 1-Click Code Export
- Export complete standalone portfolio code bundled in a clean `.zip` file using `JSZip` and `file-saver`, ready to deploy on **Vercel**, **GitHub Pages**, or **Netlify**.

---

## 🎨 Dribbble-Grade Themes

| Theme | Style Profile | Color Palette | Best Suited For |
| :--- | :--- | :--- | :--- |
| **Neo-Brutalism** | Hard 4px borders, retro drop-shadows, high-contrast badges | Yellow `#FFE600`, Pink `#FF5C93`, Black `#000` | Creative Developers, Indie Hackers |
| **Cyberpunk** | Glowing cyan/magenta neon, dark void backdrop, tech grid lines | Neon Cyan `#00F0FF`, Pink `#FF0055`, Dark `#05051A` | Web3, Game Devs, Systems Engineers |
| **Dark Bento** | Rounded modular cards, subtle glow borders, deep elevations | Indigo `#6366F1`, Purple `#A855F7`, Dark `#0F0F17` | Full-Stack & UI/UX Engineers |
| **Glassmorphism** | Frosted glass blur (20px backdrop filter), soft gradients | Translucent Slate, White, Soft Indigo | Frontend & Mobile App Engineers |
| **Aurora Wave** | Ethereal background mesh gradients, modern typography | Emerald `#10B981`, Teal `#14B8A6`, Midnight Blue | AI Engineers, Data Scientists |
| **Minimal Studio** | Monospaced accents, spacious whitespace, razor-sharp focus | Clean Monochrome `#000` & `#FFF` | Senior Tech Leads, Architects |

---

## 🛠 Tech Stack & Architecture

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack & Webpack support)
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/) with strict type checking
- **UI & Layout**: [Tailwind CSS v4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Sync External Store + LocalStorage persistence
- **Bundling & Export**: [JSZip](https://stuk.github.io/jszip/) + [FileSaver](https://github.com/eligrey/FileSaver.js/)
- **Testing**: [Vitest](https://vitest.dev/) (2/2 passing unit tests)
- **Code Quality**: ESLint 9 (`next/core-web-vitals`)

---

## 📂 Project Structure

```
portfolio-forge/
├── .github/
│   └── workflows/ci.yml       # GitHub Actions CI (Lint, Typecheck, Test, Build)
├── public/                    # Static assets & icons
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── github/readme/ # GitHub profile README.md parser endpoint
│   │   │   └── github/repos/  # GitHub repositories fetcher endpoint
│   │   ├── editor/            # Real-time visual editor & preview page
│   │   ├── onboarding/        # Multi-step questionnaire & profile builder
│   │   ├── preview/           # Distraction-free full portfolio preview page
│   │   ├── layout.tsx         # Root layout with theme provider
│   │   └── page.tsx           # High-converting landing page
│   ├── components/
│   │   ├── portfolio/         # Modular SectionRenderer & BANNER_PRESETS
│   │   └── ui/                # Accessible design system components (buttons, cards, inputs)
│   ├── features/
│   │   ├── ai/                # AI generation logic (mock, OpenAI, Anthropic abstraction)
│   │   ├── github/            # GitHub integration adapter
│   │   ├── questionnaire/     # Dynamic form builders (Project, Experience, Education)
│   │   └── themes/            # Theme tokens, palettes & configurations
│   ├── lib/                   # Utility helpers & demo data
│   └── types/                 # Type definitions (PortfolioData, SectionConfig, etc.)
├── .env.example               # Environment variables template
├── package.json               # Scripts & dependencies
├── tsconfig.json              # TypeScript configuration
└── vitest.config.ts           # Vitest configuration
```

---

## 🚀 Quick Start

### 1. Prerequisites
Make sure you have **Node.js 18+** installed:
```bash
node -v
npm -v
```

### 2. Clone the Repository
```bash
git clone https://github.com/Prajwalsharma08/PortfolioForge-AI.git
cd PortfolioForge-AI
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Environment Variables (Optional)
```bash
cp .env.example .env.local
```
*(GitHub token is optional but recommended if you want higher GitHub API rate limits).*

### 5. Launch Development Server
```bash
npm run dev
```

Open **[http://localhost:6619](http://localhost:6619)** in your browser!

---

## 🧪 Testing & Code Verification

Ensure everything is clean and passing:

```bash
# Run TypeScript compilation check (0 errors)
npm run type-check

# Run ESLint validation
npm run lint

# Run Vitest unit tests
npm run test -- --run

# Create a production build
npm run build
```

---

## 💡 Future Roadmap

- [ ] **1-Click Cloud Deployment**: Direct push to Vercel and Netlify via API tokens.
- [ ] **AI Resume Scanner**: Auto-populate portfolio by parsing uploaded PDF resumes using Gemini 2.0.
- [ ] **Custom Subdomains**: Free `username.portfolioforge.app` live hosting.
- [ ] **Loom & Video Embeds**: Interactive video demo modals inside project showcase cards.
- [ ] **Direct Contact Form**: Receive visitor messages directly to email via Resend integration.

---

## 👨‍💻 Author

**Prajwal Sharma**
- GitHub: [@Prajwalsharma08](https://github.com/Prajwalsharma08)
- Project: [PortfolioForge-AI](https://github.com/Prajwalsharma08/PortfolioForge-AI)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - feel free to use, modify, and distribute.

<div align="center">
  <sub>Built with ❤️ by Prajwal Sharma for the global developer community.</sub>
</div>