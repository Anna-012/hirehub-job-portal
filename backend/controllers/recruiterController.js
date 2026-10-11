import User from "../models/User.js";
import Company from "../models/Company.js";

// Get logged-in recruiter's profile
export const getRecruiterProfile = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user._id).select("-password");

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    if (recruiter.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Recruiter only.",
      });
    }

    res.status(200).json({
      success: true,
      recruiter,
    });
  } catch (error) {
    console.error("Get recruiter profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get recruiter profile",
    });
  }
};

// Get recruiter's company
export const getRecruiterCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      recruiter: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Get recruiter company error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get company profile",
    });
  }
};

// Create company profile
export const createCompany = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can create a company profile",
      });
    }

    const existingCompany = await Company.findOne({
      recruiter: req.user._id,
    });

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: "Company profile already exists",
      });
    }

    const company = await Company.create({
      ...req.body,
      recruiter: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Company profile created successfully",
      company,
    });
  } catch (error) {
    console.error("Create company error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create company profile",
    });
  }
};

// Update company profile
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      recruiter: req.user._id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company profile not found",
      });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      company._id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Company profile updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Update company error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update company profile",
    });
  }
};
