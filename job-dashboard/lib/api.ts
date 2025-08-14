// API configuration and types
export const API_BASE_URL = "https://akil-backend.onrender.com"

export interface ApiJobPosting {
  id: string
  title: string
  description: string
  responsibilities: string
  requirements: string
  idealCandidate: string
  categories: string[]
  opType: string
  startDate: string
  endDate: string
  deadline: string
  location: string[]
  requiredSkills: string[]
  whenAndWhere: string
  orgID: string
  datePosted: string
  status: string
  applicantsCount: number
  viewsCount: number
  orgName: string
  logoUrl: string
  isBookmarked: boolean
  isRolling: boolean
  questions: string | null
  perksAndBenefits: string | null
  createdAt: string
  updatedAt: string
  orgPrimaryPhone: string
  orgEmail: string
  average_rating: number
  total_reviews: number
}

export interface ApiResponse {
  success: boolean
  message: string
  data: ApiJobPosting[]
  errors: any
  count: number
}

// Transform API data to match our component interface
export function transformApiData(apiJob: ApiJobPosting) {
  return {
    id: apiJob.id,
    title: apiJob.title,
    company: apiJob.orgName,
    description: apiJob.description,
    responsibilities: apiJob.responsibilities ? apiJob.responsibilities.split("\n").filter((r) => r.trim()) : [],
    ideal_candidate: {
      age: "18-30", // Default since API doesn't provide this
      gender: "Any", // Default since API doesn't provide this
      traits: apiJob.idealCandidate ? apiJob.idealCandidate.split("\n").filter((t) => t.trim()) : [],
    },
    when_where: apiJob.whenAndWhere,
    about: {
      posted_on: apiJob.datePosted,
      deadline: apiJob.deadline,
      location: Array.isArray(apiJob.location) ? apiJob.location.join(", ") : apiJob.location || "Remote",
      start_date: apiJob.startDate,
      end_date: apiJob.endDate,
      categories: apiJob.categories || [],
      required_skills: apiJob.requiredSkills || [],
    },
    image: apiJob.logoUrl || "/placeholder.svg?height=64&width=64",
  }
}

// Fetch jobs from API
export async function fetchJobs(): Promise<ApiJobPosting[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse = await response.json()

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch jobs")
    }

    return result.data || []
  } catch (error) {
    console.error("Error fetching jobs:", error)
    throw error
  }
}

// Fetch single job by ID
export async function fetchJobById(id: string): Promise<ApiJobPosting | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch job")
    }

    return result.data || null
  } catch (error) {
    console.error("Error fetching job:", error)
    throw error
  }
}
