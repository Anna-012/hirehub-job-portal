import { Building2, MapPin } from "lucide-react";

const CompanyOverview = ({ company }) => {
  if (!company) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          About the Company
        </h2>

        <p className="mt-4 text-sm text-slate-500">
          Company information is not available.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        About the Company
      </h2>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {company.logo?.url ? (
            <img
              src={company.logo.url}
              alt={company.name || "Company"}
              className="h-full w-full object-contain"
            />
          ) : (
            <Building2 size={22} className="text-slate-400" />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900">
            {company.name || "Company"}
          </h3>

          {company.location && (
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={13} />
              {company.location}
            </p>
          )}
        </div>
      </div>

      {company.description && (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          {company.description}
        </p>
      )}

      <div className="mt-5 space-y-3">
        {company.industry && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Industry
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              {company.industry}
            </p>
          </div>
        )}

        {company.companySize && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Company Size
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              {company.companySize}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyOverview;
