const AnalysisSection = ({ analysis }) => {
  const sections = [
    {
      title: "Matched Skills",
      items: analysis?.matchedSkills,
      color: "text-emerald-700",
      background: "bg-emerald-50",
      icon: "✓",
    },
    {
      title: "Missing Skills",
      items: analysis?.missingSkills,
      color: "text-rose-700",
      background: "bg-rose-50",
      icon: "!",
    },
    {
      title: "Your Strengths",
      items: analysis?.strengths,
      color: "text-indigo-700",
      background: "bg-indigo-50",
      icon: "★",
    },
    {
      title: "Areas to Improve",
      items: analysis?.areasToImprove,
      color: "text-amber-700",
      background: "bg-amber-50",
      icon: "↗",
    },
    {
      title: "AI Recommendations",
      items: analysis?.recommendations,
      color: "text-violet-700",
      background: "bg-violet-50",
      icon: "✦",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {sections.map((section) => (
        <div
          key={section.title}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${section.background} ${section.color}`}
              aria-hidden="true"
            >
              {section.icon}
            </span>

            <h3 className="text-lg font-semibold text-slate-800">
              {section.title}
            </h3>
          </div>

          {section.items?.length > 0 ? (
            <ul className="space-y-3">
              {section.items.map((item, index) => (
                <li
                  key={`${section.title}-${index}`}
                  className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                >
                  <span className={`mt-0.5 ${section.color}`}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No information available.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnalysisSection;
