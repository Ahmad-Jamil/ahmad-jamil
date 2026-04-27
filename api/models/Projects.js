const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          if (!value || !this.startDate) return true;
          return value >= this.startDate;
        },
        message: "End date must be after start date",
      },
    },
  },
  {
    _id: true, // ✅ keep it (important)
  }
);

const CompanyProjectsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    projects: {
      type: [ProjectSchema],
      default: [],
    },
  },
  {
    collection: "projects",
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

module.exports =
  mongoose.models.CompanyProjects ||
  mongoose.model("CompanyProjects", CompanyProjectsSchema);