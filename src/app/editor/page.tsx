"use client"

import * as React from "react"
import { 
  Layout, Layers, FileText, Code, Monitor, Smartphone, Tablet, 
  Save, Download, Eye, ChevronLeft, Plus, Trash2,
  ArrowUp, ArrowDown, X, Sparkles, Loader2, GraduationCap, Briefcase, 
  Award, Share2, FileDown, ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FileUpload } from "@/components/ui/file-upload"
import { cn, getAppPath } from "@/lib/utils"
import { 
  PortfolioData, SectionConfig, SectionType, 
  Project, Skill, Education, Experience, Certification, SocialLink,
  SKILL_CATEGORIES, SOCIAL_PLATFORMS, SkillCategory, SocialPlatform 
} from "@/types/portfolio"
import { THEMES } from "@/features/themes"
import JSZip from "jszip"
import { saveAs } from "file-saver"

const SECTION_TYPES: { type: SectionType; label: string; icon: React.ReactNode }[] = [
  { type: "hero", label: "Hero", icon: <Layout className="h-4 w-4" /> },
  { type: "about", label: "About", icon: <FileText className="h-4 w-4" /> },
  { type: "skills", label: "Skills", icon: <Code className="h-4 w-4" /> },
  { type: "projects", label: "Projects", icon: <Layers className="h-4 w-4" /> },
  { type: "experience", label: "Experience", icon: <Briefcase className="h-4 w-4" /> },
  { type: "education", label: "Education", icon: <GraduationCap className="h-4 w-4" /> },
  { type: "certifications", label: "Certifications", icon: <Award className="h-4 w-4" /> },
  { type: "contact", label: "Contact", icon: <Share2 className="h-4 w-4" /> },
  { type: "footer", label: "Footer", icon: <Layout className="h-4 w-4" /> },
]

type PreviewMode = "desktop" | "tablet" | "mobile"
type EditorTab = "content" | "projects" | "skills" | "education" | "experience" | "certifications" | "social" | "design" | "sections"

import { SectionRenderer, BANNER_PRESETS } from "@/components/portfolio/section-renderer"

const emptySubscribe = () => () => {}
const useIsMounted = () => React.useSyncExternalStore(emptySubscribe, () => true, () => false)

