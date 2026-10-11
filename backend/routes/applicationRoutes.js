import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import resumeUpload from "../middleware/resumeUploadMiddleware.js";

import {
  applyForJob,
  checkApplicationStatus,
  getMyApplications,
} from "../controllers/applicationController.js";

import {
  getApplicantsForJob,
  updateApplicationStatus,
  getApplicantResumeUrls,
  getAllApplicants,
} from "../controllers/applicantController.js";

const router = express.Router();

// Get applications of logged-in jobseeker
router.get("/my", authMiddleware, getMyApplications);

// Check application status
router.get("/:jobId/status", authMiddleware, checkApplicationStatus);

// Apply for a job
router.post(
  "/:jobId",
  authMiddleware,
  resumeUpload.single("resume"),
  applyForJob,
);

// Recruiter: Get applicants for a specific job
router.get("/job/:jobId", authMiddleware, getApplicantsForJob);

// Recruiter: Update application status
router.patch("/:applicationId/status", authMiddleware, updateApplicationStatus);

router.get("/:applicationId/resume", authMiddleware, getApplicantResumeUrls);

router.get("/all-applicants", authMiddleware, getAllApplicants);

export default router;
