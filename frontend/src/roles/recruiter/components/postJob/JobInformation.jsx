import React from "react";
import { FiBriefcase, FiMapPin, FiLayers } from "react-icons/fi";

const JobInformation = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    updateFormData(name, value);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <FiBriefcase size={20} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Job Information
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Basic details about this job
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Job Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Job Title <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Job Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Job Category <span className="text-red-500">*</span>
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select category</option>
            <option value="Software Development">Software Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Data Science">Data Science</option>
            <option value="Sales">Sales</option>
            <option value="Customer Support">Customer Support</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Job Type <span className="text-red-500">*</span>
          </label>

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Experience <span className="text-red-500">*</span>
          </label>

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select experience</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1 years">0-1 years</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5-8 years">5-8 years</option>
            <option value="8+ years">8+ years</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Location <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <FiMapPin
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Bangalore, India"
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Work Mode */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Work Mode <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <FiLayers
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select work mode</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobInformation;
