import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
// import { googleAuthOptions } from "./api/auth/options";
import Dashboard from "@/app/components/Dashboard";
import jobsData from "@/app/data/jobs.json";
import { Suspense } from "react";

// Server component: checks authentication
export default async function HomePage() {
  const session = await getServerSession();
  if (!session) {
    // Redirect to sign in page as configured in NextAuth
    redirect("/auth/sign_in");
    return null;
  }
  // Pass jobs to client dashboard
  const jobs = jobsData.job_postings.map((job, idx) => ({
    id: String(idx),
    ...job,
  }));
  return <Dashboard jobs={jobs} />;
}
