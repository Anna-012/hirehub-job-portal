import { Link } from "react-router-dom";
import { Briefcase, CalendarDays, MapPin, Building2 } from "lucide-react";

const ApplicationCard = ({ application }) => {
  const job = application?.job;
  const company = job?.company;

  const companyName = company?.name || "Company";
  const companyLogo = company?.logo?.url || null;

  const appliedDate = application?.appliedAt
    ? new Date(application.appliedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date not available";

  const status = application?.status || "Applied";

  const getStatusClasses = () => {
    switch (status) {
      case "Shortlisted":
      case "Hired":
        return "border-green-200 bg-green-50 text-green-700";

      case "Rejected":
        return "border-red-200 bg-red-50 text-red-700";

      case "Viewed":
        return "border-yellow-200 bg-yellow-50 text-yellow-700";

      case "Withdrawn":
        return "border-slate-200 bg-slate-100 text-slate-600";

      default:
        return "border-blue-200 bg-blue-50 text-blue-700";
    }
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Job Information */}
        <div className="flex min-w-0 gap-4">
          {/* Company Logo */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={companyName}
                className="h-full w-full object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <Building2 size={25} className="text-slate-400" />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-slate-900">
              {job?.title || "Job title unavailable"}
            </h2>

            <p className="mt-1 text-sm font-medium text-blue-600">
              {companyName}
            </p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses()}`}
        >
          {status}
        </span>
      </div>

      {/* Job Meta */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4">
        {job?.location && (
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin size={15} />
            <span>{job.location}</span>
          </div>
        )}

        {job?.jobType && (
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Briefcase size={15} />
            <span>{job.jobType}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <CalendarDays size={15} />
          <span>Applied {appliedDate}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-400">Application status: {status}</p>

        {job?._id && (
          <Link
            to={`/jobseeker/jobs/${job._id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Job
          </Link>
        )}
      </div>
    </article>
  );
};

export default ApplicationCard;
