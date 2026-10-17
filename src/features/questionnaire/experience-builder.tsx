"use client"

import * as React from "react"
import { Plus, X, Edit, Trash2, Calendar, MapPin, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Experience } from "@/types/portfolio"

interface ExperienceBuilderProps {
  value: Experience[]
  onChange: (experiences: Experience[]) => void
  disabled?: boolean
}

export function ExperienceBuilder({ value, onChange, disabled }: ExperienceBuilderProps) {
  const [editingId, setEditingId] = React.useState<string | null>(value.length === 0 ? "new" : null)
  const [formData, setFormData] = React.useState<Partial<Experience>>({
    company: "",
    jobTitle: "",
    location: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
    achievements: [],
    technologies: [],
  })
  const [achievementInput, setAchievementInput] = React.useState("")
  const [techInput, setTechInput] = React.useState("")

  const draftIdRef = React.useRef("exp-draft-item")

  const resetForm = () => {
    setFormData({
      company: "",
      jobTitle: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
      achievements: [],
      technologies: [],
    })
    setAchievementInput("")
    setTechInput("")
  }

  const handleFieldChange = (updates: Partial<Experience>) => {
    const updatedForm = { ...formData, ...updates }
    setFormData(updatedForm)

    if (editingId === "new" && (updatedForm.company?.trim() || updatedForm.jobTitle?.trim())) {
      const draftExp: Experience = {
        id: draftIdRef.current,
        company: updatedForm.company?.trim() || "",
        jobTitle: updatedForm.jobTitle?.trim() || "",
        location: updatedForm.location || "",
        startDate: updatedForm.startDate || "",
        endDate: updatedForm.currentlyWorking ? "" : (updatedForm.endDate || ""),
        currentlyWorking: updatedForm.currentlyWorking || false,
        description: updatedForm.description || "",
        achievements: updatedForm.achievements || [],
        technologies: updatedForm.technologies || [],
      }
      const existingIdx = value.findIndex((e) => e.id === draftIdRef.current)
      if (existingIdx >= 0) {
        const next = [...value]
        next[existingIdx] = draftExp
        onChange(next)
      } else {
        onChange([...value, draftExp])
      }
    } else if (editingId && editingId !== "new") {
      onChange(
        value.map((exp) => (exp.id === editingId ? { ...exp, ...updates } : exp))
      )
    }
  }

  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      const updatedAchievements = [...(formData.achievements || []), achievementInput.trim()]
      handleFieldChange({ achievements: updatedAchievements })
      setAchievementInput("")
    }
  }

  const handleRemoveAchievement = (index: number) => {
    const updatedAchievements = formData.achievements?.filter((_, i) => i !== index) || []
    handleFieldChange({ achievements: updatedAchievements })
  }

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies?.includes(techInput.trim())) {
      const updatedTechs = [...(formData.technologies || []), techInput.trim()]
      handleFieldChange({ technologies: updatedTechs })
      setTechInput("")
    }
  }

  const handleRemoveTech = (tech: string) => {
    const updatedTechs = formData.technologies?.filter((t) => t !== tech) || []
    handleFieldChange({ technologies: updatedTechs })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.company?.trim() && !formData.jobTitle?.trim()) return

    if (editingId && editingId !== "new") {
      onChange(
        value.map((exp) =>
          exp.id === editingId ? { ...exp, ...formData, id: editingId } : exp
        )
      )
    } else {
      const newExperience: Experience = {
        id: `exp-${Date.now()}`,
        company: formData.company?.trim() || "Company",
        jobTitle: formData.jobTitle?.trim() || "Role",
        location: formData.location || "",
        startDate: formData.startDate || "",
        endDate: formData.currentlyWorking ? "" : (formData.endDate || ""),
        currentlyWorking: formData.currentlyWorking || false,
        description: formData.description || "",
        achievements: formData.achievements || [],
        technologies: formData.technologies || [],
      }
      const cleanList = value.filter((e) => e.id !== draftIdRef.current)
      onChange([...cleanList, newExperience])
      draftIdRef.current = `exp-draft-${Date.now()}`
    }
    setEditingId(null)
    resetForm()
  }

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id)
    setFormData(experience)
    setAchievementInput("")
    setTechInput("")
  }

  const handleDelete = (id: string) => {
    onChange(value.filter((exp) => exp.id !== id && exp.id !== draftIdRef.current))
    if (editingId === id || editingId === "new") {
      setEditingId(null)
      resetForm()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Experience ({value.length})</h4>
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
          {editingId ? "Cancel" : "Add Experience"}
        </Button>
      </div>

      {editingId && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>{editingId === "new" ? "Add Experience" : "Edit Experience"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Company"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={(e) => handleFieldChange({ company: e.target.value })}
                  required
                  disabled={disabled}
                />
                <Input
                  label="Job Title"
                  placeholder="Senior Software Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => handleFieldChange({ jobTitle: e.target.value })}
                  required
                  disabled={disabled}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Input
                  label="Location"
                  placeholder="San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => handleFieldChange({ location: e.target.value })}
                  disabled={disabled}
                />
                <Input
                  type="month"
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(e) => handleFieldChange({ startDate: e.target.value })}
                  disabled={disabled}
                />
                <div className="flex items-end gap-2">
                  <Input
                    type="month"
                    label="End Date"
                    value={formData.currentlyWorking ? "" : formData.endDate}
                    onChange={(e) => handleFieldChange({ endDate: e.target.value })}
                    disabled={disabled || formData.currentlyWorking}
                  />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.currentlyWorking}
                      onChange={(e) => handleFieldChange({ currentlyWorking: e.target.checked })}
                      disabled={disabled}
                      className="rounded border-input"
                    />
                    <span className="text-sm">Currently working here</span>
                  </label>
                </div>
              </div>
              <Textarea
                label="Description"
                placeholder="Describe your role, responsibilities, and impact..."
                value={formData.description}
                onChange={(e) => handleFieldChange({ description: e.target.value })}
                disabled={disabled}
                rows={3}
              />
              <div className="space-y-2">
                <Label>Key Achievements</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add achievement (press Enter)"
                    value={achievementInput}
                    onChange={(e) => setAchievementInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddAchievement())}
                    disabled={disabled}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={handleAddAchievement} disabled={disabled || !achievementInput.trim()}>
                    Add
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.achievements?.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded">
                      <span className="text-sm">{achievement}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => handleRemoveAchievement(index)} disabled={disabled}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex gap-2 flex-wrap">
                  <Input
                    placeholder="Add technology"
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
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); resetForm(); }} disabled={disabled}>
                  Cancel
                </Button>
                <Button type="submit" disabled={disabled || !formData.company || !formData.jobTitle}>
                  {editingId === "new" ? "Add Experience" : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {value.map((experience) => (
          <Card key={experience.id} className="relative group">
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(experience)} disabled={disabled} className="h-7 w-7">
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(experience.id)} disabled={disabled} className="h-7 w-7 text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="font-semibold">{experience.jobTitle}</h4>
                    <span className="text-muted-foreground">at</span>
                    <span className="font-medium">{experience.company}</span>
                    {experience.currentlyWorking && (
                      <Badge variant="default" className="text-xs"><Calendar className="h-3 w-3 mr-1" />Present</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{experience.location}</span>
                    <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{formatDateRange(experience.startDate, experience.endDate, experience.currentlyWorking)}</span>
                  </div>
                  <p className="text-sm mb-2">{experience.description}</p>
                  {experience.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-2">
                      {experience.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                  {experience.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {value.length === 0 && !editingId && (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          <p>No experience added yet. Click &quot;Add Experience&quot; to get started.</p>
        </div>
      )}
    </div>
  )
}

function formatDateRange(start: string, end: string, current: boolean): string {
  const startDate = start ? new Date(start + "-01") : null
  const endDate = current ? null : (end ? new Date(end + "-01") : null)
  const format = (date: Date) => date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  return `${startDate ? format(startDate) : "?"} - ${current ? "Present" : (endDate ? format(endDate) : "?")}`
}