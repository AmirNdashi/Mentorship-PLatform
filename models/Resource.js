const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who shared the resource
  title: { type: String, required: true },  // Resource title
  fileUrl: { type: String },  // If it's a file
  link: { type: String },  // If it's a link
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resource", resourceSchema);
