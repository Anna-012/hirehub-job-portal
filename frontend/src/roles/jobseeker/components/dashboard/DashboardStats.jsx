import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiBookmark,
  FiClock,
  FiCheckCircle,
  FiArrowUpRight,
} from "react-icons/fi";

import StatCard from "./StatCard";

const DashboardStats = ({ applications = [], savedJobs = [] }) => {
  const getStatus = (application) =>
    String(application?.status || "Applied").toLowerCase();

  const underReview = applications.filter((application) =>
    ["applied", "viewed", "under review", "interview"].includes(
      getStatus(application),
    ),
  ).length;

  const shortlisted = applications.filter(
    (application) => getStatus(application) === "shortlisted",
  ).length;

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      description: "Jobs you have applied for",
      icon: FiBriefcase,
      color: "bg-blue-50 text-blue-600",
      path: "/jobseeker/applications",
    },
    {
      title: "Saved Jobs",
      value: savedJobs.length,
      description: "Jobs saved for later",
      icon: FiBookmark,
      color: "bg-violet-50 text-violet-600",
      path: "/jobseeker/saved-jobs",
    },
    {
      title: "Under Review",
      value: underReview,
      description: "Applications awaiting a decision",
      icon: FiClock,
      color: "bg-amber-50 text-amber-600",
      path: "/jobseeker/applications?status=under-review",
    },
    {
      title: "Shortlisted",
      value: shortlisted,
      description: "Applications shortlisted by recruiters",
      icon: FiCheckCircle,
      color: "bg-emerald-50 text-emerald-600",
      path: "/jobseeker/applications?status=shortlisted",
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">Your Job Search</h2>

        <p className="mt-1 text-sm text-slate-500">
          An overview of your current activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.path}
            className="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label={`Open ${stat.title}: ${stat.value}`}
          >
            <div className="relative h-full">
              <StatCard {...stat} />

              <FiArrowUpRight
                aria-hidden="true"
                className="absolute right-4 top-4 h-4 w-4 text-slate-400 opacity-0 transition group-hover:opacity-100"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;
