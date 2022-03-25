import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const handleSession = useCallback(
    async function () {
      const session = await getSession();
      if (session) {
        alert("로그인 상태입니다. 메인 페이지로 이동합니다.");
        router.replace("/");
      } else {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    handleSession();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (session) {
//     return {
//       redirect: {
//         destination: "/profile",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

export default AuthPage;
