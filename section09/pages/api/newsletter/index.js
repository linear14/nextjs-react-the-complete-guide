function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (email) {
      res.status(201).json({ email });
    } else {
      res
        .status(400)
        .json({ hasError: true, message: "올바른 이메일 형식이 아닙니다." });
    }
  } else {
    res.status(400).json({
      hasError: true,
      message: `${req.method}은(는) 지원하지 않는 메서드입니다.`,
    });
  }
}

export default handler;
