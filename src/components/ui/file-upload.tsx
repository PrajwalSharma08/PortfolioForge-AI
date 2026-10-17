"use client"

import * as React from "react"
import { Upload, X, FileText, Image as ImageIcon, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FileUploadProps {
  label?: string
  accept?: string
  maxSizeMB?: number
  value?: string // base64 data URL or external URL
  fileName?: string
  onChange: (dataUrl: string, fileName?: string) => void
  onClear?: () => void
  disabled?: boolean
  type?: "image" | "pdf" | "any"
  placeholder?: string
  hint?: string
}

export function FileUpload({
  label,
  accept,
  maxSizeMB = 15,
  value,
  fileName,
  onChange,
  onClear,
  disabled = false,
  type = "image",
  placeholder,
  hint,
}: FileUploadProps) {
  const [dragActive, setDragActive] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [currentFileName, setCurrentFileName] = React.useState<string>(fileName || "")
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  // Compute the correct accept attribute based on type
  const effectiveAccept = React.useMemo(() => {
    if (accept) return accept
    if (type === "pdf") return ".pdf,application/pdf"
    if (type === "image") return "image/png,image/jpeg,image/jpg,image/webp,image/gif,image/*"
    return "*/*"
  }, [accept, type])

  const handleFile = (file: File) => {
    setError(null)
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`)
      return
    }

    if (type === "pdf") {
      const isPdf =
        file.type.toLowerCase().includes("pdf") ||
        file.name.toLowerCase().endsWith(".pdf")
      if (!isPdf) {
        setError("Please upload a valid PDF document (.pdf)")
        return
      }
    }

    if (type === "image") {
      const isImage =
        file.type.toLowerCase().startsWith("image/") ||
        /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name)
      if (!isImage) {
        setError("Please upload a valid image (PNG, JPG, WebP)")
        return
      }
    }

    setCurrentFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onChange(result, file.name)
    }
    reader.onerror = () => {
      setError("Failed to read file. Please try again.")
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (disabled) return

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const displayName = currentFileName || fileName || (type === "image" ? "Photo uploaded" : "Resume-Document.pdf")

  return (
    <div className="w-full space-y-2">
      {label && <label className="text-sm font-medium text-foreground block">{label}</label>}

      {value ? (
        <div className="relative flex items-center gap-3 p-3 rounded-xl border border-border bg-card/60 shadow-sm">
          {type === "image" ? (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center border shrink-0">
              <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
              <FileText className="h-6 w-6" />
            </div>
          )}

          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-sm font-semibold truncate text-foreground">{displayName}</p>
            <div className="flex items-center gap-3">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                {type === "pdf" ? "PDF Document Ready" : "Image Ready"}
              </p>
              {type === "pdf" && (
                <a
                  href={value}
                  download={displayName.endsWith(".pdf") ? displayName : `${displayName}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  View PDF <ExternalLink className="h-2.5 w-2.5" />
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 px-2.5 text-xs"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
            >
              Change
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
              onClick={() => {
                setCurrentFileName("")
                if (onClear) onClear()
                else onChange("", "")
              }}
              disabled={disabled}
              title="Remove file"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 text-center",
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {type === "image" ? (
            <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
          ) : (
            <FileText className="h-8 w-8 text-primary mb-2" />
          )}
          <p className="text-sm font-medium">
            {placeholder || (type === "image" ? "Click or drag & drop image" : "Click or drag & drop PDF document")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {hint || (type === "image" ? `PNG, JPG, WebP up to ${maxSizeMB}MB` : `PDF (.pdf) up to ${maxSizeMB}MB`)}
          </p>
        </div>
      )}

      {error && <p className="text-xs font-medium text-destructive mt-1">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept={effectiveAccept}
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
          }
        }}
      />
    </div>
  )
}
