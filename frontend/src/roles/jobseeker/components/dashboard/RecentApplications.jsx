import { Link } from "react-router-dom";
import { FiBriefcase, FiArrowRight } from "react-icons/fi";

import RecentApplicationRow from "./RecentApplicationRow";

const RecentApplications = ({ applications }) => {
  const recentApplications = [...applications]
    .sort((a, b) => {
      const dateA = new Date(a.appliedAt || a.createdAt || 0).getTime();

      const dateB = new Date(b.appliedAt || b.createdAt || 0).getTime();

      return dateB - dateA;
    })
    .slice(0, 4);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Recent Applications
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep track of your latest applications.
          </p>
        </div>

        <Link
          to="/jobseeker/applications"
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          View all
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {recentApplications.length === 0 ? (
        <div className="px-5 py-12 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <FiBriefcase className="h-6 w-6" />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No applications yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Explore jobs and apply for positions that match your skills.
          </p>

          <Link
            to="/jobseeker/jobs"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Explore Jobs
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {recentApplications.map((application, index) => (
            <RecentApplicationRow
              key={application._id || application.id || index}
              application={application}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentApplications;
