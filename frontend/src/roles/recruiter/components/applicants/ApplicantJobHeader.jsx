import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  RefreshCw,
} from "lucide-react";

const ApplicantJobHeader = ({ job, loading, onBack, onRefresh }) => {
  const postedDate = job?.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <section className="mb-6">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft size={17} />
        Back to Manage Jobs
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <BriefcaseBusiness size={27} className="text-blue-600" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-slate-900">
              {job?.title || "Job details"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {job?.company?.name ||
                (typeof job?.company === "string" ? job.company : "") ||
                "Company"}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} />
                {job?.location || "Location not specified"}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <BriefcaseBusiness size={15} />
                {job?.jobType || "Job type not specified"}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} />
                Posted {postedDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                job?.status === "Active"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {job?.status || "Unknown"}
            </span>

            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              title="Refresh applicants"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicantJobHeader;
