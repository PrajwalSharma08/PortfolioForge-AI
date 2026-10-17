"use client"

import * as React from "react"
import { Plus, X, Search, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SKILL_CATEGORIES, SkillCategory, Skill } from "@/types/portfolio"
import { cn } from "@/lib/utils"

const POPULAR_SKILLS: Record<SkillCategory, string[]> = {
  frontend: ["React", "Vue.js", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Svelte", "Astro", "Remix"],
  backend: ["Node.js", "Python", "Go", "Java", "Rust", "Express", "FastAPI", "Django", "Spring Boot", "NestJS"],
  "ai-ml": ["TensorFlow", "PyTorch", "Hugging Face", "LangChain", "OpenAI API", "Scikit-learn", "Keras", "JAX", "MLOps", "LLMs"],
  data: ["Pandas", "NumPy", "Polars", "DuckDB", "Apache Spark", "Kafka", "Airflow", "dbt", "Tableau", "Power BI"],
  database: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "SQLite", "Prisma", "Drizzle", "Supabase", "PlanetScale", "CockroachDB"],
  cloud: ["AWS", "GCP", "Azure", "Vercel", "Cloudflare", "DigitalOcean", "Heroku", "Railway", "Fly.io", "Hetzner"],
  devops: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "GitLab CI", "Ansible", "Prometheus", "Grafana", "ELK", "ArgoCD"],
  mobile: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Capacitor", "Ionic", "Tauri", "Electron", "PWA"],
  security: ["OAuth2", "JWT", "OWASP", "Burp Suite", "Wireshark", "Metasploit", "Nmap", "SSL/TLS", "Zero Trust", "SIEM"],
  design: ["Figma", "Sketch", "Adobe XD", "Framer", "Principle", "Protopie", "Rive", "Spline", "Blender", "After Effects"],
  "programming-languages": ["TypeScript", "JavaScript", "Python", "Go", "Rust", "Java", "C++", "C#", "Swift", "Kotlin"],
  tools: ["Git", "GitHub", "VS Code", "Vim", "Docker", "Postman", "Notion", "Linear", "Jira", "Obsidian"],
  other: [],
}

interface SkillSelectorProps {
  value: Skill[]
  onChange: (skills: Skill[]) => void
  disabled?: boolean
}

export function SkillSelector({ value, onChange, disabled }: SkillSelectorProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState<SkillCategory>("frontend")
  const [showAddCustom, setShowAddCustom] = React.useState(false)
  const [customSkillName, setCustomSkillName] = React.useState("")
  const [customSkillCategory, setCustomSkillCategory] = React.useState<SkillCategory>("other")

  const filteredSkills = POPULAR_SKILLS[activeCategory].filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const nextIdRef = React.useRef(1)

  const handleAddSkill = (skillName: string, category: SkillCategory) => {
    const newSkill: Skill = {
      id: `skill-${nextIdRef.current++}`,
      name: skillName,
      category,
      level: "intermediate",
    }
    onChange([...value, newSkill])
  }

  const handleAddCustom = () => {
    if (customSkillName.trim()) {
      handleAddSkill(customSkillName.trim(), customSkillCategory)
      setCustomSkillName("")
      setShowAddCustom(false)
    }
  }

  const handleRemoveSkill = (skillId: string) => {
    onChange(value.filter((s) => s.id !== skillId))
  }

  const handleLevelChange = (skillId: string, level: Skill["level"]) => {
    onChange(
      value.map((s) =>
        s.id === skillId ? { ...s, level } : s
      )
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={disabled}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddCustom(true)}
          disabled={disabled}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Custom
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {SKILL_CATEGORIES.map((cat) => (
          <Button
            key={cat.value}
            variant={activeCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.value)}
            disabled={disabled}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <ScrollArea className="h-64 border rounded-md p-2">
        <div className="flex flex-wrap gap-2">
          {filteredSkills.map((skillName) => {
            const existingSkill = value.find((s) => s.name === skillName && s.category === activeCategory)
            return (
              <Badge
                key={`${activeCategory}-${skillName}`}
                variant={existingSkill ? "default" : "secondary"}
                className={cn("gap-1 cursor-pointer transition-all", !disabled && "hover:scale-105")}
                onClick={() => existingSkill ? handleRemoveSkill(existingSkill.id) : handleAddSkill(skillName, activeCategory)}
              >
                <Tag className="h-3 w-3" />
                {skillName}
                {existingSkill && (
                  <X className="h-3 w-3 cursor-pointer hover:opacity-70" onClick={(e) => { e.stopPropagation(); handleRemoveSkill(existingSkill.id) }} />
                )}
              </Badge>
            )
          })}
        </div>
      </ScrollArea>

      {value.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Selected Skills</h4>
          <div className="flex flex-wrap gap-2">
            {value.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg"
              >
                <span className="font-medium">{skill.name}</span>
                <Badge variant="outline" className="text-xs">{SKILL_CATEGORIES.find(c => c.value === skill.category)?.label}</Badge>
                <select
                  value={skill.level || "intermediate"}
                  onChange={(e) => handleLevelChange(skill.id, e.target.value as Skill["level"])}
                  disabled={disabled}
                  className="text-xs border rounded px-1 py-0.5 bg-background"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveSkill(skill.id)}
                  disabled={disabled}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddCustom && (
        <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
          <h4 className="font-medium">Add Custom Skill</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Skill name"
              value={customSkillName}
              onChange={(e) => setCustomSkillName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
              disabled={disabled}
            />
            <Select value={customSkillCategory} onValueChange={(value) => setCustomSkillCategory(value as SkillCategory)} disabled={disabled}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SKILL_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddCustom} disabled={disabled || !customSkillName.trim()}>
              Add
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowAddCustom(false)} disabled={disabled}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}