import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "PortfolioForge AI - Build Your Portfolio With AI",
  description: "Answer a few questions, connect your GitHub, choose your style, and generate a professional portfolio in minutes.",
  keywords: ["portfolio", "AI", "developer", "GitHub", "Next.js", "React", "portfolio builder"],
  authors: [{ name: "PortfolioForge AI" }],
  creator: "PortfolioForge AI",
  publisher: "PortfolioForge AI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolioforge.ai",
    title: "PortfolioForge AI - Build Your Portfolio With AI",
    description: "Answer a few questions, connect your GitHub, choose your style, and generate a professional portfolio in minutes.",
    siteName: "PortfolioForge AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "PortfolioForge AI - Build Your Portfolio With AI",
    description: "Answer a few questions, connect your GitHub, choose your style, and generate a professional portfolio in minutes.",
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  )
}