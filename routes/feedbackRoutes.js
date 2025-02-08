const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const Session = require("../models/Session");

// ✅ Mentees can submit feedback after a session
router.post("/:sessionId", async (req, res) => {
  if (!req.user) return res.redirect("/login"); // Ensure user is logged in

  try {
    const session = await Session.findById(req.params.sessionId);
    if (!session) return res.status(404).send("Session not found");

    // Ensure only the mentee can give feedback
    if (session.mentee.toString() !== req.user._id.toString()) {
      return res.status(403).send("Only mentees can give feedback.");
    }

    const newFeedback = new Feedback({
      session: session._id,
      mentee: req.user._id,
      mentor: session.mentor,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    await newFeedback.save();
    req.flash("success", "Feedback submitted successfully.");
    res.redirect("/sessions");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ✅ Mentors can view feedback from their mentees
router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login"); // Ensure user is logged in

  try {
    let feedbacks = [];
    if (req.user.role === "mentor") {
      feedbacks = await Feedback.find({ mentor: req.user._id }).populate("mentee", "name").populate("session", "date");
    } else {
      feedbacks = await Feedback.find({ mentee: req.user._id }).populate("mentor", "name").populate("session", "date");
    }

    res.render("feedback", { feedbacks });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
