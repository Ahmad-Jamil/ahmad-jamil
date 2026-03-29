// Vercel Serverless Function – references stored in MongoDB
require("dotenv").config();
const connectDB = require("./db");
const Reference = require("./models/References");

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
      const refs = await Reference.find().sort({ _id: -1 });
      return res.status(200).json(refs);
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!body || !body.company || !body.Manager || !body.reference) {
      return res.status(400).json({ error: "Expected { company, Manager, reference, skills?, keyPoints? }" });
    }

    let doc;
    if (body._id) {
      doc = await Reference.findByIdAndUpdate(
        body._id,
        {
          $set: {
            company: body.company,
            Manager: body.Manager,
            reference: body.reference,
            skills: Array.isArray(body.skills) ? body.skills : [],
            keyPoints: Array.isArray(body.keyPoints) ? body.keyPoints : [],
          },
        },
        { new: true }
      );
      if (!doc) {
        return res.status(404).json({ error: "Reference not found for update" });
      }
    } else {
      doc = await Reference.create({
        company: body.company,
        Manager: body.Manager,
        reference: body.reference,
        skills: Array.isArray(body.skills) ? body.skills : [],
        keyPoints: Array.isArray(body.keyPoints) ? body.keyPoints : [],
      });
    }

    return res.status(201).json({ message: "Reference saved to MongoDB", data: doc });
  } catch (err) {
    console.error("References API error:", err);
    return res.status(500).json({ error: err.message });
  }
};

