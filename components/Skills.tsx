"use client"

import { useState } from "react"
import { Star, TrendingUp, RefreshCw } from "lucide-react"
import { useSkills } from "@/hooks/useSkills"

export default function Skills() {
  const { skills, loading, error, refreshSkills } = useSkills()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshSkills()
    setRefreshing(false)
  }

  const categories = ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))]
  const filteredSkills =
    selectedCategory === "All" ? skills : skills.filter((skill) => skill.category === selectedCategory)

  const groupedSkills = filteredSkills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>,
  )

  const getSkillLevelText = (level: number) => {
    const levels = ["Beginner", "Novice", "Intermediate", "Advanced", "Expert"]
    return levels[level - 1] || "Intermediate"
  }

  const getSkillColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (error) {
    return (
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">Failed to load skills</p>
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
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading skills...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl font-bold">Skills & Expertise</h2>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Refresh skills data"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent applications and solving complex problems
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                {category}
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                      skill.is_featured
                        ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{skill.name}</h4>
                        {skill.is_featured && <Star className="w-4 h-4 ml-2 text-yellow-500 fill-current" />}
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getSkillColor(skill.color || "blue")}`}>
                        {getSkillLevelText(skill.level)}
                      </span>
                    </div>

                    {/* Skill Level Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span>{skill.level}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.years_experience} year{skill.years_experience !== 1 ? "s" : ""} experience
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
