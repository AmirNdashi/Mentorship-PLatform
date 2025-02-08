const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
});

module.exports = mongoose.model("Session", sessionSchema);
