import React from "react";
import { FiPlus } from "react-icons/fi";

const ManageJobsHeader = ({ onPostJob }) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-slate-400">
          Recruiter <span className="mx-2">›</span> Manage Jobs
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">Manage Jobs</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage and track all your job postings
        </p>
      </div>

      <button
        type="button"
        onClick={onPostJob}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
      >
        <FiPlus size={18} />
        Post New Job
      </button>
    </div>
  );
};

export default ManageJobsHeader;
