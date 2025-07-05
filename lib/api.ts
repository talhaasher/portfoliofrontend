"use client"

const API_BASE = "/api"

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem("auth-token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // Blog Posts
  async getBlogPosts() {
    const response = await fetch(`${API_BASE}/blog`)
    return response.json()
  }

  async getBlogPost(slug: string) {
    const response = await fetch(`${API_BASE}/blog/${slug}`)
    return response.json()
  }

  async createBlogPost(post: any) {
    const response = await fetch(`${API_BASE}/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(post),
    })
    return response.json()
  }

  async updateBlogPost(slug: string, updates: any) {
    const response = await fetch(`${API_BASE}/blog/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(updates),
    })
    return response.json()
  }

  async deleteBlogPost(slug: string) {
    const response = await fetch(`${API_BASE}/blog/${slug}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    })
    return response.json()
  }

  // Projects
  async getProjects() {
    const response = await fetch(`${API_BASE}/projects`)
    return response.json()
  }

  async createProject(project: any) {
    const response = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(project),
    })
    return response.json()
  }

  async updateProject(title: string, updates: any) {
    const response = await fetch(`${API_BASE}/projects/${encodeURIComponent(title)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(updates),
    })
    return response.json()
  }

  async deleteProject(title: string) {
    const response = await fetch(`${API_BASE}/projects/${encodeURIComponent(title)}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    })
    return response.json()
  }

  // Skills
  async getSkills() {
    const response = await fetch(`${API_BASE}/skills`)
    return response.json()
  }

  async updateSkills(skills: any) {
    const response = await fetch(`${API_BASE}/skills`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(skills),
    })
    return response.json()
  }

  // Personal Info
  async getPersonalInfo() {
    const response = await fetch(`${API_BASE}/personal-info`)
    return response.json()
  }

  async updatePersonalInfo(info: any) {
    const response = await fetch(`${API_BASE}/personal-info`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(info),
    })
    return response.json()
  }
}

export const api = new ApiClient()
