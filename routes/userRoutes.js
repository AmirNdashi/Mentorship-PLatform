const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, req.user.id + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload-profile", upload.single("profilePicture"), async (req, res) => {
  try {
    req.user.profilePicture = req.file.filename;
    await req.user.save();
    req.flash("success", "Profile picture updated!");
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not upload image.");
    res.redirect("/dashboard");
  }
});

module.exports = router;
