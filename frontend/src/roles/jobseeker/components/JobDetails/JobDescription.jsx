const JobDescription = ({ description = [] }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Job Description</h2>

      {description.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {description.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm leading-6 text-slate-600"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-slate-500">
          No job description provided.
        </p>
      )}
    </section>
  );
};

export default JobDescription;
