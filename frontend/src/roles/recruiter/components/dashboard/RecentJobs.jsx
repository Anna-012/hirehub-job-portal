import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyJobs } from "../../recruiterApi";

const RecentJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyJobs();

        const jobList = Array.isArray(response)
          ? response
          : response?.jobs || response?.data?.jobs || response?.data || [];

        if (!Array.isArray(jobList)) {
          throw new Error("Unexpected jobs response.");
        }

        const sortedJobs = [...jobList].sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );

        setJobs(sortedJobs.slice(0, 4));
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load your recent jobs.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getCompanyName = (company) => {
    if (typeof company === "string" && company.trim()) {
      return company;
    }

    if (company && typeof company === "object") {
      return company.name || company.companyName || company.title || "HireHub";
    }

    return "HireHub";
  };

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Jobs</h2>

          <p className="mt-1 text-xs text-slate-500">
            Your recently posted job openings
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/recruiter/manage-jobs")}
          className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          View all →
        </button>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-slate-500">
          Loading your jobs...
        </p>
      ) : error ? (
        <div className="py-8 text-center">
          <p className="text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 text-sm font-semibold text-indigo-600 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : jobs.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm font-medium text-slate-700">
            No jobs posted yet
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Your published jobs will appear here.
          </p>

          <button
            type="button"
            onClick={() => navigate("/recruiter/post-job")}
            className="mt-3 text-sm font-semibold text-indigo-600 hover:underline"
          >
            Post your first job →
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {jobs.map((job) => {
            const companyName = getCompanyName(job.company);
            const companyInitial = companyName.charAt(0).toUpperCase();

            const isActive =
              String(job.status || "").toLowerCase() === "active";

            return (
              <article
                key={job._id || job.id}
                className="py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600">
                    {companyInitial}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-sm font-semibold text-slate-800">
                      {job.title || "Untitled Job"}
                    </h3>

                    <p className="mt-1 break-words text-xs text-slate-500">
                      {companyName} · {job.location || "Location not specified"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {job.jobType || "Job type not specified"}
                      {job.workMode ? ` · ${job.workMode}` : ""}
                    </p>

                    {job.createdAt && (
                      <p className="mt-1 text-xs text-slate-400">
                        Posted{" "}
                        {new Date(job.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {job.status || "Unknown"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecentJobs;
