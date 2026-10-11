import React from "react";
import { FiDollarSign, FiCode } from "react-icons/fi";

const SalaryAndSkills = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    updateFormData(name, value);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <FiDollarSign size={20} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Salary & Skills
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Set salary range and required skills
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Salary */}
        <div>
          <div className="mb-2">
            <label className="text-sm font-medium text-slate-700">
              Salary Range
            </label>

            <span className="ml-2 text-xs text-slate-400">(Optional)</span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Currency */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Currency
              </label>

              <select
                name="salaryCurrency"
                value={formData.salaryCurrency}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="INR">₹ INR - Indian Rupee</option>
                <option value="USD">$ USD - US Dollar</option>
              </select>
            </div>

            {/* Minimum Salary */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Minimum Salary
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  {formData.salaryCurrency === "USD" ? "$" : "₹"}
                </span>

                <input
                  type="number"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  placeholder="e.g. 50000"
                  min="0"
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Maximum Salary */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500">
                Maximum Salary
              </label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  {formData.salaryCurrency === "USD" ? "$" : "₹"}
                </span>

                <input
                  type="number"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  placeholder="e.g. 100000"
                  min="0"
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Salary information is optional. Recruiters can choose whether to
            display it.
          </p>
        </div>

        {/* Required Skills */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Required Skills <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <FiCode
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="skills"
              value={
                Array.isArray(formData.skills)
                  ? formData.skills.join(", ")
                  : formData.skills
              }
              onChange={handleChange}
              placeholder="e.g. React, JavaScript, Node.js"
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Add skills separated by commas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SalaryAndSkills;
