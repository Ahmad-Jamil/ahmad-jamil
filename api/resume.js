// Vercel Serverless Function – messages stored in MongoDB
require("dotenv").config();
const connectDB = require("./db");
const Resume = require("./models/Resume");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set (add it in Vercel Project Settings → Environment Variables)");
    return res.status(500).json({
      error: "Server misconfiguration: MongoDB URI not set",
      hint: "Add MONGODB_URI in Vercel dashboard for this project",
    });
  }

  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return res.status(500).json({
      error: "Database connection failed",
      message: err.message,
    });
  }

  try {
    if (req.method === "GET") {
      const resumeObject = await Resume.findOne().sort({ _id: -1 });
      return res.status(200).json(resumeObject || {});
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (!body || (!body.phonePrefix && !body.mobileNumber && !body.email && !body.country && !body.city && !body.aboutMe && !body.experiences && !body.education && !body.languages && !body.skills && !body.certificates)) {
        return res.status(400).json({ error: "phonePrefix, mobileNumber, email, country, city, aboutMe, experiences, education, languages, skills, and certificates are required" });
      }

      let resumeObject;
      if (body._id) {
        resumeObject = await Resume.findByIdAndUpdate(
          body._id,
          { $set: { ...body, _id: undefined } },
          { new: true }
        );
        if (!resumeObject) {
          return res.status(404).json({ error: "Resume not found for update" });
        }
      } else {
        resumeObject = await Resume.create(body);
      }
      return res.status(201).json({ resume: "Resume saved to MongoDB", data: resumeObject });
    }
  } catch (err) {
    console.error("Resume API error:", err);
    return res.status(500).json({ error: err.message });
  }
};