export default function EditorPage() {
  const isMounted = useIsMounted()
  const [portfolio, setPortfolio] = React.useState<PortfolioData | null>(null)
  const [activeTab, setActiveTab] = React.useState<EditorTab>("content")
  const [previewMode, setPreviewMode] = React.useState<PreviewMode>("desktop")
  const [mobileView, setMobileView] = React.useState<"edit" | "preview">("edit")
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [downloading, setDownloading] = React.useState(false)
  const [showPreview, setShowPreview] = React.useState(false)

  React.useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (typeof window !== "undefined") {
        const savedData = localStorage.getItem("portfolio-data")
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData) as PortfolioData
            setPortfolio(parsed)
          } catch {
            // ignore error
          }
        }
      }
    })
    return () => cancelAnimationFrame(frameId)
  }, [])

  const handleSave = () => {
    if (!portfolio) return
    setSaving(true)
    localStorage.setItem("portfolio-data", JSON.stringify({ ...portfolio, updatedAt: new Date().toISOString() }))
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 400)
  }

  // Auto-save changes to localStorage so preview and client pages stay perfectly in sync
  React.useEffect(() => {
    if (!portfolio) return
    const timer = setTimeout(() => {
      localStorage.setItem("portfolio-data", JSON.stringify(portfolio))
    }, 350)
    return () => clearTimeout(timer)
  }, [portfolio])

  const updatePortfolio = (updates: Partial<PortfolioData>) => {
    setPortfolio((prev) => {
      if (!prev) return null
      const updated = { ...prev, ...updates, updatedAt: new Date().toISOString() }

      // Auto-enable section when items are present
      if (updates.education && updates.education.length > 0) {
        updated.sections = updated.sections.map((s) => (s.type === "education" ? { ...s, enabled: true } : s))
      }
      if (updates.projects && updates.projects.length > 0) {
        updated.sections = updated.sections.map((s) => (s.type === "projects" ? { ...s, enabled: true } : s))
      }
      if (updates.certifications && updates.certifications.length > 0) {
        updated.sections = updated.sections.map((s) => (s.type === "certifications" ? { ...s, enabled: true } : s))
      }
      if (updates.experience && updates.experience.length > 0) {
        updated.sections = updated.sections.map((s) => (s.type === "experience" ? { ...s, enabled: true } : s))
      }
      if (updates.skills && updates.skills.length > 0) {
        updated.sections = updated.sections.map((s) => (s.type === "skills" ? { ...s, enabled: true } : s))
      }

      return updated
    })
  }

  const updateSection = (sectionId: string, updates: Partial<SectionConfig>) => {
    setPortfolio((prev) => {
      if (!prev) return null
      return {
        ...prev,
        sections: prev.sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s)),
        updatedAt: new Date().toISOString(),
      }
    })
  }

  const reorderSections = (fromIndex: number, toIndex: number) => {
    setPortfolio((prev) => {
      if (!prev) return null
      const newSections = [...prev.sections].sort((a, b) => a.order - b.order)
      const [removed] = newSections.splice(fromIndex, 1)
      newSections.splice(toIndex, 0, removed)
      return {
        ...prev,
        sections: newSections.map((s, i) => ({ ...s, order: i })),
        updatedAt: new Date().toISOString(),
      }
    })
  }

  const handleThemeChange = (themeId: string) => {
    const theme = THEMES.find((t) => t.id === themeId)
    if (theme) {
      updatePortfolio({ theme })
    }
  }

  const handleDownload = async () => {
    if (!portfolio) return
    setDownloading(true)
    try {
      const zip = new JSZip()
      const dataStr = JSON.stringify(portfolio, null, 2)
      zip.file("portfolio-data.json", dataStr)
      zip.file(
        "README.md",
        `# ${portfolio.profile.fullName}'s Portfolio\n\nGenerated with PortfolioForge AI.\n\nTheme: ${portfolio.theme.name}\nTitle: ${portfolio.profile.professionalTitle}`
      )
      const content = await zip.generateAsync({ type: "blob" })
      saveAs(content, `portfolio-${portfolio.profile.fullName.toLowerCase().replace(/\s+/g, "-")}.zip`)
    } catch (err) {
      console.error("Download failed:", err)
    } finally {
      setDownloading(false)
    }
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Loading Portfolio Editor...</p>
        </div>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md p-6">
          <h2 className="text-2xl font-bold">No Portfolio Data Found</h2>
          <p className="text-muted-foreground text-sm">
            Please complete the onboarding flow to set up your profile, projects, and theme.
          </p>
          <Button onClick={() => (window.location.href = getAppPath("/onboarding"))}>
            Go to Onboarding Flow
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 bg-background/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-full mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => (window.location.href = getAppPath("/onboarding"))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm shrink-0">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base md:text-lg">PortfolioForge</span>
                <Badge variant="secondary" className="text-[10px] sm:text-xs hidden xs:inline-flex">Editor</Badge>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="hidden md:flex items-center gap-1 bg-muted/60 rounded-lg p-1 border">
                {(["desktop", "tablet", "mobile"] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={previewMode === mode ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setPreviewMode(mode)}
                    className="h-7 w-7"
                    title={`View in ${mode} mode`}
                  >
                    {mode === "desktop" && <Monitor className="h-3.5 w-3.5" />}
                    {mode === "tablet" && <Tablet className="h-3.5 w-3.5" />}
                    {mode === "mobile" && <Smartphone className="h-3.5 w-3.5" />}
                  </Button>
                ))}
              </div>

              <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className="gap-1 h-8 text-xs px-2 sm:px-3">
                <Save className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{saving ? "Saving..." : saved ? "Saved ✓" : "Save"}</span>
              </Button>

              <Button variant="outline" size="sm" onClick={handleDownload} disabled={downloading} className="gap-1 h-8 text-xs px-2 sm:px-3">
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{downloading ? "Exporting..." : "Download"}</span>
              </Button>

              <Button variant="default" size="sm" onClick={() => setShowPreview(true)} className="gap-1 h-8 text-xs px-2.5 sm:px-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90">
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Screen Switcher: Edit Fields vs Live Preview */}
        <div className="flex md:hidden items-center justify-center p-1.5 bg-muted/40 border-t border-border/50 gap-1.5">
          <Button
            variant={mobileView === "edit" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMobileView("edit")}
            className="flex-1 h-8 text-xs font-semibold gap-1.5"
          >
            <Layout className="h-3.5 w-3.5" /> Edit Fields
          </Button>
          <Button
            variant={mobileView === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMobileView("preview")}
            className="flex-1 h-8 text-xs font-semibold gap-1.5"
          >
            <Eye className="h-3.5 w-3.5" /> Live Preview
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Editor Sidebar */}
        <aside
          className={cn(
            "w-full md:w-96 border-r border-border/50 bg-card/40 flex-col overflow-hidden shrink-0",
            mobileView === "edit" ? "flex" : "hidden md:flex"
          )}
        >
          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as EditorTab)} className="flex-1 flex flex-col overflow-hidden">
            <div className="p-2 border-b border-border/40 bg-muted/20 overflow-x-auto">
              <TabsList className="grid grid-cols-5 w-full h-auto p-1 gap-1 bg-transparent">
                <TabsTrigger value="content" className="text-xs py-1.5 px-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary" title="Profile">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-xs py-1.5 px-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary" title="Projects">
                  Projects ({portfolio.projects.length})
                </TabsTrigger>
                <TabsTrigger value="skills" className="text-xs py-1.5 px-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary" title="Skills">
                  Skills ({portfolio.skills.length})
                </TabsTrigger>
                <TabsTrigger value="education" className="text-xs py-1.5 px-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary" title="Education">
                  Edu ({portfolio.education.length})
                </TabsTrigger>
                <TabsTrigger value="experience" className="text-xs py-1.5 px-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary" title="Experience">
                  Exp ({portfolio.experience.length})
                </TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-4 w-full h-auto p-1 gap-1 bg-transparent mt-1">
                <TabsTrigger value="certifications" className="text-xs py-1.5 px-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary" title="Certificates">
                  Certs ({portfolio.certifications.length})
                </TabsTrigger>
                <TabsTrigger value="social" className="text-xs py-1.5 px-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary" title="Social Links">
                  Social ({portfolio.socialLinks.length})
                </TabsTrigger>
                <TabsTrigger value="design" className="text-xs py-1.5 px-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary" title="Design & Theme">
                  Theme
                </TabsTrigger>
                <TabsTrigger value="sections" className="text-xs py-1.5 px-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary" title="Sections">
                  Sections
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden p-4">
              <ScrollArea className="h-full pr-3">
                <TabsContent value="content" className="mt-0 space-y-4">
                  <ContentEditor portfolio={portfolio} onUpdate={updatePortfolio} />
                </TabsContent>

                <TabsContent value="projects" className="mt-0 space-y-4">
                  <ProjectsEditor
                    projects={portfolio.projects}
                    onUpdate={(projects) => updatePortfolio({ projects })}
                  />
                </TabsContent>

                <TabsContent value="skills" className="mt-0 space-y-4">
                  <SkillsEditor
                    skills={portfolio.skills}
                    onUpdate={(skills) => updatePortfolio({ skills })}
                  />
                </TabsContent>

                <TabsContent value="education" className="mt-0 space-y-4">
                  <EducationEditor
                    education={portfolio.education}
                    onUpdate={(education) => updatePortfolio({ education })}
                  />
                </TabsContent>

                <TabsContent value="experience" className="mt-0 space-y-4">
                  <ExperienceEditor
                    experience={portfolio.experience}
                    onUpdate={(experience) => updatePortfolio({ experience })}
                  />
                </TabsContent>

                <TabsContent value="certifications" className="mt-0 space-y-4">
                  <CertificationsEditor
                    certifications={portfolio.certifications}
                    onUpdate={(certifications) => updatePortfolio({ certifications })}
                  />
                </TabsContent>

                <TabsContent value="social" className="mt-0 space-y-4">
                  <SocialLinksEditor
                    socialLinks={portfolio.socialLinks}
                    onUpdate={(socialLinks) => updatePortfolio({ socialLinks })}
                  />
                </TabsContent>

                <TabsContent value="design" className="mt-0 space-y-4">
                  <DesignEditor portfolio={portfolio} onUpdate={updatePortfolio} onThemeChange={handleThemeChange} />
                </TabsContent>

                <TabsContent value="sections" className="mt-0 space-y-4">
                  <SectionsEditor sections={portfolio.sections} onUpdate={updateSection} onReorder={reorderSections} />
                </TabsContent>
              </ScrollArea>
            </div>
          </Tabs>
        </aside>

        {/* Live Preview Viewport */}
        <main
          className={cn(
            "flex-1 flex-col overflow-hidden bg-muted/20 relative w-full",
            mobileView === "preview" ? "flex" : "hidden md:flex"
          )}
        >
          <div className="p-2 border-b bg-muted/40 text-xs text-muted-foreground flex items-center justify-between px-3 sm:px-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">Live Preview &bull; Changes update in real-time</span>
              <span className="sm:hidden">Live Preview</span>
            </span>
            <span className="font-mono text-[11px] sm:text-xs">{previewMode.toUpperCase()}</span>
          </div>

          <div className="flex-1 overflow-auto p-2 sm:p-4 flex justify-center items-start">
            <div
              className={cn(
                "transition-all duration-300 shadow-2xl rounded-xl overflow-hidden border border-border/60 max-w-full",
                previewMode === "desktop" && "w-full min-h-full",
                previewMode === "tablet" && "w-[768px] min-h-[900px]",
                previewMode === "mobile" && "w-full max-w-[390px] min-h-[700px]"
              )}
              style={{
                background: portfolio.theme.tokens.colors.background,
                color: portfolio.theme.tokens.colors.text,
              }}
            >
              <PortfolioPreview portfolio={portfolio} />
            </div>
          </div>
        </main>
      </div>

      {showPreview && (
        <PreviewModal portfolio={portfolio} onClose={() => setShowPreview(false)} />
      )}
    </div>
  )
}

