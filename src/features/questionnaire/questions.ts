import { QuestionDefinition, QuestionStep, QuestionType } from "@/types/portfolio"

export const QUESTIONNAIRE_STEPS: QuestionStep[] = [
  {
    id: "personal",
    title: "Let's build your portfolio",
    description: "Tell us a little about yourself. You can change everything later.",
    questions: [
      {
        id: "fullName",
        type: "text",
        title: "Full Name",
        placeholder: "e.g. Alex Morgan / Rahul Sharma",
        required: true,
        validation: (value) => (value ? true : "Name is required"),
      },
      {
        id: "professionalTitle",
        type: "text",
        title: "Professional Headline / Title",
        placeholder: "e.g. B.Tech CSE Student | Full Stack Developer | Aspiring Software Engineer",
        required: true,
        validation: (value) => (value ? true : "Title is required"),
      },
      {
        id: "location",
        type: "text",
        title: "Location",
        placeholder: "e.g. Delhi, India / San Francisco, CA",
        required: false,
      },
      {
        id: "email",
        type: "email",
        title: "Email",
        placeholder: "alex@example.com",
        required: true,
        validation: (value: unknown) => (value && typeof value === "string" && value.includes("@") ? true : "Valid email required"),
      },
      {
        id: "profilePhoto",
        type: "image-upload",
        title: "Profile Photo (Upload Image)",
        placeholder: "Upload your photo (PNG, JPG, WebP)",
        required: false,
      },
      {
        id: "coverBanner",
        type: "image-upload",
        title: "Profile Cover Banner (Optional)",
        description: "Upload a custom header banner or leave blank to use your selected theme's stylish banner preset.",
        placeholder: "Upload custom header banner (PNG, JPG, WebP)",
        required: false,
      },
      {
        id: "resumeUrl",
        type: "pdf-upload",
        title: "Resume / CV (Upload PDF)",
        description: "Upload your resume in PDF format so recruiters can view and download it directly.",
        placeholder: "Click or drag & drop Resume PDF",
        required: false,
      },
      {
        id: "shortBio",
        type: "textarea",
        title: "Short Bio",
        description: "What should people know about you?",
        placeholder: "Passionate engineer eager to solve real-world problems through scalable code...",
        required: false,
      },
    ],
  },
  {
    id: "career",
    title: "What is your current status?",
    description: "Tell us your current academic or professional background.",
    questions: [
      {
        id: "userCategory",
        type: "select",
        title: "I am currently a...",
        required: true,
        options: [
          { value: "btech-student", label: "🎓 B.Tech / Engineering Student (Pursuing)" },
          { value: "college-student", label: "🎓 College Student (BCA, MCA, B.Sc, Diploma, etc.)" },
          { value: "fresher", label: "🚀 Recent Graduate / Fresher (Looking for first job)" },
          { value: "working-professional", label: "💼 Working Professional / Experienced Engineer" },
          { value: "freelancer", label: "⚡ Freelancer / Independent Developer" },
        ],
        validation: (value) => (value ? true : "Please select your current status"),
      },
      {
        id: "currentRole",
        type: "select",
        title: "Primary Specialization / Role",
        required: true,
        options: [
          { value: "fullstack-developer", label: "Full Stack Developer" },
          { value: "frontend-developer", label: "Frontend Developer" },
          { value: "backend-developer", label: "Backend Developer" },
          { value: "software-developer", label: "Software Engineer / SDE" },
          { value: "ai-ml-engineer", label: "AI / Machine Learning Engineer" },
          { value: "data-scientist", label: "Data Scientist / Analyst" },
          { value: "mobile-developer", label: "Android / iOS App Developer" },
          { value: "cloud-devops", label: "Cloud & DevOps Engineer" },
          { value: "cybersecurity", label: "Cybersecurity Specialist" },
          { value: "ui-ux-designer", label: "UI / UX Designer" },
          { value: "student", label: "Computer Science / Tech Student" },
          { value: "other", label: "Other" },
        ],
        validation: (value) => (value ? true : "Please select a role"),
      },
      {
        id: "targetRole",
        type: "text",
        title: "Target Role / Dream Job",
        placeholder: "e.g. SDE 1, Frontend Engineer, AI Researcher",
        description: "What role are you targeting? (Optional)",
        required: false,
      },
    ],
  },
  {
    id: "skills",
    title: "Your Skills",
    description: "Select your skills from categories or add custom ones.",
    questions: [
      {
        id: "skills",
        type: "skill-selector",
        title: "Skills",
        description: "Add skills by category. You can also add custom skills.",
        required: false,
      },
    ],
  },
  {
    id: "projects",
    title: "Your Projects",
    description: "Which projects are you proud of? Showcase your best work.",
    questions: [
      {
        id: "projects",
        type: "project-builder",
        title: "Projects",
        description: "Add your projects with details, tech stack, and links.",
        required: false,
      },
    ],
  },
  {
    id: "experience",
    title: "Work & Internship Experience",
    description: "Add full-time work, internships, freelance, or research experience. (Students & Freshers can skip this)",
    questions: [
      {
        id: "hasExperience",
        type: "select",
        title: "Do you have work or internship experience?",
        required: false,
        placeholder: "Select an option or skip...",
        options: [
          { value: "yes", label: "Yes (Add Full-time / Internship / Research)" },
          { value: "no", label: "No / Skip (Currently a student or fresher)" },
        ],
      },
      {
        id: "experience",
        type: "experience-builder",
        title: "Experience Details",
        description: "Add your role, organization/company, key projects, and achievements.",
        required: false,
        dependsOn: { field: "hasExperience", value: "yes" },
      },
    ],
  },
  {
    id: "education",
    title: "Education & Academics",
    description: "Add your College/University, degree (e.g. B.Tech Computer Science), graduation year, and CGPA/Percentage.",
    questions: [
      {
        id: "education",
        type: "education-builder",
        title: "Education",
        description: "Add degrees, institutions, and relevant details.",
        required: false,
      },
    ],
  },
  {
    id: "certifications",
    title: "Certifications",
    description: "Add any certifications or credentials you've earned.",
    questions: [
      {
        id: "certifications",
        type: "multi-select",
        title: "Certifications",
        description: "Add certification name, issuer, date, and credential URL.",
        required: false,
      },
    ],
  },
  {
    id: "social",
    title: "Social Links",
    description: "Connect your professional profiles and social media.",
    questions: [
      {
        id: "socialLinks",
        type: "social-links",
        title: "Social Links",
        description: "Add your GitHub, LinkedIn, Twitter, and other profiles.",
        required: false,
      },
    ],
  },
]

export function getStepById(id: string): QuestionStep | undefined {
  return QUESTIONNAIRE_STEPS.find((step) => step.id === id)
}

export function getNextStepId(currentStepId: string): string | null {
  const currentIndex = QUESTIONNAIRE_STEPS.findIndex((step) => step.id === currentStepId)
  if (currentIndex === -1 || currentIndex === QUESTIONNAIRE_STEPS.length - 1) {
    return null
  }
  return QUESTIONNAIRE_STEPS[currentIndex + 1].id
}

export function getPreviousStepId(currentStepId: string): string | null {
  const currentIndex = QUESTIONNAIRE_STEPS.findIndex((step) => step.id === currentStepId)
  if (currentIndex <= 0) {
    return null
  }
  return QUESTIONNAIRE_STEPS[currentIndex - 1].id
}

export function getStepProgress(stepId: string): number {
  const index = QUESTIONNAIRE_STEPS.findIndex((step) => step.id === stepId)
  if (index === -1) return 0
  return ((index + 1) / QUESTIONNAIRE_STEPS.length) * 100
}