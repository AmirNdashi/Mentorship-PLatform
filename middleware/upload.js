// const multer = require("multer");
// const path = require("path");

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: "public/uploads/",
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// // File upload settings
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
//   fileFilter: function (req, file, cb) {
//     const fileTypes = /pdf|doc|docx|ppt|pptx/; // Allowed file types
//     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     if (extName) {
//       return cb(null, true);
//     } else {
//       cb("Error: Only documents are allowed!");
//     }
//   },
// });

// module.exports = upload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "public/uploads/", // Cloudinary folder
    allowed_formats: ["pdf", "doc", "docx", "ppt", "pptx"], // Allowed file types
    resource_type: "raw", // Needed for non-image files
  },
});

// Configure multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
});

module.exports = upload;
