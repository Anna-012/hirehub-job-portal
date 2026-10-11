import {
  BriefcaseBusiness,
  MapPin,
  Pencil,
  Power,
  Trash2,
  Users,
  ChevronRight,
} from "lucide-react";

const JobTableRow = ({
  job,
  onEdit,
  onDelete,
  onToggleStatus,
  onViewApplicants,
}) => {
  const isActive = job.status === "Active";
  const applicantCount = job.applicantsCount ?? 0;

  const postedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const companyName =
    typeof job.company === "object"
      ? job.company?.name || "N/A"
      : job.company || "N/A";

  return (
    <tr className="group border-b border-slate-100 transition-colors duration-200 last:border-b-0 hover:bg-blue-50/30">
      {/* JOB */}
      <td className="px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
            <BriefcaseBusiness size={21} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p
              className="truncate text-sm font-semibold text-slate-800"
              title={job.title}
            >
              {job.title || "Untitled Job"}
            </p>

            <p className="mt-1 truncate text-xs text-slate-500">
              {companyName}
            </p>
          </div>
        </div>
      </td>

      {/* LOCATION */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={16} className="shrink-0 text-slate-400" />

          <span className="truncate" title={job.location || "Not specified"}>
            {job.location || "Not specified"}
          </span>
        </div>
      </td>

      {/* JOB TYPE */}
      <td className="px-4 py-4">
        <span className="inline-flex whitespace-nowrap rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          {job.jobType || "Not specified"}
        </span>
      </td>

      {/* APPLICANTS */}
      <td className="px-4 py-4 text-center">
        <span className="inline-flex min-w-9 items-center justify-center rounded-lg bg-slate-100 px-2.5 py-1.5 text-sm font-semibold tabular-nums text-slate-700">
          {applicantCount}
        </span>
      </td>

      {/* STATUS */}
      <td className="px-4 py-4">
        <span
          className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
            isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isActive ? "bg-emerald-500" : "bg-red-500"
            }`}
          />

          {job.status || "Unknown"}
        </span>
      </td>

      {/* POSTED DATE */}
      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
        {postedDate}
      </td>

      {/* ACTIONS */}
      <td className="px-4 py-4">
        <div className="flex min-w-max items-center justify-end gap-2">
          {/* VIEW APPLICANTS */}
          <button
            type="button"
            onClick={() => onViewApplicants?.(job)}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            title="View applicants for this job"
          >
            <Users size={15} />
            Applicants
            <ChevronRight size={14} />
          </button>

          {/* EDIT */}
          <button
            type="button"
            onClick={() => onEdit(job)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-600 transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            title="Edit job"
            aria-label={`Edit ${job.title || "job"}`}
          >
            <Pencil size={16} />
          </button>

          {/* ACTIVATE / CLOSE */}
          <button
            type="button"
            onClick={() => onToggleStatus(job)}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-white transition focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              isActive
                ? "border-orange-200 text-orange-600 hover:bg-orange-50 focus:ring-orange-400"
                : "border-emerald-200 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-400"
            }`}
            title={isActive ? "Close job" : "Activate job"}
            aria-label={isActive ? "Close job" : "Activate job"}
          >
            <Power size={16} />
          </button>

          {/* DELETE */}
          <button
            type="button"
            onClick={() => onDelete(job._id)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 transition hover:border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
            title="Delete job"
            aria-label={`Delete ${job.title || "job"}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default JobTableRow;
