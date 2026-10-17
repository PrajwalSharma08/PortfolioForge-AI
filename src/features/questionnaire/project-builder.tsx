"use client"

import * as React from "react"
import { Plus, X, Edit, Copy, Trash2, GripVertical, ExternalLink, GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FileUpload } from "@/components/ui/file-upload"
import { Project } from "@/types/portfolio"

interface ProjectBuilderProps {
  value: Project[]
  onChange: (projects: Project[]) => void
  disabled?: boolean
}

export function ProjectBuilder({ value, onChange, disabled }: ProjectBuilderProps) {
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState<Partial<Project>>({
    name: "",
    shortDescription: "",
    detailedDescription: "",
    technologies: [],
    githubUrl: "",
    liveDemoUrl: "",
    image: "",
    role: "",
    featured: false,
  })
  const [techInput, setTechInput] = React.useState("")

  const resetForm = () => {
    setFormData({
      name: "",
      shortDescription: "",
      detailedDescription: "",
      technologies: [],
      githubUrl: "",
      liveDemoUrl: "",
      image: "",
      role: "",
      featured: false,
    })
    setTechInput("")
  }

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies?.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()],
      }))
      setTechInput("")
    }
  }

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies?.filter((t) => t !== tech) || [],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    if (editingId) {
      onChange(
        value.map((p) =>
          p.id === editingId ? { ...p, ...formData, id: editingId } : p
        )
      )
    } else {
      const newProject: Project = {
        id: `project-${Date.now()}`,
        name: formData.name,
        shortDescription: formData.shortDescription || "",
        detailedDescription: formData.detailedDescription || "",
        technologies: formData.technologies || [],
        githubUrl: formData.githubUrl || "",
        liveDemoUrl: formData.liveDemoUrl || "",
        image: formData.image || "",
        role: formData.role || "",
        featured: formData.featured || false,
        source: "manual",
      }
      onChange([...value, newProject])
    }
    setEditingId(null)
    resetForm()
  }

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setFormData(project)
    setTechInput("")
  }

  const handleDelete = (id: string) => {
    onChange(value.filter((p) => p.id !== id))
    if (editingId === id) {
      setEditingId(null)
      resetForm()
    }
  }

  const handleDuplicate = (project: Project) => {
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
      name: `${project.name} (Copy)`,
    }
    onChange([...value, newProject])
  }

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newProjects = [...value]
    const [removed] = newProjects.splice(fromIndex, 1)
    newProjects.splice(toIndex, 0, removed)
    onChange(newProjects)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Projects ({value.length})</h4>
        <Button
          size="sm"
          variant={editingId ? "secondary" : "default"}
          onClick={() => {
            if (editingId) {
              setEditingId(null)
              resetForm()
            } else {
              setEditingId("new")
              resetForm()
            }
          }}
          disabled={disabled}
        >
          <Plus className="h-4 w-4 mr-1" />
          {editingId ? "Cancel" : "Add Project"}
        </Button>
      </div>

      {editingId && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>{editingId === "new" ? "Add Project" : "Edit Project"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Project Name"
                  placeholder="My Awesome Project"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={disabled}
                />
                <Input
                  label="Role"
                  placeholder="Full Stack Developer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  disabled={disabled}
                />
              </div>
              <Input
                label="Short Description"
                placeholder="A brief one-liner for project cards"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                disabled={disabled}
              />
              <Textarea
                label="Detailed Description"
                placeholder="Detailed description for project page..."
                value={formData.detailedDescription}
                onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                disabled={disabled}
                rows={3}
              />
              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex gap-2 flex-wrap">
                  <Input
                    placeholder="Add technology (press Enter)"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                    disabled={disabled}
                    className="flex-1 min-w-[200px]"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={handleAddTech} disabled={disabled || !techInput.trim()}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {formData.technologies?.map((tech) => (
                    <Badge key={tech} variant="secondary" className="gap-1">
                      {tech}
                      <Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={() => handleRemoveTech(tech)} disabled={disabled}>
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="GitHub URL"
                  placeholder="https://github.com/user/repo"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  disabled={disabled}
                />
                <Input
                  label="Live Demo URL"
                  placeholder="https://myproject.com"
                  value={formData.liveDemoUrl}
                  onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                  disabled={disabled}
                />
              </div>
              <FileUpload
                label="Project Screenshot / Cover Image (Upload Image)"
                type="image"
                value={formData.image}
                onChange={(dataUrl) => setFormData({ ...formData, image: dataUrl })}
                onClear={() => setFormData({ ...formData, image: "" })}
                disabled={disabled}
                placeholder="Click or drag & drop project screenshot (PNG, JPG, WebP)"
              />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    disabled={disabled}
                    className="rounded border-input"
                  />
                  <span className="text-sm">Featured project</span>
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); resetForm(); }} disabled={disabled}>
                  Cancel
                </Button>
                <Button type="submit" disabled={disabled || !formData.name}>
                  {editingId === "new" ? "Add Project" : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {value.map((project, index) => (
          <Card key={project.id} className="relative">
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(project)} disabled={disabled} className="h-7 w-7">
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDuplicate(project)} disabled={disabled} className="h-7 w-7">
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} disabled={disabled} className="h-7 w-7 text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold truncate">{project.name}</h4>
                    {project.featured && <Badge variant="default" className="text-xs">Featured</Badge>}
                    {project.source === "github" && <Badge variant="secondary" className="text-xs"><GitBranch className="h-3 w-3 mr-1" />GitHub</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                    {project.technologies.length > 5 && (
                      <Badge variant="outline" className="text-xs">+{project.technologies.length - 5} more</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                        <GitBranch className="h-3.5 w-3.5" />
                        Code
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Demo
                      </a>
                    )}
                    <span className="text-muted-foreground">{project.role}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  disabled={disabled}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {value.length === 0 && !editingId && (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          <p>No projects yet. Click &quot;Add Project&quot; to get started.</p>
        </div>
      )}
    </div>
  )
}