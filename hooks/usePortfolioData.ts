"use client"

import { useState, useEffect, useCallback } from "react"
import { dataFetcher, type PortfolioData } from "@/lib/data-fetcher"

interface UsePortfolioDataOptions {
  autoRefresh?: boolean
  refreshInterval?: number
  onError?: (error: Error) => void
  onSuccess?: (data: PortfolioData) => void
}

export function usePortfolioData(options: UsePortfolioDataOptions = {}) {
  const {
    autoRefresh = true,
    refreshInterval = 2 * 24 * 60 * 60 * 1000, // 2 days
    onError,
    onSuccess,
  } = options

  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)

  const fetchData = useCallback(
    async (forceRefresh = false) => {
      try {
        setLoading(true)
        setError(null)

        const portfolioData = await dataFetcher.getAllData(forceRefresh)

        setData(portfolioData)
        setLastFetch(new Date())
        onSuccess?.(portfolioData)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to fetch data")
        setError(error)
        onError?.(error)
      } finally {
        setLoading(false)
      }
    },
    [onError, onSuccess],
  )

  const refreshData = useCallback(() => {
    return fetchData(true)
  }, [fetchData])

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchData(true)
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchData])

  // Page visibility change handler
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && lastFetch) {
        const timeSinceLastFetch = Date.now() - lastFetch.getTime()
        const shouldRefresh = timeSinceLastFetch > refreshInterval

        if (shouldRefresh) {
          fetchData(true)
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [lastFetch, refreshInterval, fetchData])

  return {
    data,
    loading,
    error,
    lastFetch,
    refreshData,
    cacheStats: dataFetcher.getCacheStats(),
  }
}
