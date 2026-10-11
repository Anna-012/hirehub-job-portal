const JobSummary = ({ job }) => {
  const summaryItems = [
    {
      label: "Work Mode",
      value: job.workMode || "Not specified",
    },
    {
      label: "Job Type",
      value: job.jobType || "Not specified",
    },
    {
      label: "Category",
      value: job.category || "Not specified",
    },
    {
      label: "Experience",
      value: job.experience || "Not specified",
    },
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Job Summary</h2>

      <div className="mt-5 space-y-4">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {item.label}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              {item.value}
            </p>
          </div>
        ))}

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Status
          </p>

          <span className="mt-2 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            {job.status || "Active"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default JobSummary;
