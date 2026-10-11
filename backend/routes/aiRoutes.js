import express from "express";
import {
  testAI,
  analyzeResume,
  analyzeUploadedResume,
  analyzeUploadedResumeForJob,
  getAIJobRecommendations,
} from "../controllers/aiController.js";

import aiCandidateController from "../controllers/aiCandidateController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import resumeUpload from "../middleware/resumeUploadMiddleware.js";

const router = express.Router();

router.get("/test", testAI);

router.post("/analyze-resume", authMiddleware, analyzeResume);

router.post(
  "/analyze-uploaded-resume",
  authMiddleware,
  resumeUpload.single("resume"),
  analyzeUploadedResume,
);

router.post(
  "/analyze-job-match",
  authMiddleware,
  resumeUpload.single("resume"),
  analyzeUploadedResumeForJob,
);

router.post(
  "/job-recommendations",
  authMiddleware,
  resumeUpload.single("resume"),
  getAIJobRecommendations,
);

router.post("/candidate-search", authMiddleware, aiCandidateController);

export default router;
