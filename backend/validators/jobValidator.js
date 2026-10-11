export const validateJob = (req, res, next) => {
  const {
    title,
    company,
    description,
    requirements,
    location,
    jobType,
    category,
    workMode,
    experience,
  } = req.body;

  if (
    !title ||
    !company ||
    !description ||
    !requirements ||
    !location ||
    !jobType ||
    !category ||
    !workMode ||
    !experience
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Title, company, description, requirements, location, job type, category, work mode and experience are required",
    });
  }

  if (!Array.isArray(description) || description.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one job description point is required",
    });
  }

  if (!Array.isArray(requirements) || requirements.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one requirement is required",
    });
  }

  const allowedJobTypes = [
    "Full-time",
    "Part-time",
    "Internship",
    "Contract",
    "Freelance",
  ];

  if (!allowedJobTypes.includes(jobType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid job type",
    });
  }

  const allowedWorkModes = ["On-site", "Remote", "Hybrid"];

  if (!allowedWorkModes.includes(workMode)) {
    return res.status(400).json({
      success: false,
      message: "Invalid work mode",
    });
  }

  const allowedCurrencies = ["INR", "USD"];

  if (
    req.body.salaryCurrency &&
    !allowedCurrencies.includes(req.body.salaryCurrency)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid salary currency",
    });
  }

  // Salary is optional.
  // But if recruiter enters both, max should not be less than min.
  if (
    req.body.minSalary !== undefined &&
    req.body.maxSalary !== undefined &&
    Number(req.body.maxSalary) < Number(req.body.minSalary)
  ) {
    return res.status(400).json({
      success: false,
      message: "Maximum salary cannot be less than minimum salary",
    });
  }

  next();
};
