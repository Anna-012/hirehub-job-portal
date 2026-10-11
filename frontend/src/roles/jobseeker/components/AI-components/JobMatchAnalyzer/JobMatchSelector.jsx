import { useEffect, useState } from "react";
import { LoaderCircle, Sparkles, BrainCircuit } from "lucide-react";
import { getJobs } from "../../../jobseekerApi";

const JobMatchSelector = ({
  selectedJob,
  onJobChange,
  onAnalyze,
  analyzing,
}) => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        setLoadingJobs(true);
        setError("");

        const response = await getJobs({
          page: 1,
          limit: 100,
        });

        const jobsData = Array.isArray(response)
          ? response
          : response.jobs || response.data?.jobs || [];

        if (isMounted) {
          setJobs(jobsData);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Failed to load jobs. Please try again.",
          );
        }
      } finally {
        if (isMounted) {
          setLoadingJobs(false);
        }
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Sparkles size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Job Match Analyzer
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Compare your profile with your selected job using AI.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="job-match-select"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Select Job
        </label>

        <select
          id="job-match-select"
          value={selectedJob}
          onChange={(event) => onJobChange(event.target.value)}
          disabled={loadingJobs || analyzing || Boolean(error)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70"
        >
          <option value="">
            {loadingJobs ? "Loading jobs..." : "Choose a job"}
          </option>

          {jobs.map((job) => (
            <option key={job._id || job.id} value={job._id || job.id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>

      {loadingJobs && (
        <p className="mt-3 text-sm text-slate-500" role="status">
          Loading available jobs...
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {!loadingJobs && !error && jobs.length === 0 && (
        <p className="mt-3 text-sm text-slate-500">
          No jobs available right now.
        </p>
      )}

      {!loadingJobs && !error && jobs.length > 0 && (
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!selectedJob || analyzing}
          aria-busy={analyzing}
          className={`mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            analyzing
              ? "cursor-wait bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
          }`}
        >
          {analyzing ? (
            <>
              <LoaderCircle
                size={19}
                className="animate-spin"
                aria-hidden="true"
              />
              Analyzing Your Profile...
            </>
          ) : (
            <>
              <Sparkles size={19} aria-hidden="true" />
              Analyze My Profile
            </>
          )}
        </button>
      )}

      {/* Visible AI processing indicator */}
      {analyzing && (
        <div
          role="status"
          aria-live="polite"
          className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
              <BrainCircuit size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-indigo-950">
                AI is analyzing your job match
              </p>

              <p className="mt-1 text-sm leading-5 text-indigo-800">
                Comparing your profile, skills, and experience with the selected
                job. This may take a few moments.
              </p>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-indigo-200">
                <div className="h-full w-1/3 animate-pulse rounded-full bg-indigo-600" />
              </div>

              <p className="mt-2 text-xs font-medium text-indigo-700">
                Please keep this page open while the analysis runs.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMatchSelector;
