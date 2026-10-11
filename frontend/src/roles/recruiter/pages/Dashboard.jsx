import { useEffect, useState } from "react";

import WelcomeSection from "../components/dashboard/WelcomeSection";
import DashboardStats from "../components/dashboard/DashboardStats";
import QuickActions from "../components/dashboard/QuickActions";
import RecentApplications from "../components/dashboard/RecentApplications";
import RecentJobs from "../components/dashboard/RecentJobs";
import DashboardLoader from "../components/dashboard/DashboardLoader";

import { getMyJobs, getAllApplicants } from "../recruiterApi";

const initialStats = {
  totalJobs: 0,
  activeJobs: 0,
  totalApplications: 0,
  shortlisted: 0,
};

const Dashboard = () => {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError("");

        const [jobsResponse, applicantsResponse] = await Promise.all([
          getMyJobs(),
          getAllApplicants(),
        ]);

        // Handle the API response structures.
        const jobs = Array.isArray(jobsResponse)
          ? jobsResponse
          : jobsResponse?.jobs || [];

        const applications = Array.isArray(applicantsResponse)
          ? applicantsResponse
          : applicantsResponse?.applications || [];

        // Count active jobs using common status formats.
        const activeJobs = jobs.filter((job) => {
          const status = String(job.status || "").toLowerCase();

          return (
            status === "active" ||
            status === "published" ||
            job.isActive === true
          );
        }).length;

        // Count shortlisted applications.
        const shortlisted = applications.filter(
          (application) =>
            String(application.status || "").toLowerCase() === "shortlisted",
        ).length;

        if (isMounted) {
          setStats({
            totalJobs: jobs.length,
            activeJobs,
            totalApplications: applications.length,
            shortlisted,
          });
        }
      } catch (err) {
        console.error("Failed to fetch dashboard statistics:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load dashboard statistics.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-8">
        <WelcomeSection />

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {loading ? (
          <DashboardLoader />
        ) : (
          <>
            <DashboardStats stats={stats} />

            <QuickActions />

            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
              <RecentApplications />
              <RecentJobs />
            </div>
          </>
        )}

        <QuickActions />

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
          <RecentApplications />
          <RecentJobs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
