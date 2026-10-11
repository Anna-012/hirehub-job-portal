const MatchScore = ({ score, jobTitle }) => {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-medium text-slate-500">Your Job Match Score</p>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-4xl font-bold text-indigo-600 sm:text-5xl">
            {safeScore}%
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Match for {jobTitle || "selected job"}
          </p>
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          AI Analysis
        </span>
      </div>

      <div
        className="mt-6 h-3 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label="Job match score"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeScore}
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${safeScore}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-500">
        This score is an estimate based on your profile and the selected job. It
        does not guarantee job selection.
      </p>
    </div>
  );
};

export default MatchScore;
