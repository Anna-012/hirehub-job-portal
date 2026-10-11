import { Link } from "react-router-dom";
import { FiBriefcase, FiArrowRight } from "react-icons/fi";

const LatestJobs = ({ jobs }) => {
  return (
    <section>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Explore Opportunities
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Discover currently available jobs.
          </p>
        </div>

        <Link
          to="/jobseeker/jobs"
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          Browse all jobs
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
          <p className="font-semibold text-slate-800">
            No jobs to display right now
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Visit Find Jobs to check available opportunities.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {jobs.map((job, index) => {
            const jobId = job._id || job.id;

            const companyName =
              typeof job.company === "string"
                ? job.company
                : job.company?.name || job.companyName || "Company";

            return (
              <article
                key={jobId || index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FiBriefcase className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900">
                      {job.title || "Job title unavailable"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{companyName}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  {job.location && (
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5">
                      {job.location}
                    </span>
                  )}

                  {job.jobType && (
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5">
                      {job.jobType}
                    </span>
                  )}

                  {job.workMode && (
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5">
                      {job.workMode}
                    </span>
                  )}
                </div>

                {jobId && (
                  <Link
                    to={`/jobseeker/jobs/${jobId}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    View Details
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LatestJobs;
