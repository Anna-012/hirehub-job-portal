const PostJobLoader = () => {
  return (
    <div
      className="min-h-screen bg-slate-50 p-4 sm:p-6"
      role="status"
      aria-label="Loading post job form"
    >
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Breadcrumb and page heading */}
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-36 rounded bg-slate-200" />
          <div className="h-8 w-56 rounded-lg bg-slate-200" />
          <div className="h-4 w-80 max-w-full rounded bg-slate-200" />
        </div>

        {/* Main form layout */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
          {/* Left column */}
          <div className="space-y-5 xl:col-span-2">
            {/* Job information */}
            <section className="animate-pulse space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="h-5 w-44 rounded bg-slate-200" />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="h-3 w-28 rounded bg-slate-200" />
                    <div className="h-11 w-full rounded-lg bg-slate-100" />
                  </div>
                ))}
              </div>
            </section>

            {/* Salary and skills */}
            <section className="animate-pulse space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="h-5 w-40 rounded bg-slate-200" />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="h-3 w-24 rounded bg-slate-200" />
                    <div className="h-11 w-full rounded-lg bg-slate-100" />
                  </div>
                ))}
              </div>
            </section>

            {/* Description and requirements */}
            {[0, 1].map((section) => (
              <section
                key={section}
                className="animate-pulse space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="h-5 w-40 rounded bg-slate-200" />
                <div className="h-32 w-full rounded-lg bg-slate-100" />
                <div className="h-3 w-3/4 rounded bg-slate-100" />
              </section>
            ))}

            {/* Form actions */}
            <div className="flex animate-pulse flex-wrap gap-3">
              <div className="h-11 w-32 rounded-lg bg-slate-200" />
              <div className="h-11 w-28 rounded-lg bg-slate-100" />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Company information */}
            <section className="animate-pulse space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-5 w-40 rounded bg-slate-200" />

              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-slate-200" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="h-3 w-24 rounded bg-slate-100" />
                </div>
              </div>

              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-4/5 rounded bg-slate-100" />
            </section>

            {/* Job preview */}
            <section className="animate-pulse space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-5 w-32 rounded bg-slate-200" />
              <div className="h-6 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-1/2 rounded bg-slate-100" />

              <div className="flex gap-2">
                <div className="h-6 w-20 rounded-full bg-slate-100" />
                <div className="h-6 w-24 rounded-full bg-slate-100" />
              </div>

              <div className="space-y-2 pt-2">
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-2/3 rounded bg-slate-100" />
              </div>
            </section>
          </div>
        </div>

        <span className="sr-only">
          Loading company information and job form...
        </span>
      </div>
    </div>
  );
};

export default PostJobLoader;
