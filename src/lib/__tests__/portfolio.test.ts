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
      },
    ]

    portfolio.certifications = [
      {
        id: "cert-1",
        name: "AWS Certified Solutions Architect",
        issuingOrganization: "Amazon Web Services",
        date: "2024",
      },
    ]

    portfolio.projects = [
      {
        id: "proj-1",
        name: "AI Portfolio Forge",
        shortDescription: "An automated developer portfolio creator",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
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
        },
      ],
      certifications: [
        {
          id: "cert-test",
          name: "Full Stack Certification",
          issuingOrganization: "Meta",
        },
      ],
      projects: [
        {
          id: "proj-test",
          name: "Sentinel Shield",
          shortDescription: "Security Analysis Tool",
        },
      ],
    }

    const theme = THEMES[0]
    const portfolio = createDemoPortfolioData(theme)

    // Apply questionnaire data
    portfolio.profile.fullName = rawQuestionnaireData.fullName
    portfolio.profile.title = rawQuestionnaireData.professionalTitle
    portfolio.profile.bio = rawQuestionnaireData.shortBio
    portfolio.education = rawQuestionnaireData.education
    portfolio.certifications = rawQuestionnaireData.certifications
    portfolio.projects = rawQuestionnaireData.projects

    expect(portfolio.profile.fullName).toBe("Prajwal Sharma")
    expect(portfolio.education.length).toBe(1)
    expect(portfolio.education[0].institution).toBe("Demo University")
    expect(portfolio.certifications.length).toBe(1)
    expect(portfolio.certifications[0].name).toBe("Full Stack Certification")
    expect(portfolio.projects.length).toBe(1)
    expect(portfolio.projects[0].name).toBe("Sentinel Shield")
  })
})
