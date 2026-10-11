import express from "express";

import {
  getRecruiterProfile,
  getRecruiterCompany,
  createCompany,
  updateCompany,
} from "../controllers/recruiterController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Recruiter profile
router.get("/profile", authMiddleware, getRecruiterProfile);

// Company profile
router.get("/company", authMiddleware, getRecruiterCompany);

router.post("/company", authMiddleware, createCompany);

router.put("/company", authMiddleware, updateCompany);

export default router;
