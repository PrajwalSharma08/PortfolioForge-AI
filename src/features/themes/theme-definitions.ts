import { ThemeConfig, ThemeTokens } from "@/types/portfolio"

export const GLASSMORPHISM_THEME: ThemeConfig = {
  id: "glassmorphism",
  name: "Glassmorphism",
  description: "Modern frosted glass effects with ambient glow and crystal clarity",
  preview: "/themes/glassmorphism-preview.png",
  tokens: {
    colors: {
      primary: "#818cf8",
      secondary: "#c084fc",
      accent: "#38bdf8",
      background: "radial-gradient(ellipse at top left, #1e1b4b 0%, #0f172a 45%, #050814 100%)",
      surface: "rgba(255, 255, 255, 0.08)",
      surfaceHover: "rgba(255, 255, 255, 0.15)",
      text: "#ffffff",
      textMuted: "#cbd5e1",
      border: "rgba(255, 255, 255, 0.18)",
      borderHover: "rgba(255, 255, 255, 0.35)",
      error: "#f87171",
      success: "#4ade80",
      warning: "#fbbf24",
    },
    typography: {
      fontFamily: {
        sans: "'Inter', system-ui, -apple-system, sans-serif",
        mono: "'JetBrains Mono', monospace",
        display: "'Cal Sans', 'Inter', system-ui, sans-serif",
      },
      fontSize: {
        xs: "0.85rem",
        sm: "0.95rem",
        base: "1.1rem",
        lg: "1.25rem",
        xl: "1.45rem",
        "2xl": "1.85rem",
        "3xl": "2.4rem",
        "4xl": "3.25rem",
        "5xl": "4.5rem",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.65,
        relaxed: 1.85,
      },
    },
    spacing: {
      xs: "0.35rem",
      sm: "0.6rem",
      md: "1.1rem",
      lg: "1.65rem",
      xl: "2.25rem",
      "2xl": "3.25rem",
      "3xl": "4.5rem",
      "4xl": "6.5rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.25rem",
      "2xl": "1.75rem",
      full: "9999px",
    },
    shadows: {
      sm: "0 2px 8px 0 rgba(0, 0, 0, 0.2)",
      md: "0 8px 24px 0 rgba(0, 0, 0, 0.3)",
      lg: "0 16px 40px 0 rgba(0, 0, 0, 0.4)",
      xl: "0 24px 60px 0 rgba(0, 0, 0, 0.5)",
      glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)",
      glassHover: "0 14px 44px 0 rgba(99, 102, 241, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)",
    },
    animations: {
      duration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
      easing: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      intensity: "moderate",
    },
  },
  supportedSections: ["hero", "about", "skills", "projects", "experience", "education", "certifications", "contact", "footer"],
}

export const MINIMAL_THEME: ThemeConfig = {
  id: "minimal",
  name: "Minimal",
  description: "Clean, high-contrast modern design with generous spacing",
  preview: "/themes/minimal-preview.png",
  tokens: {
    colors: {
      primary: "#18181b",
      secondary: "#3f3f46",
      accent: "#2563eb",
      background: "#fafafa",
      surface: "#ffffff",
      surfaceHover: "#f4f4f5",
      text: "#09090b",
      textMuted: "#52525b",
      border: "#e4e4e7",
      borderHover: "#a1a1aa",
      error: "#dc2626",
      success: "#16a34a",
      warning: "#ca8a04",
    },
    typography: {
      fontFamily: {
        sans: "'Inter', system-ui, -apple-system, sans-serif",
        mono: "'JetBrains Mono', monospace",
        display: "'Inter', system-ui, sans-serif",
      },
      fontSize: {
        xs: "0.85rem",
        sm: "0.95rem",
        base: "1.1rem",
        lg: "1.25rem",
        xl: "1.45rem",
        "2xl": "1.85rem",
        "3xl": "2.4rem",
        "4xl": "3.25rem",
        "5xl": "4rem",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.7,
        relaxed: 1.9,
      },
    },
    spacing: {
      xs: "0.35rem",
      sm: "0.6rem",
      md: "1.1rem",
      lg: "1.65rem",
      xl: "2.25rem",
      "2xl": "3.25rem",
      "3xl": "4.5rem",
      "4xl": "6.5rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.25rem",
      full: "9999px",
    },
    shadows: {
      sm: "0 1px 3px 0 rgb(0 0 0 / 0.08)",
      md: "0 4px 12px -1px rgb(0 0 0 / 0.1)",
      lg: "0 12px 24px -3px rgb(0 0 0 / 0.1)",
      xl: "0 20px 32px -5px rgb(0 0 0 / 0.12)",
    },
    animations: {
      duration: {
        fast: "100ms",
        normal: "200ms",
        slow: "300ms",
      },
      easing: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      intensity: "subtle",
    },
  },
  supportedSections: ["hero", "about", "skills", "projects", "experience", "education", "certifications", "contact", "footer"],
}

