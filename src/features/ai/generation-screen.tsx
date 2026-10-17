"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CheckCircle, Loader2, Brain, Sparkles, Zap, FileText, Palette, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

interface GenerationScreenProps {
  onComplete: (data: Record<string, unknown>) => void
  initialData: Record<string, unknown>
}

const STEPS = [
  { id: "analyzing", label: "Analyzing your profile", icon: Brain, description: "Reviewing your information" },
  { id: "writing", label: "Writing your content", icon: FileText, description: "Generating professional copy" },
  { id: "designing", label: "Designing your portfolio", icon: Palette, description: "Applying design intelligence" },
  { id: "ready", label: "Portfolio ready", icon: Rocket, description: "Your portfolio is complete" },
]

const SUB_STEPS = {
  analyzing: ["Profile information", "Skills", "Projects", "Experience", "GitHub repositories"],
  writing: ["Professional headline", "Introduction", "About section", "Project descriptions", "Experience descriptions"],
  designing: ["Color palette", "Typography", "Layout optimization", "Responsive breakpoints", "Animation timing"],
}

export function GenerationScreen({ onComplete, initialData }: GenerationScreenProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)
  const [subStepIndex, setSubStepIndex] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<Set<string>>(new Set())
  const [generatedData, setGeneratedData] = React.useState<Record<string, unknown> | null>(null)

  const currentStep = STEPS[currentStepIndex]
  const subSteps = SUB_STEPS[currentStep.id as keyof typeof SUB_STEPS] || []

  const hasRunRef = React.useRef(false)

  React.useEffect(() => {
    if (hasRunRef.current) return
    hasRunRef.current = true

    const runGeneration = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        setCurrentStepIndex(i)
        setCompletedSteps((prev) => new Set([...prev, STEPS[i - 1]?.id].filter(Boolean)))
        setSubStepIndex(0)

        const currentSubSteps = SUB_STEPS[STEPS[i].id as keyof typeof SUB_STEPS] || []
        if (i < STEPS.length - 1) {
          for (let j = 0; j < currentSubSteps.length; j++) {
            setSubStepIndex(j)
            await new Promise((resolve) => setTimeout(resolve, 250))
          }
        } else {
          await new Promise((resolve) => setTimeout(resolve, 400))
        }
      }

      const fullName = (initialData?.fullName as string) || "Alex Morgan"
      const professionalTitle = (initialData?.professionalTitle as string) || "Full Stack Developer"
      const shortBio = (initialData?.shortBio as string) || ""

      const mockData = {
        ...initialData,
        headline: `${professionalTitle} | Building Scalable Web Applications & Modern Digital Experiences`,
        about:
          shortBio.trim() ||
          `I'm ${fullName}, a passionate ${professionalTitle} focused on building scalable, user-centric applications. I specialize in modern web architectures, clean code, and performance optimization.`,
        seo: {
          title: `${fullName} | ${professionalTitle}`,
          description: `${professionalTitle} portfolio of ${fullName}. Building scalable web applications and modern developer tools.`,
          ogImage: "",
          keywords: [professionalTitle, fullName, "Portfolio", "Software Engineer"],
        },
      }

      setGeneratedData(mockData)
      await new Promise((resolve) => setTimeout(resolve, 300))
      onComplete(mockData)
    }

    runGeneration()
  }, [onComplete, initialData])

  const progress = ((currentStepIndex + 1) / STEPS.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold">Creating Your Portfolio</h2>
        <p className="text-muted-foreground text-lg">
          Our AI is crafting a professional portfolio tailored to your experience
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Overall Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex
          const Icon = step.icon

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                isCompleted && "bg-green-500/10 border border-green-500/20",
                isCurrent && "bg-primary/10 border border-primary/20",
                !isCompleted && !isCurrent && "bg-muted/30"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
                isCompleted && "bg-green-500 text-white",
                isCurrent && "bg-primary text-white animate-pulse",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
              )}>
                {isCompleted ? (
                  <CheckCircle className="h-6 w-6" />
                ) : isCurrent ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Icon className="h-6 w-6" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn("font-medium", isCurrent && "text-primary", isCompleted && "text-green-600")}>
                    {step.label}
                  </span>
                  {isCurrent && (
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      In Progress
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-600 rounded-full">
                      Complete
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                {isCurrent && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {subSteps.map((subStep, subIndex) => (
                      <motion.span
                        key={subStep}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: subIndex * 0.1 }}
                        className={cn(
                          "text-xs px-2 py-1 rounded-full border transition-colors",
                          subIndex < subStepIndex
                            ? "bg-green-500 border-green-500 text-white"
                            : subIndex === subStepIndex
                            ? "bg-primary/10 border-primary text-primary"
                            : "border-muted text-muted-foreground"
                        )}
                      >
                        {subIndex < subStepIndex ? (
                          <>
                            <CheckCircle className="h-3 w-3 inline mr-1" />
                            {subStep}
                          </>
                        ) : subIndex === subStepIndex ? (
                          <>
                            <Loader2 className="h-3 w-3 inline mr-1 animate-spin" />
                            {subStep}
                          </>
                        ) : (
                          subStep
                        )}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {currentStepIndex === STEPS.length - 1 && generatedData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold">Your Portfolio is Ready! 🚀</h3>
          <p className="text-muted-foreground">
            AI has generated your professional content. Now choose a theme to bring it to life.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> Content Generated</span>
            <span className="flex items-center gap-1"><Palette className="h-4 w-4" /> Theme Ready</span>
            <span className="flex items-center gap-1"><Zap className="h-4 w-4" /> Optimized</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}