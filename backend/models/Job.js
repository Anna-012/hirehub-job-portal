import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    description: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "Job description is required",
      },
    },

    requirements: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "Job requirements are required",
      },
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Freelance"],
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    workMode: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"],
      required: true,
    },

    salaryCurrency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },

    minSalary: {
      type: Number,

      min: 0,
    },

    maxSalary: {
      type: Number,

      min: 0,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
