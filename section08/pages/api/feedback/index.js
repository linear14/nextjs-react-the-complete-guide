import {
  buildFeedbackPath,
  extractFeedback,
} from "../../../helpers/feedback-util";

async function handler(req, res) {
  if (req.method === "GET") {
    const filePath = buildFeedbackPath();
    const data = await extractFeedback(filePath);

    res.status(200).json({ feedback: data });
  } else if (req.method === "POST") {
    const { email, feedbackText } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    };

    // store
    const filePath = buildFeedbackPath();
    const data = await extractFeedback(filePath);
    data.push(newFeedback);
    await fs.writeFile(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "This works!" });
  }
}

export default handler;
