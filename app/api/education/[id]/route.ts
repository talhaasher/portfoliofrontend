import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { requireAuth } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = requireAuth(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updates = await request.json()
    const updatedEducation = await db.updateEducation(params.id, updates)

    if (!updatedEducation) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 })
    }

    return NextResponse.json(updatedEducation)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = requireAuth(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const deleted = await db.deleteEducation(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Education deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 })
  }
}
