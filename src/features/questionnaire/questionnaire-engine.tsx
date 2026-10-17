"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { QuestionDefinition, QuestionStep, QuestionType, SKILL_CATEGORIES, SOCIAL_PLATFORMS, Skill, Project, Experience, Education, Certification, SocialLink } from "@/types/portfolio"
import { SkillSelector } from "./skill-selector"
import { ProjectBuilder } from "./project-builder"
import { ExperienceBuilder } from "./experience-builder"
import { EducationBuilder } from "./education-builder"
import { CertificationBuilder } from "./certification-builder"
import { SocialLinksBuilder } from "./social-links-builder"
import { FileUpload } from "@/components/ui/file-upload"
import { QUESTIONNAIRE_STEPS, getNextStepId, getPreviousStepId, getStepProgress } from "./questions"

interface QuestionRendererProps {
  question: QuestionDefinition
  value: unknown
  onChange: (value: unknown) => void
  error?: string
  disabled?: boolean
}

function QuestionRenderer({ question, value, onChange, error, disabled }: QuestionRendererProps) {
  const stringValue = typeof value === "string" ? value : ""
  const renderInput = () => {
    switch (question.type) {
      case "text":
      case "url":
      case "email":
        return (
          <Input
            id={question.id}
            type={question.type}
            placeholder={question.placeholder}
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            error={error}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
          />
        )
      case "textarea":
        return (
          <Textarea
            id={question.id}
            placeholder={question.placeholder}
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            error={error}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            rows={4}
          />
        )
      case "image-upload":
        return (
          <FileUpload
            type="image"
            value={stringValue}
            onChange={(url) => onChange(url)}
            onClear={() => onChange("")}
            disabled={disabled}
            placeholder={question.placeholder || "Click or drag & drop profile photo (PNG, JPG, WebP)"}
          />
        )
      case "pdf-upload":
        return (
          <FileUpload
            type="pdf"
            value={stringValue}
            onChange={(url, name) => onChange(url)}
            onClear={() => onChange("")}
            disabled={disabled}
            placeholder={question.placeholder || "Click or drag & drop Resume / CV (PDF)"}
          />
        )
      case "select":
        return (
          <Select
            value={stringValue}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={question.placeholder || "Select an option..."} />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "skill-selector":
        return <SkillSelector value={Array.isArray(value) ? (value as Skill[]) : []} onChange={onChange} disabled={disabled} />
      case "project-builder":
        return <ProjectBuilder value={Array.isArray(value) ? (value as Project[]) : []} onChange={onChange} disabled={disabled} />
      case "experience-builder":
        return <ExperienceBuilder value={Array.isArray(value) ? (value as Experience[]) : []} onChange={onChange} disabled={disabled} />
      case "education-builder":
        return <EducationBuilder value={Array.isArray(value) ? (value as Education[]) : []} onChange={onChange} disabled={disabled} />
      case "multi-select":
        return <CertificationBuilder value={Array.isArray(value) ? (value as Certification[]) : []} onChange={onChange} disabled={disabled} />
      case "social-links":
        return <SocialLinksBuilder value={Array.isArray(value) ? (value as SocialLink[]) : []} onChange={onChange} disabled={disabled} />
      default:
        return (
          <Input
            id={question.id}
            placeholder={question.placeholder}
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            error={error}
            disabled={disabled}
          />
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <Label htmlFor={question.id}>{question.title}</Label>
      {question.description && (
        <p className="text-sm text-muted-foreground">{question.description}</p>
      )}
      {renderInput()}
    </motion.div>
  )
}

interface StepRendererProps {
  step: QuestionStep
  values: Record<string, unknown>
  onChange: (questionId: string, value: unknown) => void
  errors: Record<string, string>
  disabled?: boolean
}

export function StepRenderer({ step, values, onChange, errors, disabled }: StepRendererProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{step.title}</h2>
        <p className="text-muted-foreground">{step.description}</p>
      </div>
      <div className="space-y-6">
        {step.questions.map((question) => {
          const shouldRender =
            !question.dependsOn ||
            values[question.dependsOn.field] === question.dependsOn.value

          if (!shouldRender) return null

          return (
            <QuestionRenderer
              key={question.id}
              question={question}
              value={values[question.id]}
              onChange={(value) => onChange(question.id, value)}
              error={errors[question.id]}
              disabled={disabled}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

interface QuestionnaireEngineProps {
  initialValues?: Record<string, unknown>
  onComplete: (values: Record<string, unknown>) => void
  onBack?: () => void
}

export function QuestionnaireEngine({ initialValues, onComplete, onBack }: QuestionnaireEngineProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0)
  const [values, setValues] = React.useState<Record<string, unknown>>(initialValues || {})
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("portfolio-questionnaire")
        if (saved && Object.keys(initialValues || {}).length === 0) {
          try {
            const parsed = JSON.parse(saved)
            if (typeof parsed.currentStepIndex === "number") {
              setCurrentStepIndex(parsed.currentStepIndex)
            }
            if (parsed.values && typeof parsed.values === "object") {
              setValues(parsed.values)
            }
          } catch {
            // ignore
          }
        }
      }
    })
    return () => cancelAnimationFrame(frameId)
  }, [initialValues])

  const currentStep = QUESTIONNAIRE_STEPS[currentStepIndex]
  const isLastStep = currentStepIndex === QUESTIONNAIRE_STEPS.length - 1
  const progress = getStepProgress(currentStep.id)

  const validateStep = (step: QuestionStep): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    step.questions.forEach((question) => {
      if (!question.required) return
      const value = values[question.id]
      if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === "string" && !value.trim())) {
        newErrors[question.id] = `${question.title} is required`
        isValid = false
      } else if (question.validation) {
        const validationResult = question.validation(value)
        if (validationResult !== true) {
          newErrors[question.id] = typeof validationResult === "string" ? validationResult : `${question.title} is invalid`
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) return

    if (isLastStep) {
      setIsSubmitting(true)
      setTimeout(() => {
        onComplete(values)
        setIsSubmitting(false)
      }, 500)
    } else {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    } else if (onBack) {
      onBack()
    }
  }

  const handleChange = (questionId: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [questionId]: value }))
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[questionId]
        return newErrors
      })
    }
  }

  React.useEffect(() => {
    localStorage.setItem(
      "portfolio-questionnaire",
      JSON.stringify({ values, currentStepIndex })
    )
  }, [values, currentStepIndex])

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Step {currentStepIndex + 1} of {QUESTIONNAIRE_STEPS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <StepRenderer
          key={currentStep.id}
          step={currentStep}
          values={values}
          onChange={handleChange}
          errors={errors}
          disabled={isSubmitting}
        />
      </AnimatePresence>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={isSubmitting || currentStepIndex === 0}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={isSubmitting} className="w-[200px]">
          {isSubmitting ? "Generating..." : isLastStep ? "Generate Portfolio" : "Continue"}
        </Button>
      </div>
    </div>
  )
}