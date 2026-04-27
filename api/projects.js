// Vercel Serverless Function – projects stored in MongoDB

require("dotenv").config();
const connectDB = require("./db");
const CompanyProjects = require("./models/Projects");

// Normalize and sanitize incoming projects
const normalizeProjects = (projects) => {
  return projects.map((p) => ({
    title: (p.title || "").trim(),
    description: (p.description || "").trim(),
    tags: Array.isArray(p.tags)
      ? p.tags.map((t) => t.trim()).filter(Boolean)
      : [],
    startDate: p.startDate ? new Date(p.startDate) : null,
    endDate: p.endDate ? new Date(p.endDate) : null,
  }));
};

module.exports = async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set");
    return res
      .status(500)
      .json({ error: "Server misconfiguration: MongoDB URI not set" });
  }

  // Connect DB
  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return res
      .status(500)
      .json({ error: "Database connection failed", message: err.message });
  }

  try {
    // ======================
    // GET
    // ======================
    if (req.method === "GET") {
      const companies = await CompanyProjects.find().sort({ _id: 1 });
      return res.status(200).json(companies);
    }

    // ======================
    // POST (CREATE / UPDATE)
    // ======================

    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!body || !body.company || !Array.isArray(body.projects)) {
      return res
        .status(400)
        .json({ error: "Expected { company: string, projects: [] }" });
    }

    const companyName = body.company.trim();

    if (!companyName) {
      return res.status(400).json({ error: "Company name is required" });
    }

    // Validate project titles
    for (const p of body.projects) {
      if (!p.title || !p.title.trim()) {
        return res
          .status(400)
          .json({ error: "Each project must have a valid title" });
      }
    }

    const normalizedProjects = normalizeProjects(body.projects);

    let doc;

    // ======================
    // UPDATE
    // ======================
    if (body._id) {
      doc = await CompanyProjects.findByIdAndUpdate(
        body._id,
        {
          $set: {
            company: companyName,
            projects: normalizedProjects,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!doc) {
        return res
          .status(404)
          .json({ error: "Project company not found for update" });
      }
    } 
    // ======================
    // CREATE / UPSERT
    // ======================
    else {
      doc = await CompanyProjects.findOneAndUpdate(
        { company: companyName },
        {
          $set: {
            company: companyName,
            projects: normalizedProjects,
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );
    }

    return res.status(201).json({
      message: "Projects saved to MongoDB",
      data: doc,
    });
  } catch (err) {
    console.error("Projects API error:", err);
    return res.status(500).json({ error: err.message });
  }
};