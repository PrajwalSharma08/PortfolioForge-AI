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
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState<Partial<Certification>>({
    name: "",
    issuingOrganization: "",
    date: "",
    credentialUrl: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      issuingOrganization: "",
      date: "",
      credentialUrl: "",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.issuingOrganization) return

    if (editingId) {
      onChange(
        value.map((cert) =>
          cert.id === editingId ? { ...cert, ...formData, id: editingId } : cert
        )
      )
    } else {
      const newCertification: Certification = {
        id: `cert-${Date.now()}`,
        name: formData.name!,
        issuingOrganization: formData.issuingOrganization!,
        date: formData.date || "",
        credentialUrl: formData.credentialUrl || "",
      }
      onChange([...value, newCertification])
    }
    setEditingId(null)
    resetForm()
  }

  const handleEdit = (certification: Certification) => {
    setEditingId(certification.id)
    setFormData(certification)
  }

  const handleDelete = (id: string) => {
    onChange(value.filter((cert) => cert.id !== id))
    if (editingId === id) {
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
                placeholder="AWS Solutions Architect"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={disabled}
              />
              <Input
                label="Issuing Organization"
                placeholder="Amazon Web Services"
                value={formData.issuingOrganization}
                onChange={(e) => setFormData({ ...formData, issuingOrganization: e.target.value })}
                required
                disabled={disabled}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  type="month"
                  label="Date Earned"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={disabled}
                />
                <Input
                  label="Credential URL (Optional)"
                  placeholder="https://credly.com/badges/..."
                  value={formData.credentialUrl}
                  onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                  disabled={disabled}
                />
              </div>
              <FileUpload
                label="Certificate Document / PDF / Image (Optional)"
                type="any"
                accept=".pdf,image/*"
                value={formData.credentialUrl?.startsWith("data:") ? formData.credentialUrl : ""}
                onChange={(dataUrl) => setFormData({ ...formData, credentialUrl: dataUrl })}
                onClear={() => setFormData({ ...formData, credentialUrl: "" })}
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