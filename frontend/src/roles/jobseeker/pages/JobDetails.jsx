import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../components/common/PageLoader";

import {
  checkApplicationStatus,
  checkSavedJob,
  getJobById,
  removeSavedJob,
  saveJob,
} from "../jobseekerApi";

import JobDetailsHeader from "../components/JobDetails/JobDetailsHeader";
import JobDescription from "../components/JobDetails/JobDescription";
import JobRequirements from "../components/JobDetails/JobRequirements";
import JobSkills from "../components/JobDetails/JobSkills";
import CompanyOverview from "../components/JobDetails/CompanyOverview";
import JobSummary from "../components/JobDetails/JobSummary";
import ApplyJobModal from "../components/JobDetails/ApplyJobModal";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Job data
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Saved job state
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Application state
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");

  // Apply modal
  const [showApplyModal, setShowApplyModal] = useState(false);

  // --------------------------------------------------
  // Fetch Job Details
  // --------------------------------------------------
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getJobById(id);

        setJob(data.job);
      } catch (err) {
        console.error("Failed to fetch job:", err);

        setError(err.response?.data?.message || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  // --------------------------------------------------
  // Check Saved Job Status
  // --------------------------------------------------
  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        const data = await checkSavedJob(id);

        setIsSaved(Boolean(data.isSaved));
      } catch (err) {
        // Saved status failure should not break the page.
        console.error("Failed to check saved job:", err);
      }
    };

    if (id) {
      fetchSavedStatus();
    }
  }, [id]);

  // --------------------------------------------------
  // Check Application Status
  // --------------------------------------------------
  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const data = await checkApplicationStatus(id);

        setHasApplied(Boolean(data.hasApplied));
        setApplicationStatus(data.application?.status || "");
      } catch (err) {
        // Application status failure should not break the page.
        console.error("Failed to check application status:", err);
      }
    };

    if (id) {
      fetchApplicationStatus();
    }
  }, [id]);

  // --------------------------------------------------
  // Save / Unsave Job
  // --------------------------------------------------
  const handleSave = async () => {
    if (saving) return;

    try {
      setSaving(true);

      if (isSaved) {
        await removeSavedJob(id);

        setIsSaved(false);
      } else {
        await saveJob(id);

        setIsSaved(true);
      }
    } catch (err) {
      console.error("Failed to update saved job:", err);

      const message =
        err.response?.data?.message || "Failed to update saved job";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // Open Apply Modal
  // --------------------------------------------------
  const handleApply = () => {
    if (hasApplied) {
      return;
    }

    setShowApplyModal(true);
  };

  // Application Submitted Successfully

  const handleApplicationSuccess = () => {
    setShowApplyModal(false);

    setHasApplied(true);
    setApplicationStatus("Applied");
  };

  // Loading State

  if (loading) {
    return <PageLoader message="Loading job details..." fullScreen />;
  }

  // Error State

  if (error || !job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-sm text-red-500">{error || "Job not found"}</p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Company Data

  const company = typeof job.company === "object" ? job.company : null;

  const companyName =
    company?.name ||
    (typeof job.company === "string" ? job.company : "Company");

  const companyLogo = company?.logo?.url || null;

  const companyWebsite = company?.website || null;

  // UI

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Job Header */}
        <JobDetailsHeader
          job={job}
          companyName={companyName}
          companyLogo={companyLogo}
          companyWebsite={companyWebsite}
          isSaved={isSaved}
          saving={saving}
          hasApplied={hasApplied}
          applicationStatus={applicationStatus}
          onSave={handleSave}
          onBack={() => navigate(-1)}
          onApply={handleApply}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-5 lg:col-span-2">
            <JobDescription description={job.description} />

            <JobRequirements requirements={job.requirements} />

            <JobSkills skills={job.skills} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            <CompanyOverview company={company} />

            <JobSummary job={job} />
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <ApplyJobModal
          job={job}
          onClose={() => setShowApplyModal(false)}
          onSuccess={handleApplicationSuccess}
        />
      )}
    </div>
  );
};

export default JobDetails;
