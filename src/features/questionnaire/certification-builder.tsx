"use client"

import * as React from "react"
import { Plus, X, Edit, Trash2, Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FileUpload } from "@/components/ui/file-upload"
import { Certification } from "@/types/portfolio"

interface CertificationBuilderProps {
  value: Certification[]
  onChange: (certifications: Certification[]) => void
  disabled?: boolean
}

export function CertificationBuilder({ value, onChange, disabled }: CertificationBuilderProps) {
  const [editingId, setEditingId] = React.useState<string | null>(value.length === 0 ? "new" : null)
  const [formData, setFormData] = React.useState<Partial<Certification>>({
    name: "",
    issuingOrganization: "",
    date: "",
    credentialUrl: "",
  })

  const draftIdRef = React.useRef("cert-draft-item")

  const resetForm = () => {
    setFormData({
      name: "",
      issuingOrganization: "",
      date: "",
      credentialUrl: "",
    })
  }

  const handleFieldChange = (updates: Partial<Certification>) => {
    const updatedForm = { ...formData, ...updates }
    setFormData(updatedForm)

    if (editingId === "new" && (updatedForm.name?.trim() || updatedForm.issuingOrganization?.trim())) {
      const draftCert: Certification = {
        id: draftIdRef.current,
        name: updatedForm.name?.trim() || "",
        issuingOrganization: updatedForm.issuingOrganization?.trim() || "",
        date: updatedForm.date || "",
        credentialUrl: updatedForm.credentialUrl || "",
      }
      const existingIdx = value.findIndex((c) => c.id === draftIdRef.current)
      if (existingIdx >= 0) {
        const next = [...value]
        next[existingIdx] = draftCert
        onChange(next)
      } else {
        onChange([...value, draftCert])
      }
    } else if (editingId && editingId !== "new") {
      onChange(
        value.map((cert) => (cert.id === editingId ? { ...cert, ...updates } : cert))
      )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name?.trim() && !formData.issuingOrganization?.trim()) return

    if (editingId && editingId !== "new") {
      onChange(
        value.map((cert) =>
          cert.id === editingId ? { ...cert, ...formData, id: editingId } : cert
        )
      )
    } else {
      const newCertification: Certification = {
        id: `cert-${Date.now()}`,
        name: formData.name?.trim() || "Certification",
        issuingOrganization: formData.issuingOrganization?.trim() || "Organization",
        date: formData.date || "",
        credentialUrl: formData.credentialUrl || "",
      }
      const cleanList = value.filter((c) => c.id !== draftIdRef.current)
      onChange([...cleanList, newCertification])
      draftIdRef.current = `cert-draft-${Date.now()}`
    }
    setEditingId(null)
    resetForm()
  }

  const handleEdit = (certification: Certification) => {
    setEditingId(certification.id)
    setFormData(certification)
  }

  const handleDelete = (id: string) => {
    onChange(value.filter((cert) => cert.id !== id && cert.id !== draftIdRef.current))
    if (editingId === id || editingId === "new") {
      setEditingId(null)
      resetForm()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium flex items-center gap-2"><Award className="h-4 w-4" /> Certifications ({value.length})</h4>
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
          {editingId ? "Cancel" : "Add Certification"}
        </Button>
      </div>

      {editingId && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>{editingId === "new" ? "Add Certification" : "Edit Certification"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Certification Name"
                placeholder="AWS Solutions Architect / Full Stack Web Development"
                value={formData.name}
                onChange={(e) => handleFieldChange({ name: e.target.value })}
                required
                disabled={disabled}
              />
              <Input
                label="Issuing Organization"
                placeholder="Amazon Web Services / Coursera / Udemy"
                value={formData.issuingOrganization}
                onChange={(e) => handleFieldChange({ issuingOrganization: e.target.value })}
                required
                disabled={disabled}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  type="month"
                  label="Date Earned"
                  value={formData.date}
                  onChange={(e) => handleFieldChange({ date: e.target.value })}
                  disabled={disabled}
                />
                <Input
                  label="Credential URL (Optional)"
                  placeholder="https://credly.com/badges/..."
                  value={formData.credentialUrl}
                  onChange={(e) => handleFieldChange({ credentialUrl: e.target.value })}
                  disabled={disabled}
                />
              </div>
              <FileUpload
                label="Certificate Document / PDF / Image (Optional)"
                type="any"
                accept=".pdf,image/*"
                value={formData.credentialUrl?.startsWith("data:") ? formData.credentialUrl : ""}
                onChange={(dataUrl) => handleFieldChange({ credentialUrl: dataUrl })}
                onClear={() => handleFieldChange({ credentialUrl: "" })}
                disabled={disabled}
                placeholder="Upload Certificate PDF or Image"
              />
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); resetForm(); }} disabled={disabled}>
                  Cancel
                </Button>
                <Button type="submit" disabled={disabled || !formData.name || !formData.issuingOrganization}>
                  {editingId === "new" ? "Add Certification" : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {value.map((cert) => (
          <Card key={cert.id} className="relative group">
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="ghost" size="icon" onClick={() => handleEdit(cert)} disabled={disabled} className="h-7 w-7">
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(cert.id)} disabled={disabled} className="h-7 w-7 text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-semibold">{cert.name}</h4>
                  </div>
                  <p className="text-muted-foreground mb-1">Issued by: {cert.issuingOrganization}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    {cert.date && <span>{new Date(cert.date + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>}
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                        <ExternalLink className="h-3.5 w-3.5" />
                        View Credential
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {value.length === 0 && !editingId && (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          <p>No certifications added yet. Click &quot;Add Certification&quot; to get started.</p>
        </div>
      )}
    </div>
  )
}