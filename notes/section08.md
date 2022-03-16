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
