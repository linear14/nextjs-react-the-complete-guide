import {
  buildFeedbackPath,
  extractFeedback,
} from "../../../helpers/feedback-util";

async function handler(req, res) {
  const feedbackId = req.query.id;
  const filePath = buildFeedbackPath();
  const feedbackData = await extractFeedback(filePath);
  const selectedFeedback = feedbackData.find((item) => item.id === feedbackId);

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
