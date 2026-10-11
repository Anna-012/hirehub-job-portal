import { useCallback, useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

import { useAuth } from "../../../context/AuthContext";
import {
  getMyApplications,
  getMySavedJobs,
  getMyProfile,
  getJobs,
} from "../jobseekerApi";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import ProfileCompletion from "../components/dashboard/ProfileCompletion";
import RecentApplications from "../components/dashboard/RecentApplications";
import LatestJobs from "../components/dashboard/LatestJobs";
import DashboardLoader from "../components/dashboard/DashboardLoader";

const extractArray = (response, keys = []) => {
  if (Array.isArray(response)) return response;

  const candidates = [
    response?.data,
    ...keys.map((key) => response?.[key]),
    ...keys.map((key) => response?.data?.[key]),
  ];

  return candidates.find(Array.isArray) || [];
};

const extractProfile = (response) => {
  const candidates = [
    response?.data?.user,
    response?.user,
    response?.data?.profile,
    response?.profile,
    response?.data,
    response,
  ];

  return (
    candidates.find(
      (candidate) =>
        candidate &&
        typeof candidate === "object" &&
        !Array.isArray(candidate) &&
        ("name" in candidate || "email" in candidate || "skills" in candidate),
    ) || null
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [latestJobs, setLatestJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    const results = await Promise.allSettled([
      getMyApplications(),
      getMySavedJobs(),
      getMyProfile(),
      getJobs({ page: 1, limit: 4, sort: "latest" }),
    ]);

    const [applicationsResult, savedJobsResult, profileResult, jobsResult] =
      results;

    let failedRequests = 0;

    if (applicationsResult.status === "fulfilled") {
      setApplications(
        extractArray(applicationsResult.value, ["applications", "results"]),
      );
    } else {
      failedRequests++;
    }

    if (savedJobsResult.status === "fulfilled") {
      setSavedJobs(
        extractArray(savedJobsResult.value, ["savedJobs", "jobs", "results"]),
      );
    } else {
      failedRequests++;
    }

    if (profileResult.status === "fulfilled") {
      setProfile(extractProfile(profileResult.value));
    } else {
      failedRequests++;
    }

    if (jobsResult.status === "fulfilled") {
      setLatestJobs(extractArray(jobsResult.value, ["jobs", "results"]));
    } else {
      failedRequests++;
    }

    if (failedRequests > 0) {
      setError(
        `${failedRequests} dashboard request(s) failed. Some information may be unavailable.`,
      );
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return <DashboardLoader />;
  }

  const displayName = profile?.name || user?.name || user?.fullName || "there";

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">
      <DashboardHeader name={displayName} />

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-amber-800">{error}</p>

          <button
            type="button"
            onClick={loadDashboard}
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-amber-800 hover:text-amber-950"
          >
            <FiRefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      )}

      <DashboardStats applications={applications} savedJobs={savedJobs} />

      <ProfileCompletion profile={profile} />

      <RecentApplications applications={applications} />

      <LatestJobs jobs={latestJobs} />
    </div>
  );
};

export default Dashboard;
