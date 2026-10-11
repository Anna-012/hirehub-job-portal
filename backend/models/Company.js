import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    logo: {
      url: {
        type: String,
        default: "",
        trim: true,
      },
      publicId: {
        type: String,
        default: "",
        trim: true,
        required: true,
      },
    },

    coverImage: {
      url: {
        type: String,
        default: "",
        trim: true,
      },
      publicId: {
        type: String,
        default: "",
        trim: true,
        required: true,
      },
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    industry: {
      type: String,
      default: "",
      trim: true,
    },

    companySize: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    foundedYear: {
      type: Number,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          default: "",
          required: true,
        },

        caption: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Company = mongoose.model("Company", companySchema);

export default Company;
