import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`,
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
    const filteredRepos = repos.filter((repo: { fork?: boolean; private?: boolean }) => !repo.fork && !repo.private)
    return NextResponse.json(filteredRepos)
  } catch (error) {
    console.error("GitHub repos fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 })
  }
}