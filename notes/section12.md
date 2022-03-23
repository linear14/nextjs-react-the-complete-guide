### Standard Build / Full Static Build

- Standard Build
  - 일반적인 빌드 방식이다. next build 로 빌드한다.
  - Node JS를 지원하는 서버 환경이 필요하다. 서버 사이드 작업을 지원해야 하기 때문이다.
  - 여기서 말하는 서버 사이드 작업은 SSR / API Routes / Revalidation 등을 의미한다.
- Full Static Build
  - 서버사이드 작업을 지원하지 않는 경우 사용한다. next export로 빌드한다. (package.json에서 추가 설정)
  - 모든 페이지가 정적 파일로 이루어 질 경우 사용한다.
  - Node JS가 지원되는 서버일 필요가 없다.
  - 흔하게 사용하는건 아니다.

### Deployment Steps & Considerations

- 페이지 metadata 확인
- 코드 최적화 확인 (콘솔로그 제거, 불필요한 코드 삭제)
- 불필요한 의존성 삭제
- development / production 환경 변수 다른거 대응 (DB Credential, API Keys)
- 로컬에서 빌드 후 테스트
- 배포

### next.config.js

next와 관련된 설정 할 수 있는 파일. 대부분의 설정은 default로 둬도 무방하다. 공식문서 참고하면 좋다. (유용하게 사용할 수 있는거는.. Redirects / Custom Headers / Environment Variables / basePath 라고 하는 것 같다.)

### Environment Variable

development 환경과 production 환경 각각에서 참조해야 할 변수값이 다를 경우가 존재한다. 예를 들어, 개발환경과 배포환경에서의 Database는 달라야하며, Database에 접근하는 인증 정보 역시 다르다. 이를 환경 변수로 관리한다.

```jsx
/* 
  해당 강의가 Next.js v10 타겟이기 때문에 require문을 사용했는데, 
  현재는 import문 사용 가능한지 확인은 해봐야겠다.
*/

// PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER, PHASE_EXPORT
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        key: "value for development",
      },
    };
  }

  return {
    env: {
      key: "value for production",
    },
  };
};
```

환경 변수에는 보통 보안적으로 민감한 정보들이 들어가므로 private repository를 운용하거나 gitignore등을 이용해 처리를 해줘야한다.

### 팁

- npm run build 결과 파일의 크기도 터미널에서 알려주므로, 용량이 크다 싶으면 파일을 확인해서 줄이는 방법을 고민해보자. (사용하는 라이브러리의 문제가 있을 수 있으므로 경량화 버전이 존재하는지 체크하자)

- 간단하게 배포 테스트 할 때는 vercel을 이용하는 것도 괜찮아보인다. 왜냐면 서버에 크게 신경 안써도 되기 때문에 프론트에 집중 가능!! (도메인 제공, git repository 기반 자동 deploy 등..) Next.js에서 Mongo DB 같은거 이용해서 개발하면 굳이 AWS 안쓰고도 충분히 배포 가능하겠는데..?!
