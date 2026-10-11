import React from "react";
import { FiFileText } from "react-icons/fi";

const JobDescription = ({ formData, updateFormData }) => {
  const maxLength = 2000;

  const handleChange = (e) => {
    updateFormData("description", e.target.value);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <FiFileText size={20} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Job Description
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Describe the role and what the candidate will be doing
          </p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description <span className="text-red-500">*</span>
        </label>

        <textarea
          value={formData.description}
          onChange={handleChange}
          maxLength={maxLength}
          rows={8}
          placeholder={`Enter each description point on a new line.

Example:
Build features end to end
Work with React and Node.js
Review code and improve performance
Collaborate with the development team`}
          className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-2 flex justify-between">
          <span className="text-xs text-slate-400">
            Write each point on a new line
          </span>

          <span className="text-xs text-slate-400">
            {formData.description.length}/{maxLength}
          </span>
        </div>
      </div>
    </section>
  );
};

export default JobDescription;
