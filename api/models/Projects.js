const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    tags: [String],
  },
  { _id: false }
);

const CompanyProjectsSchema = new mongoose.Schema(
  {
    company: String,
    projects: [ProjectSchema],
  },
  { collection: "projects" }
);

module.exports =
  mongoose.models.CompanyProjects ||
  mongoose.model("CompanyProjects", CompanyProjectsSchema);

