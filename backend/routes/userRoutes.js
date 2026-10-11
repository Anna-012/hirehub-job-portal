import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import resumeUpload from "../middleware/resumeUploadMiddleware.js";

import {
  getMyProfile,
  updateMyProfile,
  uploadProfilePhoto,
  uploadResume,
} from "../controllers/userController.js";

const router = express.Router();

// Get logged-in user's profile
router.get("/profile", authMiddleware, getMyProfile);

// Update logged-in user's profile
router.put("/profile", authMiddleware, updateMyProfile);

// Upload profile photo
router.post(
  "/profile/photo",
  authMiddleware,
  upload.single("profilePhoto"),
  uploadProfilePhoto,
);

// Upload resume
router.post(
  "/profile/resume",
  authMiddleware,
  resumeUpload.single("resume"),
  uploadResume,
);

export default router;
