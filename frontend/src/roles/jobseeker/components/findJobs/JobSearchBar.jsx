const JobSearchBar = ({
  search,
  location,
  onSearchChange,
  onLocationChange,
  onSearch,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        {/* Search */}
        <div>
          <label
            htmlFor="job-search"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Search Jobs
          </label>

          <input
            id="job-search"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Job title, skill or company"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="job-location"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Location
          </label>

          <input
            id="job-location"
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="e.g. Delhi"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Search Button */}
        <button
          type="button"
          onClick={onSearch}
          className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 md:w-auto"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default JobSearchBar;
