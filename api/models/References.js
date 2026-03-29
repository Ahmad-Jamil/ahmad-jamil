const mongoose = require("mongoose");

const ReferenceSchema = new mongoose.Schema(
  {
    company: String,
    Manager: String,
    reference: String,
    skills: [String],
    keyPoints: [String],
  },
  { collection: "references" }
);

module.exports =
  mongoose.models.Reference || mongoose.model("Reference", ReferenceSchema);

