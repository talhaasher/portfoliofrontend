"use client"

import { useState, useEffect } from "react"
import { dataFetcher } from "@/lib/data-fetcher"
import type { Certification } from "@/lib/database"

export function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true)
        const certificationsData = await dataFetcher.getCertifications()
        setCertifications(certificationsData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch certifications"))
      } finally {
        setLoading(false)
      }
    }

    fetchCertifications()
  }, [])

  const refreshCertifications = async () => {
    try {
      setLoading(true)
      const certificationsData = await dataFetcher.getCertifications(true)
      setCertifications(certificationsData)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to refresh certifications"))
    } finally {
      setLoading(false)
    }
  }

  return { certifications, loading, error, refreshCertifications }
}
