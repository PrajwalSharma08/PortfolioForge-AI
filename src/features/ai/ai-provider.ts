import { PortfolioData, SEOData, AIProvider } from "@/types/portfolio"

class MockAIProvider implements AIProvider {
  async generatePortfolioContent(data: Partial<PortfolioData>): Promise<Partial<PortfolioData>> {
    await this.delay(1500)

    const profile = data.profile
    const skills = data.skills || []
    const projects = data.projects || []
    const experience = data.experience || []

    const headline = this.generateHeadline(profile, skills)
    const about = this.generateAbout(profile, experience, skills)
    const improvedProjects = projects.map((p) => ({
      ...p,
      shortDescription: this.improveDescription(p.shortDescription, "project"),
      detailedDescription: this.improveDescription(p.detailedDescription, "project"),
    }))
    const improvedExperience = experience.map((e) => ({
      ...e,
      description: this.improveDescription(e.description, "experience"),
      achievements: e.achievements.map((a) => this.improveDescription(a, "achievement")),
    }))

    return {
      headline,
      about,
      projects: improvedProjects,
      experience: improvedExperience,
      skills: this.categorizeSkills(skills),
    }
  }

  async improveText(text: string, context: string): Promise<string> {
    await this.delay(500)
    return this.improveDescription(text, context as "project" | "experience" | "achievement")
  }

  async generateSEO(data: Partial<PortfolioData>): Promise<SEOData> {
    await this.delay(300)

    const name = data.profile?.fullName || "Developer"
    const title = data.profile?.professionalTitle || "Software Developer"
    const skills = (data.skills || []).map((s) => s.name).slice(0, 5).join(", ")

    return {
      title: `${name} | ${title}`,
      description: `${title} specializing in ${skills}. Building scalable web applications and developer tools.`,
      ogImage: "",
      keywords: [title, ...skills.split(", "), "Portfolio", "Software Engineer"],
    }
  }

  private generateHeadline(profile: PortfolioData["profile"] | undefined, skills: PortfolioData["skills"]): string {
    if (!profile) return "Software Developer"

    const topSkills = skills.slice(0, 3).map((s) => s.name).join(" & ")
    const titles = [
      `${profile.professionalTitle} | ${topSkills} Specialist`,
      `${profile.professionalTitle} | Building Scalable Web Applications`,
      `Senior ${profile.professionalTitle} | ${topSkills} Expert`,
      `${profile.professionalTitle} | Open Source Contributor`,
    ]
    return titles[Math.floor(Math.random() * titles.length)]
  }

  private generateAbout(
    profile: PortfolioData["profile"] | undefined,
    experience: PortfolioData["experience"],
    skills: PortfolioData["skills"]
  ): string {
    if (!profile) return "Passionate developer building amazing things."

    const yearsExp = experience.length > 0 ? `${experience.length}+ years` : "several years"
    const topSkills = skills.slice(0, 5).map((s) => s.name).join(", ")
    const currentRole = experience[0]?.jobTitle || profile.professionalTitle
    const currentCompany = experience[0]?.company || "various companies"

    return `I'm ${profile.fullName}, a ${currentRole} with ${yearsExp} of experience building scalable web applications. Currently working at ${currentCompany}, I specialize in ${topSkills}. 

I'm passionate about clean code, developer experience, and building products that solve real problems. When I'm not coding, you'll find me contributing to open source, writing about technology, or exploring new frameworks and tools.

My approach combines technical excellence with a focus on user experience, ensuring that every project I work on is not just functional, but delightful to use.`
  }

  private improveDescription(text: string, context: "project" | "experience" | "achievement"): string {
    if (!text || text.length < 10) return text

    const improvements: Record<string, string[]> = {
      project: [
        "Built a comprehensive ",
        "Developed an innovative ",
        "Created a scalable ",
        "Designed and implemented a ",
        "Engineered a robust ",
      ],
      experience: [
        "Led the development of ",
        "Spearheaded the migration to ",
        "Architected and delivered ",
        "Optimized and scaled ",
        "Mentored team members on ",
      ],
      achievement: [
        "Achieved ",
        "Successfully ",
        "Delivered ",
        "Improved ",
        "Reduced ",
      ],
    }

    const prefixes = improvements[context] || improvements.project
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]

    if (text.charAt(0) === text.charAt(0).toLowerCase()) {
      return prefix + text.charAt(0).toLowerCase() + text.slice(1)
    }
    return prefix + text
  }

  private categorizeSkills(skills: PortfolioData["skills"]): PortfolioData["skills"] {
    return skills.map((skill) => ({
      ...skill,
      category: skill.category || this.inferCategory(skill.name),
    }))
  }

  private inferCategory(name: string): Skill["category"] {
    const lower = name.toLowerCase()
    if (["react", "vue", "svelte", "next", "html", "css", "tailwind"].some((k) => lower.includes(k))) return "frontend"
    if (["node", "express", "fastify", "nestjs", "django", "flask", "spring"].some((k) => lower.includes(k))) return "backend"
    if (["python", "tensorflow", "pytorch", "ml", "ai"].some((k) => lower.includes(k))) return "ai-ml"
    if (["postgres", "mysql", "mongo", "redis", "sql"].some((k) => lower.includes(k))) return "database"
    if (["aws", "gcp", "azure", "vercel", "cloudflare"].some((k) => lower.includes(k))) return "cloud"
    if (["docker", "kubernetes", "terraform", "ansible", "ci/cd", "github actions"].some((k) => lower.includes(k))) return "devops"
    if (["figma", "sketch", "adobe", "design", "ui", "ux"].some((k) => lower.includes(k))) return "design"
    return "other"
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

type Skill = PortfolioData["skills"][0]

export const aiProvider = new MockAIProvider()

export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER || "mock"

  switch (provider) {
    case "openai":
      return new OpenAIProvider()
    case "anthropic":
      return new AnthropicProvider()
    default:
      return aiProvider
  }
}

class OpenAIProvider implements AIProvider {
  async generatePortfolioContent(data: Partial<PortfolioData>): Promise<Partial<PortfolioData>> {
    throw new Error("OpenAI provider not implemented yet")
  }

  async improveText(text: string, context: string): Promise<string> {
    throw new Error("OpenAI provider not implemented yet")
  }

  async generateSEO(data: Partial<PortfolioData>): Promise<SEOData> {
    throw new Error("OpenAI provider not implemented yet")
  }
}

class AnthropicProvider implements AIProvider {
  async generatePortfolioContent(data: Partial<PortfolioData>): Promise<Partial<PortfolioData>> {
    throw new Error("Anthropic provider not implemented yet")
  }

  async improveText(text: string, context: string): Promise<string> {
    throw new Error("Anthropic provider not implemented yet")
  }

  async generateSEO(data: Partial<PortfolioData>): Promise<SEOData> {
    throw new Error("Anthropic provider not implemented yet")
  }
}