/* =========================================================================
   SUB-EDITORS
   ========================================================================= */

function ContentEditor({ portfolio, onUpdate }: { portfolio: PortfolioData; onUpdate: (updates: Partial<PortfolioData>) => void }) {
  const profile = portfolio.profile

  const updateProfile = (updates: Partial<typeof profile>) => {
    onUpdate({ profile: { ...profile, ...updates } })
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold text-sm">Personal & Contact Info</h3>
        <p className="text-xs text-muted-foreground">Basic information displayed on your hero and contact sections.</p>
      </div>

      <div className="space-y-3">
        <Input
          label="Full Name"
          value={profile.fullName || ""}
          onChange={(e) => updateProfile({ fullName: e.target.value })}
        />
        <Input
          label="Professional Headline / Title"
          value={profile.professionalTitle || ""}
          placeholder="e.g. B.Tech CSE Student | Full Stack Developer"
          onChange={(e) => updateProfile({ professionalTitle: e.target.value })}
        />
        <Input
          label="Location"
          value={profile.location || ""}
          placeholder="e.g. Delhi, India"
          onChange={(e) => updateProfile({ location: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={profile.email || ""}
          onChange={(e) => updateProfile({ email: e.target.value })}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Cover Banner</h3>
          <span className="text-[11px] text-muted-foreground">Every portfolio header banner</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Pick a stylish preset or upload your own high-resolution cover banner.
        </p>

        {/* Preset Thumbnails */}
        <div className="grid grid-cols-3 gap-2">
          {BANNER_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => updateProfile({ coverBanner: preset.url })}
              className={cn(
                "relative rounded-lg overflow-hidden border text-left p-1 text-[10px] font-medium transition-all group",
                profile.coverBanner === preset.url ? "ring-2 ring-primary border-primary" : "hover:border-primary/60"
              )}
            >
              <div className="w-full h-10 rounded bg-muted overflow-hidden mb-1">
                <img src={preset.url} alt={preset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <span className="truncate block">{preset.name}</span>
            </button>
          ))}
        </div>

        <FileUpload
          type="image"
          label="Or Upload Custom Banner (PNG, JPG, WebP)"
          value={profile.coverBanner || ""}
          onChange={(dataUrl) => updateProfile({ coverBanner: dataUrl })}
          onClear={() => updateProfile({ coverBanner: "" })}
          placeholder="Upload custom cover banner"
        />
        <Input
          label="Or Banner Image URL"
          placeholder="https://..."
          value={profile.coverBanner || ""}
          onChange={(e) => updateProfile({ coverBanner: e.target.value })}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Profile Photo & Status</h3>
        <FileUpload
          type="image"
          label="Upload Photo (PNG, JPG, WebP)"
          value={profile.profilePhoto || ""}
          onChange={(dataUrl) => updateProfile({ profilePhoto: dataUrl })}
          onClear={() => updateProfile({ profilePhoto: "" })}
          placeholder="Upload your profile photo"
        />
        <Input
          label="Or Photo URL"
          placeholder="https://..."
          value={profile.profilePhoto || ""}
          onChange={(e) => updateProfile({ profilePhoto: e.target.value })}
        />
        <Input
          label="Status Message (Appears on Banner)"
          placeholder="e.g. Open to Opportunities / Available for Hire"
          value={profile.statusMessage || ""}
          onChange={(e) => updateProfile({ statusMessage: e.target.value })}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Resume / CV (.PDF)</h3>
        <p className="text-xs text-muted-foreground">Upload your resume PDF so recruiters can download or view it.</p>
        <FileUpload
          type="pdf"
          label="Upload Resume PDF (.pdf)"
          value={profile.resumeUrl || ""}
          onChange={(dataUrl) => updateProfile({ resumeUrl: dataUrl })}
          onClear={() => updateProfile({ resumeUrl: "" })}
          placeholder="Click or drag & drop Resume PDF"
          hint="PDF documents up to 15MB"
        />
        <Input
          label="Or Resume Link (Google Drive / URL)"
          placeholder="https://drive.google.com/..."
          value={profile.resumeUrl || ""}
          onChange={(e) => updateProfile({ resumeUrl: e.target.value })}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Headline & Bio</h3>
        <Input
          label="Catchy Headline"
          value={portfolio.headline || ""}
          onChange={(e) => onUpdate({ headline: e.target.value })}
        />
        <Textarea
          label="About Section (Detailed)"
          value={portfolio.about || ""}
          onChange={(e) => onUpdate({ about: e.target.value })}
          rows={5}
        />
        <Textarea
          label="Short Bio"
          value={profile.shortBio || ""}
          onChange={(e) => updateProfile({ shortBio: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  )
}

function ProjectsEditor({
  projects,
  onUpdate,
}: {
  projects: Project[]
  onUpdate: (projects: Project[]) => void
}) {
  const [editingId, setEditingId] = React.useState<string | null>(null)

  const handleAdd = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: "New Project",
      shortDescription: "A modern web application built with clean architecture.",
      detailedDescription: "",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com",
      liveDemoUrl: "",
      image: "",
      role: "Developer",
      featured: false,
      source: "manual",
    }
    const updated = [newProject, ...projects]
    onUpdate(updated)
    setEditingId(newProject.id)
  }

  const handleUpdate = (id: string, updates: Partial<Project>) => {
    onUpdate(projects.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const handleDelete = (id: string) => {
    onUpdate(projects.filter((p) => p.id !== id))
    if (editingId === id) setEditingId(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm">Projects ({projects.length})</h3>
          <p className="text-xs text-muted-foreground">Add college projects, capstones, or client work.</p>
        </div>
        <Button size="sm" onClick={handleAdd} className="gap-1 h-8">
          <Plus className="h-3.5 w-3.5" /> Add Project
        </Button>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-8 px-4 border-2 border-dashed rounded-lg space-y-2">
          <p className="text-sm text-muted-foreground">No projects added yet.</p>
          <Button size="sm" variant="outline" onClick={handleAdd}>
            Create your first project
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((project) => {
          const isEditing = editingId === project.id

          if (isEditing) {
            return (
              <Card key={project.id} className="p-4 border-primary/50 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h4 className="font-semibold text-sm">Editing Project</h4>
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(null)} className="h-7 px-2 text-xs">
                    Done
                  </Button>
                </div>

                <Input
                  label="Project Title"
                  value={project.name}
                  onChange={(e) => handleUpdate(project.id, { name: e.target.value })}
                />

                <Input
                  label="Short Description"
                  value={project.shortDescription}
                  onChange={(e) => handleUpdate(project.id, { shortDescription: e.target.value })}
                />

                <Textarea
                  label="Detailed Description"
                  value={project.detailedDescription}
                  onChange={(e) => handleUpdate(project.id, { detailedDescription: e.target.value })}
                  rows={3}
                />

                <Input
                  label="Technologies (comma-separated)"
                  value={project.technologies.join(", ")}
                  placeholder="React, Next.js, Node.js, MongoDB"
                  onChange={(e) => {
                    const techs = e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                    handleUpdate(project.id, { technologies: techs })
                  }}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Screenshot</label>
                  <FileUpload
                    type="image"
                    value={project.image}
                    onChange={(url) => handleUpdate(project.id, { image: url })}
                    onClear={() => handleUpdate(project.id, { image: "" })}
                    placeholder="Upload project screenshot (JPG, PNG)"
                  />
                  <Input
                    placeholder="Or enter image URL"
                    value={project.image}
                    onChange={(e) => handleUpdate(project.id, { image: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="GitHub URL"
                    value={project.githubUrl}
                    onChange={(e) => handleUpdate(project.id, { githubUrl: e.target.value })}
                  />
                  <Input
                    label="Live Demo URL"
                    value={project.liveDemoUrl}
                    onChange={(e) => handleUpdate(project.id, { liveDemoUrl: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={project.featured}
                      onCheckedChange={(checked) => handleUpdate(project.id, { featured: checked })}
                    />
                    <span className="text-xs">Featured Project</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)} className="text-destructive h-8 px-2">
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                    </Button>
                    <Button size="sm" onClick={() => setEditingId(null)} className="h-8">
                      Done
                    </Button>
                  </div>
                </div>
              </Card>
            )
          }

          return (
            <Card key={project.id} className="p-3 hover:border-primary/40 transition-all flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm truncate">{project.name}</span>
                  {project.featured && <Badge variant="default" className="text-[10px] px-1.5 py-0">Featured</Badge>}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-[10px] px-1.5 py-0">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] text-muted-foreground">+{project.technologies.length - 4}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button variant="outline" size="sm" onClick={() => setEditingId(project.id)} className="h-7 px-2 text-xs">
                  Edit
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="h-7 w-7 text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function SkillsEditor({
  skills,
  onUpdate,
}: {
  skills: Skill[]
  onUpdate: (skills: Skill[]) => void
}) {
  const [name, setName] = React.useState("")
  const [category, setCategory] = React.useState<SkillCategory>("frontend")
  const [level, setLevel] = React.useState<Skill["level"]>("advanced")
  const [filterCategory, setFilterCategory] = React.useState<string>("all")

  const handleAdd = () => {
    if (!name.trim()) return
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: name.trim(),
      category,
      level,
    }
    onUpdate([...skills, newSkill])
    setName("")
  }

  const handleDelete = (id: string) => {
    onUpdate(skills.filter((s) => s.id !== id))
  }

  const filteredSkills = filterCategory === "all" ? skills : skills.filter((s) => s.category === filterCategory)

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-sm">Skills ({skills.length})</h3>
        <p className="text-xs text-muted-foreground">Manage your technical and domain skills.</p>
      </div>

      {/* Add Skill Form */}
      <Card className="p-3 space-y-3 bg-muted/20 border-dashed">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Add New Skill</h4>
        <div className="space-y-2">
          <Input
            placeholder="e.g. Next.js, Python, Docker"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <div className="grid grid-cols-2 gap-2">
            <Select value={category} onValueChange={(val) => setCategory(val as SkillCategory)}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {SKILL_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="text-xs">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={level} onValueChange={(val) => setLevel(val as Skill["level"])}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner" className="text-xs">Beginner</SelectItem>
                <SelectItem value="intermediate" className="text-xs">Intermediate</SelectItem>
                <SelectItem value="advanced" className="text-xs">Advanced</SelectItem>
                <SelectItem value="expert" className="text-xs">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="sm" onClick={handleAdd} disabled={!name.trim()} className="w-full h-8 text-xs gap-1">
            <Plus className="h-3.5 w-3.5" /> Add Skill
          </Button>
        </div>
      </Card>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Filter:</span>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="h-7 text-xs flex-1">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All Categories ({skills.length})</SelectItem>
            {SKILL_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value} className="text-xs">
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Skills list */}
      <div className="flex flex-wrap gap-1.5 pt-2">
        {filteredSkills.map((skill) => (
          <Badge
            key={skill.id}
            variant="secondary"
            className="flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 text-xs bg-muted/60 hover:bg-muted"
          >
            <span>{skill.name}</span>
            {skill.level && (
              <span className="text-[10px] text-muted-foreground">({skill.level})</span>
            )}
            <button
              onClick={() => handleDelete(skill.id)}
              className="hover:text-destructive p-0.5 rounded-full"
              title="Delete skill"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        {filteredSkills.length === 0 && (
          <p className="text-xs text-muted-foreground py-4 text-center w-full">No skills found in this category.</p>
        )}
      </div>
    </div>
  )
}

function EducationEditor({
  education,
  onUpdate,
}: {
  education: Education[]
  onUpdate: (education: Education[]) => void
}) {
  const [editingId, setEditingId] = React.useState<string | null>(null)

  const handleAdd = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: "State University / College",
      degree: "B.Tech / Bachelor of Technology",
      fieldOfStudy: "Computer Science & Engineering",
      startDate: "2022",
      endDate: "2026",
      grade: "8.5 CGPA",
      description: "Core subjects: Data Structures, Algorithms, Operating Systems, DBMS, Computer Networks.",
    }
    const updated = [newEdu, ...education]
    onUpdate(updated)
    setEditingId(newEdu.id)
  }

  const handleUpdate = (id: string, updates: Partial<Education>) => {
    onUpdate(education.map((e) => (e.id === id ? { ...e, ...updates } : e)))
  }

  const handleDelete = (id: string) => {
    onUpdate(education.filter((e) => e.id !== id))
    if (editingId === id) setEditingId(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm">Education ({education.length})</h3>
          <p className="text-xs text-muted-foreground">Degrees, diplomas, and academic background.</p>
        </div>
        <Button size="sm" onClick={handleAdd} className="gap-1 h-8">
          <Plus className="h-3.5 w-3.5" /> Add Education
        </Button>
      </div>

      {education.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed rounded-lg space-y-2">
          <p className="text-xs text-muted-foreground">No education entries added yet.</p>
          <Button size="sm" variant="outline" onClick={handleAdd}>Add Degree / College</Button>
        </div>
      )}

      <div className="space-y-3">
        {education.map((edu) => {
          const isEditing = editingId === edu.id

          if (isEditing) {
            return (
              <Card key={edu.id} className="p-4 border-primary/50 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h4 className="font-semibold text-sm">Editing Education</h4>
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(null)} className="h-7 px-2 text-xs">Done</Button>
                </div>

                <Input
                  label="Institution / University"
                  placeholder="e.g. Indian Institute of Technology / Delhi University"
                  value={edu.institution}
                  onChange={(e) => handleUpdate(edu.id, { institution: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Degree"
                    placeholder="e.g. B.Tech / B.Sc / BCA"
                    value={edu.degree}
                    onChange={(e) => handleUpdate(edu.id, { degree: e.target.value })}
                  />
                  <Input
                    label="Branch / Major"
                    placeholder="e.g. Computer Science"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleUpdate(edu.id, { fieldOfStudy: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Input
                    label="Start Year"
                    placeholder="2022"
                    value={edu.startDate}
                    onChange={(e) => handleUpdate(edu.id, { startDate: e.target.value })}
                  />
                  <Input
                    label="End Year"
                    placeholder="2026"
                    value={edu.endDate}
                    onChange={(e) => handleUpdate(edu.id, { endDate: e.target.value })}
                  />
                  <Input
                    label="CGPA / %"
                    placeholder="8.8 CGPA"
                    value={edu.grade}
                    onChange={(e) => handleUpdate(edu.id, { grade: e.target.value })}
                  />
                </div>

                <Textarea
                  label="Highlights / Relevant Coursework"
                  placeholder="Algorithms, Systems, Key projects..."
                  value={edu.description}
                  onChange={(e) => handleUpdate(edu.id, { description: e.target.value })}
                  rows={2}
                />

                <div className="flex justify-between pt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(edu.id)} className="text-destructive h-8 px-2">
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                  </Button>
                  <Button size="sm" onClick={() => setEditingId(null)} className="h-8">Done</Button>
                </div>
              </Card>
            )
          }

          return (
            <Card key={edu.id} className="p-3 hover:border-primary/40 transition-all flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-semibold text-sm truncate">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}</h4>
                <p className="text-xs font-medium text-muted-foreground">{edu.institution}</p>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                  {edu.grade && <span className="font-semibold text-primary">&bull; {edu.grade}</span>}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button variant="outline" size="sm" onClick={() => setEditingId(edu.id)} className="h-7 px-2 text-xs">Edit</Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(edu.id)} className="h-7 w-7 text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function ExperienceEditor({
  experience,
  onUpdate,
}: {
  experience: Experience[]
  onUpdate: (experience: Experience[]) => void
}) {
  const [editingId, setEditingId] = React.useState<string | null>(null)

  const handleAdd = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      jobTitle: "Software Engineer Intern",
      company: "Tech Company / Startup",
      location: "Remote / On-site",
      startDate: "2024-06",
      endDate: "2024-09",
      currentlyWorking: false,
      description: "Developed modern web features and optimized API performance.",
      achievements: ["Improved page load speed by 25%", "Built automated testing pipeline"],
      technologies: ["React", "Node.js", "TypeScript"],
    }
    const updated = [newExp, ...experience]
    onUpdate(updated)
    setEditingId(newExp.id)
  }

  const handleUpdate = (id: string, updates: Partial<Experience>) => {
    onUpdate(experience.map((e) => (e.id === id ? { ...e, ...updates } : e)))
  }

  const handleDelete = (id: string) => {
    onUpdate(experience.filter((e) => e.id !== id))
    if (editingId === id) setEditingId(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm">Experience ({experience.length})</h3>
          <p className="text-xs text-muted-foreground">Internships, research, or full-time roles.</p>
        </div>
        <Button size="sm" onClick={handleAdd} className="gap-1 h-8">
          <Plus className="h-3.5 w-3.5" /> Add Experience
        </Button>
      </div>

      {experience.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed rounded-lg space-y-2">
          <p className="text-xs text-muted-foreground">No experience listed (Optional for freshers & students).</p>
          <Button size="sm" variant="outline" onClick={handleAdd}>Add Role / Internship</Button>
        </div>
      )}

      <div className="space-y-3">
        {experience.map((exp) => {
          const isEditing = editingId === exp.id

          if (isEditing) {
            return (
              <Card key={exp.id} className="p-4 border-primary/50 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h4 className="font-semibold text-sm">Editing Experience</h4>
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(null)} className="h-7 px-2 text-xs">Done</Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) => handleUpdate(exp.id, { jobTitle: e.target.value })}
                  />
                  <Input
                    label="Company / Organization"
                    value={exp.company}
                    onChange={(e) => handleUpdate(exp.id, { company: e.target.value })}
                  />
                </div>

                <Input
                  label="Location"
                  value={exp.location}
                  placeholder="e.g. Remote, Bangalore, San Francisco"
                  onChange={(e) => handleUpdate(exp.id, { location: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Start Date"
                    placeholder="YYYY-MM"
                    value={exp.startDate}
                    onChange={(e) => handleUpdate(exp.id, { startDate: e.target.value })}
                  />
                  <Input
                    label="End Date"
                    placeholder="YYYY-MM (or leave blank if present)"
                    disabled={exp.currentlyWorking}
                    value={exp.currentlyWorking ? "Present" : exp.endDate}
                    onChange={(e) => handleUpdate(exp.id, { endDate: e.target.value })}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={exp.currentlyWorking}
                    onCheckedChange={(checked) => handleUpdate(exp.id, { currentlyWorking: checked })}
                  />
                  <span className="text-xs">Currently working here</span>
                </div>

                <Textarea
                  label="Description & Impact"
                  value={exp.description}
                  onChange={(e) => handleUpdate(exp.id, { description: e.target.value })}
                  rows={3}
                />

                <Input
                  label="Technologies (comma-separated)"
                  value={exp.technologies.join(", ")}
                  onChange={(e) => {
                    const techs = e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                    handleUpdate(exp.id, { technologies: techs })
                  }}
                />

                <div className="flex justify-between pt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(exp.id)} className="text-destructive h-8 px-2">
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                  </Button>
                  <Button size="sm" onClick={() => setEditingId(null)} className="h-8">Done</Button>
                </div>
              </Card>
            )
          }

          return (
            <Card key={exp.id} className="p-3 hover:border-primary/40 transition-all flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-sm truncate">{exp.jobTitle}</h4>
                  <span className="text-xs text-muted-foreground">at {exp.company}</span>
                  {exp.currentlyWorking && <Badge variant="secondary" className="text-[10px] px-1 py-0">Current</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{exp.location} &bull; {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button variant="outline" size="sm" onClick={() => setEditingId(exp.id)} className="h-7 px-2 text-xs">Edit</Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)} className="h-7 w-7 text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function CertificationsEditor({
  certifications,
  onUpdate,
}: {
  certifications: Certification[]
  onUpdate: (certifications: Certification[]) => void
}) {
  const [editingId, setEditingId] = React.useState<string | null>(null)

  const handleAdd = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: "AWS Certified Cloud Practitioner",
      issuingOrganization: "Amazon Web Services",
      date: new Date().toISOString().slice(0, 7),
      credentialUrl: "https://aws.amazon.com",
    }
    const updated = [newCert, ...certifications]
    onUpdate(updated)
    setEditingId(newCert.id)
  }

  const handleUpdate = (id: string, updates: Partial<Certification>) => {
    onUpdate(certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const handleDelete = (id: string) => {
    onUpdate(certifications.filter((c) => c.id !== id))
    if (editingId === id) setEditingId(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm">Certifications ({certifications.length})</h3>
          <p className="text-xs text-muted-foreground">Credentials, online courses, and awards.</p>
        </div>
        <Button size="sm" onClick={handleAdd} className="gap-1 h-8">
          <Plus className="h-3.5 w-3.5" /> Add Certificate
        </Button>
      </div>

      {certifications.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed rounded-lg space-y-2">
          <p className="text-xs text-muted-foreground">No certifications added yet.</p>
          <Button size="sm" variant="outline" onClick={handleAdd}>Add Certificate</Button>
        </div>
      )}

      <div className="space-y-3">
        {certifications.map((cert) => {
          const isEditing = editingId === cert.id

          if (isEditing) {
            return (
              <Card key={cert.id} className="p-4 border-primary/50 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h4 className="font-semibold text-sm">Editing Certificate</h4>
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(null)} className="h-7 px-2 text-xs">Done</Button>
                </div>

                <Input
                  label="Certification Name"
                  value={cert.name}
                  onChange={(e) => handleUpdate(cert.id, { name: e.target.value })}
                />

                <Input
                  label="Issuing Organization"
                  placeholder="e.g. Coursera, AWS, Meta, Google"
                  value={cert.issuingOrganization}
                  onChange={(e) => handleUpdate(cert.id, { issuingOrganization: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Issue Date (YYYY-MM)"
                    value={cert.date}
                    onChange={(e) => handleUpdate(cert.id, { date: e.target.value })}
                  />
                  <Input
                    label="Credential URL"
                    value={cert.credentialUrl}
                    onChange={(e) => handleUpdate(cert.id, { credentialUrl: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium">Or Upload Certificate File / PDF</label>
                  <FileUpload
                    type="any"
                    value={cert.credentialUrl.startsWith("data:") ? cert.credentialUrl : ""}
                    onChange={(url) => handleUpdate(cert.id, { credentialUrl: url })}
                    onClear={() => handleUpdate(cert.id, { credentialUrl: "" })}
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(cert.id)} className="text-destructive h-8 px-2">
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                  </Button>
                  <Button size="sm" onClick={() => setEditingId(null)} className="h-8">Done</Button>
                </div>
              </Card>
            )
          }

          return (
            <Card key={cert.id} className="p-3 hover:border-primary/40 transition-all flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-semibold text-sm truncate">{cert.name}</h4>
                <p className="text-xs text-muted-foreground">{cert.issuingOrganization} &bull; {cert.date}</p>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary hover:underline inline-flex items-center gap-1">
                    Credential Link <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button variant="outline" size="sm" onClick={() => setEditingId(cert.id)} className="h-7 px-2 text-xs">Edit</Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(cert.id)} className="h-7 w-7 text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function SocialLinksEditor({
  socialLinks,
  onUpdate,
}: {
  socialLinks: SocialLink[]
  onUpdate: (socialLinks: SocialLink[]) => void
}) {
  const [platform, setPlatform] = React.useState<SocialPlatform>("github")
  const [username, setUsername] = React.useState("")
  const [url, setUrl] = React.useState("")

  const handleAdd = () => {
    if (!username.trim() && !url.trim()) return
    const platformInfo = SOCIAL_PLATFORMS.find((p) => p.value === platform)
    const finalUrl = url.trim() || (platformInfo?.baseUrl ? `${platformInfo.baseUrl}${username.trim()}` : `https://${username.trim()}`)

    const newLink: SocialLink = {
      id: `social-${Date.now()}`,
      platform,
      username: username.trim() || platform,
      url: finalUrl,
    }
    onUpdate([...socialLinks, newLink])
    setUsername("")
    setUrl("")
  }

  const handleDelete = (id: string) => {
    onUpdate(socialLinks.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-sm">Social & Coding Profiles ({socialLinks.length})</h3>
        <p className="text-xs text-muted-foreground">GitHub, LinkedIn, LeetCode, Codeforces, Twitter, etc.</p>
      </div>

      <Card className="p-3 space-y-3 bg-muted/20 border-dashed">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Add Social Profile</h4>
        <div className="space-y-2">
          <Select value={platform} onValueChange={(val) => setPlatform(val as SocialPlatform)}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              {SOCIAL_PLATFORMS.map((p) => (
                <SelectItem key={p.value} value={p.value} className="text-xs">
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Username (e.g. rahul-sharma)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="Or Direct Profile URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button size="sm" onClick={handleAdd} disabled={!username.trim() && !url.trim()} className="w-full h-8 text-xs gap-1">
            <Plus className="h-3.5 w-3.5" /> Add Social Link
          </Button>
        </div>
      </Card>

      <div className="space-y-2">
        {socialLinks.map((link) => (
          <div key={link.id} className="flex items-center justify-between p-2.5 rounded-lg border bg-card/60 gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Badge variant="outline" className="text-[10px] capitalize">{link.platform}</Badge>
                <span className="text-xs font-medium truncate">{link.username}</span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">{link.url}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(link.id)} className="h-7 w-7 text-destructive shrink-0">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}

        {socialLinks.length === 0 && (
          <p className="text-xs text-muted-foreground py-4 text-center">No social profiles added yet.</p>
        )}
      </div>
    </div>
  )
}

function DesignEditor({
  portfolio,
  onUpdate,
  onThemeChange,
}: {
  portfolio: PortfolioData
  onUpdate: (updates: Partial<PortfolioData>) => void
  onThemeChange: (themeId: string) => void
}) {
  const tokens = portfolio.theme.tokens

  const handleFontFamilyChange = (fontValue: string, isDisplay: boolean) => {
    onUpdate({
      theme: {
        ...portfolio.theme,
        tokens: {
          ...tokens,
          typography: {
            ...tokens.typography,
            fontFamily: {
              ...tokens.typography.fontFamily,
              [isDisplay ? "display" : "sans"]: fontValue,
            },
          },
        },
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Theme Selection</h3>
        <Select value={portfolio.theme.id} onValueChange={onThemeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {THEMES.map((theme) => (
              <SelectItem key={theme.id} value={theme.id}>
                {theme.name} &bull; <span className="text-xs text-muted-foreground">{theme.description}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Color Palette</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <ColorPicker
            label="Primary"
            value={tokens.colors.primary}
            onChange={(val) =>
              onUpdate({
                theme: {
                  ...portfolio.theme,
                  tokens: { ...tokens, colors: { ...tokens.colors, primary: val } },
                },
              })
            }
          />
          <ColorPicker
            label="Secondary"
            value={tokens.colors.secondary}
            onChange={(val) =>
              onUpdate({
                theme: {
                  ...portfolio.theme,
                  tokens: { ...tokens, colors: { ...tokens.colors, secondary: val } },
                },
              })
            }
          />
          <ColorPicker
            label="Accent"
            value={tokens.colors.accent}
            onChange={(val) =>
              onUpdate({
                theme: {
                  ...portfolio.theme,
                  tokens: { ...tokens, colors: { ...tokens.colors, accent: val } },
                },
              })
            }
          />
          <ColorPicker
            label="Background"
            value={tokens.colors.background}
            onChange={(val) =>
              onUpdate({
                theme: {
                  ...portfolio.theme,
                  tokens: { ...tokens, colors: { ...tokens.colors, background: val } },
                },
              })
            }
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Typography Fonts</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Body Font</label>
            <Select
              value={tokens.typography.fontFamily.sans}
              onValueChange={(val) => handleFontFamilyChange(val, false)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="'Inter', system-ui, sans-serif">Inter</SelectItem>
                <SelectItem value="'Space Grotesk', system-ui, sans-serif">Space Grotesk</SelectItem>
                <SelectItem value="'Plus Jakarta Sans', system-ui, sans-serif">Plus Jakarta Sans</SelectItem>
                <SelectItem value="'Outfit', system-ui, sans-serif">Outfit</SelectItem>
                <SelectItem value="'Geist', system-ui, sans-serif">Geist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Display Font (Headings)</label>
            <Select
              value={tokens.typography.fontFamily.display}
              onValueChange={(val) => handleFontFamilyChange(val, true)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select display font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="'Space Grotesk', system-ui, sans-serif">Space Grotesk</SelectItem>
                <SelectItem value="'Orbitron', 'Space Grotesk', sans-serif">Orbitron (Cyber / Tech)</SelectItem>
                <SelectItem value="'Cal Sans', 'Inter', sans-serif">Cal Sans</SelectItem>
                <SelectItem value="'Inter', system-ui, sans-serif">Inter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-foreground">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-border bg-transparent cursor-pointer shrink-0"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 font-mono text-xs"
        />
      </div>
    </div>
  )
}

function SectionsEditor({
  sections,
  onUpdate,
  onReorder,
}: {
  sections: SectionConfig[]
  onUpdate: (id: string, updates: Partial<SectionConfig>) => void
  onReorder: (from: number, to: number) => void
}) {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-sm">Section Visibility & Order</h3>
        <p className="text-xs text-muted-foreground">Toggle sections on/off or reorder them up and down.</p>
      </div>

      <div className="space-y-2">
        {sortedSections.map((section, index) => {
          const sectionInfo = SECTION_TYPES.find((s) => s.type === section.type)
          return (
            <Card key={section.id} className="flex items-center gap-2 p-2.5" style={{ opacity: section.enabled ? 1 : 0.45 }}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs text-muted-foreground font-mono w-4">{index + 1}.</span>
                {sectionInfo?.icon}
                <span className="font-medium text-xs truncate">{sectionInfo?.label || section.type}</span>
              </div>
              <Switch
                checked={section.enabled}
                onCheckedChange={(checked) => onUpdate(section.id, { enabled: checked })}
              />
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => index > 0 && onReorder(index, index - 1)}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => index < sortedSections.length - 1 && onReorder(index, index + 1)}
                  disabled={index === sortedSections.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

/* =========================================================================
   LIVE PREVIEW RENDERER
   ========================================================================= */

function PortfolioPreview({ portfolio }: { portfolio: PortfolioData }) {
  const sortedSections = [...(portfolio.sections || [])]
    .map((s) => {
      if (s.type === "certifications" && portfolio.certifications?.length) return { ...s, enabled: true }
      if (s.type === "education" && portfolio.education?.length) return { ...s, enabled: true }
      if (s.type === "projects" && portfolio.projects?.length) return { ...s, enabled: true }
      if (s.type === "experience" && portfolio.experience?.length) return { ...s, enabled: true }
      return s
    })
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen" style={{ fontFamily: portfolio.theme.tokens.typography.fontFamily.sans }}>
      {sortedSections.map((section) => (
        <SectionRenderer key={section.id} section={section} portfolio={portfolio} />
      ))}
    </div>
  )
}

function PreviewModal({ portfolio, onClose }: { portfolio: PortfolioData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div
        className="w-full h-[92vh] max-w-5xl bg-background rounded-2xl overflow-hidden flex flex-col shadow-2xl border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-2">
            <span className="font-bold">Portfolio Live Full Preview</span>
            <Badge variant="outline">{portfolio.theme.name}</Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div
          className="flex-1 overflow-auto p-6"
          style={{
            background: portfolio.theme.tokens.colors.background,
            color: portfolio.theme.tokens.colors.text,
          }}
        >
          <PortfolioPreview portfolio={portfolio} />
        </div>
      </div>
    </div>
  )
}