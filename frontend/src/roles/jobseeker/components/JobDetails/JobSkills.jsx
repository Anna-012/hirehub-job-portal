const JobSkills = ({ skills = [] }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Skills</h2>

      {skills.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500">No skills specified.</p>
      )}
    </section>
  );
};

export default JobSkills;
