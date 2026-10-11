const ResumeAnalysisResult = ({ analysis }) => {
  const score = Math.max(0, Math.min(100, Number(analysis?.resumeScore) || 0));

  const scoreColor =
    score >= 75
      ? "text-emerald-600"
      : score >= 50
        ? "text-amber-600"
        : "text-rose-600";

  const scoreBarColor =
    score >= 75
      ? "bg-emerald-500"
      : score >= 50
        ? "bg-amber-500"
        : "bg-rose-500";

  const sections = [
    {
      title: "Resume Strengths",
      subtitle: "What your resume does well",
      items: analysis?.strengths,
      icon: "✓",
      color: "text-emerald-700",
      background: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Areas to Improve",
      subtitle: "Where you can improve",
      items: analysis?.areasToImprove,
      icon: "↗",
      color: "text-amber-700",
      background: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: "Recommendations",
      subtitle: "Actionable next steps",
      items: analysis?.recommendations,
      icon: "✦",
      color: "text-indigo-700",
      background: "bg-indigo-50",
      border: "border-indigo-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Resume Score */}
      <section
        className="rounded-2xl border border-slate-200
      bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-5 sm:p-7"
      >
        <div
          className="flex flex-col gap-5 sm:flex-row
        sm:items-center sm:justify-between"
        >
          <div>
            <p
              className="text-sm font-semibold uppercase
            tracking-wider text-slate-500"
            >
              Your Resume Score
            </p>

            <h3 className={`mt-2 text-5xl font-extrabold ${scoreColor}`}>
              {score}
              <span className="text-2xl text-slate-400">/100</span>
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {score >= 75
                ? "Your resume has a strong foundation. Keep refining it."
                : score >= 50
                  ? "Good start! A few improvements could strengthen your resume."
                  : "There is room to improve your resume. Start with the suggestions below."}
            </p>
          </div>

          <div
            className="flex h-24 w-24 shrink-0 items-center
          justify-center self-center rounded-full border-8
          border-indigo-100 bg-white sm:self-auto"
          >
            <span className={`text-2xl font-bold ${scoreColor}`}>{score}%</span>
          </div>
        </div>

        <div
          className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-label="Resume score"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={score}
        >
          <div
            className={`h-full rounded-full transition-all
            duration-700 ${scoreBarColor}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </section>

      {/* Analysis Sections */}
      <div className="grid grid-cols-1 gap-5">
        {sections.map((section) => (
          <section
            key={section.title}
            className={`rounded-2xl border ${section.border}
            ${section.background} p-5`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0
              items-center justify-center rounded-xl
              bg-white text-lg font-bold ${section.color}`}
              >
                {section.icon}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800">
                  {section.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {section.subtitle}
                </p>
              </div>
            </div>

            {Array.isArray(section.items) && section.items.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {section.items.map((item, index) => (
                  <li
                    key={`${section.title}-${index}`}
                    className="flex items-start gap-3 rounded-xl
                    border border-white/80 bg-white/80 p-3"
                  >
                    <span className={`mt-0.5 font-bold ${section.color}`}>
                      {section.icon}
                    </span>

                    <span className="break-words text-sm leading-6 text-slate-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className="mt-5 rounded-xl bg-white/80 p-4 text-sm
              text-slate-500"
              >
                No information available.
              </p>
            )}
          </section>
        ))}
      </div>

      <p className="text-center text-xs leading-5 text-slate-400">
        AI-generated feedback is a guide to help you improve your resume. Review
        suggestions and adapt them to your actual experience.
      </p>
    </div>
  );
};

export default ResumeAnalysisResult;
