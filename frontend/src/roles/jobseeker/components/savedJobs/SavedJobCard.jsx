import { Link } from "react-router-dom";
import {
  Briefcase,
  Building2,
  MapPin,
  Bookmark,
  ExternalLink,
} from "lucide-react";

const SavedJobCard = ({ savedJob, onRemove, removing }) => {
  const job = savedJob?.job;
  const company = job?.company;

  if (!job) return null;

  const companyName = company?.name || "Company";
  const companyLogo = company?.logo?.url || null;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4">
        {/* Top section */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-4">
            {/* Company logo */}
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

            {/* Job info */}
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-slate-900">
                {job.title || "Job title unavailable"}
              </h2>

              <p className="mt-1 text-sm font-medium text-blue-600">
                {companyName}
              </p>
            </div>
          </div>

          {/* Saved icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Bookmark size={17} fill="currentColor" />
          </div>
        </div>

        {/* Job metadata */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4">
          {job.location && (
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} />
              <span>{job.location}</span>
            </div>
          )}

          {job.jobType && (
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Briefcase size={15} />
              <span>{job.jobType}</span>
            </div>
          )}

          {job.workMode && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              {job.workMode}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => onRemove(savedJob._id, job._id)}
            disabled={removing}
            className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {removing ? "Removing..." : "Remove"}
          </button>

          <Link
            to={`/jobseeker/jobs/${job._id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Job
            <ExternalLink size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SavedJobCard;
