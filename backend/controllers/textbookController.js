const Textbook = require("../models/Textbook");
const extractText = require("../services/textExtractor");

const createTextbook = async (req, res) => {
  try {
    const {
      title,
      subject,
      className,
      section,
      board,
      language,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a textbook file",
      });
    }

    if (!title || !subject || !className) {
      return res.status(400).json({
        message: "Title, subject and class are required",
      });
    }

    // Extract text from uploaded PDF/DOCX
    console.log("Extracting textbook text...");

    const extractedText = await extractText(
      req.file.path,
      req.file.mimetype
    );

    console.log(
      `Text extracted successfully: ${extractedText.length} characters`
    );

    const textbook = await Textbook.create({
      title,
      subject,
      className,
      section: section || "",
      board: board || "",
      language: language || "English",

      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,

      extractedText,

      uploadedBy: req.user.id,
    });

    res.status(201).json({
      message: "Textbook uploaded and processed successfully",
      textbook,
    });
  } catch (error) {
    console.error("Create textbook error:", error);

    res.status(500).json({
      message: "Failed to upload and process textbook",
      error: error.message,
    });
  }
};

const getTextbooks = async (req, res) => {
  try {
    const textbooks = await Textbook.find({
      uploadedBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      textbooks,
    });
  } catch (error) {
    console.error("Get textbooks error:", error);

    res.status(500).json({
      message: "Failed to fetch textbooks",
      error: error.message,
    });
  }
};

const getTextbookById = async (req, res) => {
  try {
    const textbook = await Textbook.findOne({
      _id: req.params.id,
      uploadedBy: req.user.id,
    });

    if (!textbook) {
      return res.status(404).json({
        message: "Textbook not found",
      });
    }

    res.status(200).json({
      textbook,
    });
  } catch (error) {
    console.error("Get textbook error:", error);

    res.status(500).json({
      message: "Failed to fetch textbook",
      error: error.message,
    });
  }
};

const deleteTextbook = async (req, res) => {
  try {
    const textbook = await Textbook.findOne({
      _id: req.params.id,
      uploadedBy: req.user.id,
    });

    if (!textbook) {
      return res.status(404).json({
        message: "Textbook not found",
      });
    }

    await textbook.deleteOne();

    res.status(200).json({
      message: "Textbook deleted successfully",
    });
  } catch (error) {
    console.error("Delete textbook error:", error);

    res.status(500).json({
      message: "Failed to delete textbook",
      error: error.message,
    });
  }
};

module.exports = {
  createTextbook,
  getTextbooks,
  getTextbookById,
  deleteTextbook,
};