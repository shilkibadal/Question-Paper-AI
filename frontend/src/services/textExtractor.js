const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const extractText = async (filePath, fileType) => {
  try {
    const extension = path
      .extname(filePath)
      .toLowerCase();

    // -------------------------
    // PDF
    // -------------------------
    if (
      extension === ".pdf" ||
      fileType === "application/pdf"
    ) {
      const fileBuffer = fs.readFileSync(filePath);

      const pdfData = await pdfParse(fileBuffer);

      return pdfData.text;
    }

    // -------------------------
    // DOCX
    // -------------------------
    if (
      extension === ".docx" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      return result.value;
    }

    throw new Error(
      "Unsupported textbook file format"
    );
  } catch (error) {
    console.error(
      "Text extraction error:",
      error
    );

    throw error;
  }
};

module.exports = extractText;