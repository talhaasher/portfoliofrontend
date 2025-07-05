import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    const education = await db.getEducation()
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const educationData = await request.json()
    const newEducation = await db.createEducation(educationData)
    return NextResponse.json(newEducation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 })
  }
}
