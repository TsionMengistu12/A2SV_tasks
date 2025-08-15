import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Dashboard from "@/app/components/Dashboard";
import jobsData from "@/app/data/jobs.json";
import { fetchJobs, transformApiData } from "@/lib/api";

// Server component: checks authentication
export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Redirect to sign in page as configured in NextAuth
    redirect("/auth/sign_in");
    return null;
  }
  // Try to fetch jobs from backend; fallback to local JSON in case of failure
  try {
    const apiJobs = await fetchJobs();
    const jobs = apiJobs.map((j) => ({
      ...transformApiData(j),
      isBookmarked: Boolean(j.isBookmarked),
    }));
    return <Dashboard jobs={jobs as any} />;
  } catch (err) {
    const jobs = jobsData.job_postings.map((job, idx) => ({
      id: String(idx),
      ...job,
      isBookmarked: false,
    }));
    return <Dashboard jobs={jobs as any} />;
  }
}
