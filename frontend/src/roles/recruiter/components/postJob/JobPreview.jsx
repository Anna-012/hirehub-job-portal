import React from "react";

import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiGlobe,
} from "react-icons/fi";

const JobPreview = ({ formData, company }) => {
  // ==========================================
  // SKILLS
  // ==========================================

  const skills =
    typeof formData.skills === "string"
      ? formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : Array.isArray(formData.skills)
        ? formData.skills.filter(Boolean)
        : [];

  // ==========================================
  // DESCRIPTION
  // ==========================================

  const descriptionPoints = formData.description
    ? formData.description
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  // ==========================================
  // REQUIREMENTS
  // ==========================================

  const requirementPoints = formData.requirements
    ? formData.requirements
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  // ==========================================
  // SALARY
  // ==========================================

  const hasMinSalary =
    formData.minSalary !== "" &&
    formData.minSalary !== null &&
    formData.minSalary !== undefined;

  const hasMaxSalary =
    formData.maxSalary !== "" &&
    formData.maxSalary !== null &&
    formData.maxSalary !== undefined;

  const hasSalary = hasMinSalary || hasMaxSalary;

  const currencySymbol = formData.salaryCurrency === "USD" ? "$" : "₹";

  const formatSalary = (value) => {
    if (value === "" || value === null || value === undefined) {
      return null;
    }

    return Number(value).toLocaleString("en-IN");
  };

  const salaryText = hasSalary
    ? `${hasMinSalary ? `${currencySymbol}${formatSalary(formData.minSalary)}` : ""}${
        hasMinSalary && hasMaxSalary ? " - " : ""
      }${hasMaxSalary ? `${currencySymbol}${formatSalary(formData.maxSalary)}` : ""}`
    : "Salary not disclosed";

  // ==========================================
  // COMPANY DATA
  // ==========================================

  const companyName = company?.name || "Company Name";

  const companyWebsite = company?.website || "";

  const companyLogo = company?.logo?.url || "";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* ========================================
          HEADER
      ======================================== */}

      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900">Job Preview</h2>

        <p className="mt-1 text-xs text-slate-400">
          This is how your job will appear to candidates
        </p>
      </div>

      {/* ========================================
          COMPANY
      ======================================== */}

      <div className="flex items-start gap-3">
        {/* Company Logo */}

        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={`${companyName} logo`}
              className="h-full w-full object-contain"
            />
          ) : (
            <FiBriefcase className="text-slate-400" size={22} />
          )}
        </div>

        {/* Company Details */}

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {companyName}
          </p>

          {companyWebsite && (
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <FiGlobe size={13} />

              <span className="truncate">{companyWebsite}</span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================
          JOB TITLE
      ======================================== */}

      <div className="mt-5">
        <h3 className="text-lg font-bold text-slate-900">
          {formData.title || "Job Title"}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {formData.category || "Job Category"}
        </p>
      </div>

      {/* ========================================
          JOB META
      ======================================== */}

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Location */}

        <div className="flex items-start gap-2 text-sm text-slate-600">
          <FiMapPin className="mt-0.5 flex-shrink-0 text-slate-400" size={16} />

          <span>{formData.location || "Location"}</span>
        </div>

        {/* Job Type */}

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FiClock className="flex-shrink-0 text-slate-400" size={16} />

          <span>{formData.jobType || "Job Type"}</span>
        </div>

        {/* Salary */}

        <div className="flex items-start gap-2 text-sm text-slate-600">
          <FiDollarSign
            className="mt-0.5 flex-shrink-0 text-slate-400"
            size={16}
          />

          <span>{salaryText}</span>
        </div>

        {/* Work Mode */}

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FiGlobe className="flex-shrink-0 text-slate-400" size={16} />

          <span>{formData.workMode || "Work Mode"}</span>
        </div>

        {/* Experience */}

        {formData.experience && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FiBriefcase className="flex-shrink-0 text-slate-400" size={16} />

            <span>{formData.experience}</span>
          </div>
        )}
      </div>

      {/* ========================================
          SKILLS
      ======================================== */}

      <div className="mt-6">
        <h4 className="mb-3 text-sm font-semibold text-slate-800">
          Required Skills
        </h4>

        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">Skills will appear here</p>
        )}
      </div>

      {/* ========================================
          JOB DESCRIPTION
      ======================================== */}

      <div className="mt-6 border-t border-slate-100 pt-5">
        <h4 className="mb-3 text-sm font-semibold text-slate-800">
          Job Description
        </h4>

        {descriptionPoints.length > 0 ? (
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-500">
            {descriptionPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">
            Job description will appear here.
          </p>
        )}
      </div>

      {/* ========================================
          REQUIREMENTS
      ======================================== */}

      <div className="mt-6 border-t border-slate-100 pt-5">
        <h4 className="mb-3 text-sm font-semibold text-slate-800">
          Requirements
        </h4>

        {requirementPoints.length > 0 ? (
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-500">
            {requirementPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">
            Job requirements will appear here.
          </p>
        )}
      </div>
    </section>
  );
};

export default JobPreview;
