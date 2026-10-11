import React from "react";
import { FiSearch } from "react-icons/fi";

const JobFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  jobType,
  setJobType,
  experience,
  setExperience,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {/* Search */}

        <div className="relative md:col-span-2 xl:col-span-1">
          <FiSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title, location or keyword..."
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Job Type */}

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
        </select>

        {/* Experience */}

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="All">All Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="0-1 years">0-1 years</option>
          <option value="1-3 years">1-3 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
      </div>
    </div>
  );
};

export default JobFilters;
