import express from "express";

import {
  getMyCompany,
  saveCompany,
  deleteCompany,
} from "../controllers/companyController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import recruiterMiddleware from "../middleware/recruiterMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Get logged-in recruiter's company
router.get("/", authMiddleware, recruiterMiddleware, getMyCompany);

// Create / update company profile
router.put(
  "/",
  authMiddleware,
  recruiterMiddleware,
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  saveCompany,
);

// Delete company profile
router.delete("/", authMiddleware, recruiterMiddleware, deleteCompany);

export default router;
