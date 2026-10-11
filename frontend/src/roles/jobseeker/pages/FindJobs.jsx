import { useEffect, useState } from "react";

import { getJobs } from "../jobseekerApi";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import JobSearchBar from "../components/findJobs/JobSearchBar";
import JobFilters from "../components/findJobs/JobFilters";
import JobList from "../components/findJobs/JobList";
import JobPagination from "../components/findJobs/JobPagination";
import AIJobRecommendations from "../components/findJobs/AIJobRecommendations";

const FindJobs = () => {
  // JOB DATA
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // SEARCH & FILTERS
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [experience, setExperience] = useState("");

  // PAGINATION

  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
    limit: 12,
  });

  // FETCH JOBS

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getJobs({
        search: search.trim(),
        location: location.trim(),
        jobType,
        category: category.trim(),
        workMode,
        experience: experience.trim(),
        page: currentPage,
        limit: 12,
      });

      setJobs(response?.jobs || []);

      setPagination(
        response?.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalJobs: 0,
          limit: 12,
        },
      );
    } catch (err) {
      console.error("Failed to load jobs:", err);

      setError("Unable to load jobs. Please try again.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // INITIAL LOAD / PAGE CHANGE

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  // SEARCH

  const handleSearch = () => {
    setCurrentPage(1);

    fetchJobs();
  };

  // CLEAR FILTERS

  const handleClearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setCategory("");
    setWorkMode("");
    setExperience("");
    setCurrentPage(1);
  };

  // PAGINATION

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Find Jobs
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Discover opportunities that match your skills and experience.
          </p>
        </div>

        {/* SEARCH */}

        <JobSearchBar
          search={search}
          location={location}
          onSearchChange={setSearch}
          onLocationChange={setLocation}
          onSearch={handleSearch}
        />

        <AIJobRecommendations />

        {/* MAIN CONTENT */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          {/* Filters */}
          <aside>
            <JobFilters
              jobType={jobType}
              category={category}
              workMode={workMode}
              experience={experience}
              onJobTypeChange={setJobType}
              onCategoryChange={setCategory}
              onWorkModeChange={setWorkMode}
              onExperienceChange={setExperience}
              onApplyFilters={handleSearch}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Jobs */}
          <main>
            {/* Results information */}
            {!loading && !error && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {pagination.totalJobs}{" "}
                  {pagination.totalJobs === 1 ? "job" : "jobs"} found
                </p>

                {pagination.totalPages > 1 && (
                  <p className="text-sm text-slate-400">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </p>
                )}
              </div>
            )}

            {/* Loading Skeleton */}
            {loading && <SkeletonLoader count={3} variant="list" />}

            {/* Error */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="text-sm text-red-600">{error}</p>

                <button
                  type="button"
                  onClick={fetchJobs}
                  className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            )}
            {/* Empty */}
            {!loading && !error && jobs.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                <h2 className="text-lg font-semibold text-slate-800">
                  No jobs found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
            {/* Job List */}
            {!loading && !error && jobs.length > 0 && (
              <>
                <JobList jobs={jobs} />

                <JobPagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
