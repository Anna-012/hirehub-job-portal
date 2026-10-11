import {
  Download,
  Eye,
  Mail,
  MapPin,
  Users,
  Undo2,
  RefreshCw,
} from "lucide-react";

const statusStyles = {
  Applied: "bg-blue-50 text-blue-700",
  Viewed: "bg-amber-50 text-amber-700",
  Shortlisted: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
  Hired: "bg-purple-50 text-purple-700",
};

const AllApplicantsTable = ({
  applications = [],
  loading,
  updatingId,
  onUpdateStatus,
  onViewResume,
  onDownloadResume,
}) => {
  const actionClass =
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500">
        <RefreshCw size={22} className="mx-auto mb-3 animate-spin" />
        Loading applicants...
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="p-12 text-center">
        <Users className="mx-auto mb-3 text-slate-300" size={38} />

        <h3 className="font-semibold text-slate-800">No applicants found</h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or status filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1050px] text-left">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-5 py-4">Candidate</th>
            <th className="px-5 py-4">Job</th>
            <th className="px-5 py-4">Applied Date</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Resume</th>
            <th className="px-5 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {applications.map((application) => {
            const candidate = application.applicant;
            const job = application.job;
            const status = application.status;
            const isUpdating = updatingId === application._id;

            const updateStatus = (newStatus) =>
              onUpdateStatus(application._id, newStatus);

            return (
              <tr
                key={application._id}
                className="align-top transition hover:bg-slate-50/70"
              >
                {/* CANDIDATE */}
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">
                    {candidate?.name || "Unknown candidate"}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <Mail size={13} />
                    {candidate?.email || "No email"}
                  </p>

                  {candidate?.location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <MapPin size={12} />
                      {candidate.location}
                    </p>
                  )}
                </td>

                {/* JOB */}
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-800">
                    {job?.title || "Job unavailable"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {job?.location || "Location not specified"}
                  </p>
                </td>

                {/* APPLIED DATE */}
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {application.appliedAt
                    ? new Date(application.appliedAt).toLocaleDateString(
                        "en-IN",
                      )
                    : "—"}
                </td>

                {/* STATUS */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[status] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {status || "Unknown"}
                  </span>
                </td>

                {/* RESUME */}
                <td className="px-5 py-4">
                  {application.resume?.url ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onViewResume(application)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        title="View resume"
                        aria-label={`View resume for ${candidate?.name || "candidate"}`}
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDownloadResume(application)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                        title="Download resume"
                        aria-label={`Download resume for ${candidate?.name || "candidate"}`}
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400">
                      Not available
                    </span>
                  )}
                </td>

                {/* REVERSIBLE ACTIONS */}
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {(status === "Applied" || status === "Viewed") && (
                      <>
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => updateStatus("Shortlisted")}
                          className={`${actionClass} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}
                        >
                          Shortlist
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => updateStatus("Rejected")}
                          className={`${actionClass} bg-red-50 text-red-700 hover:bg-red-100`}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {status === "Shortlisted" && (
                      <>
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => updateStatus("Hired")}
                          className={`${actionClass} bg-blue-600 text-white hover:bg-blue-700`}
                        >
                          Mark Hired
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => updateStatus("Viewed")}
                          className={`${actionClass} bg-amber-50 text-amber-800 hover:bg-amber-100`}
                        >
                          <Undo2 size={14} />
                          Unshortlist
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => updateStatus("Rejected")}
                          className={`${actionClass} bg-red-50 text-red-700 hover:bg-red-100`}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {status === "Rejected" && (
                      <button
                        type="button"
                        disabled={isUpdating}
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
                        disabled={isUpdating}
                        onClick={() => updateStatus("Shortlisted")}
                        className={`${actionClass} bg-purple-50 text-purple-700 hover:bg-purple-100`}
                      >
                        <Undo2 size={14} />
                        Undo Hire
                      </button>
                    )}

                    {isUpdating && (
                      <RefreshCw
                        size={16}
                        className="animate-spin self-center text-indigo-600"
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

export default AllApplicantsTable;