export const CYBERPUNK_THEME: ThemeConfig = {
  id: "cyberpunk",
  name: "Cyberpunk",
  description: "Neon-futuristic dark aesthetic with glowing edges and bold contrasts",
  preview: "/themes/cyberpunk-preview.png",
  tokens: {
    colors: {
      primary: "#00f0ff",
      secondary: "#ff007f",
      accent: "#ffe600",
      background: "#07070d",
      surface: "#0f1019",
      surfaceHover: "#181a29",
      text: "#f8fafc",
      textMuted: "#94a3b8",
      border: "#00f0ff",
      borderHover: "#ff007f",
      error: "#ff0055",
      success: "#00ff88",
      warning: "#ffe600",
    },
    typography: {
      fontFamily: {
        sans: "'Space Grotesk', system-ui, sans-serif",
        mono: "'JetBrains Mono', monospace",
        display: "'Orbitron', 'Space Grotesk', system-ui, sans-serif",
      },
      fontSize: {
        xs: "0.85rem",
        sm: "0.95rem",
        base: "1.1rem",
        lg: "1.25rem",
        xl: "1.45rem",
        "2xl": "1.85rem",
        "3xl": "2.5rem",
        "4xl": "3.5rem",
        "5xl": "4.8rem",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.6,
        relaxed: 1.8,
      },
    },
    spacing: {
      xs: "0.35rem",
      sm: "0.6rem",
      md: "1.1rem",
      lg: "1.65rem",
      xl: "2.25rem",
      "2xl": "3.25rem",
      "3xl": "4.5rem",
      "4xl": "6.5rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      full: "0",
    },
    shadows: {
      sm: "0 0 10px rgba(0, 240, 255, 0.25)",
      md: "0 0 20px rgba(0, 240, 255, 0.35), 0 0 35px rgba(255, 0, 127, 0.2)",
      lg: "0 0 30px rgba(0, 240, 255, 0.45), 0 0 50px rgba(255, 0, 127, 0.3)",
      xl: "0 0 45px rgba(0, 240, 255, 0.55), 0 0 70px rgba(255, 0, 127, 0.4)",
    },
    animations: {
      duration: {
        fast: "100ms",
        normal: "250ms",
        slow: "400ms",
      },
      easing: {
        default: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        glitch: "steps(5, end)",
      },
      intensity: "high",
    },
  },
  supportedSections: ["hero", "about", "skills", "projects", "experience", "education", "certifications", "contact", "footer"],
}

