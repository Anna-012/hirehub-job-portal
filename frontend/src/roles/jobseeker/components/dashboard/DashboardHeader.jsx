import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const DashboardHeader = ({ name }) => {
  const firstName = name?.trim().split(/\s+/)[0] || "there";

  return (
    <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-medium text-blue-600">JOBSEEKER DASHBOARD</p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back, {firstName}!
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
          Track your applications and discover your next career opportunity.
        </p>
      </div>

      <Link
        to="/jobseeker/jobs"
        className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:self-auto"
      >
        <FiSearch className="h-4 w-4" />
        Find Jobs
      </Link>
    </section>
  );
};

export default DashboardHeader;
