function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({
      comments: [
        {
          email: "test1@naver.com",
          name: "testuser1",
          text: "테스트 댓글1 입니다.",
        },
        {
          email: "test2@naver.com",
          name: "testuser2",
          text: "테스트 댓글2 입니다.",
        },
        {
          email: "test3@naver.com",
          name: "testuser3",
          text: "테스트 댓글3 입니다.",
        },
      ],
    });
  } else if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!email || !name || !text) {
      res
        .status(400)
        .json({ hasError: true, message: "비어있는 값이 있습니다." });
    } else {
      res.status(201).json({ comment: { email, name, text } });
    }
  } else {
    res
      .status(400)
      .json({ hasError: true, message: "지원하지 않는 메서드입니다." });
  }
}

export default handler;
