const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const upload = require("../middleware/upload");

// 🔹 View all resources
router.get("/", async (req, res) => {
  const resources = await Resource.find().populate("mentor", "name");
  res.render("resources", { resources, user: req.user });
});

// 🔹 Upload a new resource (Mentors only)
router.post("/upload", upload.single("file"), async (req, res) => {
  if (req.user.role !== "mentor") return res.redirect("/resources");

  const { title, link } = req.body;
  const fileUrl = req.file ? "/uploads/" + req.file.filename : null;

  await Resource.create({ mentor: req.user.id, title, fileUrl, link });
  res.redirect("/resources");
});

module.exports = router;
