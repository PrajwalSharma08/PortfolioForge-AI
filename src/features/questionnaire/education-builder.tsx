"use client"

import * as React from "react"
import { Plus, X, Edit, Trash2, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Education } from "@/types/portfolio"

interface EducationBuilderProps {
  value: Education[]
  onChange: (education: Education[]) => void
  disabled?: boolean
}

export function EducationBuilder({ value, onChange, disabled }: EducationBuilderProps) {
  const [editingId, setEditingId] = React.useState<string | null>(value.length === 0 ? "new" : null)
  const [formData, setFormData] = React.useState<Partial<Education>>({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    description: "",
  })

  const draftIdRef = React.useRef("edu-draft-item")

  const resetForm = () => {
    setFormData({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: "",
    })
  }

  const handleFieldChange = (updates: Partial<Education>) => {
    const updatedForm = { ...formData, ...updates }
    setFormData(updatedForm)

    if (editingId === "new" && (updatedForm.institution?.trim() || updatedForm.degree?.trim())) {
      const draftEdu: Education = {
        id: draftIdRef.current,
        institution: updatedForm.institution?.trim() || "",
        degree: updatedForm.degree?.trim() || "",
        fieldOfStudy: updatedForm.fieldOfStudy || "",
        startDate: updatedForm.startDate || "",
        endDate: updatedForm.endDate || "",
        grade: updatedForm.grade || "",
        description: updatedForm.description || "",
      }
      const existingIdx = value.findIndex((e) => e.id === draftIdRef.current)
      if (existingIdx >= 0) {
        const next = [...value]
        next[existingIdx] = draftEdu
        onChange(next)
      } else {
        onChange([...value, draftEdu])
      }
    } else if (editingId && editingId !== "new") {
      onChange(
        value.map((edu) => (edu.id === editingId ? { ...edu, ...updates } : edu))
      )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.institution?.trim() && !formData.degree?.trim()) return

    if (editingId && editingId !== "new") {
      onChange(
        value.map((edu) =>
          edu.id === editingId ? { ...edu, ...formData, id: editingId } : edu
        )
      )
    } else {
      const permEdu: Education = {
        id: `edu-${Date.now()}`,
        institution: formData.institution?.trim() || "State University",
        degree: formData.degree?.trim() || "Degree",
        fieldOfStudy: formData.fieldOfStudy || "",
        startDate: formData.startDate || "",
        endDate: formData.endDate || "",
        grade: formData.grade || "",
        description: formData.description || "",
      }
      const cleanList = value.filter((e) => e.id !== draftIdRef.current)
      onChange([...cleanList, permEdu])
      draftIdRef.current = `edu-draft-${Date.now()}`
    }
    setEditingId(null)
    resetForm()
  }

  const handleEdit = (education: Education) => {
    setEditingId(education.id)
    setFormData(education)
  }

  const handleDelete = (id: string) => {
    onChange(value.filter((edu) => edu.id !== id && edu.id !== draftIdRef.current))
    if (editingId === id || editingId === "new") {
      setEditingId(null)
      resetForm()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Education ({value.length})</h4>
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
          {editingId ? "Cancel" : "Add Education"}
        </Button>
      </div>

      {editingId && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>{editingId === "new" ? "Add Education" : "Edit Education"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="College / University / School"
                placeholder="e.g. Delhi Technological University / State University"
                value={formData.institution}
                onChange={(e) => handleFieldChange({ institution: e.target.value })}
                required
                disabled={disabled}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Degree / Course"
                  placeholder="e.g. B.Tech / B.E. / BCA / MCA"
                  value={formData.degree}
                  onChange={(e) => handleFieldChange({ degree: e.target.value })}
                  required
                  disabled={disabled}
                />
                <Input
                  label="Branch / Field of Study"
                  placeholder="e.g. Computer Science & Engineering"
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleFieldChange({ fieldOfStudy: e.target.value })}
                  disabled={disabled}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Input
                  type="month"
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(e) => handleFieldChange({ startDate: e.target.value })}
                  disabled={disabled}
                />
                <Input
                  type="month"
                  label="Graduation / End Date"
                  value={formData.endDate}
                  onChange={(e) => handleFieldChange({ endDate: e.target.value })}
                  disabled={disabled}
                />
                <Input
                  label="Grade / CGPA / Percentage"
                  placeholder="e.g. 8.6 CGPA / 85%"
                  value={formData.grade}
                  onChange={(e) => handleFieldChange({ grade: e.target.value })}
                  disabled={disabled}
                />
              </div>
              <Textarea
                label="Coursework / Achievements / Activities (Optional)"
                placeholder="e.g. Data Structures & Algorithms, Operating Systems, DBMS. Won 1st Prize in College Hackathon, Lead of Web Dev Club."
                value={formData.description}
                onChange={(e) => handleFieldChange({ description: e.target.value })}
                disabled={disabled}
                rows={3}
              />
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); resetForm(); }} disabled={disabled}>
                  Cancel
                </Button>
                <Button type="submit" disabled={disabled || !formData.institution || !formData.degree}>
                  {editingId === "new" ? "Add Education" : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {value.map((education) => (
          <Card key={education.id} className="relative group">
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(education)} disabled={disabled} className="h-7 w-7">
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(education.id)} disabled={disabled} className="h-7 w-7 text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-semibold">{education.degree}</h4>
                    {education.fieldOfStudy && (
                      <>
                        <span className="text-muted-foreground">in</span>
                        <span className="font-medium">{education.fieldOfStudy}</span>
                      </>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-1">{education.institution}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span>{formatDateRange(education.startDate, education.endDate)}</span>
                    {education.grade && <span>Grade: {education.grade}</span>}
                  </div>
                  {education.description && <p className="text-sm">{education.description}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {value.length === 0 && !editingId && (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          <p>No education added yet. Click &quot;Add Education&quot; to get started.</p>
        </div>
      )}
    </div>
  )
}

function formatDateRange(start: string, end: string): string {
  const format = (dateStr: string) => {
    const date = new Date(dateStr + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }
  return `${start ? format(start) : "?"} - ${end ? format(end) : "?"}`
}