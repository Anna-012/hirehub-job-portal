import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getAllApplicants,
  updateApplicationStatus,
  getApplicantResumeUrls,
} from "../recruiterApi";

import AllApplicantsHeader from "../components/allApplicants/AllApplicantsHeader";
import AllApplicantsStats from "../components/allApplicants/AllApplicantsStats";
import AllApplicantsFilters from "../components/allApplicants/AllApplicantsFilters";
import AllApplicantsTable from "../components/allApplicants/AllApplicantsTable";
import ApplicantsLoader from "../components/allApplicants/AllApplicantsLoader";

const AllApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [error, setError] = useState("");

  // FETCH APPLICANTS
  const fetchApplicants = useCallback(async ({ showLoader = false } = {}) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      setError("");

      const data = await getAllApplicants();

      setApplications(
        Array.isArray(data?.applications) ? data.applications : [],
      );

      setCounts(data?.counts || {});
    } catch (err) {
      console.error("Fetch all applicants error:", err);

      setError(err.response?.data?.message || "Failed to load applicants.");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }, []);

  // INITIAL LOAD
  useEffect(() => {
    fetchApplicants({ showLoader: true });
  }, [fetchApplicants]);

  // UPDATE APPLICATION STATUS
  const handleUpdateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);
      setError("");

      await updateApplicationStatus(applicationId, status);

      // Refresh data without replacing the entire table with skeletons.
      await fetchApplicants();
    } catch (err) {
      console.error("Update application status error:", err);

      setError(
        err.response?.data?.message || "Failed to update application status.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // PREVIEW OR DOWNLOAD RESUME
  const handleResume = async (application, mode) => {
    let newTab = null;

    if (mode === "preview") {
      newTab = window.open("about:blank", "_blank");

      if (!newTab) {
        setError("Please allow pop-ups to preview the resume.");
        return;
      }

      newTab.opener = null;
      newTab.document.title = "Loading resume...";
    }

    try {
      setError("");

      const blob = await getApplicantResumeUrls(application._id, mode);
      const fileUrl = URL.createObjectURL(blob);

      if (mode === "preview") {
        newTab.location.href = fileUrl;

        // Keep the object URL available while the preview loads.
        setTimeout(() => URL.revokeObjectURL(fileUrl), 60000);
      } else {
        const link = document.createElement("a");

        link.href = fileUrl;
        link.download = application.resume?.fileName || "resume";

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(fileUrl), 60000);
      }
    } catch (err) {
      if (newTab && !newTab.closed) {
        newTab.close();
      }

      console.error("Resume access error:", err);

      setError("Failed to access the resume. Please try again.");
    }
  };

  // SEARCH AND STATUS FILTERS
  const filteredApplications = useMemo(() => {
    const term = search.trim().toLowerCase();

    return applications.filter((application) => {
      const candidate = application.applicant;
      const job = application.job;

      const matchesSearch =
        !term ||
        candidate?.name?.toLowerCase().includes(term) ||
        candidate?.email?.toLowerCase().includes(term) ||
        job?.title?.toLowerCase().includes(term);

      let matchesTab = true;

      if (activeTab === "Under Review") {
        matchesTab = ["Applied", "Viewed"].includes(application.status);
      } else if (activeTab !== "All") {
        matchesTab = application.status === activeTab;
      }

      return matchesSearch && matchesTab;
    });
  }, [applications, search, activeTab]);

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <AllApplicantsHeader
          onRefresh={() => fetchApplicants()}
          loading={loading}
        />

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <p className="text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0 text-sm font-semibold text-red-700"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Statistics */}
        <AllApplicantsStats counts={counts} />

        {/* Applicants Section */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Search and Status Filters remain visible */}
          <AllApplicantsFilters
            search={search}
            setSearch={setSearch}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Initial Loading / Actual Table */}
          {loading ? (
            <ApplicantsLoader />
          ) : (
            <AllApplicantsTable
              applications={filteredApplications}
              loading={false}
              updatingId={updatingId}
              onUpdateStatus={handleUpdateStatus}
              onViewResume={(application) =>
                handleResume(application, "preview")
              }
              onDownloadResume={(application) =>
                handleResume(application, "download")
              }
            />
          )}

          {/* Results Count */}
          {!loading && (
            <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
              Showing {filteredApplications.length} of {applications.length}{" "}
              applicants
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AllApplicants;
