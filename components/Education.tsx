"use client"

import { GraduationCap, Calendar, MapPin, Award, BookOpen, RefreshCw } from "lucide-react"
import { useEducation } from "@/hooks/useEducation"
import { useState } from "react"

export default function Education() {
  const { education, loading, error, refreshEducation } = useEducation()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshEducation()
    setRefreshing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  if (error) {
    return (
      <section id="education" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">Failed to load education</p>
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
      <section id="education" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading education...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl font-bold">Education</h2>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Refresh education data"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My academic journey and continuous learning path
          </p>
        </div>

        <div className="space-y-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{edu.degree}</h3>
                        {edu.field_of_study && (
                          <p className="text-lg text-blue-600 dark:text-blue-400 mb-2">{edu.field_of_study}</p>
                        )}
                        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{edu.institution}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(edu.start_date)} -{" "}
                        {edu.is_current ? "Present" : edu.end_date ? formatDate(edu.end_date) : "Present"}
                      </div>
                      {edu.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {edu.location}
                        </div>
                      )}
                      {edu.grade && (
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          {edu.grade}
                        </div>
                      )}
                    </div>

                    {edu.description && (
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{edu.description}</p>
                    )}

                    {edu.achievements && edu.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-yellow-500" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="flex items-start text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {edu.is_current && (
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Currently Enrolled
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
