"use client"

import { useState } from "react"
import { Award, Calendar, ExternalLink, Star, CheckCircle, RefreshCw } from "lucide-react"
import { useCertifications } from "@/hooks/useCertifications"

export default function Certifications() {
  const { certifications, loading, error, refreshCertifications } = useCertifications()
  const [filter, setFilter] = useState<"all" | "featured" | "active">("all")
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshCertifications()
    setRefreshing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  const isActive = (cert: any) => {
    if (!cert.expiration_date) return true
    return new Date(cert.expiration_date) > new Date()
  }

  const filteredCertifications = certifications.filter((cert) => {
    if (filter === "featured") return cert.is_featured
    if (filter === "active") return isActive(cert)
    return true
  })

  if (error) {
    return (
      <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">Failed to load certifications</p>
            <button onClick={handleRefresh} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading certifications...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl font-bold">Certifications</h2>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Refresh certifications data"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional certifications and credentials that validate my expertise
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
            }`}
          >
            All ({certifications.length})
          </button>
          <button
            onClick={() => setFilter("featured")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "featured"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
            }`}
          >
            Featured ({certifications.filter((c) => c.is_featured).length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "active"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
            }`}
          >
            Active ({certifications.filter((c) => isActive(c)).length})
          </button>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertifications.map((cert) => (
            <div
              key={cert.id}
              className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                cert.is_featured ? "ring-2 ring-blue-200 dark:ring-blue-800" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    {cert.is_featured && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                    {isActive(cert) && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{cert.name}</h3>

                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  {cert.issuing_organization}
                </p>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  Issued: {formatDate(cert.issue_date)}
                  {cert.expiration_date && (
                    <>
                      <br />
                      Expires: {formatDate(cert.expiration_date)}
                    </>
                  )}
                </div>

                {cert.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{cert.description}</p>
                )}

                {cert.skills && cert.skills.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Skills Validated:</h4>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                          +{cert.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {!isActive(cert) && (
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full">
                        Expired
                      </span>
                    )}
                    {isActive(cert) && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      Verify
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>

                {cert.credential_id && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: {cert.credential_id}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredCertifications.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">No certifications found for the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  )
}
