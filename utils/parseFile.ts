import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    console.log("Called parsePDF function ⏳ ✅");
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error(`Error parsing PDF file ":`, error);
    return "";
  }
}

export async function parseDocx(buffer: Buffer): Promise<string> {
  try {
    console.log("Called parseDocx function ⏳ ✅");
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error(`Error parsing DOCX file ":`, error);
    return "";
  }
}

export async function parsePlainText(file: Blob): Promise<string> {
  try {
    console.log("Called parsePlainText function ⏳ ✅");
    const text = await file.text();
    return text;
  } catch (error) {
    console.error(`Error parsing Plain Text file ":`, error);
    return "";
  }
}

export async function extractTextFromBlob(
  file: Blob,
  filename: string
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (filename.endsWith(".pdf")) {
    console.log("Calling parsePDF 📕 function... 👀");
    return await parsePDF(buffer);
  } else if (filename.endsWith(".docx")) {
    console.log("Calling parseDocx 📙 function... 👀");
    return await parseDocx(buffer);
  } else if (filename.endsWith(".txt")) {
    console.log("Calling parsePlainText 📓 function... 👀");
    return await parsePlainText(file);
  } else {
    throw new Error("Unsupported file type");
  }
}
