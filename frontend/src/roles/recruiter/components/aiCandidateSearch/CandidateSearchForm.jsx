import { Sparkles, LoaderCircle, Search } from "lucide-react";

const CandidateSearchForm = ({
  jobs,
  selectedJob,
  setSelectedJob,
  prompt,
  setPrompt,
  searchMode,
  setSearchMode,
  loadingJobs,
  searching,
  error,
  onSearch,
}) => {
  const activeJobs = jobs.filter(
    (job) => String(job.status || "").toLowerCase() === "active",
  );

  const modeButtonClass = (isActive) =>
    `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      isActive
        ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
        : "border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    }`;

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Find your next great hire
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose a posted job or describe your ideal candidate.
        </p>
      </div>

      {/* Search modes */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setSearchMode("job")}
          disabled={searching}
          aria-pressed={searchMode === "job"}
          className={modeButtonClass(searchMode === "job")}
        >
          <Search size={16} aria-hidden="true" />
          AI Candidate Search
        </button>
      </div>

      <form onSubmit={onSearch} className="space-y-5">
        {/* Job search */}
        {searchMode === "job" ? (
          <div>
            <label
              htmlFor="candidate-search-job"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Select an active job
            </label>

            <select
              id="candidate-search-job"
              value={selectedJob}
              onChange={(event) => setSelectedJob(event.target.value)}
              disabled={loadingJobs || searching}
              className={inputClass}
            >
              <option value="">
                {loadingJobs ? "Loading your jobs..." : "Choose a job"}
              </option>

              {activeJobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>

            {!loadingJobs && activeJobs.length === 0 && (
              <p className="mt-2 text-sm text-amber-700">
                You don't have any active jobs available for matching.
              </p>
            )}
          </div>
        ) : (
          /* Custom AI search */
          <div>
            <label
              htmlFor="candidate-search-prompt"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Describe your ideal candidate
            </label>

            <textarea
              id="candidate-search-prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              maxLength={2000}
              rows={4}
              disabled={searching}
              placeholder="Example: Find React developers with Node.js, MongoDB and REST API experience."
              className={`${inputClass} resize-y leading-6`}
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {prompt.length}/2000 characters
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Search button */}
        <button
          type="submit"
          disabled={
            loadingJobs ||
            searching ||
            (searchMode === "job" && !selectedJob) ||
            (searchMode === "custom" && !prompt.trim())
          }
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {searching ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
                aria-hidden="true"
              />
              Finding candidates...
            </>
          ) : (
            <>
              <Sparkles size={18} aria-hidden="true" />
              Search Candidates
            </>
          )}
        </button>
      </form>
    </section>
  );
};

export default CandidateSearchForm;
