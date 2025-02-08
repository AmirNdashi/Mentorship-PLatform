const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");

// 🔹 View all goals (Mentees see their goals, Mentors see their mentees' goals)
router.get("/", async (req, res) => {
  let goals;
  if (req.user.role === "mentor") {
    goals = await Goal.find().populate("mentee", "name"); // Mentors see all mentees' goals
  } else {
    goals = await Goal.find({ mentee: req.user.id }); // Mentees see their own goals
  }
  res.render("goals", { goals, user: req.user });
});

// 🔹 Create a new goal (Mentees only)
router.post("/add", async (req, res) => {
  if (req.user.role !== "mentee") return res.redirect("/goals");

  const { title, description } = req.body;
  await Goal.create({ mentee: req.user.id, title, description });
  res.redirect("/goals");
});

// 🔹 Update goal status (Mentors only)
router.post("/update/:id", async (req, res) => {
  if (req.user.role !== "mentor") return res.redirect("/goals");

  await Goal.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.redirect("/goals");
});

module.exports = router;
