// utils/jobUtils.ts
import { JobData, JobPosting } from '../types/job'
import jobsJson from '../data/jobs.json'

// Type assertion for JSON import
export const jobsData: JobData = jobsJson as JobData

// Fetch job by index (id = index + 1)
export const getJobById = (id: string): JobPosting | null => {
  const index = parseInt(id, 10) - 1
  if (!isNaN(index) && index >= 0 && index < jobsData.job_postings.length) {
    return jobsData.job_postings[index]
  }
  return null
}

// Returns location + categories as tags
export const getJobTags = (job: JobPosting): string[] => {
  return ['In Person', ...job.about.categories]
}
