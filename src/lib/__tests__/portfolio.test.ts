import { describe, it, expect } from "vitest"
import { cn } from "../utils"
import { createDemoPortfolioData } from "../demo-data"
import { THEMES } from "@/features/themes"

describe("portfolio-forge utilities & data generation", () => {
  it("merges Tailwind classes accurately via cn()", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4")
  })

  it("creates valid demo portfolio data for a selected theme", () => {
    const theme = THEMES[0]
    const demo = createDemoPortfolioData(theme)
    expect(demo.profile.fullName).toBeTruthy()
    expect(demo.theme.id).toBe(theme.id)
    expect(demo.projects.length).toBeGreaterThan(0)
    expect(demo.skills.length).toBeGreaterThan(0)
  })

  it("ensures education, projects, certifications, and experience sections are auto-enabled when items exist", () => {
    const theme = THEMES[0]
    const portfolio = createDemoPortfolioData(theme)
    
    // Simulate empty initial sections from questionnaire
    portfolio.sections = [
      { id: "hero", type: "hero", title: "Hero", enabled: true, order: 0 },
      { id: "about", type: "about", title: "About", enabled: true, order: 1 },
      { id: "projects", type: "projects", title: "Projects", enabled: false, order: 2 },
      { id: "skills", type: "skills", title: "Skills", enabled: false, order: 3 },
      { id: "experience", type: "experience", title: "Experience", enabled: false, order: 4 },
      { id: "education", type: "education", title: "Education", enabled: false, order: 5 },
      { id: "certifications", type: "certifications", title: "Certifications", enabled: false, order: 6 },
    ]

    // User adds custom education, projects, and certifications
    portfolio.education = [
      {
        id: "edu-1",
        institution: "Delhi Technological University",
        degree: "B.Tech in Computer Science",
        fieldOfStudy: "Computer Science",
        startDate: "2020",
        endDate: "2024",
        grade: "8.9 CGPA",
        description: "Specialized in Artificial Intelligence and Machine Learning",
      },
    ]

    portfolio.certifications = [
      {
        id: "cert-1",
        name: "AWS Certified Solutions Architect",
        issuingOrganization: "Amazon Web Services",
        date: "2024",
        credentialUrl: "https://aws.amazon.com",
      },
    ]

    portfolio.projects = [
      {
        id: "proj-1",
        name: "AI Portfolio Forge",
        shortDescription: "An automated developer portfolio creator",
        detailedDescription: "Next-generation automated portfolio generator using React and Next.js",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/PrajwalSharma08/PortfolioForge-AI",
        liveDemoUrl: "https://prajwalsharma08.github.io/PortfolioForge-AI",
        image: "",
        role: "Lead Engineer",
        featured: true,
        source: "manual",
      },
    ]

    // Auto-enable logic replicated from editor / onboarding / preview
    const syncSections = portfolio.sections.map((section) => {
      if (section.type === "education" && portfolio.education && portfolio.education.length > 0) {
        return { ...section, enabled: true }
      }
      if (section.type === "certifications" && portfolio.certifications && portfolio.certifications.length > 0) {
        return { ...section, enabled: true }
      }
      if (section.type === "projects" && portfolio.projects && portfolio.projects.length > 0) {
        return { ...section, enabled: true }
      }
      return section
    })

    const eduSection = syncSections.find((s) => s.type === "education")
    const certSection = syncSections.find((s) => s.type === "certifications")
    const projSection = syncSections.find((s) => s.type === "projects")

    expect(eduSection?.enabled).toBe(true)
    expect(certSection?.enabled).toBe(true)
    expect(projSection?.enabled).toBe(true)
  })

  it("supports generating a complete portfolio without a GitHub profile", () => {
    const rawQuestionnaireData = {
      fullName: "Prajwal Sharma",
      professionalTitle: "Full Stack AI Engineer",
      shortBio: "Building next-gen AI applications",
      skills: ["React", "TypeScript", "Node.js", "Python"],
      // GitHub skipped - no githubUsername or githubData
      githubUsername: undefined,
      githubData: undefined,
      education: [
        {
          id: "edu-test",
          institution: "Demo University",
          degree: "Bachelor of Engineering",
          fieldOfStudy: "Information Technology",
          startDate: "2021",
          endDate: "2025",
          grade: "9.0 CGPA",
          description: "Top 5% of class",
        },
      ],
      certifications: [
        {
          id: "cert-test",
          name: "Full Stack Certification",
          issuingOrganization: "Meta",
          date: "2024",
          credentialUrl: "https://meta.com/cert",
        },
      ],
      projects: [
        {
          id: "proj-test",
          name: "Sentinel Shield",
          shortDescription: "Security Analysis Tool",
          detailedDescription: "Real-time threat monitoring and protection suite",
          technologies: ["Python", "React", "Docker"],
          githubUrl: "https://github.com/PrajwalSharma08/SentinelShield",
          liveDemoUrl: "",
          image: "",
          role: "Creator",
          featured: true,
          source: "manual" as const,
        },
      ],
    }

    const theme = THEMES[0]
    const portfolio = createDemoPortfolioData(theme)

    // Apply questionnaire data
    portfolio.profile.fullName = rawQuestionnaireData.fullName
    portfolio.profile.professionalTitle = rawQuestionnaireData.professionalTitle
    portfolio.profile.shortBio = rawQuestionnaireData.shortBio
    portfolio.education = rawQuestionnaireData.education
    portfolio.certifications = rawQuestionnaireData.certifications
    portfolio.projects = rawQuestionnaireData.projects

    expect(portfolio.profile.fullName).toBe("Prajwal Sharma")
    expect(portfolio.profile.professionalTitle).toBe("Full Stack AI Engineer")
    expect(portfolio.education.length).toBe(1)
    expect(portfolio.education[0].institution).toBe("Demo University")
    expect(portfolio.certifications.length).toBe(1)
    expect(portfolio.certifications[0].name).toBe("Full Stack Certification")
    expect(portfolio.projects.length).toBe(1)
    expect(portfolio.projects[0].name).toBe("Sentinel Shield")
  })
})
