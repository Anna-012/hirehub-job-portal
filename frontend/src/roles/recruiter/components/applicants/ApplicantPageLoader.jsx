const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />
);

const ApplicantPageLoader = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Job Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

              <div className="space-y-3">
                <Skeleton className="h-7 w-64 max-w-full" />
                <Skeleton className="h-4 w-48 max-w-full" />

                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Skeleton className="h-10 w-24 rounded-xl" />
              <Skeleton className="h-10 w-28 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Applicant Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>

              <Skeleton className="mt-5 h-8 w-16" />
              <Skeleton className="mt-3 h-3 w-32" />
            </div>
          ))}
        </div>

        {/* Candidate Applications */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="mt-3 h-4 w-72 max-w-full" />

            {/* Search */}
            <div className="mt-5">
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>

            {/* Status filters */}
            <div className="mt-4 flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <Skeleton key={item} className="h-10 w-24 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden grid-cols-5 gap-4 bg-slate-50 px-6 py-4 lg:grid">
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="h-4 w-20" />
            ))}
          </div>

          {/* Candidate Rows */}
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-5 lg:items-center lg:px-6"
              >
                {/* Candidate */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-11 w-11 shrink-0 rounded-full" />

                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-32 max-w-full" />
                    <Skeleton className="h-3 w-40 max-w-full" />
                  </div>
                </div>

                {/* Applied Date */}
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
        </section>
      </div>
    </div>
  );
};

export default ApplicantPageLoader;
