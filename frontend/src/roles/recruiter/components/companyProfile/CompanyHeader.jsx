import { MapPin, Pencil } from "lucide-react";

const CompanyHeader = ({ company, onEdit }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Cover */}
      <div className="relative h-52 bg-slate-100">
        {company?.coverImage?.url ? (
          <img
            src={company.coverImage.url}
            alt="Company cover"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400">
            <span className="text-lg font-medium text-white">
              Company Cover
            </span>
          </div>
        )}

        <button
          onClick={onEdit}
          className="absolute right-5 top-5 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>

      {/* Company information */}
      <div className="relative px-6 pb-6">
        <div className="-mt-16 flex flex-col gap-4 sm:flex-row sm:items-end">
          {/* Logo */}
          <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md">
            {company?.logo?.url ? (
              <img
                src={company.logo.url}
                alt={`${company.name} logo`}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-4xl font-bold text-blue-600">
                {company?.name?.charAt(0)?.toUpperCase() || "C"}
              </span>
            )}
          </div>

          <div className="pb-1">
            <h1 className="text-2xl font-bold text-slate-900">
              {company?.name || "Company Name"}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              {company?.industry && <span>{company.industry}</span>}

              {company?.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {company.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
