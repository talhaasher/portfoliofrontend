import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    const skills = await db.getSkills()
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const skillData = await request.json()
    const newSkill = await db.createSkill(skillData)
    return NextResponse.json(newSkill, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
