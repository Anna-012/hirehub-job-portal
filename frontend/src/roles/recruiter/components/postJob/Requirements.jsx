import React from "react";
import { FiCheckSquare } from "react-icons/fi";

const Requirements = ({ formData, updateFormData }) => {
  const maxLength = 2000;

  const handleChange = (e) => {
    updateFormData("requirements", e.target.value);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <FiCheckSquare size={20} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Requirements
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Tell candidates what skills and qualifications they need
          </p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Job Requirements <span className="text-red-500">*</span>
        </label>

        <textarea
          value={formData.requirements}
          onChange={handleChange}
          maxLength={maxLength}
          rows={8}
          placeholder={`Enter each requirement on a new line.

Example:
Experience with React and Node.js
Knowledge of REST APIs
Understanding of databases
Good communication skills`}
          className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-2 flex justify-between">
          <span className="text-xs text-slate-400">
            Write each requirement on a new line
          </span>

          <span className="text-xs text-slate-400">
            {formData.requirements.length}/{maxLength}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Requirements;
