## 86. The Problem With Traditional React Apps (and Data Fetching)

### 문제점

- 데이터가 fetching 될 때 까지 사용자는 대기해야한다. (근데 이건 SSR도 데이터 로딩 상태를 보여주는 방식, 혹은 데이터 fetching 끝나고 html 마크업을 response로 넘기는 방식 모두를 고려해봤을 때 마찬가지 아닌가..ㅠㅠ 아직 잘 와닿지는 않는다.)
- Search Engine이 데이터를 찾지 못한다.

### fetch with json

- 클라이언트 사이드에서 서버 응답 테스트 할 때 json 파일을 하나 만들어두고, fetch로 가져오는 방식이 가능하다. 처음 알았는데 엄청 유용할 듯 하다.

## 87. How NextJS Prepares & Pre-renders Pages

- pre-redered html만 넘겨주는게 아니라, 사용자 반응을 처리할 수 있는 React/JS Code 또한 넘겨준다. (Hydrate with React code once loaded)

- pre-rendered page가 전송되므로, JS 코드가 입혀지기 전에도 (비록 그 시간이 짧더라도) 사용자는 화면을 볼 수 있고, Search Engine도 데이터 수집을 할 수 있다. (다시 한 번 말하지만, JS 코드가 입혀지기 전에도 가능한 일이 된다. 즉, Interactive 하지 않더라도 이러한 일이 행해진다는 말!)

- pre-rendering은 처음 페이지에 접속했을 경우에만 적용된다. 페이지에 접근하고 나면 SPA처럼 행동하게 된다. (..? 다른 페이지로 이동하는 것도 pre-rendering이 안된다고..? 무슨말이지... 확실하게 알게 된 다음에 다시 정리하기) [3분 18초 ~ 4분 22초]

- pre-rendering에는 2가지 방법이 존재한다.
  - Static Generation (강의자 추천): 모든 페이지가 빌드 시 미리 pre-generated 된다.
  - Server-side Rendering: 서버에 request가 넘어올 때 페이지가 만들어진다.

## 88. Introducing Static Generation with "getStaticProps"

### Static Generation

- Html 파일이 빌드 시 미리 서버사이드에서 만들어진다.
- 데이터도 Server에서, 코드 접근 및 파일 시스템 접근 역시 서버사이드에 처리된다.
- 배포를 위해 만들어진 페이지를 서버 혹은 CDN 등의 서비스 제공 수단에 캐싱하고, 서버에 요청이 온다면 캐싱된 페이지를 클라이언트에게 바로 넘겨준다.
- 페이지를 받은 클라이언트는 js 코드를 이용해 hydrate 시킨다. (최종적으로는 React 앱이 된다.)

### getStaticProps()

- 어떤 페이지가 pre-generated 되어야하는지, 어떤 데이터가 해당 페이지를 만드는데 사용되는지를 결정하는 특수 메서드.

```jsx
export async function getStaticProps(context) { ... }
```

- page component에서만 사용해야한다. (React Component는 안된다.)
- async니깐 당연히 Promise를 리턴하겠지?
- 서버에서 사용 가능한 코드만 작성한다. (window 객체같은건 이용 못한다.)
- 여기서 사용되는 코드는 클라이언트에게 보여지지 않는다. (코드 bundle에 포함되지 않는다.) 따라서, 데이터베이스 인증 등에 관한 민감한 정보들을 해당 메서드 내에서 작성해도 된다.

## 90. Adding "getStaticProps" To Pages

- `getStaticProps`를 사용한다는 것은 해당 페이지가 pre-generated 될 것이라는 것을 Next.js에게 명시적으로 알려주는 역할도 한다.
- 페이지가 만들어지기 전에 데이터를 미리 fetch한다. 이후에 Next.js에 의해 페이지가 pre-render된다.

### 어떻게 사용하는데?

```jsx
function SomePage(props) {
  const { keyA, keyB } = props;

  return (<Component/>);
}

import async function getStaticProps() {
  // fetch or some tasks...

  return {
    props: {
      keyA: something,
      keyB: something
    }
  }
}
```

- 해당 메서드가 존재한다면, 먼저 `getStaticProps`를 실행시켜 페이지를 위한 props를 준비한다.
- 이후에 페이지 렌더링 함수를 실행한다. 서버에서 준비한 props를 사용해 렌더링 작업을 처리한다.

## 91. Running Server-side Code & Using the Filesystem

