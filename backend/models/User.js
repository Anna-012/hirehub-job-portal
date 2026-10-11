import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic account information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["jobseeker", "recruiter", "admin"],
      default: "jobseeker",
    },

    // Profile information
    phone: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    headline: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    education: {
      type: [
        {
          degree: {
            type: String,
            trim: true,
          },
          institution: {
            type: String,
            trim: true,
          },
          subjects: {
            type: [String],
            default: [],
          },
          startYear: {
            type: String,
            trim: true,
          },
          endYear: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
    },

    experience: {
      type: [
        {
          jobTitle: {
            type: String,
            trim: true,
          },
          company: {
            type: String,
            trim: true,
          },
          startDate: {
            type: String,
            trim: true,
          },
          endDate: {
            type: String,
            trim: true,
          },
          currentlyWorking: {
            type: Boolean,
            default: false,
          },
          description: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    github: {
      type: String,
      default: "",
      trim: true,
    },

    portfolio: {
      type: String,
      default: "",
      trim: true,
    },

    profilePhoto: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    resume: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    // Password reset information
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
