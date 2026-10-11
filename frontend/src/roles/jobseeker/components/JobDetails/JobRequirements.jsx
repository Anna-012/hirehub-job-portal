import { CheckCircle2 } from "lucide-react";

const JobRequirements = ({ requirements = [] }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Requirements</h2>

      {requirements.length > 0 ? (
        <div className="mt-4 space-y-3">
          {requirements.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="text-sm leading-6 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500">
          No specific requirements provided.
        </p>
      )}
    </section>
  );
};

export default JobRequirements;
