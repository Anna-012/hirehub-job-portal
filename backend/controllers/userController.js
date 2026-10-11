import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// Get logged-in user's profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -resetPasswordToken -resetPasswordExpire",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

// Update logged-in user's profile
export const updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      name,
      phone,
      location,
      headline,
      bio,
      skills,
      education,
      experience,
      linkedin,
      github,
      portfolio,
    } = req.body;

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (headline !== undefined) user.headline = headline;
    if (bio !== undefined) user.bio = bio;
    if (skills !== undefined) user.skills = skills;
    if (education !== undefined) user.education = education;
    if (experience !== undefined) user.experience = experience;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (github !== undefined) user.github = github;
    if (portfolio !== undefined) user.portfolio = portfolio;

    await user.save();

    const updatedUser = await User.findById(user._id).select(
      "-password -resetPasswordToken -resetPasswordExpire",
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a profile photo",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload image buffer to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "job-portal/profile-photos",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(req.file.buffer);
    });

    // Store new photo information
    const oldPublicId = user.profilePhoto?.publicId;

    user.profilePhoto = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };

    await user.save();

    // Delete old photo from Cloudinary
    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (deleteError) {
        console.error("Failed to delete old profile photo:", deleteError);
      }
    }

    const updatedUser = await User.findById(user._id).select(
      "-password -resetPasswordToken -resetPasswordExpire",
    );

    return res.status(200).json({
      success: true,
      message: "Profile photo uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Upload profile photo error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload profile photo",
      error: error.message,
    });
  }
};

// Upload resume
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a resume",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const originalName = req.file.originalname;

    // Remove unsafe characters from filename
    const safeFileName = originalName
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const fileNameWithoutExtension = safeFileName.replace(/\.[^/.]+$/, "");

    const fileExtension = safeFileName.includes(".")
      ? safeFileName.substring(safeFileName.lastIndexOf("."))
      : "";

    const publicId = `${fileNameWithoutExtension}-${Date.now()}${fileExtension}`;

    // Upload resume to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "job-portal/resumes",
          resource_type: "raw",
          public_id: publicId,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(req.file.buffer);
    });

    // Store old public ID before replacing it
    const oldPublicId = user.resume?.publicId;

    user.resume = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };

    await user.save();

    // Delete old resume
    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId, {
          resource_type: "raw",
        });
      } catch (deleteError) {
        console.error("Failed to delete old resume:", deleteError);
      }
    }

    const updatedUser = await User.findById(user._id).select(
      "-password -resetPasswordToken -resetPasswordExpire",
    );

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Upload resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload resume",
      error: error.message,
    });
  }
};
