// // "use client";

// // import Link from "next/link";

// // interface JobProps {
// //   id: string;
// //   title: string;
// //   company: string;
// //   location: string;
// //   salary: string;
// //   avatar: string;
// // }

// // export default function JobCard({
// //   id,
// //   title,
// //   company,
// //   location,
// //   salary,
// //   avatar,
// // }: JobProps) {
// //   return (
// //     <Link href={`/opportunities/${id}`}>
// //       <div className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 mb-6 flex items-center gap-6 cursor-pointer">
// //         <img
// //           src={avatar}
// //           alt={company}
// //           className="w-16 h-16 rounded-full object-cover"
// //         />
// //         <div className="flex-1">
// //           <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
// //           <p className="text-sm text-gray-600">{company}</p>
// //           <p className="text-sm text-gray-500">{location}</p>
// //           <p className="text-sm text-blue-600 font-medium">{salary}</p>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }

// "use client";

// interface JobProps {
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
//   onClick: () => void;
// }

// export default function JobCard({ job, onClick }: JobProps) {
//   return (
//     <div
//       className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 mb-6 flex items-start gap-6 cursor-pointer border-l-4 border-l-yellow-400"
//       onClick={onClick}
//     >
//       <img
//         src={job.image || "/placeholder.svg"}
//         alt={job.company}
//         className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
//       />
//       <div className="flex-1 min-w-0">
//         <h3 className="text-xl font-semibold text-gray-900 mb-1">
//           {job.title}
//         </h3>

//         <div className="flex items-center text-gray-600 mb-3">
//           <span className="font-medium">{job.company}</span>
//           <span className="mx-2">•</span>
//           <div className="flex items-center">
//             <svg
//               className="w-4 h-4 mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//             <span>{job.about.location}</span>
//           </div>
//         </div>

//         <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

//         <div className="flex flex-wrap gap-2">
//           <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm">
//             In Person
//           </span>
//           {job.about.categories.map((category, index) => (
//             <span
//               key={index}
//               className="px-3 py-1 bg-orange-100 text-orange-800 border border-orange-200 rounded-full text-sm"
//             >
//               {category}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// interface JobProps {
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
//   onClick: () => void;
// }

// export default function JobCard({ job, onClick }: JobProps) {
//   return (
//     <div
//       className="bg-white shadow-md hover:shadow-xl transition rounded-xl p-6 mb-6 flex items-start gap-6 cursor-pointer border-l-4 border-l-yellow-400"
//       onClick={onClick}
//     >
//       <img
//         src={job.image || "/placeholder.svg"}
//         alt={job.company}
//         className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
//       />
//       <div className="flex-1 min-w-0">
//         <h3 className="text-xl font-semibold text-gray-900 mb-1">
//           {job.title}
//         </h3>

//         <div className="flex items-center text-gray-600 mb-3">
//           <span className="font-medium">{job.company}</span>
//           <span className="mx-2">•</span>
//           <div className="flex items-center">
//             <svg
//               className="w-4 h-4 mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//             <span>{job.about?.location}</span>
//           </div>
//         </div>

//         <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

//         <div className="flex flex-wrap gap-2">
//           <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm">
//             In Person
//           </span>
//           {job.about?.categories?.map((category, index) => (
//             <span
//               key={`${job.id}-category-${index}`}
//               className="px-3 py-1 bg-orange-100 text-orange-800 border border-orange-200 rounded-full text-sm"
//             >
//               {category}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { FC } from "react";
import { MapPin } from "lucide-react";

interface Job {
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
}

interface JobProps {
  job: Job;
  onClick: () => void;
}

const JobCard: FC<JobProps> = ({ job, onClick }) => {
  return (
    <div
      className="bg-white shadow-md hover:shadow-lg transition-all rounded-xl p-5 sm:p-6 mb-6 flex items-start gap-4 sm:gap-6 cursor-pointer border-l-4 border-yellow-400"
      onClick={onClick}
    >
      <img
        src={job.image || "/placeholder.svg"}
        alt={job.company}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 truncate">
          {job.title}
        </h3>

        <div className="flex flex-wrap items-center text-gray-600 text-sm sm:text-base mb-2 gap-x-2">
          <span className="font-medium">{job.company}</span>
          <span className="hidden sm:inline">•</span>

          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-4 h-4 shrink-0" /> {/* ✅ Using lucide icon */}
            <span>{job.about?.location}</span>
          </div>
        </div>

        <p className="text-gray-700 mb-3 text-sm sm:text-base line-clamp-3">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs sm:text-sm">
            In Person
          </span>
          {job.about?.categories?.map((category, index) => (
            <span
              key={`${job.id}-category-${index}`}
              className="px-2.5 py-1 bg-orange-100 text-orange-800 border border-orange-200 rounded-full text-xs sm:text-sm"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
