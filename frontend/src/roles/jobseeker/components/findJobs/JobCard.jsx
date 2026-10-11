import { useState } from "react";
import { Link } from "react-router-dom";
import JobMatchModal from "./JobMatchModal";

const JobCard = ({ job }) => {
  const [logoError, setLogoError] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);

  const formatSalary = () => {
    if (!job.minSalary && !job.maxSalary) {
      return null;
    }

    const currencySymbol = job.salaryCurrency === "USD" ? "$" : "₹";

    const formatAmount = (amount) => {
      if (amount >= 10000000) {
        return `${(amount / 10000000).toFixed(1)}Cr`;
      }

      if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1)}L`;
      }

      if (amount >= 1000) {
        return `${(amount / 1000).toFixed(0)}K`;
      }

      return amount;
    };

    if (job.minSalary && job.maxSalary) {
      return `${currencySymbol}${formatAmount(
        job.minSalary,
      )} - ${currencySymbol}${formatAmount(job.maxSalary)}`;
    }

    if (job.minSalary) {
      return `${currencySymbol}${formatAmount(job.minSalary)}+`;
    }

    return `Up to ${currencySymbol}${formatAmount(job.maxSalary)}`;
  };

  const description = Array.isArray(job.description)
    ? job.description.join(" ")
    : job.description || "";

  const companyName = job.company?.name || "Company";
  const companyLogo = job.company?.logo?.url || null;
  const companyInitial = companyName.charAt(0).toUpperCase();

  return (
    <>
      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            {companyLogo && !logoError ? (
              <img
                src={companyLogo}
                alt={`${companyName} logo`}
                className="h-full w-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-sm font-bold text-blue-600">
                {companyInitial}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="line-clamp-1 text-lg font-bold text-slate-900">
              {job.title}
            </h2>

            <p className="mt-1 truncate text-sm font-medium text-blue-600">
              {companyName}
            </p>
          </div>

          {job.isFeatured && (
            <span className="shrink-0 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
              Featured
            </span>
          )}
        </div>

        {/* Job Meta */}
        <div className="mt-3 flex flex-wrap gap-2">
          {job.location && (
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              📍 {job.location}
            </span>
          )}

          {job.jobType && (
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              💼 {job.jobType}
            </span>
          )}

          {job.workMode && (
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              🏠 {job.workMode}
            </span>
          )}

          {job.experience && (
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              🎯 {job.experience}
            </span>
          )}
        </div>

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {job.skills.slice(0, 4).map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
              >
                {skill}
              </span>
            ))}

            {job.skills.length > 4 && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
                +{job.skills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Salary */}
        {formatSalary() && (
          <p className="mt-3 text-sm font-semibold text-slate-800">
            💰 {formatSalary()}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="mt-3 line-clamp-2 text-sm text-slate-500">
            {description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setShowMatchModal(true)}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            ✨ AI Analyze My Match
          </button>

          <Link
            to={`/jobseeker/jobs/${job._id}`}
            className="rounded-lg border border-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            View Details
          </Link>
        </div>
      </article>

      {/* Job Match Modal */}
      {showMatchModal && (
        <JobMatchModal job={job} onClose={() => setShowMatchModal(false)} />
      )}
    </>
  );
};

export default JobCard;
