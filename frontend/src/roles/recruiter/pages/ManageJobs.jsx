import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import ManageJobsHeader from "../components/manageJobs/ManageJobsHeader";
import JobStats from "../components/manageJobs/JobStats";
import JobFilters from "../components/manageJobs/JobFilters";
import JobsTable from "../components/manageJobs/JobsTable";
import Pagination from "../components/manageJobs/Pagination";
import ManageJobsLoader from "../components/manageJobs/ManageJobsLoader";

import { getMyJobs, deleteJob, toggleJobStatus } from "../recruiterApi";

const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [totalApplicants, setTotalApplicants] = useState(0);

  // Initial page loading only
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [experience, setExperience] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 8;

  // FETCH JOBS AND APPLICANT COUNT
  const fetchJobs = useCallback(async ({ initial = false } = {}) => {
    try {
      if (initial) {
        setLoading(true);
      }

      const response = await getMyJobs();

      setJobs(Array.isArray(response?.jobs) ? response.jobs : []);
      setTotalApplicants(response?.totalApplicants || 0);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to load jobs. Please try again.",
      );
    } finally {
      if (initial) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchJobs({ initial: true });
  }, [fetchJobs]);

  // TOGGLE JOB STATUS
  const handleToggleStatus = async (job) => {
    try {
      const response = await toggleJobStatus(job._id);

      alert(response.message || "Job status updated successfully.");

      // Refresh data without replacing the whole page with a skeleton
      await fetchJobs();
    } catch (error) {
      console.error("Toggle job status error:", error);

      alert(error?.response?.data?.message || "Failed to change job status.");
    }
  };

  // FILTER JOBS
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchValue = search.toLowerCase().trim();

      const companyName =
        typeof job.company === "object"
          ? job.company?.name || ""
          : job.company || "";

      const matchesSearch =
        !searchValue ||
        job.title?.toLowerCase().includes(searchValue) ||
        companyName.toLowerCase().includes(searchValue) ||
        job.location?.toLowerCase().includes(searchValue);

      const matchesStatus = status === "All" || job.status === status;

      const matchesJobType = jobType === "All" || job.jobType === jobType;

      const matchesExperience =
        experience === "All" || job.experience === experience;

      return (
        matchesSearch && matchesStatus && matchesJobType && matchesExperience
      );
    });
  }, [jobs, search, status, jobType, experience]);

  // PAGINATION
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * jobsPerPage;

    return filteredJobs.slice(startIndex, startIndex + jobsPerPage);
  }, [filteredJobs, currentPage]);

  // RESET PAGE WHEN FILTERS CHANGE
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, jobType, experience]);

  // DELETE JOB
  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmed) return;

    try {
      await deleteJob(jobId);

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

      // Refresh counts without showing the full-page loader
      await fetchJobs();

      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Delete job error:", error);

      alert(error?.response?.data?.message || "Failed to delete job.");
    }
  };

  // EDIT JOB
  const handleEdit = (job) => {
    navigate(`/recruiter/edit-job/${job._id}`);
  };

  // VIEW APPLICANTS
  const handleViewApplicants = (job) => {
    navigate(`/recruiter/jobs/${job._id}/applicants`);
  };

  // INITIAL LOADING SCREEN
  if (loading) {
    return <ManageJobsLoader />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <ManageJobsHeader onPostJob={() => navigate("/recruiter/post-job")} />

        {/* Statistics */}
        <JobStats jobs={jobs} totalApplicants={totalApplicants} />

        {/* Filters */}
        <div className="mt-6">
          <JobFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            jobType={jobType}
            setJobType={setJobType}
            experience={experience}
            setExperience={setExperience}
          />
        </div>

        {/* Jobs Table */}
        <div className="mt-4">
          <JobsTable
            jobs={paginatedJobs}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onViewApplicants={handleViewApplicants}
          />
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredJobs.length}
            itemsPerPage={jobsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
