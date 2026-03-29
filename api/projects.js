// Vercel Serverless Function – projects stored in MongoDB
require("dotenv").config();
const connectDB = require("./db");
const CompanyProjects = require("./models/Projects");

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
    console.error("MONGODB_URI is not set");
    return res.status(500).json({ error: "Server misconfiguration: MongoDB URI not set" });
  }

  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return res.status(500).json({ error: "Database connection failed", message: err.message });
  }

  try {
    if (req.method === "GET") {
      const companies = await CompanyProjects.find().sort({ _id: 1 });
      return res.status(200).json(companies);
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!body || !body.company || !Array.isArray(body.projects)) {
      return res.status(400).json({ error: "Expected { company: string, projects: [] }" });
    }

    let doc;
    if (body._id) {
      doc = await CompanyProjects.findByIdAndUpdate(
        body._id,
        { $set: { company: body.company, projects: body.projects } },
        { new: true }
      );
      if (!doc) {
        return res.status(404).json({ error: "Project company not found for update" });
      }
    } else {
      // Create or upsert by company only when this is a new item without _id
      doc = await CompanyProjects.findOneAndUpdate(
        { company: body.company },
        { $set: { company: body.company, projects: body.projects } },
        { new: true, upsert: true }
      );
    }

    return res.status(201).json({ message: "Projects saved to MongoDB", data: doc });
  } catch (err) {
    console.error("Projects API error:", err);
    return res.status(500).json({ error: err.message });
  }
};