export const BENTO_DARK_THEME: ThemeConfig = {
  id: "bento",
  name: "Bento Grid",
  description: "Dribbble-trending Linear & Apple dark layout with ambient radial glows",
  preview: "/themes/bento-preview.png",
  tokens: {
    colors: {
      primary: "#6366f1",
      secondary: "#a855f7",
      accent: "#10b981",
      background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.22), #07080b 70%)",
      surface: "#0e1017",
      surfaceHover: "#151822",
      text: "#ffffff",
      textMuted: "#94a3b8",
      border: "rgba(255, 255, 255, 0.12)",
      borderHover: "rgba(99, 102, 241, 0.5)",
      error: "#ef4444",
      success: "#10b981",
      warning: "#f59e0b",
    },
    typography: {
      fontFamily: {
        sans: "'Inter', -apple-system, system-ui, sans-serif",
        mono: "'JetBrains Mono', monospace",
        display: "'Cal Sans', 'Inter', system-ui, sans-serif",
      },
      fontSize: {
        xs: "0.85rem",
        sm: "0.95rem",
        base: "1.1rem",
        lg: "1.25rem",
        xl: "1.45rem",
        "2xl": "1.85rem",
        "3xl": "2.4rem",
        "4xl": "3.35rem",
        "5xl": "4.6rem",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.65,
        relaxed: 1.85,
      },
    },
    spacing: {
      xs: "0.35rem",
      sm: "0.6rem",
      md: "1.1rem",
      lg: "1.65rem",
      xl: "2.25rem",
      "2xl": "3.25rem",
      "3xl": "4.5rem",
      "4xl": "6.5rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1.15rem",
      xl: "1.5rem",
      "2xl": "2rem",
      full: "9999px",
    },
    shadows: {
      sm: "0 2px 8px rgba(0, 0, 0, 0.4)",
      md: "0 8px 24px rgba(0, 0, 0, 0.5)",
      lg: "0 16px 40px rgba(0, 0, 0, 0.6)",
      xl: "0 24px 60px rgba(0, 0, 0, 0.7)",
    },
    animations: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
      },
      easing: {
        default: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      intensity: "moderate",
    },
  },
  supportedSections: ["hero", "about", "skills", "projects", "experience", "education", "certifications", "contact", "footer"],
}

