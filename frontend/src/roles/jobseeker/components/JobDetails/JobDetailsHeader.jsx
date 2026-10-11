import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Building2,
  Clock,
  IndianRupee,
  MapPin,
  Monitor,
} from "lucide-react";

const JobDetailsHeader = ({
  job,
  companyName,
  companyLogo,
  companyWebsite,
  isSaved,
  saving,
  hasApplied,
  applicationStatus,
  onBack,
  onSave,
  onApply,
}) => {
  const formatSalary = () => {
    if (!job.minSalary && !job.maxSalary) {
      return "Compensation discussed during hiring";
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

  return (
    <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={17} />
        Back to Jobs
      </button>

      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          {/* Logo */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
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
              <Building2 size={28} className="text-slate-400" />
            )}
          </div>

          {/* Job information */}
          <div className="min-w-0">
            <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              {job.title}
            </h1>

            <p className="mt-1.5 text-sm font-medium text-blue-600 sm:text-base">
              {companyName}
            </p>

            {companyWebsite && (
              <a
                href={companyWebsite}
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-block text-sm text-slate-500 transition hover:text-blue-600 hover:underline"
              >
                Visit company website
              </a>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex w-full gap-3 lg:w-auto">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition lg:flex-none ${
              isSaved
                ? "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />

            {saving ? "Saving..." : isSaved ? "Saved" : "Save"}
          </button>

          <button
            type="button"
            onClick={onApply}
            disabled={hasApplied}
            className={`flex h-11 flex-1 items-center justify-center rounded-lg px-5 text-sm font-semibold transition lg:flex-none ${
              hasApplied
                ? "cursor-not-allowed border border-green-200 bg-green-50 text-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            }`}
          >
            {hasApplied ? applicationStatus || "Applied" : "Apply Now"}
          </button>
        </div>
      </div>

      {/* Job meta */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-100 pt-5">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={17} className="text-slate-400" />
          <span>{job.location || "Location not specified"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Briefcase size={17} className="text-slate-400" />
          <span>{job.jobType || "Not specified"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock size={17} className="text-slate-400" />
          <span>{job.experience || "Not specified"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Monitor size={17} className="text-slate-400" />
          <span>{job.workMode || "Not specified"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <IndianRupee size={17} className="text-slate-400" />
          <span>{formatSalary()}</span>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsHeader;
