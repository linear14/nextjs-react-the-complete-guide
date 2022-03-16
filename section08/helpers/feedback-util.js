import fs from "fs/promises";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export async function extractFeedback(filePath) {
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);

  return data;
}
