import { PortfolioData, Profile, Skill, Project, Experience, Education, Certification, SocialLink, SectionConfig, ThemeConfig, ThemeTokens, SEOData, DEFAULT_SECTIONS } from "@/types/portfolio"

export const DEMO_PROFILE: Profile = {
  fullName: "Alex Morgan",
  professionalTitle: "Full Stack Developer",
  location: "San Francisco, CA",
  email: "alex.morgan@example.com",
  profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  coverBanner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=600&fit=crop&q=80",
  statusMessage: "Open to full-time & contract roles",
  shortBio: "Passionate full stack developer with 5+ years of experience building scalable web applications. I love creating intuitive user experiences and solving complex technical challenges.",
}

export const DEMO_SKILLS: Skill[] = [
  { id: "1", name: "React", category: "frontend", level: "expert" },
  { id: "2", name: "Next.js", category: "frontend", level: "advanced" },
  { id: "3", name: "TypeScript", category: "programming-languages", level: "expert" },
  { id: "4", name: "Node.js", category: "backend", level: "advanced" },
  { id: "5", name: "PostgreSQL", category: "database", level: "advanced" },
  { id: "6", name: "Docker", category: "devops", level: "intermediate" },
  { id: "7", name: "AWS", category: "cloud", level: "intermediate" },
  { id: "8", name: "GraphQL", category: "backend", level: "intermediate" },
  { id: "9", name: "Tailwind CSS", category: "frontend", level: "expert" },
  { id: "10", name: "Python", category: "programming-languages", level: "intermediate" },
]

export const DEMO_PROJECTS: Project[] = [
  {
    id: "project-1",
    name: "AI Resume Analyzer",
    shortDescription: "An AI-powered tool that analyzes resumes and provides improvement suggestions",
    detailedDescription: "Built a full-stack application that uses OpenAI's GPT-4 to analyze resumes against job descriptions. The system provides actionable feedback on formatting, keywords, and content structure. Features include real-time analysis, ATS scoring, and personalized recommendations.",
    technologies: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/alexmorgan/ai-resume-analyzer",
    liveDemoUrl: "https://ai-resume-analyzer.example.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    role: "Full Stack Developer",
    featured: true,
    source: "manual",
  },
  {
    id: "project-2",
    name: "Realtime Collaboration App",
    shortDescription: "A real-time collaborative document editor with presence and comments",
    detailedDescription: "Developed a Google Docs-like collaborative editor using WebSockets and Operational Transformation. Supports real-time cursors, presence indicators, comments, and version history. Built with a focus on low latency and conflict resolution.",
    technologies: ["React", "Node.js", "Socket.io", "Yjs", "Redis", "PostgreSQL"],
    githubUrl: "https://github.com/alexmorgan/realtime-collab",
    liveDemoUrl: "https://collab.example.com",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    role: "Lead Developer",
    featured: true,
    source: "manual",
  },
  {
    id: "project-3",
    name: "Developer Analytics Dashboard",
    shortDescription: "Analytics platform for tracking developer productivity and code quality metrics",
    detailedDescription: "Created a comprehensive dashboard that integrates with GitHub, GitLab, and Jira to provide insights into team velocity, code review patterns, deployment frequency, and DORA metrics. Features customizable reports and automated alerts.",
    technologies: ["Vue.js", "Node.js", "ClickHouse", "GraphQL", "Docker", "Kubernetes"],
    githubUrl: "https://github.com/alexmorgan/dev-analytics",
    liveDemoUrl: "https://analytics.example.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    role: "Full Stack Developer",
    featured: false,
    source: "manual",
  },
]

