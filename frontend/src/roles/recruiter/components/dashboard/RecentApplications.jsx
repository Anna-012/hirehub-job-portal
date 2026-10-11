import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllApplicants } from "../../recruiterApi";

const statusStyles = {
  Applied: "bg-blue-50 text-blue-700",
  Viewed: "bg-violet-50 text-violet-700",
  Shortlisted: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
  Hired: "bg-green-100 text-green-800",
};

const RecentApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllApplicants();

        if (!response?.success) {
          throw new Error(response?.message || "Failed to fetch applications");
        }

        setApplications((response.applications || []).slice(0, 5));
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load recent applications.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Recent Applications
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Latest candidates who applied for your jobs
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/recruiter/applicants")}
          className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          View all →
        </button>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-slate-500">
          Loading applications...
        </p>
      ) : error ? (
        <p className="py-8 text-center text-sm text-red-600">{error}</p>
      ) : applications.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No applications yet
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Applications for your posted jobs will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {applications.map((application) => {
            const applicant = application.applicant;
            const job = application.job;

            const name = applicant?.name || "Unknown Candidate";
            const initials = name
              .split(" ")
              .filter(Boolean)
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            const status = application.status || "Applied";

            return (
              <article
                key={application._id}
                className="flex items-center gap-3 py-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                  {initials || "?"}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {name}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {job?.title || "Job unavailable"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {application.appliedAt
                      ? new Date(application.appliedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "Date unavailable"}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1.5 text-[10px] font-semibold sm:text-xs ${
                    statusStyles[status] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {status}
                </span>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecentApplications;
