## 138. Module Introduction

### Module Content

- What are API Routes?
- Adding & Using API Routes
- Working with Requests & Responses

## 139. What are "API Routes"?

- 모든 페이지가 단순 데이터를 보여주는 역할만 하는 것은 아니다.
- 사용자 피드백을 작성할 수 있는 페이지, 작성 이후의 팝업 띄우기, 뉴스레터 구독 등..
- 즉, 모든 요청이 HTML을 응답받는 것이 목적이 아니라 데이터 관련 store 및 획득 작업일 수 있다.
- 결론적으로 이번 챕터에서 이야기 하고 싶은건.. Ajax 와 Next.js에서의 지원인것 같다.

## 140. Writing Our First API Route

- 특수 폴더 api 사용한다.
- api 폴더 내의 파일은 page 디렉토리에 있더라도 React Component를 만드는 역할을 하지 않는다.
- api 폴더 내에 있는 코드는 서버사이드에서만 동작하므로, 클라이언트에게 노출되지 않는다.
- express를 사용하는 것 처럼 느끼도록 Next.js 팀에서 만들었으니, 관련 코드 사용하면 된다.

## 145. Using API Routes For Pre-Rendering Pages

### 이해가 안됐던 부분 + 약간의 궁금증 해소

내가 이해했던 API 라우팅은 아래와 같다.

- 별도 api 디렉토리를 만들고, 그 안의 파일에서 또 다른 API 서버로 데이터 fetch를 하거나 submission 작업 등을 할 수 있다.
- 클라이언트 사이드에서는 `/api/feedback`등의 경로를 이용해 fetch 로직을 수행할 수 있다.
- 그래서, api와 관련된 로직을 모두 api 디렉토리에 넣고 클라이언트에서 사용하든, 서버사이드에서 사용하든 그냥 사용하면 되는 건줄 알았다.

하지만 이해가 안되는 부분이 생기기 시작했다.

- 계속해서 강의를 듣다보니 getStaticProps나 getServerSideProps 에서는 api 디렉토리에 fetch 요청을 하지 말라고 한다.
- 그렇게 되면, 필요없는 fetch 요청을 2번 하게 되니.. 직접 파일에 접근을 하던지 서버의 url에 직접 fetch 요청을 하라는 것이었다.
- 그러면... API Routes가 굳이 왜 필요한건가 싶었다. api 디렉토리에 api 관련 코드를 분리시켜 놓았으면서 서버사이드에서는 관련 모듈을 사용하지 못한다니?
- 그럴거면 클라이언트 사이드에서도 직접 서버의 url에 접근하는 방식으로 해도 되지 않나??

아래부터는 약간의 궁금증 해소 내용이다.

- 클라이언트 사이드에서 fetch에 url을 직접 입력하면 서버의 주소가 노출된다. 반면, 서버사이드에서는 fetch에 url을 입력하더라도 사용자에게 노출되지 않는다. 따라서, api 라우팅을 할 필요가 없다.
- SSR/SSG 등의 fetch 요청은 데이터를 긁어오고 렌더링을 하는데만 사용된다. 즉, POST / PUT 등의 요청을 처리한다기보다는 GET을 통해 데이터를 얻어오는 용도로 사용한다. 하지만, 클라이언트쪽에서 fetch 요청은 GET 이외에도 POST / PUT 등의 작업을 처리할 수 있다. 이를 관리하는게 API ROUTES 라고 보면 될 것 같다.
