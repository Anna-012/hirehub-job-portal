import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      url: {
        type: String,
        required: true,
        trim: true,
      },

      publicId: {
        type: String,
        required: true,
        trim: true,
      },

      fileName: {
        type: String,
        required: true,
        trim: true,
      },
    },

    coverLetter: {
      type: String,
      default: "",
      trim: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Viewed",
        "Shortlisted",
        "Rejected",
        "Hired",
        "Withdrawn",
      ],
      default: "Applied",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index(
  {
    job: 1,
    applicant: 1,
  },
  {
    unique: true,
  },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
