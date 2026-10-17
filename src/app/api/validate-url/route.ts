import { NextRequest, NextResponse } from "next/server"

export async function HEAD(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get("url")

  if (!url) {
    return new NextResponse(null, { status: 400 })
  }

  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow" })
    return new NextResponse(null, { status: response.ok ? 200 : 400 })
  } catch {
    return new NextResponse(null, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  return HEAD(request)
}