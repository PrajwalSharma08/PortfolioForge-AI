import { GitHubProfile, GitHubRepository } from "@/types/portfolio"

const GITHUB_API_BASE = "https://api.github.com"

export async function fetchGitHubProfile(username: string): Promise<GitHubProfile | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` }),
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`GitHub API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Failed to fetch GitHub profile:", error)
    return null
  }
}

export async function fetchGitHubRepositories(username: string): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` }),
        },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos = await response.json()
    return repos.filter((repo: GitHubRepository) => !repo.fork && !repo.private)
  } catch (error) {
    console.error("Failed to fetch GitHub repositories:", error)
    return []
  }
}

export async function fetchRepositoryReadme(username: string, repoName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.v3.raw",
          ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` }),
        },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) return null
    return response.text()
  } catch {
    return null
  }
}

export async function fetchRepositoryLanguages(username: string, repoName: string): Promise<Record<string, number>> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}/languages`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` }),
        },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) return {}
    return response.json()
  } catch {
    return {}
  }
}

export function normalizeGitHubProfile(profile: GitHubProfile) {
  return {
    username: profile.login,
    name: profile.name,
    avatar: profile.avatarUrl,
    bio: profile.bio,
    profileUrl: profile.htmlUrl,
    publicRepos: profile.publicRepos,
    followers: profile.followers,
    following: profile.following,
  }
}

export function normalizeGitHubRepository(repo: GitHubRepository) {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    htmlUrl: repo.htmlUrl,
    homepage: repo.homepage,
    stars: repo.stargazersCount,
    forks: repo.forksCount,
    language: repo.language,
    topics: repo.topics,
    updatedAt: repo.updatedAt,
  }
}