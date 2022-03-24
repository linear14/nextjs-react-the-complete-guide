import { connectDatabase } from "../../../helpers/db-util";
import { handleErrorResponse } from "../../../helpers/res-util";
import { checkEmail, checkPassword } from "../../../helpers/validation-util";
import { hashPassword } from "../../../helpers/auth-util";

const handler = async (req, res) => {
  const method = req.method;

  if (method === "POST") {
    const { email, password } = req.body;

    const emailValidator = checkEmail(email);

    if (!emailValidator.isValid) {
      return handleErrorResponse(res, 422, emailValidator.errorMessage);
    }

    const passwordValidator = checkPassword(password);

    if (!passwordValidator.isValid) {
      return handleErrorResponse(res, 422, passwordValidator.errorMessage);
    }

    const client = await connectDatabase();
    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      client.close();
      return handleErrorResponse(res, 422, "이미 존재하는 이메일입니다.");
    } else {
      const hashedPassword = await hashPassword(password);
      await db.collection("users").insertOne({
        email,
        password: hashedPassword,
      });
      client.close();
      res.status(201).json({ message: "Success" });
    }
  } else {
    return handleErrorResponse(res, 400, "지원하지 않는 메서드입니다.");
  }
};

export default handler;
