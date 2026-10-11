import mongoose from "mongoose";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import cloudinary from "../config/cloudinary.js";
import path from "node:path";
import axios from "axios";

// GET APPLICANTS FOR A RECRUITER'S JOB

export const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can view applicants",
      });
    }

    if (!mongoose.isValidObjectId(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    // Verify that this job belongs to the logged-in recruiter
    const job = await Job.findOne({
      _id: jobId,
      postedBy: req.user._id,
    }).populate("company", "name logo location website");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you are not authorized to view it",
      });
    }

    // Fetch applications for this job
    const applications = await Application.find({
      job: jobId,
      status: { $ne: "Withdrawn" },
    })
      .populate(
        "applicant",
        "name email phone location headline bio skills education experience linkedin github portfolio resume",
      )
      .sort({ appliedAt: -1 });

    const counts = {
      total: applications.length,
      applied: applications.filter((app) => app.status === "Applied").length,
      viewed: applications.filter((app) => app.status === "Viewed").length,
      shortlisted: applications.filter((app) => app.status === "Shortlisted")
        .length,
      rejected: applications.filter((app) => app.status === "Rejected").length,
      hired: applications.filter((app) => app.status === "Hired").length,
    };

    return res.status(200).json({
      success: true,
      job,
      applications,
      counts,
    });
  } catch (error) {
    console.error("Get applicants error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applicants",
    });
  }
};

// UPDATE APPLICATION STATUS

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can update application status",
      });
    }

    if (!mongoose.isValidObjectId(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const allowedStatuses = ["Viewed", "Shortlisted", "Rejected", "Hired"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Verify that the application belongs to one of this recruiter's jobs
    const job = await Job.findOne({
      _id: application.job,
      postedBy: req.user._id,
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this application",
      });
    }

    if (application.status === "Withdrawn") {
      return res.status(400).json({
        success: false,
        message: "Withdrawn applications cannot be updated",
      });
    }

    application.status = status;
    await application.save();

    const updatedApplication = await Application.findById(application._id)
      .populate("applicant", "name email skills experience")
      .populate("job", "title");

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Update application status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};

export const getApplicantResumeUrls = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const mode = req.query.mode === "download" ? "download" : "preview";

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can access resumes",
      });
    }

    if (!mongoose.isValidObjectId(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Only the recruiter who owns the job can access its resume.
    const job = await Job.findOne({
      _id: application.job,
      postedBy: req.user._id,
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resume",
      });
    }

    const { publicId, fileName } = application.resume || {};

    if (!publicId || !fileName) {
      return res.status(404).json({
        success: false,
        message: "Resume information is missing",
      });
    }

    const safeFileName = path.basename(fileName);
    const extension = path.extname(safeFileName).slice(1).toLowerCase();

    const mimeTypes = {
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };

    if (!mimeTypes[extension]) {
      return res.status(400).json({
        success: false,
        message: "Unsupported resume format",
      });
    }

    const signedUrl = cloudinary.utils.private_download_url(
      publicId,
      extension,
      {
        resource_type: "raw",
        type: "authenticated",
        expires_at: Math.floor(Date.now() / 1000) + 300,
        attachment: false,
      },
    );

    // Fetch the file on the backend.
    const fileResponse = await axios.get(signedUrl, {
      responseType: "arraybuffer",
      timeout: 30000,
      maxContentLength: 10 * 1024 * 1024,
    });

    const disposition = mode === "download" ? "attachment" : "inline";

    res.setHeader("Content-Type", mimeTypes[extension]);
    res.setHeader(
      "Content-Disposition",
      `${disposition}; filename="${safeFileName.replace(/["\\\r\n]/g, "_")}"`,
    );
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "private, no-store");

    return res.status(200).send(Buffer.from(fileResponse.data));
  } catch (error) {
    console.error(
      "Get applicant resume error:",
      error.response?.status || error.message,
    );

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "Resume file was not found in Cloudinary",
      });
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      return res.status(502).json({
        success: false,
        message: "Cloudinary denied access to the resume",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve resume",
    });
  }
};

// GET ALL APPLICANTS ACROSS THE LOGGED-IN RECRUITER'S JOBS
export const getAllApplicants = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can view applicants",
      });
    }

    // Find only jobs owned by this recruiter
    const recruiterJobs = await Job.find({
      postedBy: req.user._id,
    }).select("_id");

    const jobIds = recruiterJobs.map((job) => job._id);

    // Fetch applications for those jobs only
    const applications = await Application.find({
      job: { $in: jobIds },
      status: { $ne: "Withdrawn" },
    })
      .populate({
        path: "job",
        select: "title location jobType status",
      })
      .populate({
        path: "applicant",
        select:
          "name email phone location headline skills education experience linkedin github portfolio",
      })
      .sort({ appliedAt: -1 });

    const counts = {
      total: applications.length,
      applied: applications.filter((app) => app.status === "Applied").length,
      viewed: applications.filter((app) => app.status === "Viewed").length,
      shortlisted: applications.filter((app) => app.status === "Shortlisted")
        .length,
      rejected: applications.filter((app) => app.status === "Rejected").length,
      hired: applications.filter((app) => app.status === "Hired").length,
    };

    return res.status(200).json({
      success: true,
      applications,
      counts,
    });
  } catch (error) {
    console.error("Get all applicants error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch all applicants",
    });
  }
};
