import { JobData, JobPosting } from '../types/job'
import jobsJson from './jobs.json'

export const jobsData: JobData = jobsJson

// Helper function to get job by index (since we don't have IDs in the JSON)
export const getJobById = (id: string): JobPosting | null => {
  const index = parseInt(id) - 1
  if (index >= 0 && index < jobsData.job_postings.length) {
    return jobsData.job_postings[index]
  }
  return null
}

// Helper function to generate tags based on categories
export const getJobTags = (job: JobPosting): string[] => {
  const tags = ['In Person', ...job.about.categories]
  return tags
}
