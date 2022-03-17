import { connectDatabase, insertDocument } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    // 이메일 형식 검증
    if (!email) {
      res
        .status(422)
        .json({ hasError: true, message: "올바른 이메일 형식이 아닙니다." });
      return;
    }

    // 서버에 이메일 등록
    let client;
    try {
      client = await connectDatabase();
      await insertDocument(client, "newsletter", { email });
    } catch (e) {
      res
        .status(500)
        .json({ hasError: true, message: "데이터베이스 오류가 발생했습니다." });
      client?.close();
      return;
    }

    client.close();

    res.status(201).json({ email });
  } else {
    // 지원하지 않는 메서드
    res.status(400).json({
      hasError: true,
      message: `${req.method}은(는) 지원하지 않는 메서드입니다.`,
    });
  }
}

export default handler;
