import { supabase } from "@/lib/database"
import { dataCache } from "@/lib/cache"
import type { Skill, Education, Certification } from "@/lib/database"
import type { BlogPost, Project } from "@/data/data"

export interface PortfolioData {
  skills: Skill[]
  education: Education[]
  certifications: Certification[]
  blogPosts: BlogPost[]
  projects: Project[]
  personalInfo: any
  lastUpdated: string
}

class DataFetcher {
  private readonly CACHE_KEYS = {
    SKILLS: "portfolio_skills",
    EDUCATION: "portfolio_education",
    CERTIFICATIONS: "portfolio_certifications",
    BLOG_POSTS: "portfolio_blog_posts",
    PROJECTS: "portfolio_projects",
    PERSONAL_INFO: "portfolio_personal_info",
    FULL_DATA: "portfolio_full_data",
  }

  // Fetch individual data types with caching
  async getSkills(forceRefresh = false): Promise<Skill[]> {
    if (!forceRefresh && dataCache.has(this.CACHE_KEYS.SKILLS)) {
      return dataCache.get<Skill[]>(this.CACHE_KEYS.SKILLS)!
    }

    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("category", { ascending: true })
        .order("name", { ascending: true })

      if (error) throw error

      const skills = data || []
      dataCache.set(this.CACHE_KEYS.SKILLS, skills)
      return skills
    } catch (error) {
      console.error("Error fetching skills:", error)
      // Return cached data if available, even if expired
      return dataCache.get<Skill[]>(this.CACHE_KEYS.SKILLS) || []
    }
  }

  async getEducation(forceRefresh = false): Promise<Education[]> {
    if (!forceRefresh && dataCache.has(this.CACHE_KEYS.EDUCATION)) {
      return dataCache.get<Education[]>(this.CACHE_KEYS.EDUCATION)!
    }

    try {
      const { data, error } = await supabase.from("education").select("*").order("start_date", { ascending: false })

      if (error) throw error

      const education = data || []
      dataCache.set(this.CACHE_KEYS.EDUCATION, education)
      return education
    } catch (error) {
      console.error("Error fetching education:", error)
      return dataCache.get<Education[]>(this.CACHE_KEYS.EDUCATION) || []
    }
  }

  async getCertifications(forceRefresh = false): Promise<Certification[]> {
    if (!forceRefresh && dataCache.has(this.CACHE_KEYS.CERTIFICATIONS)) {
      return dataCache.get<Certification[]>(this.CACHE_KEYS.CERTIFICATIONS)!
    }

    try {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("issue_date", { ascending: false })

      if (error) throw error

      const certifications = data || []
      dataCache.set(this.CACHE_KEYS.CERTIFICATIONS, certifications)
      return certifications
    } catch (error) {
      console.error("Error fetching certifications:", error)
      return dataCache.get<Certification[]>(this.CACHE_KEYS.CERTIFICATIONS) || []
    }
  }

  async getBlogPosts(forceRefresh = false): Promise<BlogPost[]> {
    if (!forceRefresh && dataCache.has(this.CACHE_KEYS.BLOG_POSTS)) {
      return dataCache.get<BlogPost[]>(this.CACHE_KEYS.BLOG_POSTS)!
    }

    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (error) throw error

      const blogPosts = (data || []).map((post: any) => ({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        date: post.created_at.split("T")[0],
        readTime: post.read_time || "5 min read",
        category: post.category,
        author: post.author || "Talha",
      }))

      dataCache.set(this.CACHE_KEYS.BLOG_POSTS, blogPosts)
      return blogPosts
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      return dataCache.get<BlogPost[]>(this.CACHE_KEYS.BLOG_POSTS) || []
    }
  }

  async getProjects(forceRefresh = false): Promise<Project[]> {
    if (!forceRefresh && dataCache.has(this.CACHE_KEYS.PROJECTS)) {
      return dataCache.get<Project[]>(this.CACHE_KEYS.PROJECTS)!
    }

    try {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

      if (error) throw error

      const projects = (data || []).map((project: any) => ({
        title: project.title,
        description: project.description,
        tech: project.technologies || [],
        icon: project.icon || "Code",
        github: project.github_url || "",
        demo: project.demo_url || "",
        featured: project.is_featured || false,
      }))

      dataCache.set(this.CACHE_KEYS.PROJECTS, projects)
      return projects
    } catch (error) {
      console.error("Error fetching projects:", error)
      return dataCache.get<Project[]>(this.CACHE_KEYS.PROJECTS) || []
    }
  }

  async getPersonalInfo(forceRefresh = false): Promise<any> {
    if (!forceRefresh && dataCache.has(this.CACHE_KEYS.PERSONAL_INFO)) {
      return dataCache.get<any>(this.CACHE_KEYS.PERSONAL_INFO)!
    }

    try {
      const { data, error } = await supabase.from("personal_info").select("*").single()

      if (error && error.code !== "PGRST116") throw error

      const personalInfo = data || {}
      dataCache.set(this.CACHE_KEYS.PERSONAL_INFO, personalInfo)
      return personalInfo
    } catch (error) {
      console.error("Error fetching personal info:", error)
      return dataCache.get<any>(this.CACHE_KEYS.PERSONAL_INFO) || {}
    }
  }

  // Fetch all data at once
  async getAllData(forceRefresh = false): Promise<PortfolioData> {
    if (!forceRefresh && dataCache.has(this.CACHE_KEYS.FULL_DATA)) {
      return dataCache.get<PortfolioData>(this.CACHE_KEYS.FULL_DATA)!
    }

    try {
      const [skills, education, certifications, blogPosts, projects, personalInfo] = await Promise.all([
        this.getSkills(forceRefresh),
        this.getEducation(forceRefresh),
        this.getCertifications(forceRefresh),
        this.getBlogPosts(forceRefresh),
        this.getProjects(forceRefresh),
        this.getPersonalInfo(forceRefresh),
      ])

      const portfolioData: PortfolioData = {
        skills,
        education,
        certifications,
        blogPosts,
        projects,
        personalInfo,
        lastUpdated: new Date().toISOString(),
      }

      dataCache.set(this.CACHE_KEYS.FULL_DATA, portfolioData)
      return portfolioData
    } catch (error) {
      console.error("Error fetching all data:", error)
      // Return cached data if available
      return (
        dataCache.get<PortfolioData>(this.CACHE_KEYS.FULL_DATA) || {
          skills: [],
          education: [],
          certifications: [],
          blogPosts: [],
          projects: [],
          personalInfo: {},
          lastUpdated: new Date().toISOString(),
        }
      )
    }
  }

  // Force refresh all data
  async refreshAllData(): Promise<PortfolioData> {
    dataCache.clear()
    return this.getAllData(true)
  }

  // Get cache statistics
  getCacheStats() {
    return dataCache.getStats()
  }
}

export const dataFetcher = new DataFetcher()
