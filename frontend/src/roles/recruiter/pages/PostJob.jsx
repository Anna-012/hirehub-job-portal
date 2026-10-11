import React, { useEffect, useState } from "react";

import JobInformation from "../components/postJob/JobInformation";
import SalaryAndSkills from "../components/postJob/SalaryAndSkills";
import JobDescription from "../components/postJob/JobDescription";
import Requirements from "../components/postJob/Requirements";
import CompanyInformation from "../components/postJob/CompanyInformation";
import JobPreview from "../components/postJob/JobPreview";
import FormActions from "../components/postJob/FormActions";
import PostJobLoader from "../components/postJob/PostJobLoader";

import { createJob } from "../recruiterApi";
import { getMyCompany } from "../companyApi";

const PostJob = () => {
  // JOB FORM DATA

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    jobType: "",
    experience: "",
    location: "",
    workMode: "",

    minSalary: "",
    maxSalary: "",
    salaryCurrency: "INR",

    skills: "",
    description: "",
    requirements: "",
  });

  // COMPANY STATE

  const [company, setCompany] = useState(null);

  const [loadingCompany, setLoadingCompany] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // LOAD COMPANY PROFILE

  useEffect(() => {
    const loadCompany = async () => {
      try {
        setLoadingCompany(true);

        const response = await getMyCompany();

        console.log("Company response:", response);

        if (response?.company) {
          setCompany(response.company);
        } else {
          setCompany(null);
        }
      } catch (error) {
        console.error("Failed to load company:", error);

        setCompany(null);
      } finally {
        setLoadingCompany(false);
      }
    };

    loadCompany();
  }, []);

  // UPDATE FORM DATA

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // CONVERT TEXT TO ARRAY

  const convertToArray = (text) => {
    if (!text) return [];

    return text
      .split("\n")
      .map((item) => item.trim())
      .map((item) => item.replace(/^[-•*]\s*/, ""))
      .filter(Boolean);
  };

  // POST JOB

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Company is required
    if (!company?._id) {
      alert("Please create your company profile first.");

      return;
    }

    // Basic validation
    if (!formData.title.trim()) {
      alert("Please enter a job title.");

      return;
    }

    if (!formData.category.trim()) {
      alert("Please select a job category.");

      return;
    }

    if (!formData.jobType) {
      alert("Please select a job type.");

      return;
    }

    if (!formData.experience) {
      alert("Please enter the required experience.");

      return;
    }

    if (!formData.location.trim()) {
      alert("Please enter the job location.");

      return;
    }

    if (!formData.workMode) {
      alert("Please select the work mode.");

      return;
    }

    // Convert textareas into arrays
    const descriptionArray = convertToArray(formData.description);

    const requirementsArray = convertToArray(formData.requirements);

    const skillsArray = formData.skills
      ? formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : [];

    if (descriptionArray.length === 0) {
      alert("Please enter the job description.");

      return;
    }

    if (requirementsArray.length === 0) {
      alert("Please enter the job requirements.");

      return;
    }

    try {
      setIsSubmitting(true);

      // JOB DATA

      const jobData = {
        title: formData.title.trim(),

        // IMPORTANT:
        // Job.company is now a Company ObjectId
        company: company._id,

        description: descriptionArray,

        requirements: requirementsArray,

        location: formData.location.trim(),

        jobType: formData.jobType,

        category: formData.category.trim(),

        workMode: formData.workMode,

        experience: formData.experience,

        skills: skillsArray,

        salaryCurrency: formData.salaryCurrency,

        ...(formData.minSalary !== ""
          ? {
              minSalary: Number(formData.minSalary),
            }
          : {}),

        ...(formData.maxSalary !== ""
          ? {
              maxSalary: Number(formData.maxSalary),
            }
          : {}),
      };

      console.log("Sending job:", jobData);

      // CREATE JOB
      const response = await createJob(jobData);

      alert("Job posted successfully!");

      // Reset only job fields
      setFormData({
        title: "",
        category: "",
        jobType: "",
        experience: "",
        location: "",
        workMode: "",

        minSalary: "",
        maxSalary: "",
        salaryCurrency: "INR",

        skills: "",
        description: "",
        requirements: "",
      });
    } catch (error) {
      console.error("Post job error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to post job. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // CANCEL

  const handleCancel = () => {
    setFormData({
      title: "",
      category: "",
      jobType: "",
      experience: "",
      location: "",
      workMode: "",

      minSalary: "",
      maxSalary: "",
      salaryCurrency: "INR",

      skills: "",
      description: "",
      requirements: "",
    });
  };

  // SAVE DRAFT

  const handleSaveDraft = () => {
    localStorage.setItem("jobDraft", JSON.stringify(formData));

    alert("Draft saved successfully!");
  };

  // LOADING COMPANY

  if (loadingCompany) {
    return <PostJobLoader />;
  }

  // PAGE

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}

      <div className="mb-6">
        <p className="text-sm text-slate-400">
          Recruiter
          <span className="mx-2">›</span>
          Post a Job
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">Post a Job</h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new job listing and find the right candidate
        </p>
      </div>

      {/* NO COMPANY PROFILE */}

      {!company ? (
        <div className="rounded-xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Company profile required
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please create your company profile before posting a job.
          </p>
        </div>
      ) : (
        //  JOB FORM

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* LEFT COLUMN */}

            <div className="space-y-5 xl:col-span-2">
              {/* Job Information */}

              <JobInformation
                formData={formData}
                updateFormData={updateFormData}
              />

              {/* Salary & Skills */}

              <SalaryAndSkills
                formData={formData}
                updateFormData={updateFormData}
              />

              {/* Job Description */}

              <JobDescription
                formData={formData}
                updateFormData={updateFormData}
              />

              {/* Requirements */}

              <Requirements
                formData={formData}
                updateFormData={updateFormData}
              />

              {/* Actions */}

              <FormActions
                onCancel={handleCancel}
                onSaveDraft={handleSaveDraft}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* RIGHT COLUMN */}

            <div className="space-y-5">
              {/* Company Information */}

              <CompanyInformation
                company={company}
                loadingCompany={loadingCompany}
              />

              {/* Job Preview */}
              <JobPreview formData={formData} company={company} />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostJob;
