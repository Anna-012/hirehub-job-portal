import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  saveJob,
  removeSavedJob,
  checkSavedJob,
  getMySavedJobs,
} from "../controllers/savedJobController.js";

const router = express.Router();

// Get all saved jobs of logged-in jobseeker
router.get("/my", authMiddleware, getMySavedJobs);

// Save a job
router.post("/:jobId", authMiddleware, saveJob);

// Remove saved job
router.delete("/:jobId", authMiddleware, removeSavedJob);

// Check if job is saved
router.get("/:jobId", authMiddleware, checkSavedJob);

export default router;
