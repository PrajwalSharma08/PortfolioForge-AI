export interface Profile {
  fullName: string
  professionalTitle: string
  location: string
  email: string
  profilePhoto: string
  coverBanner?: string
  statusMessage?: string
  shortBio: string
  resumeUrl?: string
  userCategory?: string
}

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  level?: "beginner" | "intermediate" | "advanced" | "expert"
  custom?: boolean
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "ai-ml"
  | "data"
  | "database"
  | "cloud"
  | "devops"
  | "mobile"
  | "security"
  | "design"
  | "programming-languages"
  | "tools"
  | "other"

export const SKILL_CATEGORIES: { value: SkillCategory; label: string }[] = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "ai-ml", label: "AI / ML" },
  { value: "data", label: "Data" },
  { value: "database", label: "Database" },
  { value: "cloud", label: "Cloud" },
  { value: "devops", label: "DevOps" },
  { value: "mobile", label: "Mobile" },
  { value: "security", label: "Security" },
  { value: "design", label: "Design" },
  { value: "programming-languages", label: "Programming Languages" },
  { value: "tools", label: "Tools" },
  { value: "other", label: "Other" },
]

export interface Project {
  id: string
  name: string
  shortDescription: string
  detailedDescription: string
  technologies: string[]
  githubUrl: string
  liveDemoUrl: string
  image: string
  role: string
  featured: boolean
  source: "manual" | "github"
  githubData?: GitHubRepository
}

export interface GitHubRepository {
  id: number
  name: string
  description: string | null
  htmlUrl: string
  homepage: string | null
  stargazersCount: number
  forksCount: number
  language: string | null
  topics: string[]
  updatedAt: string
  readme?: string
  fork?: boolean
  private?: boolean
}

export interface Experience {
  id: string
  company: string
  jobTitle: string
  location: string
  startDate: string
  endDate: string
  currentlyWorking: boolean
  description: string
  achievements: string[]
  technologies: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  grade: string
  description: string
}

export interface Certification {
  id: string
  name: string
  issuingOrganization: string
  date: string
  credentialUrl: string
}

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "youtube"
  | "instagram"
  | "devto"
  | "hashnode"
  | "medium"
  | "leetcode"
  | "kaggle"
  | "codeforces"
  | "behance"
  | "dribbble"
  | "website"
  | "custom"

export const SOCIAL_PLATFORMS: { value: SocialPlatform; label: string; icon: string; baseUrl?: string }[] = [
  { value: "github", label: "GitHub", icon: "github", baseUrl: "https://github.com/" },
  { value: "linkedin", label: "LinkedIn", icon: "linkedin", baseUrl: "https://linkedin.com/in/" },
  { value: "twitter", label: "X / Twitter", icon: "twitter", baseUrl: "https://x.com/" },
  { value: "youtube", label: "YouTube", icon: "youtube", baseUrl: "https://youtube.com/" },
  { value: "instagram", label: "Instagram", icon: "instagram", baseUrl: "https://instagram.com/" },
  { value: "devto", label: "Dev.to", icon: "code", baseUrl: "https://dev.to/" },
  { value: "hashnode", label: "Hashnode", icon: "hash", baseUrl: "https://hashnode.com/@" },
  { value: "medium", label: "Medium", icon: "medium", baseUrl: "https://medium.com/@" },
  { value: "leetcode", label: "LeetCode", icon: "code", baseUrl: "https://leetcode.com/" },
  { value: "kaggle", label: "Kaggle", icon: "database", baseUrl: "https://kaggle.com/" },
  { value: "codeforces", label: "Codeforces", icon: "code", baseUrl: "https://codeforces.com/profile/" },
  { value: "behance", label: "Behance", icon: "palette", baseUrl: "https://behance.net/" },
  { value: "dribbble", label: "Dribbble", icon: "dribbble", baseUrl: "https://dribbble.com/" },
  { value: "website", label: "Personal Website", icon: "globe", baseUrl: "https://" },
  { value: "custom", label: "Custom", icon: "link" },
]

export interface SocialLink {
  id: string
  platform: SocialPlatform
  username: string
  url: string
  customLabel?: string
}

