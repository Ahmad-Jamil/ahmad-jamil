const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    phonePrefix: String,
    mobileNumber: String,
    email: String,
    country: String,
    city: String,
    aboutMe: String,

    experiences: [
      {
        jobTitle: String,
        companyName: String,
        startDate: String,
        endDate: String,
        summary: String
      }
    ],

    education: [
      {
        university: String,
        degree: String,
        date: String
      }
    ],

    languages: [
      {
        name: String,
        level: String
      }
    ],

    // FIXED SKILLS SCHEMA
    skills: [
      {
        // dynamic category name (e.g. programming_languages)
        type: Object,
        required: true
      }
    ],

    certificates: [
      {
        name: String,
        date: String
      }
    ]
  },
  { collection: "ahmad_portfolio" }
);

module.exports = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
