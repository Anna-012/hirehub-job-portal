const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />
);

const ApplicantsLoader = () => {
  return (
    <div
      className="w-full overflow-hidden bg-white"
      role="status"
      aria-label="Loading applicants"
    >
      {/* Table Header */}
      <div className="hidden grid-cols-5 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 lg:grid">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="h-4 w-20" />
        ))}
      </div>

      {/* Candidate Rows */}
      <div className="divide-y divide-slate-100">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-5 lg:items-center lg:px-6"
          >
            {/* Candidate */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 shrink-0 rounded-full" />

              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-32 max-w-full" />
                <Skeleton className="h-3 w-40 max-w-full" />
              </div>
            </div>

            {/* Applied On */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-20 lg:hidden" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-16 lg:hidden" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>

            {/* Resume */}
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20 rounded-lg" />
              <Skeleton className="h-9 w-20 rounded-lg" />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading applicants...</span>
    </div>
  );
};

export default ApplicantsLoader;
