import path from "path";
import mammoth from "mammoth";
import { parse } from "csv-parse/sync";
import * as xlsx from "xlsx";
import extractTextFromPDF from "./extractPdf.js";

const SUPPORTED_DOCUMENT_EXTENSIONS = [".pdf", ".docx", ".csv", ".xlsx", ".xls"];

const MIME_TYPE_TO_EXTENSION = new Map([
  ["application/pdf", ".pdf"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".docx"],
  ["text/csv", ".csv"],
  ["application/csv", ".csv"],
  ["application/vnd.ms-excel", ".xls"],
  ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ".xlsx"],
]);

const getExtensionFromFile = (file) => {
  if (!file?.originalname) return "";
  return path.extname(file.originalname).toLowerCase();
};

const getExtensionFromMime = (file) => {
  if (!file?.mimetype) return "";
  return MIME_TYPE_TO_EXTENSION.get(file.mimetype) || "";
};

export const isSupportedDocument = (file) => {
  const extension = getExtensionFromFile(file) || getExtensionFromMime(file);
  return SUPPORTED_DOCUMENT_EXTENSIONS.includes(extension);
};

const extractTextFromCsv = (buffer) => {
  const text = buffer.toString("utf-8");
  try {
    const records = parse(text, {
      relax_column_count: true,
      skip_empty_lines: true,
    });
    return records.map((row) => row.map((cell) => String(cell)).join(", ")).join("\n");
  } catch (error) {
    return text;
  }
};

const extractTextFromExcel = (buffer) => {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetTexts = workbook.SheetNames.map((name) => {
    const sheet = workbook.Sheets[name];
    const csv = xlsx.utils.sheet_to_csv(sheet, { blankrows: false });
    if (!csv.trim()) return "";
    return `Sheet: ${name}\n${csv}`;
  }).filter(Boolean);

  return sheetTexts.join("\n\n");
};

const extractTextFromDocx = async (buffer) => {
  const result = await mammoth.extractRawText({ buffer });
  return result.value || "";
};

const extractTextFromDocument = async (file) => {
  const extension = getExtensionFromFile(file) || getExtensionFromMime(file);

  if (!SUPPORTED_DOCUMENT_EXTENSIONS.includes(extension)) {
    throw new Error("Unsupported file type. Please upload PDF, DOCX, CSV, XLS, or XLSX files.");
  }

  switch (extension) {
    case ".pdf":
      return extractTextFromPDF(file.buffer);
    case ".docx":
      return extractTextFromDocx(file.buffer);
    case ".csv":
      return extractTextFromCsv(file.buffer);
    case ".xls":
    case ".xlsx":
      return extractTextFromExcel(file.buffer);
    default:
      throw new Error("Unsupported file type. Please upload PDF, DOCX, CSV, XLS, or XLSX files.");
  }
};

export default extractTextFromDocument;
export { SUPPORTED_DOCUMENT_EXTENSIONS };
