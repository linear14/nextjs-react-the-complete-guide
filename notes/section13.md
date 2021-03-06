### next-auth

인증 및 세션 관리를 위해 `next-auth` 3rd party library를 사용한다.

### 회원가입 구현

- 해당 강의에서는 mongodb를 이용해 구현했다.
- 이메일 중복 로직을 체크하고, 전송받은 비밀번호를 `bcrypt`의 `hash()`를 통해 암호화하여 서버에 저장했다.

### 로그인 구현 (서버)

- API Routes + next-auth를 사용했다.
- `/pages/api/auth/[...nextauth].js`를 만들어 여러가지 설정을 한다. [공식문서](https://next-auth.js.org/configuration/options)에서 설정 가능한 옵션을 확인하자. (여기서 쿠키 만료기한 설정할 수 있을 것 같은데, 확인해봅시다!)
- 제공할 Provider를 import했고, providers 옵션에 배열의 원소값으로 설정했다.
- 여기서는 CredentialsProvider를 사용했는데, 인증과 관련된 authorize 메서드를 오버라이딩해서 인증 절차를 작성해주면 된다.
- 간단하게 회원 존재 여부, 비밀번호 일치 여부를 확인했다.
- 에러는 `throw new Error(message)`를 사용했다. 클라이언트단에서 로그인 시도시 에러가 발생한다면 해당 에러 메시지가 넘어간다.
- authorize의 반환값은 jwt 토큰값으로 저장할 객체다. 비밀번호는 토큰에 넣지 않았고, 이메일 정보만 넣어서 전달했다.

### 로그인 구현 (클라이언트)

- `next-auth/react` 패키지에 존재하는 `signIn` 메서드를 named export 형태로 가져왔다. 세부적인 인증 절차를 추상화했기 때문에 그냥 사용만 하면 된다.
- 코드를 보여주는게 좋을 것 같아서 가져왔다.

```jsx
const result = await signIn("credentials", {
  redirect: false,
  email,
  password,
});

if (!result.error) {
  router.replace("/profile");
} else {
  alert(result.error);
}
```

- 코드를 간단하게 설명하면, signIn 메서드를 이용해 로그인 시도를 한다. email과 password를 넘겨주는데, 서버의 authorize 메서드의 파라미터로 넘어간다.
- 여기서 제공하는 에러는 String의 형태이다. 서버에서 throw new Error의 인자로 넘겼던 String이 들어간다. 여기서는 alert 처리만 했지만, 보다 디테일하게 구현할 필요는 있다.
- 로그인이 성공한다면 jwt token이 쿠키 형태로 들어가는 것을 Applicaiton 탭에서 확인할 수 있다. 내 브라우저에서는 `next-auth.session-token`형태로 들어갔는데, 이건 브라우저마다 다른건지는 모르겠다.
- 나는 로그인 이후에 profile 페이지로 넘어가도록 설정은 해놨다.

### 로그아웃 구현

- 가지고 있는 jwt 토큰만 없애주면 된다. 이는 `next-auth/react`의 `signOut` 메서드를 사용하면 알아서 처리해준다.

### useSession

- 현재 세션이 유지되고 있는지를 확인하고 (여기서는 jwt 토큰이 존재하는 경우) 해당 세션에 포함된 정보를 가져온다.
- 이를 통해, 화면에 렌더링 되는 컴포넌트를 분기처리 하거나 / 특정 기능이 안되도록 만드는 등의 작업이 가능해진다.
- 오로지 클라이언트 영역에서만 사용 가능하다. (getSession은 클라이언트 및 서버까지 사용 가능)
- NextAuth V4 에서 사용하는 방식은 강의에서와 다르다.
- 아래 코드는 [공식문서](https://next-auth.js.org/getting-started/client#usesession)에서 가져온건데, 설명이 잘 되어있어서 참조한다.

```jsx
import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>;
  }

  return <a href="/api/auth/signin">Sign in</a>;
}
```

- `data`: This can be three values: Session / undefined / null.
  - when the session hasn't been fetched yet, data will undefined
  - in case it failed to retrieve the session, data will be null
  - in case of success, data will be Session.
- `status`: enum mapping to three possible session states: "loading" | "authenticated" | "unauthenticated"

### getSession

- session 정보를 얻는것은 useSession과 동일
- await를 이용해서 반환값을 기다려야 한다. (혹은 Promise then을 사용해도 좋다.)
- 클라이언트 사이드 / 서버 사이드에서 모두 사용 가능하다.
- 따라서, 정적 페이지이기를 원하는 페이지에서는 클라이언트 사이드 (useSession 사용해도 좋다.)
- SSR 페이지이기를 원하는 페이지에서는 서버 사이드 목적으로 사용하면 된다.
- 보통 서버사이드에서 접근 권한 없는 페이지에 접근 시 redirect 목적으로 많이 사용하는 것 같다.
