## 71. Adding Dummy Data & Static Files

### public 디렉토리

- Next.js에서의 특수한 디렉토리다.
- 정적 파일들을 이곳에 넣어둔다. (이미지, 폰트)
- 해당 디렉토리 영역 이외에 저장된 파일들에 접근이 불가능하다.

## 77. Adding a General Layout Wrapper Component

### \_app.js

- pages 디렉토리에 있는 모든 페이지로 라우팅 될 때 실행된다.
- 따라서 Nav Header 등과 같이 공통 컴포넌트를 잡아둘 때 유용하다.
- components/layout 과 같은 디렉토리에 \_app.js에 사용 될 프로젝트의 전체적인 layout을 담아두면 좋다.

## 깨우친 것들?

### 데이터 가공

- 서버에서 넘어온 데이터가 여러 depth를 거쳐 최종 Component에 도착했을 때, 해당 컴포넌트에서 화면에 보여줄 데이터를 가공하는 방식을 택했다. (73강)
- 데이터 stream의 시작 부분에서 데이터를 가공해서 넘겨주면, 거쳐가는 컴포넌트 중에서도 언제 해당 데이터가 필요할지 모른다. 따라서, 강의에서 제공해주는 플로우를 사용하는 것이 적합하다고 생각한다.

### svg 컴포넌트화

- 컴포넌트 디렉토리에 사용할 svg 이미지를 컴포넌트화 시키는 것도 괜찮은 방법 같다. (75강)

## 더 공부하면 좋을 것들

- `<time>` `<address>` 태그 등
- `toLocaleDateString` 등의 현지화 함수 + 옵션
- form (+ htmlFor이 뭐지?)
