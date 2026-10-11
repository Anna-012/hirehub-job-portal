import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, RefreshCw } from "lucide-react";

import { getMyApplications } from "../jobseekerApi";

import ApplicationList from "../components/myApplications/ApplicationList";

const ApplicationSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
    <div className="flex items-start gap-4">
      {/* Company logo placeholder */}
      <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />

      <div className="min-w-0 flex-1 space-y-3">
        {/* Job title */}
        <div className="h-5 w-3/4 max-w-xs rounded bg-slate-200" />

        {/* Company name */}
        <div className="h-4 w-1/2 max-w-48 rounded bg-slate-100" />

        {/* Application status */}
        <div className="h-6 w-24 rounded-full bg-slate-100" />
      </div>

      {/* Action placeholder */}
      <div className="hidden h-9 w-24 rounded-lg bg-slate-100 sm:block" />
    </div>

    {/* Footer placeholder */}
    <div className="mt-5 border-t border-slate-100 pt-4">
      <div className="h-3 w-40 rounded bg-slate-100" />
    </div>
  </div>
);

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyApplications();

      setApplications(
        Array.isArray(data?.applications) ? data.applications : [],
      );
    } catch (err) {
      console.error("Failed to fetch applications:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load your applications. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Filter applications on the frontend
  const filteredApplications = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return applications.filter((application) => {
      const job = application?.job;
      const company = job?.company;

      const jobTitle = job?.title?.toLowerCase() || "";
      const companyName =
        typeof company === "object"
          ? company?.name?.toLowerCase() || ""
          : typeof company === "string"
            ? company.toLowerCase()
            : "";

      const status = application?.status || "";

      const matchesSearch =
        !searchValue ||
        jobTitle.includes(searchValue) ||
        companyName.includes(searchValue);

      const matchesStatus = !statusFilter || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
  };

  const hasActiveFilters = Boolean(search.trim() || statusFilter);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Applications
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Track the jobs you have applied for and check their current status.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div
            role="status"
            aria-live="polite"
            aria-label="Loading your applications"
            className="space-y-4"
          >
            {/* Search and filter skeleton */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]">
                <div className="h-11 animate-pulse rounded-lg bg-slate-100" />
                <div className="h-11 animate-pulse rounded-lg bg-slate-100" />
              </div>
            </div>

            {/* Result count placeholder */}
            <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />

            {/* Application cards */}
            <ApplicationSkeleton />
            <ApplicationSkeleton />
            <ApplicationSkeleton />

            <p className="pt-1 text-center text-sm text-slate-500">
              Loading your applications...
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
              Couldn't load applications
            </h2>

            <p
              role="alert"
              className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-600"
            >
              {error}
            </p>

            <button
              type="button"
              onClick={fetchApplications}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* Applications Content */}
        {!loading && !error && (
          <>
            {/* Search and Filters */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by job title or company"
                    aria-label="Search applications by job title or company"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      aria-label="Clear search"
                      title="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <SlidersHorizontal
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />

                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    aria-label="Filter applications by status"
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">All Statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Viewed">Viewed</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Hired">Hired</option>
                    <option value="Withdrawn">Withdrawn</option>
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <p className="text-xs text-slate-500">
                    Filters are applied to your applications.
                  </p>

                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    <X size={15} />
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Result Count */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">
                {filteredApplications.length}{" "}
                {filteredApplications.length === 1
                  ? "application"
                  : "applications"}
                <span className="font-normal text-slate-500"> found</span>
              </p>

              {hasActiveFilters && (
                <p className="text-xs text-slate-500">
                  {applications.length} total{" "}
                  {applications.length === 1 ? "application" : "applications"}
                </p>
              )}
            </div>

            {/* Application List / Empty State */}
            <ApplicationList
              applications={filteredApplications}
              hasFilters={hasActiveFilters}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
