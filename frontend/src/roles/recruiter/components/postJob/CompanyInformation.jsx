const CompanyInformation = ({ company, loadingCompany }) => {
  if (loadingCompany) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-slate-500">Loading company information...</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-red-500">
          Please create your company profile first.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Company Information
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Information from your company profile
      </p>

      <div className="mt-6 space-y-5">
        {/* Company Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company Name
          </label>

          <input
            type="text"
            value={company.name || ""}
            disabled
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
          />
        </div>

        {/* Website */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company Website
          </label>

          <input
            type="text"
            value={company.website || ""}
            disabled
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
          />
        </div>

        {/* Logo */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company Logo
          </label>

          {company.logo?.url ? (
            <div className="flex items-center gap-4 rounded-lg border border-slate-200 p-4">
              <img
                src={company.logo.url}
                alt={`${company.name} logo`}
                className="h-16 w-16 rounded-lg object-contain"
              />

              <div>
                <p className="font-medium text-slate-800">{company.name}</p>

                <p className="text-sm text-slate-500">
                  Logo from company profile
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No company logo uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
