import { describe, it, expect } from "vitest"
import { cn } from "../utils"
import { createDemoPortfolioData } from "../demo-data"
import { THEMES } from "@/features/themes"

describe("portfolio-forge utilities & data generation", () => {
  it("merges Tailwind classes accurately via cn()", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4")
  })

  it("creates valid demo portfolio data for a selected theme", () => {
    const theme = THEMES[0]
    const demo = createDemoPortfolioData(theme)
    expect(demo.profile.fullName).toBeTruthy()
    expect(demo.theme.id).toBe(theme.id)
    expect(demo.projects.length).toBeGreaterThan(0)
    expect(demo.skills.length).toBeGreaterThan(0)
  })
})
