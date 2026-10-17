"use client"

import * as React from "react"
import { Plus, X, Edit, Trash2, Globe, Check, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { SocialLink, SocialPlatform, SOCIAL_PLATFORMS } from "@/types/portfolio"

interface SocialLinksBuilderProps {
  value: SocialLink[]
  onChange: (links: SocialLink[]) => void
  disabled?: boolean
}

export function SocialLinksBuilder({ value, onChange, disabled }: SocialLinksBuilderProps) {
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState<Partial<SocialLink>>({
    platform: "github",
    username: "",
    url: "",
    customLabel: "",
  })
  const [validating, setValidating] = React.useState(false)

  const resetForm = () => {
    setFormData({
      platform: "github",
      username: "",
      url: "",
      customLabel: "",
    })
  }

  const handlePlatformChange = (platform: SocialPlatform) => {
    setFormData((prev) => ({ ...prev, platform, username: "", url: "" }))
    const selectedPlatform = SOCIAL_PLATFORMS.find((p) => p.value === platform)
    if (selectedPlatform?.baseUrl) {
      setFormData((prev) => ({ ...prev, url: selectedPlatform.baseUrl }))
    }
  }

  const handleUsernameChange = (username: string) => {
    setFormData((prev) => ({ ...prev, username }))
    const selectedPlatform = SOCIAL_PLATFORMS.find((p) => p.value === formData.platform)
    if (selectedPlatform?.baseUrl && username) {
      const cleanUsername = username.replace(/^@/, "")
      setFormData((prev) => ({ ...prev, url: `${selectedPlatform.baseUrl}${cleanUsername}` }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.platform || !formData.username) return

    if (editingId) {
      onChange(
        value.map((link) =>
          link.id === editingId ? { ...link, ...formData, id: editingId } : link
        )
      )
    } else {
      const newLink: SocialLink = {
        id: `social-${Date.now()}`,
        platform: formData.platform!,
        username: formData.username!,
        url: formData.url || "",
        customLabel: formData.customLabel,
      }
      onChange([...value, newLink])
    }
    setEditingId(null)
    resetForm()
  }

  const handleEdit = (link: SocialLink) => {
    setEditingId(link.id)
    setFormData(link)
  }

  const handleDelete = (id: string) => {
    onChange(value.filter((link) => link.id !== id))
    if (editingId === id) {
      setEditingId(null)
      resetForm()
    }
  }

  const validateUrl = async (url: string) => {
    if (!url) return
    setValidating(true)
    try {
      const response = await fetch(`/api/validate-url?url=${encodeURIComponent(url)}`, { method: "HEAD" })
      return response.ok
    } catch {
      return false
    } finally {
      setValidating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium flex items-center gap-2"><Globe className="h-4 w-4" /> Social Links ({value.length})</h4>
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
          {editingId ? "Cancel" : "Add Social Link"}
        </Button>
      </div>

      {editingId && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>{editingId === "new" ? "Add Social Link" : "Edit Social Link"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Label>Platform</Label>
              <Select value={formData.platform} onValueChange={handlePlatformChange} disabled={disabled}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                label={formData.platform === "custom" ? "Label" : "Username"}
                placeholder={formData.platform === "custom" ? "My Portfolio" : formData.platform === "website" ? "https://example.com" : "@username"}
                value={formData.username}
                onChange={(e) => formData.platform === "custom" 
                  ? setFormData({ ...formData, customLabel: e.target.value, username: e.target.value })
                  : handleUsernameChange(e.target.value)
                }
                required
                disabled={disabled}
              />

              <Input
                label="URL"
                placeholder="https://..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                disabled={disabled}
              />

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => { setEditingId(null); resetForm(); }} disabled={disabled}>
                  Cancel
                </Button>
                <Button type="submit" disabled={disabled || !formData.platform || !formData.username || validating}>
                  {validating ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId === "new" ? "Add Link" : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {value.map((link) => {
          const platformInfo = SOCIAL_PLATFORMS.find((p) => p.value === link.platform)
          const Icon = platformInfo?.icon ? platformInfo.icon : Globe
          return (
            <Card key={link.id} className="relative group flex items-center gap-4 p-4">
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(link)} disabled={disabled} className="h-7 w-7">
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(link.id)} disabled={disabled} className="h-7 w-7 text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{link.customLabel || platformInfo?.label || link.platform}</p>
                <p className="text-sm text-muted-foreground truncate">{link.username}</p>
              </div>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
                Visit <ExternalLink className="h-3.5 w-3.5 inline" />
              </a>
            </Card>
          )
        })}
      </div>

      {value.length === 0 && !editingId && (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          <p>No social links added yet. Click &quot;Add Social Link&quot; to get started.</p>
        </div>
      )}
    </div>
  )
}