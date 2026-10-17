"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GitBranch, Loader2, CheckCircle, XCircle, Search, ExternalLink, Star, GitFork, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { GitHubRepository, GitHubImportState, GitHubProfile } from "@/types/portfolio"

export interface ExtractedReadmeData {
  about: string
  skills: string[]
  socialLinks: {
    leetcode: string | null
    codeforces: string | null
    linkedin: string | null
    twitter: string | null
  }
}

interface GitHubImportProps {
  onComplete: (data: {
    profile: GitHubProfile
    repos: GitHubRepository[]
    selectedRepos: Set<number>
    readmeExtracted?: ExtractedReadmeData | null
  }) => void
  onSkip: () => void
}

interface ExtendedGitHubImportState extends GitHubImportState {
  readmeExtracted?: ExtractedReadmeData | null
}

export function GitHubImport({ onComplete, onSkip }: GitHubImportProps) {
  const [state, setState] = React.useState<ExtendedGitHubImportState>({
    connected: false,
    username: "",
    profile: null,
    repositories: [],
    selectedRepos: new Set<number>(),
    readmeExtracted: null,
    loading: false,
    error: null,
  })

  const handleConnect = async () => {
    if (!state.username.trim()) return

    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const [profileRes, reposRes, readmeRes] = await Promise.all([
        fetch(`/api/github/profile?username=${state.username}`),
        fetch(`/api/github/repos?username=${state.username}`),
        fetch(`/api/github/readme?username=${state.username}`).catch(() => null),
      ])

      if (!profileRes.ok) throw new Error("Profile not found")
      if (!reposRes.ok) throw new Error("Failed to fetch repositories")

      const profile = await profileRes.json()
      const repositories = await reposRes.json()

      let readmeExtracted: ExtractedReadmeData | null = null
      if (readmeRes && readmeRes.ok) {
        try {
          const readmeJson = await readmeRes.json()
          if (readmeJson.found && readmeJson.extracted) {
            readmeExtracted = readmeJson.extracted
          }
        } catch {
          // ignore
        }
      }

      const selectedRepos = new Set<number>(repositories.slice(0, 6).map((r: GitHubRepository) => r.id))

      setState({
        connected: true,
        username: state.username,
        profile,
        repositories,
        selectedRepos,
        readmeExtracted,
        loading: false,
        error: null,
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to connect to GitHub",
      }))
    }
  }

  const toggleRepo = (repoId: number) => {
    setState((prev) => {
      const newSelected = new Set(prev.selectedRepos)
      if (newSelected.has(repoId)) {
        newSelected.delete(repoId)
      } else {
        newSelected.add(repoId)
      }
      return { ...prev, selectedRepos: newSelected }
    })
  }

  const toggleAll = () => {
    setState((prev) => ({
      ...prev,
      selectedRepos:
        prev.selectedRepos.size === prev.repositories.length
          ? new Set()
          : new Set(prev.repositories.map((r) => r.id)),
    }))
  }

  const handleContinue = () => {
    if (state.connected && state.profile) {
      onComplete({
        profile: state.profile,
        repos: state.repositories,
        selectedRepos: state.selectedRepos,
        readmeExtracted: state.readmeExtracted,
      })
    }
  }

  if (!state.connected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto text-center space-y-6"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <GitBranch className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Import from GitHub</h2>
        <p className="text-muted-foreground">
          Automatically bring your GitHub profile and projects into your portfolio.
        </p>

        <div className="flex gap-2 max-w-md mx-auto">
          <Input
            placeholder="GitHub username"
            value={state.username}
            onChange={(e) => setState({ ...state, username: e.target.value })}
            disabled={state.loading}
          />
          <Button onClick={handleConnect} disabled={state.loading || !state.username.trim()} className="whitespace-nowrap">
            {state.loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Connect GitHub"}
          </Button>
        </div>

        {state.error && (
          <p className="text-destructive text-sm">{state.error}</p>
        )}

        <Button variant="ghost" onClick={onSkip} className="mt-4">
          Skip for now
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <GitBranch className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">GitHub Connected</h2>
            <p className="text-sm text-muted-foreground">@{state.profile?.login}</p>
          </div>
        </div>
        <Badge variant="success" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          Connected
        </Badge>
      </div>

      {state.profile && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <img
                src={state.profile.avatarUrl}
                alt={state.profile.login}
                className="w-16 h-16 rounded-xl"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{state.profile.name || state.profile.login}</h3>
                <p className="text-sm text-muted-foreground truncate">{state.profile.bio || "No bio available"}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {state.profile.publicRepos} repos</span>
                  <span className="flex items-center gap-1">{state.profile.followers} followers</span>
                  <a href={state.profile.htmlUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {state.readmeExtracted && (
        <Card className="border-purple-500/30 bg-purple-500/5 p-4 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Profile README.md Analyzed</span>
          </div>
          {state.readmeExtracted.about && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              <strong>Extracted Bio:</strong> {state.readmeExtracted.about}
            </p>
          )}
          {state.readmeExtracted.skills?.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-xs text-muted-foreground">Detected Skills:</span>
              {state.readmeExtracted.skills.slice(0, 8).map((sk) => (
                <Badge key={sk} variant="outline" className="text-[11px] bg-purple-500/10 border-purple-500/20 text-purple-300">
                  {sk}
                </Badge>
              ))}
              {state.readmeExtracted.skills.length > 8 && (
                <span className="text-[11px] text-muted-foreground">+{state.readmeExtracted.skills.length - 8} more</span>
              )}
            </div>
          )}
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Select Projects to Showcase ({state.selectedRepos.size} selected)</h3>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={state.selectedRepos.size === state.repositories.length && state.repositories.length > 0}
              onCheckedChange={toggleAll}
              aria-label="Select all"
            />
            <span className="text-sm text-muted-foreground">Select All</span>
          </div>
        </div>

        <ScrollArea className="h-96 border rounded-lg">
          <div className="p-4 space-y-3">
            {state.repositories.map((repo) => (
              <Card
                key={repo.id}
                className={cn(
                  "transition-all duration-200",
                  state.selectedRepos.has(repo.id) ? "border-primary/50 bg-primary/5" : ""
                )}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Checkbox
                        checked={state.selectedRepos.has(repo.id)}
                        onCheckedChange={() => toggleRepo(repo.id)}
                        className="mt-0.5 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="font-medium truncate">{repo.name}</h4>
                          {repo.language && (
                            <Badge variant="secondary" className="text-xs">{repo.language}</Badge>
                          )}
                          {repo.topics.slice(0, 3).map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs">{topic}</Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {repo.description || "No description"}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {repo.stargazersCount}</span>
                          <span className="flex items-center gap-1"><GitFork className="h-3 w-3" /> {repo.forksCount}</span>
                          <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                            <ExternalLink className="h-3 w-3" />
                            View on GitHub
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {state.repositories.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No public repositories found.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={() => setState({ ...state, connected: false })} disabled={state.loading}>
          Change Account
        </Button>
        <Button onClick={handleContinue} className="w-[200px]">
          Continue with {state.selectedRepos.size} Projects
        </Button>
      </div>
    </motion.div>
  )
}