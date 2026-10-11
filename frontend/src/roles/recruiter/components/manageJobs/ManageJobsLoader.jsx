const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />
);

const ManageJobsLoader = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>

          <Skeleton className="h-11 w-36 rounded-xl" />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>

              <Skeleton className="mt-5 h-8 w-20" />
              <Skeleton className="mt-3 h-3 w-32" />
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-52" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-11 w-full rounded-xl" />
            ))}
          </div>
        </div>

        {/* Jobs Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-4 w-52" />
            </div>

            <Skeleton className="h-9 w-28 rounded-lg" />
          </div>

          {/* Table Header */}
          <div className="hidden grid-cols-6 gap-4 bg-slate-50 px-6 py-4 lg:grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} className="h-4 w-20" />
            ))}
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-6 lg:items-center lg:px-6"
              >
                {/* Job and Company */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36 max-w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16 lg:hidden" />
                  <Skeleton className="h-5 w-20" />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16 lg:hidden" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                {/* Applicants */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20 lg:hidden" />
                  <Skeleton className="h-5 w-12" />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16 lg:hidden" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageJobsLoader;
