"use client"

import * as React from "react"
import { FileDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PortfolioData, SectionConfig } from "@/types/portfolio"

export const BANNER_PRESETS = [
  { name: "Dark Bento", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=600&fit=crop&q=80" },
  { name: "Cyber Neon", url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&h=600&fit=crop&q=80" },
  { name: "Neo Pop", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&h=600&fit=crop&q=80" },
  { name: "Aurora Wave", url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&h=600&fit=crop&q=80" },
  { name: "Minimal Studio", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=600&fit=crop&q=80" },
  { name: "Glass Mesh", url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&h=600&fit=crop&q=80" },
]

export function SectionRenderer({ section, portfolio }: { section: SectionConfig; portfolio: PortfolioData }) {
  const tokens = portfolio.theme.tokens

  const isNeo = portfolio.theme.id === "neo-brutalism" || portfolio.theme.id === "neo-brutalist"
  const isCyber = portfolio.theme.id === "cyberpunk"
  const isBento = portfolio.theme.id === "bento"
  const isGlass = portfolio.theme.id === "glassmorphism"
  const isAurora = portfolio.theme.id === "aurora"
  const isMinimal = portfolio.theme.id === "minimal"

  const cardStyle: React.CSSProperties = {
    background: tokens.colors.surface,
    borderColor: tokens.colors.border,
    color: tokens.colors.text,
    borderWidth: isNeo ? "2.5px" : "1px",
    borderRadius: isNeo ? "0.6rem" : isBento ? "1.25rem" : tokens.borderRadius.lg,
    boxShadow: isNeo
      ? "5px 5px 0px #000000"
      : isCyber
      ? "0 0 20px rgba(0, 240, 255, 0.22)"
      : isBento
      ? "0 12px 35px -5px rgba(0, 0, 0, 0.6)"
      : tokens.shadows.md,
    ...(isGlass && { backdropFilter: "blur(20px)" }),
    ...(isAurora && { backdropFilter: "blur(16px)" }),
  }

  const primaryBtnStyle: React.CSSProperties = {
    background: isNeo
      ? "#ffdf00"
      : isCyber
      ? "#00f0ff"
      : isBento
      ? "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)"
      : tokens.colors.primary,
    color: isNeo || isCyber ? "#000000" : "#ffffff",
    border: isNeo ? "2.5px solid #000000" : "none",
    boxShadow: isNeo ? "3px 3px 0px #000000" : isCyber ? "0 0 15px rgba(0, 240, 255, 0.4)" : tokens.shadows.sm,
    fontWeight: isNeo ? 700 : 600,
  }

  const badgeStyle: React.CSSProperties = {
    background: isNeo ? "#ffffff" : tokens.colors.surface,
    color: isNeo ? "#000000" : tokens.colors.text,
    border: isNeo ? "2px solid #000000" : `1px solid ${tokens.colors.border}`,
    boxShadow: isNeo ? "2px 2px 0px #000000" : "none",
    fontWeight: isNeo ? 700 : 500,
  }

  const sectionStyles: React.CSSProperties = {
    padding: "2.5rem 1rem",
    maxWidth: "1150px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  }

  const headingStyle: React.CSSProperties = {
    fontSize: tokens.typography.fontSize["3xl"],
    fontWeight: tokens.typography.fontWeight.bold,
    fontFamily: tokens.typography.fontFamily.display,
    marginBottom: tokens.spacing.md,
    color: tokens.colors.text,
    letterSpacing: isNeo ? "-0.03em" : isCyber ? "0.05em" : "-0.02em",
  }

  switch (section.type) {
    case "hero": {
      const effectiveBanner =
        portfolio.profile.coverBanner ||
        (isCyber
          ? "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&h=600&fit=crop&q=80"
          : isNeo
          ? "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&h=600&fit=crop&q=80"
          : isAurora
          ? "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&h=600&fit=crop&q=80"
          : isMinimal
          ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=600&fit=crop&q=80"
          : isGlass
          ? "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&h=600&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=600&fit=crop&q=80")

      return (
        <section style={sectionStyles} className="w-full text-center py-4 sm:py-8">
          <div className="max-w-4xl mx-auto w-full">
            {/* Header Cover Banner */}
            <div
              className={cn(
                "w-full relative overflow-hidden shadow-xl border mb-2",
                isNeo ? "rounded-2xl" : isBento ? "rounded-3xl" : "rounded-2xl"
              )}
              style={{
                borderColor: tokens.colors.border,
                borderWidth: isNeo ? "2.5px" : "1px",
                boxShadow: isNeo ? "5px 5px 0px #000000" : isCyber ? "0 0 25px rgba(0,240,255,0.25)" : tokens.shadows.md,
              }}
            >
              <div className="w-full h-36 sm:h-52 md:h-64 relative bg-black/40 overflow-hidden">
                <img
                  src={effectiveBanner}
                  alt="Profile Cover Banner"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: isCyber
                      ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(10,10,20,0.85) 100%)"
                      : isNeo
                      ? "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 100%)"
                      : "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)",
                  }}
                />
              </div>

              {/* Status badge pill top-right on banner */}
              <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-10">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-md"
                  style={{
                    background: isNeo ? "#ffdf00" : "rgba(0, 0, 0, 0.7)",
                    color: isNeo ? "#000000" : "#ffffff",
                    border: isNeo ? "2px solid #000000" : "1px solid rgba(255,255,255,0.25)",
                    boxShadow: isNeo ? "2px 2px 0px #000000" : "none",
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 absolute shrink-0" />
                  <span className="ml-1 truncate max-w-[140px] sm:max-w-none">
                    {portfolio.profile.statusMessage || "Open for Opportunities"}
                  </span>
                </span>
              </div>
            </div>

            {/* Profile Avatar prominently overlapping banner */}
            <div className="relative -mt-16 sm:-mt-24 md:-mt-28 mb-4 inline-block mx-auto z-20">
              <div
                className={cn(
                  "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 overflow-hidden mx-auto transition-transform duration-300 hover:scale-105",
                  isNeo ? "rounded-2xl" : "rounded-full"
                )}
                style={{
                  border: isNeo
                    ? "4px solid #000000"
                    : isCyber
                    ? "3.5px solid #00f0ff"
                    : `4px solid ${tokens.colors.surface}`,
                  boxShadow: isNeo
                    ? "6px 6px 0px #000000"
                    : isCyber
                    ? "0 0 35px rgba(0, 240, 255, 0.6)"
                    : isBento
                    ? "0 18px 40px -8px rgba(0,0,0,0.65)"
                    : "0 15px 35px rgba(0,0,0,0.35)",
                  background: tokens.colors.surface,
                }}
              >
                {portfolio.profile.profilePhoto ? (
                  <img
                    src={portfolio.profile.profilePhoto}
                    alt={portfolio.profile.fullName}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center font-bold text-2xl sm:text-4xl text-white"
                    style={{
                      background: isNeo
                        ? "#ffdf00"
                        : isCyber
                        ? "linear-gradient(135deg, #00f0ff 0%, #ff0055 100%)"
                        : `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.secondary} 100%)`,
                      color: isNeo ? "#000000" : "#ffffff",
                    }}
                  >
                    {portfolio.profile.fullName
                      ? portfolio.profile.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "PF"}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-4 max-w-2xl mx-auto px-2">
              {portfolio.profile.userCategory && (
                <div className="flex justify-center">
                  <span
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm"
                    style={{
                      ...badgeStyle,
                      color: isNeo ? "#000000" : tokens.colors.primary,
                    }}
                  >
                    🎓 {portfolio.profile.userCategory.replace(/-/g, " ").toUpperCase()}
                  </span>
                </div>
              )}

              <h1
                className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight break-words"
                style={{
                  fontFamily: tokens.typography.fontFamily.display,
                  lineHeight: 1.15,
                  color: tokens.colors.text,
                }}
              >
                {portfolio.profile.fullName}
              </h1>

              <p
                className="text-sm sm:text-lg md:text-xl font-medium"
                style={{
                  color: isNeo ? "#000000" : tokens.colors.primary,
                }}
              >
                {portfolio.profile.professionalTitle}
              </p>

              {portfolio.headline && (
                <p
                  className="text-xs sm:text-sm md:text-base leading-relaxed"
                  style={{
                    color: tokens.colors.textMuted,
                  }}
                >
                  {portfolio.headline}
                </p>
              )}

              {/* Action buttons including Resume Download and Social */}
              <div className="flex items-center justify-center gap-2.5 pt-2 flex-wrap w-full">
                {portfolio.profile.resumeUrl && (
                  <a
                    href={portfolio.profile.resumeUrl}
                    download="resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-transform hover:scale-105 shadow-md w-full sm:w-auto"
                    style={primaryBtnStyle}
                  >
                    <FileDown className="h-4 w-4 shrink-0" /> Download Resume / CV (.PDF)
                  </a>
                )}

                {portfolio.socialLinks.slice(0, 5).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shrink-0"
                    style={{
                      ...badgeStyle,
                      borderRadius: isNeo ? "0.5rem" : "9999px",
                    }}
                    title={link.platform}
                  >
                    <span className="text-xs font-bold uppercase">{link.platform.charAt(0)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )
    }

    case "about":
      return (
        <section style={sectionStyles}>
          <div className="flex items-center gap-3 mb-6">
            <h2 style={headingStyle}>About Me</h2>
            {isNeo && <span className="text-xl">⚡</span>}
            {isCyber && <span className="h-0.5 flex-1 bg-gradient-to-r from-[#00f0ff] to-transparent" />}
          </div>
          <div className="p-6 sm:p-8 transition-all" style={cardStyle}>
            <p
              style={{
                fontSize: tokens.typography.fontSize.lg,
                lineHeight: tokens.typography.lineHeight.relaxed,
                color: tokens.colors.text,
                whiteSpace: "pre-line",
              }}
            >
              {portfolio.about || portfolio.profile.shortBio}
            </p>
            {portfolio.profile.location && (
              <div
                className="mt-5 pt-4 border-t flex items-center gap-2 text-xs"
                style={{ borderColor: tokens.colors.border, color: tokens.colors.textMuted }}
              >
                <span>📍 Based in {portfolio.profile.location}</span>
                {portfolio.profile.email && <span>&bull; ✉️ {portfolio.profile.email}</span>}
              </div>
            )}
          </div>
        </section>
      )

    case "skills":
      return (
        <section style={sectionStyles}>
          <div className="flex items-center gap-3 mb-6">
            <h2 style={headingStyle}>Technical Skills</h2>
            {isNeo && <span className="text-xl">🛠️</span>}
            {isCyber && <span className="h-0.5 flex-1 bg-gradient-to-r from-[#ff0055] to-transparent" />}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {portfolio.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={badgeStyle}
              >
                {skill.name}
                {skill.level && (
                  <span className="ml-1.5 opacity-60 text-xs font-normal">
                    &bull; {skill.level}
                  </span>
                )}
              </span>
            ))}
          </div>
        </section>
      )

    case "projects":
      return (
        <section style={sectionStyles}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 style={headingStyle}>Featured Projects</h2>
              {isNeo && <span className="text-xl">🚀</span>}
            </div>
            {isCyber && <span className="text-xs font-mono text-[#00f0ff] tracking-widest">[PORTFOLIO_OUTPUT]</span>}
          </div>
          <div
            className={cn(
              "grid gap-4 sm:gap-6",
              isBento ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {portfolio.projects.map((project, idx) => {
              const isHeroCard = isBento && idx === 0
              return (
                <div
                  key={project.id}
                  className={cn(
                    "overflow-hidden transition-all hover:-translate-y-1 flex flex-col justify-between",
                    isHeroCard ? "col-span-1 md:col-span-2" : "col-span-1"
                  )}
                  style={cardStyle}
                >
                  {project.image && (
                    <div
                      className={cn("w-full overflow-hidden bg-black/40 border-b", isHeroCard ? "h-48 sm:h-64" : "h-40 sm:h-48")}
                      style={{ borderColor: tokens.colors.border }}
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-lg md:text-xl" style={{ color: tokens.colors.text }}>
                          {project.name}
                        </h3>
                        {project.featured && (
                          <span
                            className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full"
                            style={{
                              background: isNeo ? "#ffdf00" : tokens.colors.primary,
                              color: isNeo ? "#000000" : "#ffffff",
                              border: isNeo ? "1.5px solid #000000" : "none",
                            }}
                          >
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: tokens.colors.textMuted }}>
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded text-[11px] font-medium"
                            style={{
                              background: isNeo
                                ? "#ffffff"
                                : isCyber
                                ? "rgba(0,240,255,0.08)"
                                : "rgba(255,255,255,0.06)",
                              color: isNeo ? "#000000" : isCyber ? "#00f0ff" : tokens.colors.text,
                              border: isNeo ? "1.5px solid #000" : `1px solid ${tokens.colors.border}`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div
                        className="flex items-center gap-3 pt-3 border-t"
                        style={{ borderColor: tokens.colors.border }}
                      >
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold hover:underline inline-flex items-center gap-1 transition-opacity hover:opacity-80"
                            style={{ color: tokens.colors.primary }}
                          >
                            Code &rarr;
                          </a>
                        )}
                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold px-3 py-1.5 rounded transition-transform hover:scale-105 inline-flex items-center gap-1"
                            style={primaryBtnStyle}
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )

    case "education":
      return (
        <section style={sectionStyles}>
          <div className="flex items-center gap-3 mb-6">
            <h2 style={headingStyle}>Education & Academics</h2>
            {isNeo && <span className="text-xl">🎓</span>}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {portfolio.education.map((edu) => (
              <div
                key={edu.id}
                className="p-5 sm:p-6 space-y-2.5 transition-all"
                style={cardStyle}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-base md:text-lg" style={{ color: tokens.colors.text }}>
                    {edu.degree}
                  </h3>
                  {edu.grade && (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0"
                      style={{
                        background: isNeo ? "#ffdf00" : "rgba(16,185,129,0.15)",
                        color: isNeo ? "#000000" : "#10b981",
                        border: isNeo ? "2px solid #000000" : "1px solid rgba(16,185,129,0.3)",
                        boxShadow: isNeo ? "2px 2px 0px #000000" : "none",
                      }}
                    >
                      {edu.grade}
                    </span>
                  )}
                </div>
                {edu.fieldOfStudy && (
                  <p className="text-sm font-semibold" style={{ color: tokens.colors.primary }}>
                    {edu.fieldOfStudy}
                  </p>
                )}
                <p className="text-xs font-medium" style={{ color: tokens.colors.textMuted }}>
                  {edu.institution} &bull; {edu.startDate} - {edu.endDate || "Present"}
                </p>
                {edu.description && (
                  <p className="text-xs leading-relaxed pt-1" style={{ color: tokens.colors.text }}>
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )

    case "experience":
      return (
        <section style={sectionStyles}>
          <div className="flex items-center gap-3 mb-6">
            <h2 style={headingStyle}>Work & Internships</h2>
            {isNeo && <span className="text-xl">💼</span>}
          </div>
          <div className="space-y-4">
            {portfolio.experience.map((exp) => (
              <div
                key={exp.id}
                className="p-5 sm:p-6 space-y-3 transition-all"
                style={cardStyle}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base md:text-lg" style={{ color: tokens.colors.text }}>
                      {exp.jobTitle}
                    </h3>
                    <span style={{ color: tokens.colors.textMuted }}>at</span>
                    <span className="font-semibold" style={{ color: tokens.colors.primary }}>
                      {exp.company}
                    </span>
                  </div>
                  {exp.currentlyWorking && (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: isNeo ? "#00ffff" : tokens.colors.primary,
                        color: isNeo ? "#000000" : "#ffffff",
                        border: isNeo ? "2px solid #000000" : "none",
                      }}
                    >
                      Present
                    </span>
                  )}
                </div>

                <p className="text-xs" style={{ color: tokens.colors.textMuted }}>
                  {exp.location} &bull; {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>

                <p className="text-sm" style={{ color: tokens.colors.text }}>
                  {exp.description}
                </p>

                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-xs" style={{ color: tokens.colors.textMuted }}>
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                )}

                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-medium"
                        style={{
                          background: isNeo
                            ? "#ffffff"
                            : isCyber
                            ? "rgba(0,240,255,0.08)"
                            : "rgba(255,255,255,0.06)",
                          color: isNeo ? "#000000" : isCyber ? "#00f0ff" : tokens.colors.text,
                          border: isNeo ? "1.5px solid #000" : `1px solid ${tokens.colors.border}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )

    case "certifications":
      return (
        <section style={sectionStyles}>
          <div className="flex items-center gap-3 mb-6">
            <h2 style={headingStyle}>Certifications & Credentials</h2>
            {isNeo && <span className="text-xl">🏆</span>}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {portfolio.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-5 sm:p-6 space-y-3 flex flex-col justify-between transition-all"
                style={cardStyle}
              >
                <div>
                  <h3 className="font-bold text-sm md:text-base" style={{ color: tokens.colors.text }}>
                    {cert.name}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: tokens.colors.textMuted }}>
                    Issued by <strong style={{ color: tokens.colors.text }}>{cert.issuingOrganization}</strong> &bull; {cert.date}
                  </p>
                </div>

                {cert.credentialUrl && (
                  <div className="pt-2">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg transition-transform hover:scale-105"
                      style={primaryBtnStyle}
                    >
                      View Credential ↗
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )

    case "contact":
      return (
        <section style={sectionStyles} className="text-center">
          <h2 style={headingStyle}>Get In Touch</h2>
          <p
            style={{
              color: tokens.colors.textMuted,
              marginBottom: tokens.spacing.lg,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Open for internships, full-time opportunities, collaborations, and engineering discussions.
          </p>
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap pt-4 px-2">
            {portfolio.profile.email && (
              <a
                href={`mailto:${portfolio.profile.email}`}
                className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-transform hover:scale-105 inline-flex items-center justify-center gap-2 max-w-full truncate"
                style={primaryBtnStyle}
              >
                ✉️ Email Me ({portfolio.profile.email})
              </a>
            )}
            {portfolio.socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 shrink-0"
                style={badgeStyle}
              >
                {link.platform.toUpperCase()} ↗
              </a>
            ))}
          </div>
        </section>
      )

    case "footer":
      return (
        <footer
          style={{
            padding: "2.5rem 1rem",
            textAlign: "center",
            borderTop: isNeo ? "2.5px solid #000000" : `1px solid ${tokens.colors.border}`,
            background: isNeo ? "#ffffff" : "transparent",
            color: isNeo ? "#000000" : tokens.colors.textMuted,
          }}
        >
          <p style={{ fontSize: "0.875rem", fontWeight: isNeo ? 700 : 400 }}>
            &copy; {new Date().getFullYear()} {portfolio.profile.fullName}. Crafted with PortfolioForge AI.
          </p>
        </footer>
      )

    default:
      return null
  }
}