- `fs` 모듈을 사용할 수 있다! 서버사이드 코드에서는 사용해도 괜찮으니깐 당연했던 것이다. 그리고, Next.js는 클라이언트단에 해당 fs 모듈에 대한 import를 넘기지 않고 무시한다. (똑똑하다.. ㅎㅎ)
- 마찬가지로 `process` 전역 객체도 사용할 수 있다. (Node 런타임 환경에서 돌아가는 코드이기 때문)

## 92. A Look Behind The Scenes

### 페이지 준비 관련 용어

`Server`: 서버사이드 렌더링 => 나중에 다시 설명한다. (getInitialProps, getServerSideProps)
`SSG`: Static Site Generation (getStaticProps)
`Static`: 정보 필요없는 정적 페이지 (no initial props)
`ISR`: Incremental Static Regeneration (getStaticProps) => 요것도 나중에 다시 설명한다. 간단하게 말하면, 데이터(props)가 계속 바뀔 수 있는 경우에서의 정적 페이지 생성 방식이다.

### 직접 빌드 해보자

- 어떤 페이지가 pre-generated 되었는지 알 수 있다. 또한, 각 페이지가 어떤 특성을 가진 페이지인지 알 수 있다.

## 93 ~ 95. Incremental Static Generation (ISR) + More Options

### 포함 강의

93. Utilizing Incremental Static Generation (ISR)
94. ISR: A Look Behind The Scenes
95. A Closer Look At "getStaticProps" & Configuration Options

### ISR

- 페이지의 데이터가 빈번하게 바뀌는 상황이라면? getStaticProps를 통해 정적 페이지를 미리 만들어두는게 무슨 의미가 있는가? 데이터가 바뀔 때 마다 빌드할 수도 없고..
- 그럴 때 사용하는 방법이 `Incremental Static Generation`이다.
- re-deploy 할 필요없이 새로운 정적 페이지를 만드는 방식이다.
- 특정 시간(X초) 이내의 요청에 대해서는 기존의 페이지를, 특정 시간 이후의 요청에 대해서는 새로운 정적 페이지를 만들기 위해 `getStaticProps`를 다시 실행하여 새로운 페이지를 만들어 캐싱하고 전달한다. => 즉 2가지 경우로 나누어 클라이언트에게 전달한다.

### revalidate

- `revalidate` key를 사용한다.
- value는 초 단위의 시간.

```jsx
export async function getStaticProps() {
  return {
    props: { ... },
    revalidate: 10 // 초 단위
  }
}
```

- 빈번하게 데이터가 바뀌는 페이지의 경우 1초 정도로 짧게 설정할 수 있고, 페이지의 데이터 변화가 많이 없을 경우에는 10분(600초) 정도로 설정할 수 있다.
- development 모드에서는 revalidate 적용 안된다. 즉, 페이지 새로고침 할 때 마다 항상 최신의 페이지를 유지해 보여준다. (배포 서버에서만 적용됨! 화면 개발하는데 저 옵션때문에 reloading이 안되면 안되니깐..)

### 추가 옵션) notFound

- getStaticProps의 반환 값 key로 `notFound`를 설정할 수 있다.
- 값은 T/F
- 서버에서 응답받은 데이터에 오류가 있다거나, path에 오류가 있다면 `notFound: true`를 설정해서 404 페이지로 보내버릴 수 있다.
- 검증 단계에서 사용하면 된다.

### 추가 옵션) redirect

- notFound와 마찬가지로 특정 상황에서 다른 페이지로 보낼 수 있다.
- 내부에 `destination` key를 사용해서 특정 주소로 라우팅 할 수 있다.

```jsx
return {
  redirect: {
    destination: "/no-data",
  },
};
```

## 96 ~ 99. Pre-generate with Dynamic Pages and getStaticPaths Function

### 포함 강의

96. Working With Dynamic Parameters
97. Introducing "getStaticPaths" For Dynamic Pages
98. Using "getStaticPaths"
99. "getStaticPaths" & Link Prefetching: Behind The Scenes

### 우선 Parameter를 받아온다.

- 클라이언트 사이드 코드 영역에서 파라미터를 받아오기 위해 사용했던 방식

```jsx
const router = useRouter();
const { query } = router;
// query.param1
// query.param2
// ...
```

- 서버 사이드 (여기서는 getStaticProps) 코드 영역에서 파라미터를 받아오기 위해 사용하는 방식

```jsx
const { params } = context;
// params.param1
// params.param2
// ...
```

- Static Generation (SSG) 을 위해서라면 서버사이드에서 parameter를 챙겨와서 data fetch과정을 거치는게 맞다.

