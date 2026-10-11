import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import JobInformation from "../components/postJob/JobInformation";
import SalaryAndSkills from "../components/postJob/SalaryAndSkills";
import JobDescription from "../components/postJob/JobDescription";
import Requirements from "../components/postJob/Requirements";
import CompanyInformation from "../components/postJob/CompanyInformation";
import FormActions from "../components/postJob/FormActions";

import { getJobById, updateJob } from "../recruiterApi";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    companyName: "",
    companyWebsite: "",
    companyLogo: null,
  });

  // ==========================================
  // UPDATE FORM DATA
  // ==========================================

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================
  // FETCH JOB
  // ==========================================

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);

        const job = response.job;

        setFormData({
          title: job.title || "",
          category: job.category || "",
          jobType: job.jobType || "",
          experience: job.experience || "",
          location: job.location || "",
          workMode: job.workMode || "",

          minSalary:
            job.minSalary !== undefined && job.minSalary !== null
              ? String(job.minSalary)
              : "",

          maxSalary:
            job.maxSalary !== undefined && job.maxSalary !== null
              ? String(job.maxSalary)
              : "",

          salaryCurrency: job.salaryCurrency || "INR",

          skills: Array.isArray(job.skills)
            ? job.skills.join(", ")
            : job.skills || "",

          description: Array.isArray(job.description)
            ? job.description.join("\n")
            : job.description || "",

          requirements: Array.isArray(job.requirements)
            ? job.requirements.join("\n")
            : job.requirements || "",

          companyName: job.company || "",
          companyWebsite: job.companyWebsite || "",
          companyLogo: job.companyLogo || null,
        });
      } catch (error) {
        console.error("Failed to fetch job:", error);

        alert(
          error?.response?.data?.message ||
            "Failed to load job. Please try again.",
        );

        navigate("/recruiter/manage-jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  // ==========================================
  // UPDATE JOB
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const descriptionArray = formData.description
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const requirementsArray = formData.requirements
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const skillsArray = Array.isArray(formData.skills)
        ? formData.skills
        : formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);

      const jobData = {
        title: formData.title.trim(),

        company: formData.companyName.trim(),

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
          ? { minSalary: Number(formData.minSalary) }
          : {}),

        ...(formData.maxSalary !== ""
          ? { maxSalary: Number(formData.maxSalary) }
          : {}),

        ...(formData.companyLogo ? { companyLogo: formData.companyLogo } : {}),
      };

      console.log("Updating Job:", jobData);

      const response = await updateJob(id, jobData);

      console.log("Job updated successfully:", response);

      alert("Job updated successfully!");

      navigate("/recruiter/manage-jobs");
    } catch (error) {
      console.error("Update job error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to update job. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {
    navigate("/recruiter/manage-jobs");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading job...</p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}

      <div className="mb-6">
        <p className="text-sm text-slate-400">
          Recruiter <span className="mx-2">›</span> Edit Job
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">Edit Job</h1>

        <p className="mt-1 text-sm text-slate-500">
          Update your job listing and keep the information up to date
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* LEFT */}

          <div className="space-y-5 xl:col-span-2">
            <JobInformation
              formData={formData}
              updateFormData={updateFormData}
            />

            <SalaryAndSkills
              formData={formData}
              updateFormData={updateFormData}
            />

            <JobDescription
              formData={formData}
              updateFormData={updateFormData}
            />

            <Requirements formData={formData} updateFormData={updateFormData} />

            <FormActions
              onCancel={handleCancel}
              onSaveDraft={() => {}}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* RIGHT */}

          <div className="space-y-5">
            <CompanyInformation
              formData={formData}
              updateFormData={updateFormData}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditJob;
