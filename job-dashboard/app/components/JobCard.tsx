"use client";

import { FC, useState, MouseEvent } from "react";
import { Bookmark, BookmarkCheck, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
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
  // optional prop
  intiallyBookmarked?: boolean;
}

const JobCard: FC<JobProps> = ({
  job,
  onClick,
  intiallyBookmarked = false,
}) => {
  const [bookmarked, setBookmarked] = useState(intiallyBookmarked);
  const { data: session } = useSession();
  const accessToken = (session as any)?.accessToken as string | undefined;

  const handleBookmarkToggle = async (e: MouseEvent) => {
    e.stopPropagation();

    if (!accessToken) {
      console.error("bookmark toggle failed: user not authenticated");
      return;
    }

    try {
      const url = `/api/bookmarks/${job.id}`;

      if (bookmarked) {
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } else {
        await axios.post(
          url,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      console.error("bookmark toggle failed: ", error);
    }
  };
  return (
    <div
      className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4 cursor-pointer"
      onClick={onClick}
    >
      {/* bookmark button */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={handleBookmarkToggle}
        aria-label="toggle-bookmark"
      >
        {bookmarked ? (
          <BookmarkCheck className="w-5 h-5 text-green-600" />
        ) : (
          <Bookmark className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Header: Logo + Title */}
      <div className="flex items-center gap-4">
        <img
          src={job.image || "/placeholder.svg"}
          alt={job.company}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            {job.company} <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              {job.about?.location}
            </span>
          </p>
        </div>
      </div>

      {/* Job Description */}
      <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
          In Person
        </span>
        {job.about?.categories?.map((category, index) => (
          <span
            key={`${job.id}-category-${index}`}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