### getStaticPaths

- dynamic page 렌더링을 위해 getStaticProps에서 parameter를 그냥 가져와서 사용하면 오류가 발생한다.
- Next.js의 getStaticProps 메서드에 포함되는 페이지는 디폴트로 pre-generated를 하기 때문에 빌드 시 파일로 존재한다.
- 하지만, dynamic 페이지의 경우 pre-generated가 불가능한데, parameter에 따라 fetch 되는 결과 데이터가 달라지므로 parameter의 후보를 알지 않는 이상 미리 만들어두는게 불가능하다.
- 따라서, 그러한 parameter의 후보들을 미리 설정해두는 작업이 필요한데, 그것이 getStaticPaths의 역할이다.
- (후보들이 미리 설정된다면 페이지도 pre-generate 가능하기 때문이다.)

### getStaticPaths 사용법

```jsx
export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
  };
}
```

### 빌드해보자

- 최초 홈페이지 진입시 모든 데이터들이 이미 다운로드 되어져있다.
- 그래서 다른 페이지로 이동하더라도 서버에 요청을 하는게 아니라, 이미 다운로드 되어진 것들을 바탕으로 SPA처럼 행동하게 된다.

## 100. Working With Fallback Pages

### getStaticProps의 문제

- 어떤 파라미터가 들어올지 모르는데, 이걸 일일이 path에 등록하고 pre-generate 할 수 없다.
- 자주 사용하는 페이지야 미리 만들어둬도 괜찮은데, 그런 페이지가 아니라면 굳이 미리 만들어 둘 필요가 없다.

### fallback option

- 이 값을 true로 설정하면, Next.js에게 paths로 등록되지 않은 경로일지라도 유효한 값임을 인지시켜준다.
- 즉, paths로 등록되지 않은 경로에 대해서는 빌드시 pre-generated 되지 않고, 서버에 요청이 가는 경우에만 페이지가 만들어지도록 허용한다.
- 단, 클라이언트 Component 단에서 fallback 처리(Loading 방식 처리)가 필요하다. 왜냐하면 path로 등록되지 않은 url로 직접 라우팅(새로고침 등)을 할 경우 fallback: true에 의해 `props가 없는 페이지를 즉시 클라이언트에게 넘겨주기 때문`이다. (서버에 generated 된 페이지가 없는 경우, props를 콘솔 찍어보면 undefined 뜰것이다.)
- fallback true를 통해 만들어진 페이지 역시 처음에만 로딩이 길어질 뿐이고, 이후에는 서버에 파일로 저장되기 때문에 이후 접속 사용자는 해당 캐싱 파일을 사용하게 된다.
- T/F 이외에도 'blocking' 값을 value로 둘 수 있다. 이렇게 하면 클라이언트 단에서 특별한 fallback 처리 할 필요 없이, 서버에서 페이지 pre-generate 단계를 마친 뒤 클라이언트에게 HTML 파일을 넘긴다. (사용자가 화면을 보는데 걸리는 시간이 조금 더 걸리겠지? 강의자는 많이 쓰는 방식이지만, 프로그램의 지향점에 따라 결정하면 된다.)

## 102. Fallback Pages & "Not Found" Pages

### usecase

- `getStaticPaths`에서 `fallback: true`로 설정시, 등록하지 않은 파라미터의 검색을 `getStaticProps`에서 실행하게 된다. 여기에서 만약 데이터가 없다면 클라이언트 단에서 에러를 뿜게 된다.
- 클라이언트 단에서 예외 페이지 처리를 해도 되지만, `getStaticProps` 단에서 `notFound: true` 설정을 통해 검증하는 방식이다. (개인적으로 선호할 방식이 될 것 같다.)
- 개인적으로 생각해봤는데, loading이 보인 다음에 404페이지로 이동하면 어색할 것 같아서 `fallback: 'blocking'`을 사용하는 것도 괜찮아보인다.

## 103. Introducing "getServerSideProps" for Server-side Rendering (SSR)

- 앞서 배웠던 SSG 같은 경우는 일반적으로는 최초 빌드시에만 getStaticProps 등에 접근하게 된다. (ISR 같은 경우는 아니긴 하지만..!)
- 만약 모든 Request에 대해 진정한 서버사이드 렌더링이 필요하다면?
- 혹은, 서버에 요청되는 객체가 실제로 필요하다면? (예를 들어 쿠키 정보같은거?!)
- Next.js에서는 매 요청마다 `real server-side` 에서 코드가 돌아갈 수 있도록 지원하는 방식이 있다. (re-executed for every request) => `getServerSideProps()`
- 페이지가 만들어 질 때 마다 (요청이 있을 때 마다) 실행된다. (not pre-render)
- getStaticProps랑 같이 쓰면 충돌날 수 있다. (왜냐하면 결과적인 목적은 결국 Page를 렌더링 하는데 필요한 데이터(props)를 넘겨주는 역할을 하기 때문이다.)

