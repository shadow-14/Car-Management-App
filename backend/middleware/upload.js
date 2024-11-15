const multer = require("multer");
const path = require("path");

// Define the storage location and file naming convention
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Store images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name to avoid collisions
  },
});

// Filter the files to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type! Only JPG, JPEG, and PNG are allowed."), false);
  }
};

// Set up multer with storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload;