export const DEMO_EXPERIENCE: Experience[] = [
  {
    id: "exp-1",
    company: "TechCorp Inc.",
    jobTitle: "Senior Software Engineer",
    location: "San Francisco, CA",
    startDate: "2022-01",
    endDate: "",
    currentlyWorking: true,
    description: "Lead a team of 5 engineers building the company's flagship SaaS product. Architected the migration from monolith to microservices, reducing deployment time by 80%. Mentor junior engineers and conduct code reviews.",
    achievements: [
      "Reduced API response times by 60% through caching and query optimization",
      "Led migration to Kubernetes, improving deployment frequency from weekly to daily",
      "Implemented feature flag system enabling safe rollouts and A/B testing",
    ],
    technologies: ["React", "Node.js", "Kubernetes", "PostgreSQL", "GraphQL", "TypeScript"],
  },
  {
    id: "exp-2",
    company: "StartupXYZ",
    jobTitle: "Full Stack Developer",
    location: "Remote",
    startDate: "2020-03",
    endDate: "2021-12",
    currentlyWorking: false,
    description: "Built and maintained multiple client projects as part of a small agile team. Worked across the full stack from database design to UI implementation. Collaborated directly with founders on product strategy.",
    achievements: [
      "Delivered 10+ client projects on time and within budget",
      "Built internal CLI tool reducing project setup time by 50%",
      "Introduced TypeScript and testing practices across codebase",
    ],
    technologies: ["Vue.js", "Node.js", "MongoDB", "Docker", "AWS", "JavaScript"],
  },
]

export const DEMO_EDUCATION: Education[] = [
  {
    id: "edu-1",
    institution: "Stanford University",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    startDate: "2016-09",
    endDate: "2020-06",
    grade: "3.8/4.0",
    description: "Focused on distributed systems, machine learning, and human-computer interaction. Completed capstone project on real-time collaborative editing algorithms.",
  },
]

export const DEMO_CERTIFICATIONS: Certification[] = [
  {
    id: "cert-1",
    name: "AWS Certified Solutions Architect",
    issuingOrganization: "Amazon Web Services",
    date: "2023-06",
    credentialUrl: "https://aws.amazon.com/verification",
  },
  {
    id: "cert-2",
    name: "Google Cloud Professional Developer",
    issuingOrganization: "Google Cloud",
    date: "2022-11",
    credentialUrl: "https://cloud.google.com/certification",
  },
]

export const DEMO_SOCIAL_LINKS: SocialLink[] = [
  { id: "social-1", platform: "github", username: "alexmorgan", url: "https://github.com/alexmorgan" },
  { id: "social-2", platform: "linkedin", username: "alexmorgan", url: "https://linkedin.com/in/alexmorgan" },
  { id: "social-3", platform: "twitter", username: "alexmorgan_dev", url: "https://x.com/alexmorgan_dev" },
  { id: "social-4", platform: "website", username: "alexmorgan.dev", url: "https://alexmorgan.dev" },
]

export const DEMO_SEO: SEOData = {
  title: "Alex Morgan | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Node.js, and cloud architectures. Building scalable web applications and developer tools.",
  ogImage: "https://alexmorgan.dev/og-image.png",
  keywords: ["Full Stack Developer", "React", "Node.js", "TypeScript", "Software Engineer", "San Francisco"],
}

export const DEMO_THEME_CONFIG: ThemeConfig = {
  id: "glassmorphism",
  name: "Glassmorphism",
  description: "Modern glassmorphism design with frosted glass effects",
  preview: "/themes/glassmorphism-preview.png",
  tokens: {
    colors: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#f43f5e",
      background: "#0f0f1a",
      surface: "rgba(255, 255, 255, 0.05)",
      text: "#f8fafc",
      textMuted: "#94a3b8",
      border: "rgba(255, 255, 255, 0.1)",
      error: "#ef4444",
      success: "#22c55e",
      warning: "#f59e0b",
    },
    typography: {
      fontFamily: {
        sans: "Inter, system-ui, sans-serif",
        mono: "JetBrains Mono, monospace",
        display: "Cal Sans, Inter, system-ui, sans-serif",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.1,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
      "4xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      full: "9999px",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
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

export function createDemoPortfolioData(theme: ThemeConfig = DEMO_THEME_CONFIG): PortfolioData {
  return {
    id: `portfolio-${Date.now()}`,
    profile: DEMO_PROFILE,
    headline: "Full Stack Developer | Building Scalable Web Applications",
    about: "I'm a passionate full stack developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud architectures, with a strong focus on developer experience and performance optimization. When I'm not coding, you'll find me contributing to open source, writing technical articles, or exploring new technologies.",
    skills: DEMO_SKILLS,
    projects: DEMO_PROJECTS,
    experience: DEMO_EXPERIENCE,
    education: DEMO_EDUCATION,
    certifications: DEMO_CERTIFICATIONS,
    socialLinks: DEMO_SOCIAL_LINKS,
    sections: DEFAULT_SECTIONS,
    seo: DEMO_SEO,
    theme,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}