## 104 ~ 107. "getServerSideProps" & Dynamic Pages

### 포함 강의

104. Using "getServerSideProps" for Server-side Rendering
105. "getServerSideProps" and its Context
106. Dynamic Pages & "getServerSideProps"
107. "getServerSideProps": Behind The Scenes

### getServerSideProps 조금 더 이야기해보면

- 기본적으로 getStaticProps에서 반환하던 객체의 구성 key-value를 모두 사용해도 된다. (props, notFound, redirect ...)
- 하지만, revalidate는 사용할 이유가 없는데, 왜냐하면 모든 request마다 실행되는 함수이기 때문이다.
- 이걸 왜 사용할까 생각해봤는데, 현재 어떤 사용자의 정보를 보여줘야 한다고 했을 경우, cookie에 들어있는 인증 토큰등의 정보를 서버에 넘겨줘야 해당 사용자의 정보를 받아올 수 있기 때문이다. 이런 것들은 getStaticProps와 getStaticPaths등으로 미리 설정하기가 까다롭기도 하고 사용자 정보가 pre-fetched 되어있는 것도 보안적으로도 합당하지 않다고 생각한다. (그리고 강의에서는 시도때도 없이 빈번하게 페이지 데이터가 바뀌는 경우에도 사용할 수 있다고 한다.)
- 다시 한 번 말하지만, `매 요청마다 실행`된다!

### context

- request header 의 값들을 이용할 수 있으며, 반대로 response로 어떤 헤더값을 추가하는 설정도 가능하다.

```jsx
const { req, res } = context;
```

- 여기서 사용되는 req, res 객체는 Node.js에서 사용되는 객체와 같다.

### Dynamic Pages

- getStaticPaths가 필요없다.. 왜냐하면, getServerSideProps는 100% 서버에서 실행됨이 보장되기 때문이며, pre-generated 되지도 않기 때문이다.
- 그래서 `const { params } = context` 로 segments들을 꺼내온 뒤, dynamic key로 값을 꺼내서 사용하기만 하면 된다.

## 108. Introducing Client-Side Data Fetching (And When To Use It)

- pre-rendering 될 필요 없는 정보나 될 수 없는 정보들은 클라이언트에서 처리하는게 좋다.
  - 너무 빠르게 바뀌는 정보일 경우 (주식)
  - 특정한 사용자에 대한 개인 정보 (유저 프로필, 최근 주문 정보)
  - 매우 한정적이고 부분적인 공간에서만 사용되는 데이터

## 깨우친 것들?

- (109) 기본적으로 서버에 pre-generated된 페이지가 없다면, 라우팅 페이지 컴포넌트의 default가 pre-rendered 되어서 사용자에게 넘어간다. (그래서, getStaticPaths에서 fallback true 옵션을 켰을 때 pre-generated된 페이지가 없으니깐 처음에는 default 페이지에 대한 HTML 파일이 넘어간 것이고, 해당 강의에서도 빈 div가 아닌, No Data를 나타내는 div가 넘어온 것이다.)

## 더 공부하면 좋을 것들

## 궁금한 것

- (96 ~ 99) 루트 페이지로 진입 (/) 하면 pre-generated 된 fetched data까지 json 파일로 받아지는 것을 확인했는데, 다른 페이지로 접근하면 fetched data 파일을 다운로드 받지 않는것 역시 확인했다. 어떤 동작 방식으로 이러는건지 궁금하다.
- (96 ~ 99) 마찬가지로, 루트 페이지가 아닌 페이지로 최초 진입 시, (예를 들어 /p2 로 설명한다.) p2에 해당하는 pre-rendered page만 파일로 받고 데이터는 별도의 파일로 저장되지 않는 것을 확인했다. 또한, 해당 상태에서 홈으로 진입 시 SPA 처럼 동작하여 새로운 메인 페이지를 다운로드 받지 않는다. 전체 static 데이터만 다운로드 받아서 파일로 저장한다. (p1.json, p2.json, p3.json) 이 흐름까지 이해해봐야겠다.
