const DashboardLoader = () => {
  return (
    <div
      className="mx-auto w-full max-w-7xl space-y-7"
      role="status"
      aria-label="Loading your dashboard"
    >
      {/* Dashboard Header */}
      <div className="animate-pulse space-y-3">
        <div className="h-8 w-64 max-w-full rounded-lg bg-slate-200" />
        <div className="h-4 w-80 max-w-full rounded bg-slate-200" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="h-10 w-10 rounded-xl bg-slate-100" />
            </div>

            <div className="mt-5 h-8 w-16 rounded-lg bg-slate-200" />
            <div className="mt-3 h-3 w-36 max-w-full rounded bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Profile Completion */}
      <section className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="h-14 w-14 shrink-0 rounded-xl bg-slate-200" />

          <div className="flex-1 space-y-3">
            <div className="h-5 w-48 max-w-full rounded bg-slate-200" />
            <div className="h-4 w-72 max-w-full rounded bg-slate-100" />

            <div className="h-2.5 w-full rounded-full bg-slate-100">
              <div className="h-2.5 w-2/3 rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="h-10 w-28 rounded-lg bg-slate-100" />
        </div>
      </section>

      {/* Recent Applications */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex animate-pulse items-center justify-between border-b border-slate-100 p-5">
          <div className="space-y-2">
            <div className="h-5 w-44 rounded bg-slate-200" />
            <div className="h-3 w-56 max-w-full rounded bg-slate-100" />
          </div>

          <div className="h-9 w-24 rounded-lg bg-slate-100" />
        </div>

        <div className="divide-y divide-slate-100">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="flex animate-pulse items-center gap-4 p-5"
            >
              <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />

              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-4 w-48 max-w-full rounded bg-slate-200" />
                <div className="h-3 w-32 max-w-full rounded bg-slate-100" />
              </div>

              <div className="hidden h-7 w-24 rounded-full bg-slate-100 sm:block" />
            </div>
          ))}
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="space-y-4">
        <div className="flex animate-pulse items-center justify-between">
          <div className="h-6 w-36 rounded bg-slate-200" />
          <div className="h-4 w-20 rounded bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <article
              key={index}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />

                <div className="flex-1 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-3 w-1/2 rounded bg-slate-100" />
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <div className="h-6 w-20 rounded-full bg-slate-100" />
                <div className="h-6 w-24 rounded-full bg-slate-100" />
              </div>

              <div className="mt-5 space-y-2">
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-4/5 rounded bg-slate-100" />
              </div>

              <div className="mt-5 h-10 w-full rounded-lg bg-slate-100" />
            </article>
          ))}
        </div>
      </section>

      <span className="sr-only">
        Loading dashboard information. Please wait...
      </span>
    </div>
  );
};

export default DashboardLoader;
