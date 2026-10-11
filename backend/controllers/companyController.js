import Company from "../models/Company.js";
import cloudinary from "../config/cloudinary.js";

// HELPER: Upload buffer to Cloudinary

const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
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

    stream.end(buffer);
  });
};

// GET MY COMPANY

export const getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      recruiter: req.user._id,
    });

    if (!company) {
      return res.status(200).json({
        success: true,
        company: null,
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Get company error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE / UPDATE MY COMPANY

export const saveCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      website,
      industry,
      companySize,
      location,
      foundedYear,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    let company = await Company.findOne({
      recruiter: req.user._id,
    });

    // Create if company doesn't exist
    if (!company) {
      company = new Company({
        recruiter: req.user._id,
      });
    }

    // Update text fields
    company.name = name.trim();
    company.description = description?.trim() || "";
    company.website = website?.trim() || "";
    company.industry = industry?.trim() || "";
    company.companySize = companySize?.trim() || "";
    company.location = location?.trim() || "";

    company.foundedYear = foundedYear ? Number(foundedYear) : undefined;

    // Logo
    if (req.files?.logo?.[0]) {
      const file = req.files.logo[0];

      if (company.logo?.publicId) {
        await cloudinary.uploader.destroy(company.logo.publicId);
      }

      const result = await uploadToCloudinary(
        file.buffer,
        "hirehub/companies/logos",
      );

      company.logo = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    // Cover image
    if (req.files?.coverImage?.[0]) {
      const file = req.files.coverImage[0];

      if (company.coverImage?.publicId) {
        await cloudinary.uploader.destroy(company.coverImage.publicId);
      }

      const result = await uploadToCloudinary(
        file.buffer,
        "hirehub/companies/covers",
      );

      company.coverImage = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company Details saved successfully",
      company,
    });
  } catch (error) {
    console.error("Save company error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// DELETE MY COMPANY

export const deleteCompany = async (req, res) => {
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

    // Delete logo from Cloudinary
    if (company.logo?.publicId) {
      await cloudinary.uploader.destroy(company.logo.publicId);
    }

    // Delete cover image from Cloudinary
    if (company.coverImage?.publicId) {
      await cloudinary.uploader.destroy(company.coverImage.publicId);
    }

    await Company.deleteOne({
      _id: company._id,
    });

    res.status(200).json({
      success: true,
      message: "Company profile deleted successfully",
    });
  } catch (error) {
    console.error("Delete company error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
