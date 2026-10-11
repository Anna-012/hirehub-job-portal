import { Download, Eye, Mail, Users, RefreshCw, Undo2 } from "lucide-react";

import ApplicantStatusBadge from "./ApplicantStatusBadge";

const ApplicantsTable = ({
  applications = [],
  loading,
  updatingId,
  onUpdateStatus,
  onViewResume,
  onDownloadResume,
}) => {
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-sm text-slate-500">
        <RefreshCw size={22} className="mx-auto mb-3 animate-spin" />
        Loading applicants...
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="p-12 text-center">
        <Users size={35} className="mx-auto text-slate-300" />

        <h3 className="mt-3 font-semibold text-slate-800">
          No applicants found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try another search or status filter.
        </p>
      </div>
    );
  }

  const actionClass =
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1050px] text-left">
        <thead className="bg-slate-50">
          <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-4">Candidate</th>
            <th className="px-4 py-4">Applied On</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Resume</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {applications.map((application) => {
            const candidate = application.applicant;
            const status = application.status;
            const busy = updatingId === application._id;
            const hasResume = Boolean(application.resume?.url);

            const updateStatus = (newStatus) => {
              onUpdateStatus(application._id, newStatus);
            };

            return (
              <tr
                key={application._id}
                className="transition-colors hover:bg-slate-50/70"
              >
                {/* CANDIDATE */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">
                      {candidate?.name?.charAt(0)?.toUpperCase() || "C"}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">
                        {candidate?.name || "Candidate"}
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                        <Mail size={14} />
                        {candidate?.email || "Email unavailable"}
                      </p>

                      {candidate?.headline && (
                        <p className="mt-1 text-xs text-slate-500">
                          {candidate.headline}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* APPLIED DATE */}
                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {formatDate(application.appliedAt)}
                </td>

                {/* STATUS */}
                <td className="px-4 py-4">
                  <ApplicantStatusBadge status={status} />
                </td>

                {/* RESUME */}
                <td className="px-4 py-4">
                  {hasResume ? (
                    <div className="flex min-w-max items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewResume(application)}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                        title="Preview resume"
                      >
                        <Eye size={15} />
                        View Resume
                      </button>

                      <button
                        type="button"
                        onClick={() => onDownloadResume(application)}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        title="Download resume"
                        aria-label={`Download resume for ${candidate?.name || "candidate"}`}
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400">No resume</span>
                  )}
                </td>

                {/* REVERSIBLE APPLICATION ACTIONS */}
                <td className="px-5 py-4">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {(status === "Applied" || status === "Viewed") && (
                      <>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => updateStatus("Shortlisted")}
                          className={`${actionClass} bg-emerald-600 text-white hover:bg-emerald-700`}
                        >
                          Shortlist
                        </button>

                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => updateStatus("Rejected")}
                          className={`${actionClass} border border-red-200 text-red-600 hover:bg-red-50`}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {status === "Shortlisted" && (
                      <>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => updateStatus("Hired")}
                          className={`${actionClass} bg-blue-600 text-white hover:bg-blue-700`}
                        >
                          Mark Hired
                        </button>

                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => updateStatus("Viewed")}
                          className={`${actionClass} border border-amber-200 text-amber-700 hover:bg-amber-50`}
                        >
                          <Undo2 size={14} />
                          Unshortlist
                        </button>

                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => updateStatus("Rejected")}
                          className={`${actionClass} border border-red-200 text-red-600 hover:bg-red-50`}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {status === "Rejected" && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => updateStatus("Viewed")}
                        className={`${actionClass} bg-amber-50 text-amber-800 hover:bg-amber-100`}
                      >
                        <Undo2 size={14} />
                        Undo Reject
                      </button>
                    )}

                    {status === "Hired" && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => updateStatus("Shortlisted")}
                        className={`${actionClass} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}
                      >
                        <Undo2 size={14} />
                        Undo Hire
                      </button>
                    )}

                    {busy && (
                      <RefreshCw
                        size={15}
                        className="animate-spin text-blue-600"
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
