import express from "express";

import {
  getJobs,
  getFeaturedJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
  toggleJobStatus,
} from "../controllers/jobController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { validateJob } from "../validators/jobValidator.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getJobs);

router.get("/featured", getFeaturedJobs);

// RECRUITER
router.post(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  upload.single("companyLogo"),
  validateJob,
  createJob,
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  validateJob,
  updateJob,
);

router.get("/my-jobs", authMiddleware, roleMiddleware("recruiter"), getMyJobs);

router.delete("/:id", authMiddleware, roleMiddleware("recruiter"), deleteJob);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("recruiter"),
  toggleJobStatus,
);

// PUBLIC — keep dynamic route LAST
router.get("/:id", getJobById);

export default router;
