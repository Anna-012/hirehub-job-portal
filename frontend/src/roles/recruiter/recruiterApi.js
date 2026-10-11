import api from "../../services/api";

// Create a new job
export const createJob = async (jobData) => {
  const formData = new FormData();

  formData.append("title", jobData.title);
  formData.append("company", jobData.company);
  formData.append("location", jobData.location);
  formData.append("jobType", jobData.jobType);
  formData.append("category", jobData.category);
  formData.append("workMode", jobData.workMode);
  formData.append("experience", jobData.experience);
  formData.append("salaryCurrency", jobData.salaryCurrency);

  // ==========================================
  // Description
  // ==========================================

  (jobData.description || []).forEach((item) => {
    formData.append("description", item);
  });

  // ==========================================
  // Requirements
  // ==========================================

  (jobData.requirements || []).forEach((item) => {
    formData.append("requirements", item);
  });

  // ==========================================
  // Skills
  // ==========================================

  (jobData.skills || []).forEach((item) => {
    formData.append("skills", item);
  });

  // ==========================================
  // Salary
  // ==========================================

  if (jobData.minSalary !== undefined && jobData.minSalary !== "") {
    formData.append("minSalary", jobData.minSalary);
  }

  if (jobData.maxSalary !== undefined && jobData.maxSalary !== "") {
    formData.append("maxSalary", jobData.maxSalary);
  }

  // ==========================================
  // Create job
  // ==========================================

  const response = await api.post("/jobs", formData);

  return response.data;
};

// Get all jobs
export const getJobs = async () => {
  const response = await api.get("/jobs");

  return response.data;
};

// Get recruiter's jobs
export const getMyJobs = async (params = {}) => {
  const response = await api.get("/jobs/my-jobs", {
    params,
  });

  return response.data;
};

// Get single job
export const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);

  return response.data;
};

// Get featured jobs
export const getFeaturedJobs = async () => {
  const response = await api.get("/jobs/featured");

  return response.data;
};

// Update job
export const updateJob = async (jobId, jobData) => {
  const response = await api.put(`/jobs/${jobId}`, jobData);

  return response.data;
};

// Delete job
export const deleteJob = async (jobId) => {
  const response = await api.delete(`/jobs/${jobId}`);

  return response.data;
};

// Toggle job status
export const toggleJobStatus = async (jobId) => {
  const response = await api.patch(`/jobs/${jobId}/status`);

  return response.data;
};

// APPLICANTS
export const getApplicantsForJob = async (jobId) => {
  const response = await api.get(`/applications/job/${jobId}`);
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.patch(`/applications/${applicationId}/status`, {
    status,
  });

  return response.data;
};

export const getApplicantResumeUrls = async (
  applicationId,
  mode = "preview",
) => {
  const response = await api.get(`/applications/${applicationId}/resume`, {
    params: { mode },
    responseType: "blob",
  });

  return response.data;
};

export const getAllApplicants = async () => {
  const response = await api.get("/applications/all-applicants");
  return response.data;
};

//  RECRUITER PROFILE

// Get logged-in recruiter's profile
export const getRecruiterProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// Upload recruiter's profile photo
export const uploadRecruiterProfilePhoto = async (file) => {
  const formData = new FormData();

  formData.append("profilePhoto", file);

  const response = await api.post("/users/profile/photo", formData);

  return response.data;
};

// AI Candidate Search
export const searchCandidatesWithAI = async (payload) => {
  const response = await api.post("/ai/candidate-search", payload);
  return response.data;
};
