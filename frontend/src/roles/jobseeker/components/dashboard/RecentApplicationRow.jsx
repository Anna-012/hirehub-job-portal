import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const StatusBadge = ({ status }) => {
  const normalized = String(status || "Applied").toLowerCase();

  const styles = {
    applied: "bg-blue-50 text-blue-700 ring-blue-100",
    viewed: "bg-amber-50 text-amber-700 ring-amber-100",
    shortlisted: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    rejected: "bg-red-50 text-red-700 ring-red-100",
    hired: "bg-purple-50 text-purple-700 ring-purple-100",
    interview: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    "under review": "bg-amber-50 text-amber-700 ring-amber-100",
  };

  const label = status
    ? String(status).charAt(0).toUpperCase() + String(status).slice(1)
    : "Applied";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[normalized] || "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {label}
    </span>
  );
};

const RecentApplicationRow = ({ application }) => {
  const job =
    application?.jobId || application?.job || application?.jobDetails || {};

  const jobId =
    job?._id ||
    job?.id ||
    (typeof application?.jobId === "string" ? application.jobId : null);

  const companyName =
    typeof job?.company === "string"
      ? job.company
      : job?.company?.name || job?.companyName || "Company";

  const appliedDate = application.appliedAt || application.createdAt;

  return (
    <div className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-blue-600">
          <FiBriefcase className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900">
            {job?.title || "Job title unavailable"}
          </h3>

          <p className="mt-1 text-sm text-slate-600">{companyName}</p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
            {job?.location && (
              <span className="inline-flex items-center gap-1">
                <FiMapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
            )}

            <span className="inline-flex items-center gap-1">
              <FiCalendar className="h-3.5 w-3.5" />
              Applied {formatDate(appliedDate)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
        <StatusBadge status={application.status || "Applied"} />

        {jobId && (
          <Link
            to={`/jobseeker/jobs/${jobId}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            View Job
            <FiArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default RecentApplicationRow;
