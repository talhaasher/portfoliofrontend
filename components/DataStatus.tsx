"use client"

import { useState } from "react"
import { Database, RefreshCw, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { usePortfolioData } from "@/hooks/usePortfolioData"

export default function DataStatus() {
  const { data, loading, error, lastFetch, refreshData, cacheStats } = usePortfolioData()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshData()
    setIsRefreshing(false)
  }

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return "Never"

    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Database className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="font-semibold text-gray-800 dark:text-white">Data Status</h3>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Refresh all data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing || loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Status:</span>
            <div className="flex items-center">
              {error ? (
                <>
                  <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-red-600 dark:text-red-400">Error</span>
                </>
              ) : loading ? (
                <>
                  <RefreshCw className="w-4 h-4 text-blue-500 mr-1 animate-spin" />
                  <span className="text-blue-600 dark:text-blue-400">Loading</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 dark:text-green-400">Ready</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Last Update:</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-gray-700 dark:text-gray-300">{formatLastUpdate(lastFetch)}</span>
            </div>
          </div>

          {data && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Records:</span>
              <span className="text-gray-700 dark:text-gray-300">
                {data.skills.length +
                  data.education.length +
                  data.certifications.length +
                  data.blogPosts.length +
                  data.projects.length}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Cache:</span>
            <span className="text-gray-700 dark:text-gray-300">
              {cacheStats.activeItems}/{cacheStats.totalItems} active
            </span>
          </div>
        </div>

        {error && (
          <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-600 dark:text-red-400">
            {error.message}
          </div>
        )}
      </div>
    </div>
  )
}
