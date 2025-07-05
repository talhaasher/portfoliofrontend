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
    const updatedCertification = await db.updateCertification(params.id, updates)

    if (!updatedCertification) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 })
    }

    return NextResponse.json(updatedCertification)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update certification" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = requireAuth(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const deleted = await db.deleteCertification(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Certification deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 })
  }
}
