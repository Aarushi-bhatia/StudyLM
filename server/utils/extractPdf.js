import { PDFExtract } from "pdf.js-extract";

const pdfExtract = new PDFExtract();


const extractTextFromPDF = async (buffer) => {
  return new Promise((resolve, reject) => {
    pdfExtract.extractBuffer(buffer, {}, (err, data) => {
      if (err) return reject(err);
      const extractedText = data.pages
        .map(page => page.content.map(item => item.str).join(" "))
        .join("\n");
      resolve(extractedText);
    });
  });
};

export default extractTextFromPDF