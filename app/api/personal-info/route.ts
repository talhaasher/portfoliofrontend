import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  try {
    const info = await db.getPersonalInfo()
    return NextResponse.json(info)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch personal info" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const info = await request.json()
    await db.savePersonalInfo(info)
    return NextResponse.json({ message: "Personal info updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update personal info" }, { status: 500 })
  }
}
