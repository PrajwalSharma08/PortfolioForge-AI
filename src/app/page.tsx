"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, GitBranch, Zap, Palette, Code, Layers, Monitor, CheckCircle, Sparkles, Rocket, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const FEATURES = [
  {
    icon: Brain,
    title: "AI Portfolio Generation",
    description: "Answer a few questions and let AI craft your professional headline, about section, and project descriptions using your actual experience.",
  },
  {
    icon: GitBranch,
    title: "GitHub Import",
    description: "Connect your GitHub account to automatically import repositories, languages, and topics. Select only the projects you want to showcase.",
  },
  {
    icon: Palette,
    title: "Multiple Premium Themes",
    description: "Choose from 10+ professionally designed themes including Glassmorphism, Minimal, Cyberpunk, Terminal, Bento, and more.",
  },
  {
    icon: Code,
    title: "Live Visual Editor",
    description: "Edit content, rearrange sections, tweak design tokens, and preview changes in real-time across desktop, tablet, and mobile.",
  },
  {
    icon: Layers,
    title: "Section Engine",
    description: "Modular sections for Hero, About, Skills, Projects, Experience, Education, Certifications, and Contact. Show, hide, or reorder any section.",
  },
  {
    icon: Monitor,
    title: "Responsive by Default",
    description: "Every generated portfolio works flawlessly on all devices. Test at 320px, 375px, 768px, 1024px, 1440px, and 1920px breakpoints.",
  },
]

const FAQ = [
  {
    question: "Do I need to know coding to use this?",
    answer: "Not at all! PortfolioForge AI handles all the code generation. You just answer questions, pick a theme, and customize visually.",
  },
  {
    question: "Can I use my own GitHub projects?",
    answer: "Yes! Connect your GitHub account and select exactly which repositories you want to showcase in your portfolio.",
  },
  {
    question: "Is the generated code clean and deployable?",
    answer: "Absolutely. Download a complete Next.js project with clean, production-ready code that you can deploy to Vercel, Netlify, or any host.",
  },
  {
    question: "Can I customize the design after generation?",
    answer: "Yes! The live editor lets you modify colors, typography, spacing, animations, and section order with instant preview.",
  },
  {
    question: "What if I don't have a GitHub account?",
    answer: "No problem. You can skip GitHub import and manually add all your projects, skills, and experience through the questionnaire.",
  },
  {
    question: "Is my data private?",
    answer: "Yes. All data is stored locally in your browser until you choose to download. We never see your information.",
  },
]



