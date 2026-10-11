import api from "../../services/api";

// Get all available jobs
export const getJobs = async (params = {}) => {
  const response = await api.get("/jobs", {
    params,
  });

  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};

// Save a job
export const saveJob = async (jobId) => {
  const response = await api.post(`/saved-jobs/${jobId}`);
  return response.data;
};

// Remove a saved job
export const removeSavedJob = async (jobId) => {
  const response = await api.delete(`/saved-jobs/${jobId}`);
  return response.data;
};

// Check whether a job is saved
export const checkSavedJob = async (jobId) => {
  const response = await api.get(`/saved-jobs/${jobId}`);
  return response.data;
};

// Apply for a job
export const applyForJob = async (jobId, formData) => {
  const response = await api.post(`/applications/${jobId}`, formData);
  return response.data;
};

// Check whether the user has already applied for a job
export const checkApplicationStatus = async (jobId) => {
  const response = await api.get(`/applications/${jobId}/status`);

  return response.data;
};

// Get all applications of logged-in jobseeker
export const getMyApplications = async () => {
  const response = await api.get("/applications/my");

  return response.data;
};

// Get all saved jobs of logged-in jobseeker
export const getMySavedJobs = async () => {
  const response = await api.get("/saved-jobs/my");
  return response.data;
};

// Get logged-in user's profile
export const getMyProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// Update logged-in user's profile
export const updateMyProfile = async (profileData) => {
  const response = await api.put("/users/profile", profileData);
  return response.data;
};

export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();

  formData.append("profilePhoto", file);

  const response = await api.post("/users/profile/photo", formData);

  return response.data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post("/users/profile/resume", formData);

  return response.data;
};
