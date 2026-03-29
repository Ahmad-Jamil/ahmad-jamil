// Local backend only – for Vercel, api/messages.js and api/auth.js are serverless functions
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const connectDB = require("./api/db");
const Message = require("./api/models/Messages");
const Resume = require("./api/models/Resume");
const CompanyProjects = require("./api/models/Projects");
const Reference = require("./api/models/References");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/auth", (req, res) => {
  const filePath = path.join(__dirname, "api", "data", "authentication.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading auth file:", err);
      return res.status(500).json({ message: "Error authenticating user" });
    }
    let authData;
    try {
      authData = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).json({ message: "Invalid authentication data" });
    }
    if (req.body.username === authData.username && req.body.password === authData.password) {
      return res.status(200).json("Welcome Back");
    }
    return res.status(401).json({ message: "Invalid username or password" });
  });
});

app.post("/api/messages", async (req, res) => {
  try {
    await connectDB();
    const msg = await Message.create(req.body);
    res.status(201).json({ message: "Message saved to MongoDB", data: msg });
  } catch (err) {
    console.error("MongoDB insert error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    await connectDB();
    const messages = await Message.find().sort({ _id: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("MongoDB read error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/resume", async (req, res) => {
  try {
    await connectDB();
    const resumeObject = await Resume.findOne().sort({ _id: -1 });
    res.status(200).json(resumeObject || {});
  } catch (err) {
    console.error("MongoDB read error (resume):", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/resume", async (req, res) => {
  try {
    await connectDB();
    const resumeObject = await Resume.create(req.body);
    res.status(201).json({ message: "Resume saved to MongoDB", data: resumeObject });
  } catch (err) {
    console.error("MongoDB insert error (resume):", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    await connectDB();
    const companies = await CompanyProjects.find().sort({ _id: 1 });
    res.status(200).json(companies);
  } catch (err) {
    console.error("MongoDB read error (projects):", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    await connectDB();
    const body = req.body;
    if (!body || !body.company || !Array.isArray(body.projects)) {
      return res.status(400).json({ error: "Expected { company: string, projects: [] }" });
    }

    const doc = await CompanyProjects.findOneAndUpdate(
      { company: body.company },
      { $set: { company: body.company, projects: body.projects } },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Projects saved to MongoDB", data: doc });
  } catch (err) {
    console.error("MongoDB insert error (projects):", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/references", async (req, res) => {
  try {
    await connectDB();
    const refs = await Reference.find().sort({ _id: -1 });
    res.status(200).json(refs);
  } catch (err) {
    console.error("MongoDB read error (references):", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/references", async (req, res) => {
  try {
    await connectDB();
    const body = req.body;
    if (!body || !body.company || !body.Manager || !body.reference) {
      return res.status(400).json({ error: "Expected { company, Manager, reference, skills?, keyPoints? }" });
    }
    const doc = await Reference.create({
      company: body.company,
      Manager: body.Manager,
      reference: body.reference,
      skills: Array.isArray(body.skills) ? body.skills : [],
      keyPoints: Array.isArray(body.keyPoints) ? body.keyPoints : [],
    });
    res.status(201).json({ message: "Reference saved to MongoDB", data: doc });
  } catch (err) {
    console.error("MongoDB insert error (references):", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
