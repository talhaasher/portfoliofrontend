"use client"

import { useState, useEffect } from "react"
import { dataFetcher } from "@/lib/data-fetcher"
import type { Skill } from "@/lib/database"

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        const skillsData = await dataFetcher.getSkills()
        setSkills(skillsData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch skills"))
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const refreshSkills = async () => {
    try {
      setLoading(true)
      const skillsData = await dataFetcher.getSkills(true)
      setSkills(skillsData)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to refresh skills"))
    } finally {
      setLoading(false)
    }
  }

  return { skills, loading, error, refreshSkills }
}
