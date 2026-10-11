import React from "react";
import { FiBriefcase, FiCheckCircle, FiUsers, FiXCircle } from "react-icons/fi";

const JobStats = ({ jobs = [], totalApplicants = 0 }) => {
  const totalJobs = jobs.length;

  const activeJobs = jobs.filter((job) => job.status === "Active").length;

  const closedJobs = jobs.filter((job) => job.status === "Closed").length;

  const stats = [
    {
      label: "Total Jobs",
      value: totalJobs,
      icon: FiBriefcase,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Active Jobs",
      value: activeJobs,
      icon: FiCheckCircle,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      label: "Total Applicants",
      value: totalApplicants,
      icon: FiUsers,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      label: "Closed Jobs",
      value: closedJobs,
      icon: FiXCircle,
      bg: "bg-red-50",
      text: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${stat.bg} ${stat.text}`}
            >
              <Icon size={22} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">{stat.label}</p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobStats;
