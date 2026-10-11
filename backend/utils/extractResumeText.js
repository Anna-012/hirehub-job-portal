import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export const extractResumeText = async (file) => {
  if (!file?.buffer || !file?.mimetype) {
    throw new Error("Resume file is required");
  }

  let extractedText = "";

  if (file.mimetype === "application/pdf") {
    const parser = new PDFParse({
      data: file.buffer,
    });

    try {
      const result = await parser.getText();
      extractedText = result.text;
    } finally {
      await parser.destroy();
    }
  } else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    extractedText = result.value;
  } else if (file.mimetype === "application/msword") {
    throw new Error(
      "Old DOC files are not supported yet. Please upload a PDF or DOCX file.",
    );
  } else {
    throw new Error("Only PDF and DOCX resumes are supported");
  }

  const cleanedText = extractedText.trim();

  if (!cleanedText) {
    throw new Error(
      "No readable text found. Please upload a text-based PDF or DOCX resume.",
    );
  }

  return cleanedText;
};
