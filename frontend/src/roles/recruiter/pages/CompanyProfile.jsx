import { useCallback, useEffect, useState } from "react";

import CompanyHeader from "../components/companyProfile/CompanyHeader";
import CompanyTabs from "../components/companyProfile/CompanyTabs";
import CompanyAbout from "../components/companyProfile/CompanyAbout";
import CompanyDetails from "../components/companyProfile/CompanyDetails";
import CompanyHighlights from "../components/companyProfile/CompanyHighlights";
import EditCompanyModal from "../components/companyProfile/EditCompanyModal";
import CompanyProfileLoader from "../components/companyProfile/CompanyProfileLoader";

import { getMyCompany, saveCompany } from "../companyApi";

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  // FETCH COMPANY PROFILE
  const fetchCompany = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyCompany();

      if (data?.success) {
        setCompany(data.company || null);
      } else {
        setCompany(data?.company || null);
      }
    } catch (error) {
      console.error("Get company error:", error);

      setError(
        error?.response?.data?.message || "Failed to load company profile.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  // SAVE COMPANY PROFILE
  const handleSaveCompany = async (formData) => {
    try {
      setSaving(true);
      setError("");

      const data = await saveCompany(formData);

      if (data?.success) {
        setCompany(data.company);
        setIsEditOpen(false);
      } else {
        throw new Error(data?.message || "Failed to save company profile.");
      }
    } catch (error) {
      console.error("Save company error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save company profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  // INITIAL LOADING
  if (loading) {
    return <CompanyProfileLoader />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Error */}
        {error && (
          <div
            role="alert"
            className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <p>{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0 font-semibold hover:text-red-900"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* No company profile */}
        {!company ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-8 w-8"
                aria-hidden="true"
              >
                <path
                  d="M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Create your company profile
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Add your company information before posting jobs.
            </p>

            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Company Profile
            </button>
          </div>
        ) : (
          <>
            {/* Company Header */}
            <CompanyHeader
              company={company}
              onEdit={() => setIsEditOpen(true)}
            />

            {/* Company Tabs */}
            <CompanyTabs />

            {/* Company Information */}
            <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
              <CompanyAbout
                company={company}
                onEdit={() => setIsEditOpen(true)}
              />

              <CompanyDetails
                company={company}
                onEdit={() => setIsEditOpen(true)}
              />
            </div>

            {/* Company Highlights */}
            <CompanyHighlights company={company} />
          </>
        )}
      </div>

      {/* Edit Company Modal */}
      <EditCompanyModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        company={company}
        onSave={handleSaveCompany}
        loading={saving}
      />
    </div>
  );
};

export default CompanyProfile;
