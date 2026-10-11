const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />
);

const AICandidateSearchLoader = () => {
  return (
    <div className="min-h-full w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Page heading */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-9 w-80 max-w-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
        </div>

        {/* Candidate search card */}
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          {/* Card heading */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-64 max-w-full" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>

          {/* Search mode buttons */}
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-12 w-36 rounded-xl" />
            <Skeleton className="h-12 w-44 rounded-xl" />
          </div>

          {/* Job selection */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          {/* Search button */}
          <Skeleton className="h-12 w-52 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default AICandidateSearchLoader;
