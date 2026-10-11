import { Search } from "lucide-react";

const tabs = [
  { label: "All Applicants", value: "All" },
  { label: "Under Review", value: "Under Review" },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Rejected", value: "Rejected" },
];

const ApplicantFilters = ({ activeTab, setActiveTab, search, setSearch }) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              activeTab === tab.value
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative w-full lg:max-w-xs">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name or email..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
};

export default ApplicantFilters;
