import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { isSamePassword } from "../../../helpers/auth-util";
import { connectDatabase } from "../../../helpers/db-util";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialProvider({
      authorize: async function (credentials) {
        const client = await connectDatabase();
        const db = client.db();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("존재하지 않는 회원입니다.");
        }

        if (!(await isSamePassword(credentials.password, user.password))) {
          client.close();
          throw new Error("비밀번호가 틀렸습니다.");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
