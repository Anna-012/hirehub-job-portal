const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />
);

const CompanyProfileLoader = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Company Header */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Skeleton className="h-36 w-full rounded-none sm:h-48" />

          <div className="p-5 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <Skeleton className="-mt-14 h-24 w-24 shrink-0 rounded-2xl border-4 border-white sm:h-28 sm:w-28" />

              <div className="flex-1 space-y-3">
                <Skeleton className="h-7 w-64 max-w-full" />
                <Skeleton className="h-4 w-44 max-w-full" />
                <Skeleton className="h-4 w-52 max-w-full" />
              </div>

              <Skeleton className="h-11 w-36 rounded-xl" />
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-4">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-10 w-28 shrink-0 rounded-lg" />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* About */}
          <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2 sm:p-7">
            <Skeleton className="h-6 w-40" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>

            <Skeleton className="h-5 w-32" />

            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={item} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </section>

          {/* Company Details */}
          <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <Skeleton className="h-6 w-40" />

            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-32 max-w-full" />
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Company Highlights */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <Skeleton className="mb-5 h-6 w-44" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-100 p-4"
              >
                <Skeleton className="mb-3 h-10 w-10 rounded-xl" />
                <Skeleton className="mb-3 h-4 w-32" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-3/4" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyProfileLoader;
