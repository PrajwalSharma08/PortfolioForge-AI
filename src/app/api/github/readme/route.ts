import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get("username")
  const repo = searchParams.get("repo")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  const branches = ["main", "master"]
  const repoName = repo || username // If no repo specified, try user's special profile repository (username/username)

  let readmeText = ""
  for (const branch of branches) {
    try {
      const url = `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/README.md`
      const res = await fetch(url, {
        headers: {
          ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` }),
        },
        next: { revalidate: 3600 },
      })
      if (res.ok) {
        readmeText = await res.text()
        break
      }
    } catch {
      // try next branch
    }
  }

  if (!readmeText) {
    return NextResponse.json({ found: false, content: "", extracted: null })
  }

  // Extract clean text and data from README
  const extracted = parseReadmeContent(readmeText)

  return NextResponse.json({
    found: true,
    content: readmeText.slice(0, 5000), // First 5k chars
    extracted,
  })
}

function parseReadmeContent(raw: string) {
  // Strip HTML tags and markdown images/links to find clean introduction
  const cleanLines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => {
      if (!line) return false
      if (line.startsWith("<") && line.endsWith(">")) return false
      if (line.startsWith("![") && line.endsWith(")")) return false // badges
      if (line.startsWith("[![") && line.endsWith(")")) return false // badge links
      return true
    })

  // Find about/intro paragraphs
  const introParagraphs = cleanLines
    .filter((line) => !line.startsWith("#") && line.length > 25)
    .slice(0, 3)
    .join(" ")

  // Detect skills mentioned in README
  const TECH_KEYWORDS = [
    "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "Java", "C++", "C#",
    "Tailwind CSS", "PostgreSQL", "MongoDB", "MySQL", "Redis", "Docker", "Kubernetes", "AWS",
    "Express", "Django", "Flask", "Spring Boot", "Git", "GraphQL", "REST API", "HTML5", "CSS3",
    "Firebase", "Supabase", "Prisma", "Linux", "Figma", "Redux", "Vite"
  ]

  const detectedSkills = TECH_KEYWORDS.filter((tech) => {
    const regex = new RegExp(`\\b${tech.replace(".", "\\.")}\\b`, "i")
    return regex.test(raw)
  })

  // Detect social links inside README
  const leetcodeMatch = raw.match(/https?:\/\/(www\.)?leetcode\.com\/([a-zA-Z0-9_-]+)/i)
  const codeforcesMatch = raw.match(/https?:\/\/(www\.)?codeforces\.com\/profile\/([a-zA-Z0-9_-]+)/i)
  const linkedinMatch = raw.match(/https?:\/\/(www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i)
  const twitterMatch = raw.match(/https?:\/\/(www\.)?(twitter|x)\.com\/([a-zA-Z0-9_]+)/i)

  return {
    about: introParagraphs.slice(0, 400),
    skills: detectedSkills,
    socialLinks: {
      leetcode: leetcodeMatch ? leetcodeMatch[0] : null,
      codeforces: codeforcesMatch ? codeforcesMatch[0] : null,
      linkedin: linkedinMatch ? linkedinMatch[0] : null,
      twitter: twitterMatch ? twitterMatch[0] : null,
    },
  }
}
