import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getApplicantsForJob,
  updateApplicationStatus,
  getApplicantResumeUrls,
} from "../recruiterApi";

import ApplicantJobHeader from "../components/applicants/ApplicantJobHeader";
import ApplicantStats from "../components/applicants/ApplicantStats";
import ApplicantFilters from "../components/applicants/ApplicantFilters";
import ApplicantsTable from "../components/applicants/ApplicantsTable";
import ApplicantPageLoader from "../components/applicants/ApplicantPageLoader";

const Applicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [error, setError] = useState("");

  // FETCH APPLICANTS
  const fetchApplicants = useCallback(
    async (showLoader = false) => {
      try {
        if (showLoader) {
          setLoading(true);
        }

        setError("");

        const data = await getApplicantsForJob(jobId);

        setJob(data?.job || null);
        setApplications(
          Array.isArray(data?.applications) ? data.applications : [],
        );
        setCounts(data?.counts || {});
      } catch (err) {
        console.error("Fetch applicants error:", err);

        setError(err.response?.data?.message || "Failed to load applicants.");
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    },
    [jobId],
  );

  // INITIAL LOAD
  useEffect(() => {
    fetchApplicants(true);
  }, [fetchApplicants]);

  // UPDATE APPLICATION STATUS
  const handleUpdateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);
      setError("");

      await updateApplicationStatus(applicationId, status);

      // Refresh data without showing the full-page skeleton.
      await fetchApplicants(false);
    } catch (err) {
      console.error("Update application status error:", err);

      setError(
        err.response?.data?.message || "Failed to update application status.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // FILTER APPLICATIONS
  const filteredApplications = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return applications.filter((application) => {
      const candidate = application.applicant;

      const matchesSearch =
        !searchValue ||
        candidate?.name?.toLowerCase().includes(searchValue) ||
        candidate?.email?.toLowerCase().includes(searchValue);

      let matchesTab = true;

      if (activeTab === "Under Review") {
        matchesTab = ["Applied", "Viewed"].includes(application.status);
      } else if (activeTab !== "All") {
        matchesTab = application.status === activeTab;
      }

      return matchesSearch && matchesTab;
    });
  }, [applications, search, activeTab]);

  // PREVIEW OR DOWNLOAD RESUME
  const openResume = async (application, mode) => {
    const newTab = window.open("about:blank", "_blank");

    if (!newTab) {
      setError("Please allow pop-ups to open the resume.");
      return;
    }

    newTab.opener = null;

    try {
      setError("");

      const data = await getApplicantResumeUrls(application._id);

      const url = mode === "preview" ? data.previewUrl : data.downloadUrl;

      if (!url) {
        throw new Error("Resume URL is missing.");
      }

      newTab.location.href = url;
    } catch (err) {
      if (!newTab.closed) {
        newTab.close();
      }

      console.error("Resume access error:", err);

      setError(err.response?.data?.message || "Failed to open resume.");
    }
  };

  const handleViewResume = (application) => {
    openResume(application, "preview");
  };

  const handleDownloadResume = (application) => {
    openResume(application, "download");
  };

  // INITIAL LOADING SCREEN
  if (loading) {
    return <ApplicantPageLoader />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Job Header */}
        <ApplicantJobHeader
          job={job}
          loading={loading}
          onBack={() => navigate("/recruiter/manage-jobs")}
          onRefresh={() => fetchApplicants(false)}
        />

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mb-5 mt-5 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <p className="text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0 text-sm font-semibold text-red-700 hover:text-red-900"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Applicant Statistics */}
        <div className="mt-6">
          <ApplicantStats counts={counts} />
        </div>

        {/* Candidate Applications */}
        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Candidate Applications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage candidates for this position.
            </p>

            <div className="mt-5">
              <ApplicantFilters
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                search={search}
                setSearch={setSearch}
              />
            </div>
          </div>

          <ApplicantsTable
            applications={filteredApplications}
            loading={false}
            updatingId={updatingId}
            onUpdateStatus={handleUpdateStatus}
            onViewResume={handleViewResume}
            onDownloadResume={handleDownloadResume}
          />

          {/* Results Count */}
          <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applicants
          </div>
        </section>
      </div>
    </div>
  );
};

export default Applicants;
