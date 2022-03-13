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

## 깨우친 것들?

## 더 공부하면 좋을 것들
