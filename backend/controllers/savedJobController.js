import SavedJob from "../models/SavedJob.js";
import Job from "../models/Job.js";

// Save a job
export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Only jobseekers can save jobs
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only jobseekers can save jobs",
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if already saved
    const existingSavedJob = await SavedJob.findOne({
      job: jobId,
      user: req.user._id,
    });

    if (existingSavedJob) {
      return res.status(409).json({
        success: false,
        message: "Job already saved",
      });
    }

    const savedJob = await SavedJob.create({
      job: jobId,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Job saved successfully",
      savedJob,
    });
  } catch (error) {
    console.error("Save job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save job",
      error: error.message,
    });
  }
};

// Remove a saved job
export const removeSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only jobseekers can manage saved jobs",
      });
    }

    const savedJob = await SavedJob.findOneAndDelete({
      job: jobId,
      user: req.user._id,
    });

    if (!savedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job removed from saved jobs",
    });
  } catch (error) {
    console.error("Remove saved job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove saved job",
      error: error.message,
    });
  }
};

// Check whether a job is saved
export const checkSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only jobseekers can check saved jobs",
      });
    }

    const savedJob = await SavedJob.findOne({
      job: jobId,
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      isSaved: Boolean(savedJob),
    });
  } catch (error) {
    console.error("Check saved job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check saved job",
      error: error.message,
    });
  }
};

// Get all saved jobs of the logged-in jobseeker
export const getMySavedJobs = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only jobseekers can view saved jobs",
      });
    }

    const savedJobs = await SavedJob.find({
      user: req.user._id,
    })
      .populate({
        path: "job",
        select:
          "title company location jobType workMode category experience salaryCurrency minSalary maxSalary skills description status isFeatured",
        populate: {
          path: "company",
          select: "name logo location website",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      savedJobs,
    });
  } catch (error) {
    console.error("Get my saved jobs error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch saved jobs",
      error: error.message,
    });
  }
};
