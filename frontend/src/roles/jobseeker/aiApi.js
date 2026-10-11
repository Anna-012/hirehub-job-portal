import api from "../../services/api";

export const analyzeResume = async (jobId) => {
  const response = await api.post("/ai/analyze-resume", {
    jobId,
  });

  return response.data;
};

export const analyzeJobMatchWithResume = async (jobId, resumeFile) => {
  const formData = new FormData();

  formData.append("jobId", jobId);
  formData.append("resume", resumeFile);

  const response = await api.post("/ai/analyze-job-match", formData);

  return response.data;
};

export const getAIJobRecommendations = async (resumeFile) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);

  const response = await api.post("/ai/job-recommendations", formData);

  return response.data;
};
