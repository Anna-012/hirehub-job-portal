import { BriefcaseBusiness } from "lucide-react";
import JobTableRow from "./JobTableRow";

const JobsTable = ({
  jobs = [],
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
  onViewApplicants,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {loading ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-500">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <BriefcaseBusiness size={26} />
          </div>

          <h3 className="text-base font-semibold text-slate-800">
            No jobs found
          </h3>

          <p className="mt-1 max-w-sm text-sm text-slate-500">
            No jobs match your current search or filters. Try changing them or
            post a new job.
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left">
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "9%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "24%" }} />
            </colgroup>

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Job
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Location
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Applicants
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Posted On
                </th>

                <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <JobTableRow
                  key={job._id}
                  job={job}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleStatus={onToggleStatus}
                  onViewApplicants={onViewApplicants}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobsTable;
