import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const { eventId } = req.query;

  if (req.method === "GET") {
    let client;
    let documents;

    try {
      client = await connectDatabase();
      documents = await getAllDocuments(client, "comments", { _id: -1 });
    } catch (e) {
      client?.close();
      res
        .status(500)
        .json({ hasError: true, message: "데이터베이스 오류가 발생했습니다." });
      return;
    }
    client.close();

    res.status(200).json({ comments: documents });
  } else if (req.method === "POST") {
    const { email, name, text } = req.body;

    // 비어있는 값 검증
    if (!eventId || !email || !name || !text) {
      res
        .status(422)
        .json({ hasError: true, message: "비어있는 값이 있습니다." });
      return;
    }

    // 새로운 댓글 등록
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let client;
    let result;
    try {
      client = await connectDatabase();
      result = await insertDocument(client, "comments", newComment);
    } catch (e) {
      client?.close();
      res
        .status(500)
        .json({ hasError: true, message: "데이터베이스 오류가 발생했습니다." });
      return;
    }
    client.close();

    res.status(201).json({ comment: { id: result.insertedId, ...newComment } });
  } else {
    res
      .status(400)
      .json({ hasError: true, message: "지원하지 않는 메서드입니다." });
  }
}

export default handler;
