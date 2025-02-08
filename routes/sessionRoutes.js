const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const User = require("../models/User");

// Ensure user is logged in
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

// View available mentors (For mentees)
router.get("/book-session", ensureAuthenticated, async (req, res) => {
  if (req.user.role !== "mentee") {
    return res.redirect("/dashboard");
  }
  const mentors = await User.find({ role: "mentor" });
  res.render("bookSession", { mentors });
});

// Book a session
router.post("/book-session", ensureAuthenticated, async (req, res) => {
  try {
    const { mentorId, date } = req.body;
    if (req.user.role !== "mentee") {
      req.flash("error", "Only mentees can book sessions.");
      return res.redirect("/dashboard");
    }
    await Session.create({ mentor: mentorId, mentee: req.user.id, date });
    req.flash("success", "Session booked successfully!");
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to book session.");
    res.redirect("/book-session");
  }
});

// View scheduled sessions
router.get("/sessions", ensureAuthenticated, async (req, res) => {
  let sessions;
  if (req.user.role === "mentor") {
    sessions = await Session.find({ mentor: req.user.id }).populate("mentee", "name");
  } else {
    sessions = await Session.find({ mentee: req.user.id }).populate("mentor", "name");
  }
  res.render("sessions", { sessions, user: req.user });
});

module.exports = router;
