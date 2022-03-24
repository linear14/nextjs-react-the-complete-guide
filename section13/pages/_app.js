import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

// 이거 문법 좋은데 ㅎㅎ
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
