// "use client";

// interface JobDetailsProps {
//   job: {
//     id: string;
//     title: string;
//     company: string;
//     description: string;
//     responsibilities?: string[];
//     ideal_candidate?: {
//       age: string;
//       gender: string;
//       traits: string[];
//     };
//     when_where?: string;
//     about: {
//       posted_on: string;
//       deadline: string;
//       location: string;
//       start_date: string;
//       end_date: string;
//       categories: string[];
//       required_skills: string[];
//     };
//     image: string;
//   };
//   onBack: () => void;
// }

// export default function JobDetails({ job, onBack }: JobDetailsProps) {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <button
//         onClick={onBack}
//         className="mb-6 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//       >
//         ← Back to Jobs
//       </button>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">
//               Description
//             </h1>
//             <p className="text-gray-700 leading-relaxed">{job.description}</p>
//           </div>

//           {job.responsibilities && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 Responsibilities
//               </h2>
//               <ul className="space-y-3">
//                 {job.responsibilities.map((item, index) => (
//                   <li key={index} className="flex items-start">
//                     <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
//                     <span className="text-gray-700">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {job.ideal_candidate && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 Ideal Candidate we want
//               </h2>
//               <div className="space-y-4">
//                 <p className="text-gray-700">
//                   <span className="font-semibold">
//                     Young ({job.ideal_candidate.age} year old){" "}
//                     {job.ideal_candidate.gender}
//                   </span>
//                 </p>
//                 <ul className="space-y-3">
//                   {job.ideal_candidate.traits?.map((trait, index) => (
//                     <li key={index} className="text-gray-700">
//                       <span className="font-semibold">
//                         {trait.split(":")[0]}:
//                       </span>
//                       {trait.includes(":") ? trait.split(":")[1] : trait}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}

//           {job.when_where && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 When & Where
//               </h2>
//               <div className="flex items-start">
//                 <svg
//                   className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   />
//                 </svg>
//                 <p className="text-gray-700">{job.when_where}</p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-lg shadow-md">
//             <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg">
//               <h3 className="text-lg font-bold">About</h3>
//             </div>
//             <div className="p-4 space-y-4">
//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
//                   <svg
//                     className="w-4 h-4 text-blue-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Posted On</p>
//                   <p className="font-semibold">
//                     {formatDate(job.about.posted_on)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
//                   <svg
//                     className="w-4 h-4 text-blue-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Deadline</p>
//                   <p className="font-semibold">
//                     {formatDate(job.about.deadline)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
//                   <svg
//                     className="w-4 h-4 text-blue-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Location</p>
//                   <p className="font-semibold">{job.about.location}</p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-3">
//                   <svg
//                     className="w-4 h-4 text-purple-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Start Date</p>
//                   <p className="font-semibold">
//                     {formatDate(job.about.start_date)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-3">
//                   <svg
//                     className="w-4 h-4 text-purple-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">End Date</p>
//                   <p className="font-semibold">
//                     {formatDate(job.about.end_date)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md">
//             <div className="p-4">
//               <h3 className="text-lg font-bold mb-3">Categories</h3>
//               <div className="flex flex-wrap gap-2">
//                 {job.about.categories.map((category, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-sm"
//                   >
//                     {category}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md">
//             <div className="p-4">
//               <h3 className="text-lg font-bold mb-3">Required Skills</h3>
//               <div className="flex flex-wrap gap-2">
//                 {job.about.required_skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        ← Back to Jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Description
            </h1>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {job.responsibilities && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li
                    key={`${job.id}-responsibility-${index}`}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.ideal_candidate && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ideal Candidate we want
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-semibold">
                    Young ({job.ideal_candidate.age} year old){" "}
                    {job.ideal_candidate.gender}
                  </span>
                </p>
                <ul className="space-y-3">
                  {job.ideal_candidate.traits?.map((trait, index) => (
                    <li
                      key={`${job.id}-trait-${index}`}
                      className="text-gray-700"
                    >
                      <span className="font-semibold">
                        {trait.split(":")[0]}:
                      </span>
                      {trait.includes(":") ? trait.split(":")[1] : trait}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {job.when_where && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                When & Where
              </h2>
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <p className="text-gray-700">{job.when_where}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md">
            <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg">
              <h3 className="text-lg font-bold">About</h3>
            </div>
            <div className="p-4 space-y-4">
              {job.about?.posted_on && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Posted On</p>
                    <p className="font-semibold">
                      {formatDate(job.about.posted_on)}
                    </p>
                  </div>
                </div>
              )}

              {job.about?.deadline && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-semibold">
                      {formatDate(job.about.deadline)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{job.about?.location}</p>
                </div>
              </div>

              {job.about?.start_date && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-semibold">
                      {formatDate(job.about.start_date)}
                    </p>
                  </div>
                </div>
              )}

              {job.about?.end_date && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">End Date</p>
                    <p className="font-semibold">
                      {formatDate(job.about.end_date)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {job.about?.categories && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4">
                <h3 className="text-lg font-bold mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {job.about.categories.map((category, index) => (
                    <span
                      key={`${job.id}-detail-category-${index}`}
                      className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {job.about?.required_skills && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4">
                <h3 className="text-lg font-bold mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.about.required_skills.map((skill, index) => (
                    <span
                      key={`${job.id}-skill-${index}`}
                      className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
