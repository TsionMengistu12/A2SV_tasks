import { notFound } from "next/navigation";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { getJobById } from "../../utils/jobUtils";

interface JobDetailPageProps {
  params: { id: string };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = getJobById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <nav className="text-sm text-gray-500 mb-6">
          Applicant Dashboard / Description
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-lg p-8 shadow-sm">
            <div className="flex gap-4 mb-8">
              <Image
                src={job.image || "/images/default-job.png"}
                alt={job.company}
                width={80}
                height={80}
                className="rounded-lg object-cover border border-gray-200"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <div className="flex items-center text-gray-600">
                  <span>{job.company}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.about.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </section>

            {/* Responsibilities */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Ideal Candidate */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ideal Candidate we want
              </h2>
              <div className="space-y-4">
                <div className="text-gray-700">
                  <strong>Age:</strong> {job.ideal_candidate.age} year old{" "}
                  {job.ideal_candidate.gender !== "Any"
                    ? job.ideal_candidate.gender
                    : "candidate"}
                </div>
                <ul className="space-y-4">
                  {job.ideal_candidate.traits.map((trait, index) => (
                    <li key={index} className="text-gray-700">
                      {trait}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* When & Where */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                When & Where
              </h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <p className="text-gray-700">{job.when_where}</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-6">About</h3>

            <div className="space-y-6">
              {[
                { label: "Posted On", value: job.about.posted_on },
                { label: "Deadline", value: job.about.deadline },
                { label: "Location", value: job.about.location },
                { label: "Start Date", value: job.about.start_date },
                { label: "End Date", value: job.about.end_date },
              ].map(({ label, value }, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="font-semibold text-gray-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="mt-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.about.categories.map((category, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ["Marketing", "Design", "Art"].includes(category)
                        ? "bg-orange-100 text-orange-700"
                        : ["IT", "Development"].includes(category)
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div className="mt-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.about.required_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
