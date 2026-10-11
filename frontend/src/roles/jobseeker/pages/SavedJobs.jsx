import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Bookmark, X, RefreshCw } from "lucide-react";

import { getMySavedJobs, removeSavedJob } from "../jobseekerApi";

import SavedJobList from "../components/savedJobs/SavedJobList";

// Skeleton for a saved job card
const SavedJobSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />

      <div className="min-w-0 flex-1 space-y-3">
        <div className="h-5 w-3/4 max-w-xs rounded bg-slate-200" />
        <div className="h-4 w-1/2 max-w-48 rounded bg-slate-100" />

        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-20 rounded-full bg-slate-100" />
          <div className="h-6 w-24 rounded-full bg-slate-100" />
          <div className="h-6 w-16 rounded-full bg-slate-100" />
        </div>
      </div>

      <div className="hidden h-9 w-24 rounded-lg bg-slate-100 sm:block" />
    </div>

    <div className="mt-5 border-t border-slate-100 pt-4">
      <div className="h-3 w-40 rounded bg-slate-100" />
    </div>
  </div>
);

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [removingId, setRemovingId] = useState(null);

  // Fetch saved jobs
  const fetchSavedJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMySavedJobs();

      setSavedJobs(Array.isArray(data?.savedJobs) ? data.savedJobs : []);
    } catch (err) {
      console.error("Failed to fetch saved jobs:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load saved jobs. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  // Search saved jobs
  const filteredSavedJobs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return savedJobs;
    }

    return savedJobs.filter((savedJob) => {
      const job = savedJob?.job;
      const company = job?.company;

      const jobTitle = job?.title?.toLowerCase() || "";

      const companyName =
        typeof company === "object"
          ? company?.name?.toLowerCase() || ""
          : typeof company === "string"
            ? company.toLowerCase()
            : "";

      return (
        jobTitle.includes(searchValue) || companyName.includes(searchValue)
      );
    });
  }, [savedJobs, search]);

  // Remove saved job
  const handleRemove = async (savedJobId, jobId) => {
    if (removingId) return;

    try {
      setRemovingId(savedJobId);

      await removeSavedJob(jobId);

      setSavedJobs((currentJobs) =>
        currentJobs.filter((savedJob) => savedJob._id !== savedJobId),
      );
    } catch (err) {
      console.error("Failed to remove saved job:", err);

      const message =
        err.response?.data?.message ||
        "Failed to remove saved job. Please try again.";

      window.alert(message);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Bookmark size={21} fill="currentColor" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Saved Jobs
              </h1>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Keep track of opportunities you want to explore later.
              </p>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div
            role="status"
            aria-live="polite"
            aria-label="Loading your saved jobs"
            className="space-y-4"
          >
            {/* Search placeholder */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="h-11 animate-pulse rounded-lg bg-slate-100" />
            </div>

            {/* Count placeholder */}
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

            {/* Saved job placeholders */}
            <SavedJobSkeleton />
            <SavedJobSkeleton />
            <SavedJobSkeleton />

            <p className="pt-1 text-center text-sm text-slate-500">
              Loading your saved jobs...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <RefreshCw size={22} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Couldn't load saved jobs
            </h2>

            <p
              role="alert"
              className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-600"
            >
              {error}
            </p>

            <button
              type="button"
              onClick={fetchSavedJobs}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* Saved Jobs Content */}
        {!loading && !error && (
          <>
            {/* Search */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="relative">
                <Search
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search saved jobs by title or company..."
                  aria-label="Search saved jobs by title or company"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Clear search"
                    title="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {search.trim() && (
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <p className="text-xs text-slate-500">
                    Showing results for "{search.trim()}"
                  </p>

                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">
                {filteredSavedJobs.length}{" "}
                {filteredSavedJobs.length === 1 ? "job" : "jobs"}
                <span className="font-normal text-slate-500">
                  {search.trim() ? " found" : " saved"}
                </span>
              </p>

              {search.trim() && (
                <p className="text-xs text-slate-500">
                  {savedJobs.length} total saved{" "}
                  {savedJobs.length === 1 ? "job" : "jobs"}
                </p>
              )}
            </div>

            {/* Saved Jobs List */}
            <SavedJobList
              savedJobs={filteredSavedJobs}
              onRemove={handleRemove}
              removingId={removingId}
              hasFilters={Boolean(search.trim())}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default SavedJobs;
