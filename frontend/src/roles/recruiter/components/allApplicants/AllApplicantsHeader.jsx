import { RefreshCw, Users } from "lucide-react";

const AllApplicantsHeader = ({ onRefresh, loading }) => {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Users size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              All Applicants
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage candidates across all your job postings.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        Refresh
      </button>
    </div>
  );
};

export default AllApplicantsHeader;
