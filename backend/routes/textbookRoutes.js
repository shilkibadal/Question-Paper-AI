const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createTextbook,
  getTextbooks,
  getTextbookById,
  deleteTextbook,
} = require("../controllers/textbookController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// -----------------------------
// Multer configuration
// -----------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/textbooks");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and DOCX files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

// -----------------------------
// Routes
// -----------------------------

router.post(
  "/",
  authMiddleware,
  upload.single("textbook"),
  createTextbook
);

router.get(
  "/",
  authMiddleware,
  getTextbooks
);

router.get(
  "/:id",
  authMiddleware,
  getTextbookById
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTextbook
);

module.exports = router;