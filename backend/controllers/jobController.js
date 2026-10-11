import Job from "../models/Job.js";
import Company from "../models/Company.js";
import Application from "../models/Application.js";

export const getJobs = async (req, res, next) => {
  try {
    const {
      search = "",
      location,
      jobType,
      category,
      workMode,
      experience,
      page = 1,
      limit = 12,
    } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const jobsPerPage = Math.min(Math.max(Number(limit) || 12, 1), 50);
    const skip = (currentPage - 1) * jobsPerPage;

    const query = {
      status: "Active",
    };

    if (search.trim()) {
      const companies = await Company.find({
        name: {
          $regex: search.trim(),
          $options: "i",
        },
      }).select("_id");

      const companyIds = companies.map((company) => company._id);

      query.$or = [
        {
          title: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          skills: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          company: {
            $in: companyIds,
          },
        },
      ];
    }

    if (location?.trim()) {
      query.location = {
        $regex: location.trim(),
        $options: "i",
      };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (category?.trim()) {
      query.category = {
        $regex: category.trim(),
        $options: "i",
      };
    }

    if (workMode) {
      query.workMode = workMode;
    }

    if (experience?.trim()) {
      query.experience = {
        $regex: experience.trim(),
        $options: "i",
      };
    }

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate("company", "name logo location website")
      .populate("postedBy", "name email")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(jobsPerPage);

    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
      pagination: {
        currentPage,
        totalPages,
        totalJobs,
        limit: jobsPerPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({
      isFeatured: true,
      status: "Active",
    })
      .populate("company", "name logo location website")
      .populate("postedBy", "name")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company", "name logo location website description industry")
      .populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      jobType,
      category,
      workMode,
      minSalary,
      maxSalary,
      skills,
      experience,
      isFeatured,
    } = req.body;

    const company = await Company.findOne({
      recruiter: req.user._id,
    });

    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Please create your company profile before posting a job",
      });
    }

    if (
      minSalary !== undefined &&
      minSalary !== "" &&
      maxSalary !== undefined &&
      maxSalary !== "" &&
      Number(minSalary) > Number(maxSalary)
    ) {
      return res.status(400).json({
        success: false,
        message: "Minimum salary cannot be greater than maximum salary",
      });
    }

    const jobData = {
      title,
      company: company._id,
      description,
      requirements,
      location,
      jobType,
      category,
      workMode,
      skills,
      experience,
      isFeatured: isFeatured === true || isFeatured === "true",
      postedBy: req.user._id,
    };

    if (minSalary !== undefined && minSalary !== "") {
      jobData.minSalary = Number(minSalary);
    }

    if (maxSalary !== undefined && maxSalary !== "") {
      jobData.maxSalary = Number(maxSalary);
    }

    const job = await Job.create(jobData);

    const populatedJob = await Job.findById(job._id)
      .populate("company", "name logo location website")
      .populate("postedBy", "name email");

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: populatedJob,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own jobs",
      });
    }

    const {
      title,
      description,
      requirements,
      location,
      jobType,
      category,
      workMode,
      minSalary,
      maxSalary,
      skills,
      experience,
    } = req.body;

    if (
      minSalary !== undefined &&
      minSalary !== "" &&
      maxSalary !== undefined &&
      maxSalary !== "" &&
      Number(minSalary) > Number(maxSalary)
    ) {
      return res.status(400).json({
        success: false,
        message: "Minimum salary cannot be greater than maximum salary",
      });
    }

    const updateData = {
      title,
      description,
      requirements,
      location,
      jobType,
      category,
      workMode,
      skills,
      experience,
    };

    if (minSalary !== undefined && minSalary !== "") {
      updateData.minSalary = Number(minSalary);
    } else {
      updateData.minSalary = undefined;
    }

    if (maxSalary !== undefined && maxSalary !== "") {
      updateData.maxSalary = Number(maxSalary);
    } else {
      updateData.maxSalary = undefined;
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("company", "name logo location website")
      .populate("postedBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own jobs",
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyJobs = async (req, res, next) => {
  try {
    const {
      search = "",
      jobType,
      status,
      experience,
      workMode,
      location,
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const jobsPerPage = Math.min(Math.max(Number(limit) || 10, 1), 100);
    const skip = (currentPage - 1) * jobsPerPage;

    const query = {
      postedBy: req.user._id,
    };

    if (search.trim()) {
      const companies = await Company.find({
        name: {
          $regex: search.trim(),
          $options: "i",
        },
      }).select("_id");

      const companyIds = companies.map((company) => company._id);

      query.$or = [
        {
          title: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          company: {
            $in: companyIds,
          },
        },
      ];
    }

    if (jobType) query.jobType = jobType;
    if (status) query.status = status;

    if (experience) {
      query.experience = {
        $regex: experience.trim(),
        $options: "i",
      };
    }

    if (workMode) query.workMode = workMode;

    if (location) {
      query.location = {
        $regex: location.trim(),
        $options: "i",
      };
    }

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate("company", "name logo location website")
      .populate("postedBy", "name email")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(jobsPerPage)
      .lean();

    // Count non-withdrawn applications for each fetched job.
    const jobIds = jobs.map((job) => job._id);

    const applicationCounts = await Application.aggregate([
      {
        $match: {
          job: { $in: jobIds },
          status: { $ne: "Withdrawn" },
        },
      },
      {
        $group: {
          _id: "$job",
          count: { $sum: 1 },
        },
      },
    ]);

    const countMap = new Map(
      applicationCounts.map((item) => [item._id.toString(), item.count]),
    );

    const jobsWithApplicants = jobs.map((job) => ({
      ...job,
      applicantsCount: countMap.get(job._id.toString()) || 0,
    }));

    // Total applications across ALL jobs matching this recruiter's query,
    // not just the current page.
    const allMatchingJobIds = await Job.find(query).distinct("_id");

    const totalApplicants = await Application.countDocuments({
      job: { $in: allMatchingJobIds },
      status: { $ne: "Withdrawn" },
    });

    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    return res.status(200).json({
      success: true,
      count: jobsWithApplicants.length,
      jobs: jobsWithApplicants,
      totalApplicants,
      pagination: {
        currentPage,
        totalPages,
        totalJobs,
        limit: jobsPerPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const toggleJobStatus = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only change the status of your own jobs",
      });
    }

    job.status = job.status === "Active" ? "Closed" : "Active";

    await job.save();

    return res.status(200).json({
      success: true,
      message:
        job.status === "Active"
          ? "Job reopened successfully"
          : "Job closed successfully",
      job,
    });
  } catch (error) {
    next(error);
  }
};
