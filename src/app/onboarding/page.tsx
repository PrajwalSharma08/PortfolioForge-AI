"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, X, Sparkles, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QuestionnaireEngine } from "@/features/questionnaire"
import { GitHubImport } from "@/features/github"
import { GenerationScreen } from "@/features/ai"
import { ThemeSelector } from "@/features/themes"
import { createDemoPortfolioData, DEMO_THEME_CONFIG } from "@/lib/demo-data"
import { PortfolioData, ThemeConfig, GitHubProfile, GitHubRepository } from "@/types/portfolio"
import { cn } from "@/lib/utils"

import { ExtractedReadmeData } from "@/features/github/github-import"

type OnboardingStep = "questionnaire" | "github" | "generation" | "theme" | "complete"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = React.useState<OnboardingStep>("questionnaire")
  const [questionnaireData, setQuestionnaireData] = React.useState<Record<string, unknown> | null>(null)
  const [githubData, setGithubData] = React.useState<{
    profile: GitHubProfile | null
    repos: GitHubRepository[]
    selectedRepos: Set<number>
    readmeExtracted?: ExtractedReadmeData | null
  } | null>(null)
  const [generatedData, setGeneratedData] = React.useState<Record<string, unknown> | null>(null)
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeConfig | null>(null)
  const [finalPortfolio, setFinalPortfolio] = React.useState<PortfolioData | null>(null)

  const steps: { id: OnboardingStep; label: string }[] = [
    { id: "questionnaire", label: "Questionnaire" },
    { id: "github", label: "GitHub Import" },
    { id: "generation", label: "AI Generation" },
    { id: "theme", label: "Theme Select" },
    { id: "complete", label: "Complete" },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleQuestionnaireComplete = (data: Record<string, unknown>) => {
    setQuestionnaireData(data)
    setCurrentStep("github")
  }

  const handleGithubComplete = (data: {
    profile: GitHubProfile
    repos: GitHubRepository[]
    selectedRepos: Set<number>
    readmeExtracted?: ExtractedReadmeData | null
  }) => {
    setGithubData(data)
    setCurrentStep("generation")
  }

  const handleGithubSkip = () => {
    setGithubData({ profile: null, repos: [], selectedRepos: new Set(), readmeExtracted: null })
    setCurrentStep("generation")
  }

  const handleGenerationComplete = (data: Record<string, unknown>) => {
    const qProfile = (questionnaireData?.profile as Record<string, unknown>) || {}
    const dProfile = (data?.profile as Record<string, unknown>) || {}
    const mergedData: Record<string, unknown> = {
      ...questionnaireData,
      ...data,
      profile: { ...qProfile, ...dProfile },
    }
    setGeneratedData(mergedData)
    setCurrentStep("theme")
  }

  const handleThemeSelect = (theme: ThemeConfig) => {
    setSelectedTheme(theme)

    const portfolioData = createDemoPortfolioData(theme)
    const q = questionnaireData || {}

    portfolioData.profile = {
      ...portfolioData.profile,
      ...(q.profile as Partial<PortfolioData["profile"]>),
      fullName: (q.fullName as string) || portfolioData.profile.fullName,
      professionalTitle: (q.professionalTitle as string) || portfolioData.profile.professionalTitle,
      location: (q.location as string) || portfolioData.profile.location,
      email: (q.email as string) || portfolioData.profile.email,
      profilePhoto: (q.profilePhoto as string) || (githubData?.profile?.avatarUrl) || portfolioData.profile.profilePhoto,
      coverBanner: (q.coverBanner as string) || portfolioData.profile.coverBanner || "",
      statusMessage: (q.statusMessage as string) || "Available for Opportunities",
      resumeUrl: (q.resumeUrl as string) || "",
      userCategory: (q.userCategory as string) || "",
      shortBio: (q.shortBio as string) || (githubData?.readmeExtracted?.about) || portfolioData.profile.shortBio,
    }

    // Skills
    if (Array.isArray(q.skills) && q.skills.length > 0) {
      portfolioData.skills = q.skills as PortfolioData["skills"]
    }
    if (githubData?.readmeExtracted?.skills?.length) {
      const existingNames = new Set(portfolioData.skills.map((s) => s.name.toLowerCase()))
      const newSkills: PortfolioData["skills"] = githubData.readmeExtracted.skills
        .filter((s) => !existingNames.has(s.toLowerCase()))
        .map((s, idx) => ({
          id: `readme-skill-${Date.now()}-${idx}`,
          name: s,
          category: "frontend" as const,
          level: "intermediate" as const,
        }))
      portfolioData.skills = [...portfolioData.skills, ...newSkills]
    }

    // Projects
    if (Array.isArray(q.projects) && q.projects.length > 0) {
      portfolioData.projects = q.projects as PortfolioData["projects"]
    }
    if (githubData?.selectedRepos.size) {
      const ghProjects: PortfolioData["projects"] = githubData.repos
        .filter((r) => githubData.selectedRepos.has(r.id))
        .map((r) => ({
          id: `gh-${r.id}`,
          name: r.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          shortDescription: r.description || "GitHub repository project",
          detailedDescription: r.description || "",
          technologies: [r.language, ...(r.topics || [])].filter((t): t is string => Boolean(t)),
          githubUrl: r.htmlUrl,
          liveDemoUrl: r.homepage || "",
          image: "",
          role: "Developer",
          featured: true,
          source: "github" as const,
        }))
      if (ghProjects.length > 0) {
        portfolioData.projects = [...ghProjects, ...portfolioData.projects]
      }
    }

    // Experience: if skipped or student without exp, disable section & set empty array
    if (q.hasExperience === "no" || !Array.isArray(q.experience) || q.experience.length === 0) {
      portfolioData.experience = []
      portfolioData.sections = portfolioData.sections.map((s) =>
        s.type === "experience" ? { ...s, enabled: false } : s
      )
    } else {
      portfolioData.experience = q.experience as PortfolioData["experience"]
    }

    // Education
    if (Array.isArray(q.education) && q.education.length > 0) {
      portfolioData.education = q.education as PortfolioData["education"]
    }

    // Certifications: if empty, disable section & set empty array
    if (Array.isArray(q.certifications) && q.certifications.length > 0) {
      portfolioData.certifications = q.certifications as PortfolioData["certifications"]
    } else {
      portfolioData.certifications = []
      portfolioData.sections = portfolioData.sections.map((s) =>
        s.type === "certifications" ? { ...s, enabled: false } : s
      )
    }

    // Social links
    let socialList: PortfolioData["socialLinks"] = []
    if (Array.isArray(q.socialLinks) && q.socialLinks.length > 0) {
      socialList = [...(q.socialLinks as PortfolioData["socialLinks"])]
    }
    if (githubData?.profile?.htmlUrl && !socialList.some((s) => s.platform === "github")) {
      socialList.push({
        id: `gh-social-${Date.now()}`,
        platform: "github",
        username: githubData.profile.login,
        url: githubData.profile.htmlUrl,
      })
    }
    if (githubData?.readmeExtracted?.socialLinks) {
      const rl = githubData.readmeExtracted.socialLinks
      if (rl.linkedin && !socialList.some((s) => s.platform === "linkedin")) {
        socialList.push({ id: `readme-li-${Date.now()}`, platform: "linkedin", username: "LinkedIn", url: rl.linkedin })
      }
      if (rl.leetcode && !socialList.some((s) => s.platform === "leetcode")) {
        socialList.push({ id: `readme-lc-${Date.now()}`, platform: "leetcode", username: "LeetCode", url: rl.leetcode })
      }
      if (rl.codeforces && !socialList.some((s) => s.platform === "codeforces")) {
        socialList.push({ id: `readme-cf-${Date.now()}`, platform: "codeforces", username: "Codeforces", url: rl.codeforces })
      }
    }
    if (socialList.length > 0) {
      portfolioData.socialLinks = socialList
    }

    portfolioData.headline = (generatedData?.headline as string) || portfolioData.headline
    portfolioData.about = (generatedData?.about as string) || portfolioData.about
    portfolioData.seo = (generatedData?.seo as PortfolioData["seo"]) || portfolioData.seo

    localStorage.setItem("portfolio-data", JSON.stringify(portfolioData))
    setFinalPortfolio(portfolioData)
    setCurrentStep("complete")
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case "questionnaire":
        return (
          <QuestionnaireEngine
            key="questionnaire"
            initialValues={questionnaireData || undefined}
            onComplete={handleQuestionnaireComplete}
            onBack={handleBack}
          />
        )
      case "github":
        return (
          <GitHubImport
            key="github"
            onComplete={handleGithubComplete}
            onSkip={handleGithubSkip}
          />
        )
      case "generation":
        return (
          <GenerationScreen
            key="generation"
            onComplete={handleGenerationComplete}
            initialData={{ ...questionnaireData, ...githubData }}
          />
        )
      case "theme":
        return (
          <ThemeSelector
            key="theme"
            selectedTheme={selectedTheme}
            onSelectTheme={handleThemeSelect}
          />
        )
      case "complete":
        return (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <CheckCircle className="h-10 w-10 text-green-500" />
            </motion.div>
            <h2 className="text-3xl font-bold">Your Portfolio is Ready! 🚀</h2>
            <p className="text-muted-foreground text-lg">
              AI has generated your content and you&apos;ve selected a theme. Let&apos;s open the editor to fine-tune everything.
            </p>
            
            {finalPortfolio && (
              <div className="space-y-3 text-left p-4 bg-muted/50 rounded-xl">
                <h4 className="font-semibold">Preview of your data:</h4>
                <p className="text-sm text-muted-foreground"><strong>Name:</strong> {finalPortfolio.profile.fullName}</p>
                <p className="text-sm text-muted-foreground"><strong>Title:</strong> {finalPortfolio.profile.professionalTitle}</p>
                <p className="text-sm text-muted-foreground"><strong>Theme:</strong> {finalPortfolio.theme.name}</p>
                <p className="text-sm text-muted-foreground"><strong>Projects:</strong> {finalPortfolio.projects.length}</p>
                <p className="text-sm text-muted-foreground"><strong>Skills:</strong> {finalPortfolio.skills.length}</p>
              </div>
            )}

            <div className="flex justify-center gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep("theme")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Change Theme
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  if (finalPortfolio) {
                    localStorage.setItem("portfolio-data", JSON.stringify(finalPortfolio))
                    window.location.href = "/editor"
                  }
                }}
                className="gap-2"
              >
                Open Live Editor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">HackForge AI</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {steps.map((step, index) => (
                <span
                  key={step.id}
                  className={cn(
                    "text-sm font-medium transition-colors flex items-center gap-1",
                    index < currentStepIndex ? "text-primary" : index === currentStepIndex ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {index < currentStepIndex && <CheckCircle className="h-3.5 w-3.5" />}
                  {step.label}
                </span>
              ))}
            </div>
          </div>
          <div className="h-1 bg-muted" />
          <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}