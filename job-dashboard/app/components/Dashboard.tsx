"use client";
import React, { useState } from "react";
import JobCard from "@/app/components/JobCard";
import JobDetails from "@/app/components/JobDetails";

type JobPosting = {
  id: string;
  title: string;
  company: string;
  description: string;
  responsibilities?: string[];
  ideal_candidate?: {
    age: string;
    gender: string;
    traits: string[];
  };
  when_where?: string;
  about: {
    posted_on: string;
    deadline: string;
    location: string;
    start_date: string;
    end_date: string;
    categories: string[];
    required_skills: string[];
  };
  image: string;
};

export default function Dashboard({ jobs }: { jobs: JobPosting[] }) {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const handleJobSelect = (job: JobPosting) => setSelectedJob(job);
  const handleBackToDashboard = () => setSelectedJob(null);

  if (selectedJob) {
    return (
      <main className="min-h-screen bg-gray-50">
        <JobDetails job={selectedJob} onBack={handleBackToDashboard} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option value="most-relevant">Most relevant</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          <p className="text-gray-600">Showing {jobs.length} results</p>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => handleJobSelect(job)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No opportunities found.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
