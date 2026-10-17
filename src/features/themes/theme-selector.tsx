"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Palette, Monitor, MousePointer, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ThemeConfig } from "@/types/portfolio"
import { THEMES } from "./theme-definitions"

interface ThemeSelectorProps {
  selectedTheme: ThemeConfig | null
  onSelectTheme: (theme: ThemeConfig) => void
}

const THEME_PREVIEWS: Record<string, string> = {
  glassmorphism: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=400&fit=crop",
  bento: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
  "neo-brutalism": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&h=400&fit=crop",
  minimal: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  cyberpunk: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
  aurora: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=400&fit=crop",
}

const THEME_FEATURES: Record<string, string[]> = {
  glassmorphism: ["Frosted glass effects", "Layered depth", "Smooth animations", "Modern gradients"],
  bento: ["Dribbble trending Bento grid", "Linear & Apple dark aesthetic", "Ambient radial glow", "Monospace tech badges"],
  "neo-brutalism": ["Bold 3px black borders", "Hard offset drop shadows", "High-energy retro pop", "Punchy typography"],
  minimal: ["Clean typography", "Ample whitespace", "Content-first", "Fast loading"],
  cyberpunk: ["Neon glow effects", "Bold contrasts", "Futuristic fonts", "Glitch animations"],
  aurora: ["Nordic emerald & violet glow", "Luxury dark glass cards", "Ethereal aesthetic", "Modern rounded design"],
}

export function ThemeSelector({ selectedTheme, onSelectTheme }: ThemeSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Choose Your Style</h2>
        <p className="text-muted-foreground text-lg">
          Pick a theme inspired by top Dribbble & Awwwards portfolios. You can customize every token later.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {THEMES.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ThemeCard
              theme={theme}
              isSelected={selectedTheme?.id === theme.id}
              onSelect={() => onSelectTheme(theme)}
            />
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Fully Customizable
        </span>
        <span className="flex items-center gap-2">
          <Monitor className="h-4 w-4" />
          Responsive Design
        </span>
        <span className="flex items-center gap-2">
          <MousePointer className="h-4 w-4" />
          Interactive
        </span>
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Animations
        </span>
      </div>
    </motion.div>
  )
}

interface ThemeCardProps {
  theme: ThemeConfig
  isSelected: boolean
  onSelect: () => void
}

function ThemeCard({ theme, isSelected, onSelect }: ThemeCardProps) {
  const previewImage = THEME_PREVIEWS[theme.id]
  const features = THEME_FEATURES[theme.id] || []

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer",
        isSelected
          ? "border-primary/50 ring-2 ring-primary/20 shadow-lg shadow-primary/10"
          : "border-muted/50 hover:border-primary/30 hover:shadow-xl"
      )}
      onClick={onSelect}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={previewImage}
          alt={`${theme.name} theme preview`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {isSelected && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <Check className="h-12 w-12 text-primary" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={isSelected ? "default" : "secondary"} className="gap-1">
            <Sparkles className="h-3 w-3" />
            {theme.name}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold">{theme.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{theme.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {features.map((feature) => (
            <Badge key={feature} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>

        <Button
          className="w-full"
          variant={isSelected ? "default" : "outline"}
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
        >
          {isSelected ? "Selected" : "Use This Theme"}
        </Button>
      </CardContent>
    </Card>
  )
}