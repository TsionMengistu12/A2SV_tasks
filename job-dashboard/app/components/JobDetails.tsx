"use client";

import { CalendarDays, Clock, Locate, ArrowLeft } from "lucide-react";

interface JobDetailsProps {
  job: {
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
  onBack: () => void;
}

export default function JobDetails({ job, onBack }: JobDetailsProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-900 min-h-screen text-gray-900">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-white mb-8 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 space-y-8 shadow">
          {/* Description */}
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-3">
              Description
            </h1>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li
                    key={`${job.id}-responsibility-${index}`}
                    className="flex items-start gap-3"
                  >
                    <span className="text-green-500 font-bold text-lg">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ideal Candidate */}
          {job.ideal_candidate && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Ideal Candidate we want
              </h2>
              <ul className="space-y-3">
                <li className="text-gray-700 font-semibold">
                  Young ({job.ideal_candidate.age}) {job.ideal_candidate.gender}
                </li>
                {job.ideal_candidate.traits.map((trait, index) => {
                  const [title, desc] = trait.includes(":")
                    ? trait.split(":")
                    : [trait, ""];
                  return (
                    <li
                      key={`${job.id}-trait-${index}`}
                      className="text-gray-700"
                    >
                      <span className="font-semibold">{title}:</span> {desc}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* When & Where */}
          {job.when_where && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                When & Where
              </h2>
              <div className="flex items-start gap-3">
                <Locate className="w-5 h-5 text-blue-500 mt-1" />
                <p className="text-gray-700">{job.when_where}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* About Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-5">About</h3>
            <InfoRow
              label="Posted On"
              value={formatDate(job.about.posted_on)}
              icon={<CalendarDays className="w-4 h-4 text-blue-600" />}
            />
            <InfoRow
              label="Deadline"
              value={formatDate(job.about.deadline)}
              icon={<Clock className="w-4 h-4 text-blue-600" />}
            />
            <InfoRow
              label="Location"
              value={job.about.location}
              icon={<Locate className="w-4 h-4 text-blue-600" />}
            />
            <InfoRow
              label="Start Date"
              value={formatDate(job.about.start_date)}
              icon={<CalendarDays className="w-4 h-4 text-purple-600" />}
            />
            <InfoRow
              label="End Date"
              value={formatDate(job.about.end_date)}
              icon={<Clock className="w-4 h-4 text-purple-600" />}
            />
          </div>

          {/* Categories */}
          {job.about.categories.length > 0 && (
            <TagSection
              title="Categories"
              tags={job.about.categories}
              color="orange"
            />
          )}

          {/* Required Skills */}
          {job.about.required_skills.length > 0 && (
            <TagSection
              title="Required Skills"
              tags={job.about.required_skills}
              color="blue"
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function InfoRow({ label, value, icon }: InfoRowProps) {
  return (
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

interface TagSectionProps {
  title: string;
  tags: string[];
  color: "blue" | "orange";
}

function TagSection({ title, tags, color }: TagSectionProps) {
  const bgColor = color === "orange" ? "bg-orange-100" : "bg-purple-100";
  const textColor = color === "orange" ? "text-orange-800" : "text-purple-800";

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={`${title}-${index}`}
            className={`px-3 py-1 ${bgColor} ${textColor} rounded-full text-sm font-medium`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
