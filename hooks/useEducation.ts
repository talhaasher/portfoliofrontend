"use client"

import { useState, useEffect } from "react"
import { dataFetcher } from "@/lib/data-fetcher"
import type { Education } from "@/lib/database"

export function useEducation() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true)
        const educationData = await dataFetcher.getEducation()
        setEducation(educationData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch education"))
      } finally {
        setLoading(false)
      }
    }

    fetchEducation()
  }, [])

  const refreshEducation = async () => {
    try {
      setLoading(true)
      const educationData = await dataFetcher.getEducation(true)
      setEducation(educationData)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to refresh education"))
    } finally {
      setLoading(false)
    }
  }

  return { education, loading, error, refreshEducation }
}
