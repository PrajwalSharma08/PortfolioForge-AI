import { GitHubProfile, GitHubRepository } from "@/types/portfolio"
import { Profile, Skill, Project, SocialLink } from "@/types/portfolio"
import { SKILL_CATEGORIES } from "@/types/portfolio"

const LANGUAGE_TO_CATEGORY: Record<string, Skill["category"]> = {
  JavaScript: "frontend",
  TypeScript: "frontend",
  React: "frontend",
  Vue: "frontend",
  Svelte: "frontend",
  HTML: "frontend",
  CSS: "frontend",
  Python: "backend",
  Go: "backend",
  Rust: "backend",
  Java: "backend",
  "C++": "backend",
  C: "backend",
  "C#": "backend",
  PHP: "backend",
  Ruby: "backend",
  Swift: "mobile",
  Kotlin: "mobile",
  Dart: "mobile",
  SQL: "database",
  PLSQL: "database",
  TSQL: "database",
  Dockerfile: "devops",
  YAML: "devops",
  "GitHub Actions": "devops",
  Terraform: "devops",
  "Jupyter Notebook": "data",
  R: "data",
  Julia: "data",
}

const TOPIC_TO_CATEGORY: Record<string, Skill["category"]> = {
  react: "frontend",
  vue: "frontend",
  nextjs: "frontend",
  typescript: "programming-languages",
  javascript: "programming-languages",
  python: "backend",
  "machine-learning": "ai-ml",
  ai: "ai-ml",
  docker: "devops",
  kubernetes: "devops",
  aws: "cloud",
  gcp: "cloud",
  azure: "cloud",
  postgresql: "database",
  mongodb: "database",
  redis: "database",
  graphql: "backend",
  "rest-api": "backend",
  microservices: "backend",
  testing: "tools",
  "ci-cd": "devops",
}

export function extractSkillsFromRepos(repositories: GitHubRepository[]): Skill[] {
  const skillMap = new Map<string, { name: string; category: Skill["category"]; count: number }>()

  repositories.forEach((repo) => {
    if (repo.language) {
      const category = LANGUAGE_TO_CATEGORY[repo.language] || "other"
      const key = `${repo.language}-${category}`
      skillMap.set(key, {
        name: repo.language,
        category,
        count: (skillMap.get(key)?.count || 0) + 1,
      })
    }

    repo.topics?.forEach((topic) => {
      const category = TOPIC_TO_CATEGORY[topic.toLowerCase()] || "other"
      const key = `${topic}-${category}`
      skillMap.set(key, {
        name: topic.charAt(0).toUpperCase() + topic.slice(1).replace(/-/g, " "),
        category,
        count: (skillMap.get(key)?.count || 0) + 1,
      })
    })
  })

  return Array.from(skillMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
    .map((skill, index) => ({
      id: `github-skill-${index}`,
      name: skill.name,
      category: skill.category,
      level: (skill.count > 5 ? "advanced" : skill.count > 2 ? "intermediate" : "beginner") as Skill["level"],
    }))
}

export function convertGitHubProfileToProfile(profile: GitHubProfile): Partial<Profile> {
  return {
    fullName: profile.name || profile.login,
    professionalTitle: "Software Developer",
    location: profile.location || "",
    email: profile.email || "",
    profilePhoto: profile.avatarUrl,
    shortBio: profile.bio || "",
  }
}

export function convertGitHubReposToProjects(
  repos: GitHubRepository[],
  selectedRepoIds: Set<number>
): Project[] {
  return repos
    .filter((repo) => selectedRepoIds.has(repo.id))
    .map((repo, index) => ({
      id: `github-project-${repo.id}`,
      name: repo.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      shortDescription: repo.description || "No description provided",
      detailedDescription: repo.description || "No description provided",
      technologies: repo.language ? [repo.language, ...repo.topics.slice(0, 4)] : repo.topics.slice(0, 5),
      githubUrl: repo.htmlUrl,
      liveDemoUrl: repo.homepage || "",
      image: "",
      role: "Developer",
      featured: index < 3,
      source: "github" as const,
      githubData: repo,
    }))
}

export function convertGitHubProfileToSocialLink(profile: GitHubProfile): SocialLink {
  return {
    id: `github-social-${profile.login}`,
    platform: "github",
    username: profile.login,
    url: profile.htmlUrl,
  }
}

export function inferRoleFromRepos(repositories: GitHubRepository[]): string {
  const languages = repositories.map((r) => r.language).filter((l): l is string => Boolean(l))
  const topics = repositories.flatMap((r) => r.topics || [])

  const frontendCount = languages.filter((l) => ["JavaScript", "TypeScript", "HTML", "CSS"].includes(l)).length
  const backendCount = languages.filter((l) => ["Python", "Go", "Java", "Rust", "C++", "PHP", "Ruby"].includes(l)).length
  const mobileCount = languages.filter((l) => ["Swift", "Kotlin", "Dart"].includes(l)).length
  const dataCount = languages.filter((l) => ["Jupyter Notebook", "R", "Julia"].includes(l)).length

  if (frontendCount > 0 && backendCount > 0) return "Full Stack Developer"
  if (frontendCount > backendCount) return "Frontend Developer"
  if (backendCount > frontendCount) return "Backend Developer"
  if (mobileCount > 0) return "Mobile Developer"
  if (dataCount > 0) return "Data Scientist"
  return "Software Developer"
}