export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">PortfolioForge AI</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/onboarding" className="hidden sm:block">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/onboarding">
                <Button size="sm">Create My Portfolio</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8 max-w-4xl mx-auto"
            >
              <Badge variant="secondary" className="gap-2 mx-auto">
                <Sparkles className="h-3 w-3" />
                <span>Now with AI Generation</span>
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Build Your Portfolio{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">With AI</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Answer a few questions, connect your GitHub, choose your style, and generate a professional portfolio in minutes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/onboarding">
                  <Button size="xl" className="w-full sm:w-auto gap-2" variant="premium">
                    <Sparkles className="h-5 w-5" />
                    Create My Portfolio
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#themes">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2">
                    <Palette className="h-5 w-5" />
                    Explore Themes
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> No coding required</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> Git integration</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-500" /> Download & deploy</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 relative"
            >
              <div className="relative max-w-5xl mx-auto">
                <div className="rounded-2xl border border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 text-center text-xs text-muted-foreground font-mono">alexmorgan.dev</div>
                  </div>
                  <div className="p-8 h-96 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 flex items-center justify-center">
                    <div className="text-center space-y-4 max-w-md">
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                      <div>
                        <h3 className="text-2xl font-bold">Alex Morgan</h3>
                        <p className="text-muted-foreground">Full Stack Developer</p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">Next.js</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">Node.js</Badge>
                        <Badge variant="outline">PostgreSQL</Badge>
                        <Badge variant="outline">Docker</Badge>
                      </div>
                      <div className="flex justify-center gap-4 pt-4">
                        <Button variant="outline" size="sm"><GitBranch className="h-4 w-4 mr-1" /> GitHub</Button>
                        <Button variant="outline" size="sm">Live Demo</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 lg:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <Badge variant="secondary" className="mx-auto gap-2"><Zap className="h-3 w-3" /> How It Works</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">From Idea to Portfolio in 4 Steps</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A streamlined flow designed for developers who want results fast.</p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Answer Questions", desc: "Complete a guided questionnaire about your background, skills, projects, and goals.", icon: Code },
                { step: "02", title: "Import from GitHub", desc: "Connect GitHub to auto-import repos, or skip and add projects manually.", icon: GitBranch },
                { step: "03", title: "AI Generates Content", desc: "Our AI writes professional copy for your headline, about, and project descriptions.", icon: Brain },
                { step: "04", title: "Customize & Download", desc: "Pick a theme, tweak in the live editor, then download a deployable Next.js project.", icon: Rocket },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute left-1/2 -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent hidden md:block" />
                  <Card className="h-full relative z-10">
                    <CardContent className="p-6 space-y-4 h-full flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs font-mono text-primary font-bold">{item.step}</span>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground flex-1">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <Badge variant="secondary" className="mx-auto gap-2"><Sparkles className="h-3 w-3" /> Features</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">Everything You Need</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Powerful features designed for developers who care about quality.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="themes" className="py-20 lg:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <Badge variant="secondary" className="mx-auto gap-2"><Palette className="h-3 w-3" /> Themes</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">10+ Premium Themes</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Each theme is a complete design system with unique layouts, typography, and animations.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { id: "glassmorphism", name: "Glassmorphism", desc: "Frosted glass elegance" },
                { id: "minimal", name: "Minimal", desc: "Clean & distraction-free" },
                { id: "cyberpunk", name: "Cyberpunk", desc: "Neon futuristic" },
                { id: "terminal", name: "Terminal", desc: "Command-line aesthetic" },
                { id: "bento", name: "Bento", desc: "Grid-based layout" },
                { id: "editorial", name: "Editorial", desc: "Magazine-style design" },
                { id: "aurora", name: "Aurora", desc: "Ethereal gradients" },
                { id: "neo-brutalist", name: "Neo Brutalist", desc: "Bold raw design" },
                { id: "corporate", name: "Corporate", desc: "Professional polish" },
                { id: "futuristic-ai", name: "Futuristic AI", desc: "AI-inspired visuals" },
              ].map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card className="h-full group overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-pink-500/10 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-12 w-12 text-primary/50 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <h3 className="font-semibold">{theme.name}</h3>
                      <p className="text-sm text-muted-foreground">{theme.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/onboarding">
                <Button size="lg" variant="premium" className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  Start Building My Portfolio
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 lg:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <Badge variant="secondary" className="mx-auto gap-2"><Code className="h-3 w-3" /> FAQ</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
            </motion.div>

            <div className="space-y-4">
              {FAQ.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <details className="group bg-card border border-border rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="font-medium text-lg">{item.question}</span>
                      <svg className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold">Ready to Build Your Portfolio?</h2>
              <p className="text-muted-foreground text-lg mt-4">
                Join thousands of developers who&apos;ve created their professional portfolio with PortfolioForge AI.
              </p>
              <Link href="/onboarding">
                <Button size="xl" variant="premium" className="gap-2 mt-4">
                  <Sparkles className="h-5 w-5" />
                  Create My Portfolio Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">Free to start • No credit card required • Download anytime</p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">PortfolioForge AI</span>
              </div>
              <p className="text-sm text-muted-foreground">Build professional portfolios with AI. No coding required.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/onboarding" className="hover:text-foreground transition-colors">Create Portfolio</Link></li>
                <li><Link href="#themes" className="hover:text-foreground transition-colors">Themes</Link></li>
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 PortfolioForge AI. Built with Next.js, React, and TypeScript.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}