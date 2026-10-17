import { Metadata } from "next"
import PreviewPage from "@/app/preview/page"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Portfolio Preview (${id}) | PortfolioForge AI`,
    description: "Preview your AI-generated portfolio",
  }
}

export default async function PreviewByIdPage({ params }: { params: Promise<{ id: string }> }) {
  await params
  return <PreviewPage />
}
