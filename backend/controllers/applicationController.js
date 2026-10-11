import Application from "../models/Application.js";
import Job from "../models/Job.js";
import cloudinary from "../config/cloudinary.js";

// Upload resume to Cloudinary
const uploadResumeToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "hirehub/resumes",
        resource_type: "raw",
        type: "authenticated",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    uploadStream.end(buffer);
  });
};

// Apply for a job
export const applyForJob = async (req, res) => {
  let uploadedResume = null;

  try {
    const { jobId } = req.params;
    const { coverLetter = "" } = req.body;

    // Only jobseekers can apply
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only jobseekers can apply for jobs",
      });
    }

    // Resume is required
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    // Check job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Do not allow applications to closed jobs
    if (job.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "This job is no longer accepting applications",
      });
    }

    // Prevent duplicate application
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Upload resume to Cloudinary
    uploadedResume = await uploadResumeToCloudinary(req.file.buffer);

    // Create application
    const application = await Application.create({
      job: jobId,

      applicant: req.user._id,

      resume: {
        url: uploadedResume.secure_url,
        publicId: uploadedResume.public_id,
        fileName: req.file.originalname,
      },

      coverLetter: coverLetter.trim(),
      status: "Applied",
    });

    // Populate useful information
    const populatedApplication = await Application.findById(application._id)
      .populate("job", "title company location jobType")
      .populate("applicant", "name email");

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: populatedApplication,
    });
  } catch (error) {
    // If application creation fails after Cloudinary upload,
    // remove the uploaded resume to avoid orphan files.
    if (uploadedResume?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedResume.public_id, {
          resource_type: "raw",
          type: "authenticated",
        });
      } catch (deleteError) {
        console.error("Failed to delete uploaded resume:", deleteError.message);
      }
    }

    console.error("Apply for job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
      error: error.message,
    });
  }
};

// Check whether the current user has already applied for a job
export const checkApplicationStatus = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only jobseekers can check application status",
      });
    }

    const application = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    }).select("status appliedAt");

    return res.status(200).json({
      success: true,
      hasApplied: Boolean(application),
      application: application || null,
    });
  } catch (error) {
    console.error("Check application status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check application status",
      error: error.message,
    });
  }
};

// Get all applications submitted by the logged-in jobseeker
export const getMyApplications = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only jobseekers can view their applications",
      });
    }

    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate({
        path: "job",
        select:
          "title company location jobType workMode category experience salaryCurrency minSalary maxSalary",
        populate: {
          path: "company",
          select: "name logo location website",
        },
      })
      .sort({ appliedAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Get my applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};
