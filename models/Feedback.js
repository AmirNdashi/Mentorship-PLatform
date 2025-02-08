const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