export const NEO_BRUTALISM_THEME: ThemeConfig = {
  id: "neo-brutalism",
  name: "Neo-Brutalism",
  description: "Dribbble trending retro-pop with bold black borders and hard offset shadows",
  preview: "/themes/neobrutalism-preview.png",
  tokens: {
    colors: {
      primary: "#ffdf00",
      secondary: "#ff6b6b",
      accent: "#4ecdc4",
      background: "#fef9ee",
      surface: "#ffffff",
      surfaceHover: "#fff9e6",
      text: "#000000",
      textMuted: "#2d3748",
      border: "#000000",
      borderHover: "#000000",
      error: "#ff3366",
      success: "#00cc66",
      warning: "#ff9900",
    },
    typography: {
      fontFamily: {
        sans: "'Space Grotesk', system-ui, sans-serif",
        mono: "'JetBrains Mono', monospace",
        display: "'Space Grotesk', system-ui, sans-serif",
      },
      fontSize: {
        xs: "0.85rem",
        sm: "0.95rem",
        base: "1.1rem",
        lg: "1.25rem",
        xl: "1.45rem",
        "2xl": "1.85rem",
        "3xl": "2.5rem",
        "4xl": "3.5rem",
        "5xl": "4.8rem",
      },
      fontWeight: {
        normal: 400,
        medium: 600,
        semibold: 700,
        bold: 900,
      },
      lineHeight: {
        tight: 1.15,
        normal: 1.6,
        relaxed: 1.8,
      },
    },
    spacing: {
      xs: "0.35rem",
      sm: "0.6rem",
      md: "1.1rem",
      lg: "1.65rem",
      xl: "2.25rem",
      "2xl": "3.25rem",
      "3xl": "4.5rem",
      "4xl": "6.5rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.25rem",
      full: "9999px",
    },
    shadows: {
      sm: "3px 3px 0px #000000",
      md: "5px 5px 0px #000000",
      lg: "8px 8px 0px #000000",
      xl: "12px 12px 0px #000000",
    },
    animations: {
      duration: {
        fast: "80ms",
        normal: "150ms",
        slow: "250ms",
      },
      easing: {
        default: "steps(4, jump-end)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      intensity: "moderate",
    },
  },
  supportedSections: ["hero", "about", "skills", "projects", "experience", "education", "certifications", "contact", "footer"],
}

export const AURORA_THEME: ThemeConfig = {
  id: "aurora",
  name: "Nordic Aurora",
  description: "Deep emerald and cosmic violet ethereal gradients with luxury glass highlights",
  preview: "/themes/aurora-preview.png",
  tokens: {
    colors: {
      primary: "#10b981",
      secondary: "#8b5cf6",
      accent: "#06b6d4",
      background: "radial-gradient(ellipse at 70% 20%, #064e3b 0%, #022c22 35%, #050b14 100%)",
      surface: "rgba(6, 78, 59, 0.15)",
      surfaceHover: "rgba(6, 78, 59, 0.28)",
      text: "#f0fdf4",
      textMuted: "#a7f3d0",
      border: "rgba(16, 185, 129, 0.25)",
      borderHover: "rgba(16, 185, 129, 0.5)",
      error: "#f87171",
      success: "#34d399",
      warning: "#fbbf24",
    },
    typography: {
      fontFamily: {
        sans: "'Inter', system-ui, sans-serif",
        mono: "'JetBrains Mono', monospace",
        display: "'Cal Sans', 'Inter', system-ui, sans-serif",
      },
      fontSize: {
        xs: "0.85rem",
        sm: "0.95rem",
        base: "1.1rem",
        lg: "1.25rem",
        xl: "1.45rem",
        "2xl": "1.85rem",
        "3xl": "2.4rem",
        "4xl": "3.35rem",
        "5xl": "4.6rem",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.65,
        relaxed: 1.85,
      },
    },
    spacing: {
      xs: "0.35rem",
      sm: "0.6rem",
      md: "1.1rem",
      lg: "1.65rem",
      xl: "2.25rem",
      "2xl": "3.25rem",
      "3xl": "4.5rem",
      "4xl": "6.5rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem",
      full: "9999px",
    },
    shadows: {
      sm: "0 4px 14px 0 rgba(6, 78, 59, 0.25)",
      md: "0 8px 30px 0 rgba(6, 78, 59, 0.35)",
      lg: "0 16px 48px 0 rgba(6, 78, 59, 0.45)",
      xl: "0 24px 64px 0 rgba(6, 78, 59, 0.55)",
    },
    animations: {
      duration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
      easing: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      intensity: "moderate",
    },
  },
  supportedSections: ["hero", "about", "skills", "projects", "experience", "education", "certifications", "contact", "footer"],
}

export const THEMES: ThemeConfig[] = [
  GLASSMORPHISM_THEME,
  BENTO_DARK_THEME,
  NEO_BRUTALISM_THEME,
  MINIMAL_THEME,
  CYBERPUNK_THEME,
  AURORA_THEME,
]

export function getThemeById(id: string): ThemeConfig | undefined {
  return THEMES.find((theme) => theme.id === id)
}

export function getThemeTokens(theme: ThemeConfig): ThemeTokens {
  return theme.tokens
}

export function generateThemeCSS(theme: ThemeConfig): string {
  const tokens = theme.tokens
  return `
    :root {
      --color-primary: ${tokens.colors.primary};
      --color-secondary: ${tokens.colors.secondary};
      --color-accent: ${tokens.colors.accent};
      --color-background: ${tokens.colors.background};
      --color-surface: ${tokens.colors.surface};
      --color-surface-hover: ${tokens.colors.surfaceHover};
      --color-text: ${tokens.colors.text};
      --color-text-muted: ${tokens.colors.textMuted};
      --color-border: ${tokens.colors.border};
      --color-border-hover: ${tokens.colors.borderHover};
      --color-error: ${tokens.colors.error};
      --color-success: ${tokens.colors.success};
      --color-warning: ${tokens.colors.warning};

      --font-sans: ${tokens.typography.fontFamily.sans};
      --font-mono: ${tokens.typography.fontFamily.mono};
      --font-display: ${tokens.typography.fontFamily.display};

      --radius-sm: ${tokens.borderRadius.sm};
      --radius-md: ${tokens.borderRadius.md};
      --radius-lg: ${tokens.borderRadius.lg};
      --radius-xl: ${tokens.borderRadius.xl};
      --radius-2xl: ${tokens.borderRadius["2xl"]};
      --radius-full: ${tokens.borderRadius.full};

      --shadow-sm: ${tokens.shadows.sm};
      --shadow-md: ${tokens.shadows.md};
      --shadow-lg: ${tokens.shadows.lg};
      --shadow-xl: ${tokens.shadows.xl};

      --duration-fast: ${tokens.animations.duration.fast};
      --duration-normal: ${tokens.animations.duration.normal};
      --duration-slow: ${tokens.animations.duration.slow};

      --easing-default: ${tokens.animations.easing.default};
      --easing-spring: ${tokens.animations.easing.spring};
    }
  `
}