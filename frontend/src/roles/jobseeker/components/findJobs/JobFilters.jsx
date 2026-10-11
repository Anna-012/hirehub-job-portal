const JobFilters = ({
  jobType,
  category,
  workMode,
  experience,
  onJobTypeChange,
  onCategoryChange,
  onWorkModeChange,
  onExperienceChange,
  onApplyFilters,
  onClearFilters,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Filters</h2>

        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4">
        {/* Job Type */}
        <div>
          <label
            htmlFor="job-type"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Job Type
          </label>

          <select
            id="job-type"
            value={jobType}
            onChange={(e) => onJobTypeChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="job-category"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Category
          </label>

          <select
            id="job-category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Categories</option>
            <option value="Software Development">Software Development</option>
            <option value="Data Science & AI">Data Science & AI</option>
            <option value="UI/UX & Design">UI/UX & Design</option>
            <option value="Product Management">Product Management</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales & Business Development">
              Sales & Business Development
            </option>
            <option value="Finance & Accounting">Finance & Accounting</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Customer Support">Customer Support</option>
            <option value="Operations">Operations</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="DevOps & Cloud">DevOps & Cloud</option>
          </select>
        </div>

        {/* Work Mode */}
        <div>
          <label
            htmlFor="work-mode"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Work Mode
          </label>

          <select
            id="work-mode"
            value={workMode}
            onChange={(e) => onWorkModeChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Work Modes</option>
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label
            htmlFor="job-experience"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Experience
          </label>

          <select
            id="job-experience"
            value={experience}
            onChange={(e) => onExperienceChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Any Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1 years">0-1 years</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
        </div>
      </div>

      {/* Apply Filters */}
      <button
        type="button"
        onClick={onApplyFilters}
        className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default JobFilters;
