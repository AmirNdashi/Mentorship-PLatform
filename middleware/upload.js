const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// File upload settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  fileFilter: function (req, file, cb) {
    const fileTypes = /pdf|doc|docx|ppt|pptx/; // Allowed file types
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extName) {
      return cb(null, true);
    } else {
      cb("Error: Only documents are allowed!");
    }
  },
});

module.exports = upload;
