const DashboardLoader = () => {
  return (
    <div
      className="mx-auto w-full max-w-[1600px] space-y-8"
      role="status"
      aria-label="Loading recruiter dashboard"
    >
      {/* Welcome section */}
      <section className="animate-pulse space-y-3">
        <div className="h-8 w-72 max-w-full rounded-lg bg-slate-200" />
        <div className="h-4 w-96 max-w-full rounded bg-slate-200" />
      </section>

      {/* Dashboard statistics */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="h-11 w-11 rounded-xl bg-slate-100" />
            </div>

            <div className="mt-6 h-8 w-16 rounded-lg bg-slate-200" />
            <div className="mt-3 h-3 w-36 max-w-full rounded bg-slate-100" />
          </div>
        ))}
      </section>

      {/* Quick actions */}
      <section className="space-y-4">
        <div className="h-6 w-36 animate-pulse rounded bg-slate-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="flex animate-pulse items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-32 max-w-full rounded bg-slate-200" />
                <div className="h-3 w-44 max-w-full rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent applications and recent jobs */}
      <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
        {[0, 1].map((section) => (
          <div
            key={section}
            className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="border-b border-slate-100 p-5">
              <div className="h-5 w-44 max-w-full rounded bg-slate-200" />
              <div className="mt-3 h-3 w-60 max-w-full rounded bg-slate-100" />
            </div>

            <div className="space-y-5 p-5">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-200" />

                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                    <div className="h-3 w-1/2 rounded bg-slate-100" />
                  </div>

                  <div className="hidden h-7 w-20 rounded-full bg-slate-100 sm:block" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <span className="sr-only">
        Loading recruiter dashboard information...
      </span>
    </div>
  );
};

export default DashboardLoader;