export interface SEOData {
  title: string
  description: string
  ogImage: string
  keywords: string[]
}

export interface SectionConfig {
  id: string
  type: SectionType
  enabled: boolean
  order: number
  title?: string
}

export type SectionType =
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "certifications"
  | "contact"
  | "footer"

export const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: "hero", type: "hero", enabled: true, order: 0 },
  { id: "about", type: "about", enabled: true, order: 1 },
  { id: "skills", type: "skills", enabled: true, order: 2 },
  { id: "projects", type: "projects", enabled: true, order: 3 },
  { id: "experience", type: "experience", enabled: true, order: 4 },
  { id: "education", type: "education", enabled: true, order: 5 },
  { id: "certifications", type: "certifications", enabled: true, order: 6 },
  { id: "contact", type: "contact", enabled: true, order: 7 },
  { id: "footer", type: "footer", enabled: true, order: 8 },
]

export interface ThemeConfig {
  id: string
  name: string
  description: string
  preview: string
  tokens: ThemeTokens
  supportedSections: SectionType[]
}

export interface ThemeTokens {
  colors: ColorTokens
  typography: TypographyTokens
  spacing: SpacingTokens
  borderRadius: BorderRadiusTokens
  shadows: ShadowTokens
  animations: AnimationTokens
}

export interface ColorTokens {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  surfaceHover?: string
  text: string
  textMuted: string
  border: string
  borderHover?: string
  error: string
  success: string
  warning: string
}

export interface TypographyTokens {
  fontFamily: {
    sans: string
    mono: string
    display: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    "2xl": string
    "3xl": string
    "4xl": string
    "5xl": string
  }
  fontWeight: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
}

export interface SpacingTokens {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  "2xl": string
  "3xl": string
  "4xl": string
}

export interface BorderRadiusTokens {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  "2xl": string
  full: string
}

export interface ShadowTokens {
  sm: string
  md: string
  lg: string
  xl: string
  glass?: string
  glassHover?: string
  glow?: string
  glowStrong?: string
}

export interface AnimationTokens {
  duration: {
    fast: string
    normal: string
    slow: string
  }
  easing: {
    default: string
    spring: string
    bounce?: string
    glitch?: string
  }
  intensity: "none" | "subtle" | "moderate" | "high"
}

export interface PortfolioData {
  id: string
  profile: Profile
  headline: string
  about: string
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  certifications: Certification[]
  socialLinks: SocialLink[]
  sections: SectionConfig[]
  seo: SEOData
  theme: ThemeConfig
  createdAt: string
  updatedAt: string
}

export interface QuestionnaireState {
  currentStep: number
  totalSteps: number
  answers: Record<string, unknown>
  completed: boolean
}

export type QuestionType =
  | "text"
  | "textarea"
  | "select"
  | "multi-select"
  | "date"
  | "url"
  | "email"
  | "image-upload"
  | "pdf-upload"
  | "skill-selector"
  | "project-builder"
  | "experience-builder"
  | "education-builder"
  | "social-links"

export interface QuestionDefinition {
  id: string
  type: QuestionType
  title: string
  description?: string
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: (value: unknown) => boolean | string
  nextStep?: string
  dependsOn?: { field: string; value: unknown }
}

export interface QuestionStep {
  id: string
  title: string
  description: string
  questions: QuestionDefinition[]
}

export interface AIProvider {
  generatePortfolioContent(data: Partial<PortfolioData>): Promise<Partial<PortfolioData>>
  improveText(text: string, context: string): Promise<string>
  generateSEO(data: Partial<PortfolioData>): Promise<SEOData>
}

export interface GitHubProfile {
  login: string
  name: string | null
  avatarUrl: string
  bio: string | null
  htmlUrl: string
  publicRepos: number
  followers: number
  following: number
  location: string | null
  email: string | null
}

export interface GitHubImportState {
  connected: boolean
  username: string
  profile: GitHubProfile | null
  repositories: GitHubRepository[]
  selectedRepos: Set<number>
  loading: boolean
  error: string | null
}