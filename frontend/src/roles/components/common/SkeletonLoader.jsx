const SkeletonLoader = ({ count = 3, variant = "card" }) => {
  const items = Array.from({ length: Math.max(1, count) }, (_, index) => index);

  if (variant === "text") {
    return (
      <div className="space-y-3" role="status" aria-label="Loading content">
        {items.map((item) => (
          <div
            key={item}
            className={`h-4 animate-pulse rounded-md bg-slate-200 ${
              item === 0 ? "w-full" : item % 2 === 0 ? "w-4/5" : "w-3/5"
            }`}
          />
        ))}
        <span className="sr-only">Loading content...</span>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="space-y-4" aria-label="Loading list" role="status">
        {items.map((item) => (
          <div
            key={item}
            className="flex animate-pulse items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-200" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-2/3 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-200" />
            </div>
          </div>
        ))}
        <span className="sr-only">Loading list...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
          role="status"
          aria-label="Loading card"
        >
          <div className="mb-4 h-12 w-12 rounded-xl bg-slate-200" />

          <div className="mb-3 h-5 w-3/4 rounded bg-slate-200" />

          <div className="mb-2 h-3 w-full rounded bg-slate-200" />

          <div className="mb-5 h-3 w-2/3 rounded bg-slate-200" />

          <div className="h-9 w-28 rounded-lg bg-slate-200" />
        </div>
      ))}
      <span className="sr-only">Loading cards...</span>
    </div>
  );
};

export default SkeletonLoader;
