## 51. Module Introduction
### Module Content
- Understanding `File-Based Routing`
- `Static & Dynamic Routes`
- `Navigating` Between Pages

## 53. What Is "File-based Routing"? And Why Is It Helpful?
### File Based Routing?
- CRA 리액트 프로젝트에서는 React Router DOM 라이브러리를 이용해 라우팅을 관리
- Next.js 에서는 `pages`라는 특별한 디렉토리 내부의 파일/폴더의 명칭을 확인하는 방식으로 라우팅을 관리
- dynamic route, nested route 모두 지원 (square bracket 사용)

### 장점
- react-router-dom 라이브러리를 install하지 않아도 됨
- routing을 위한 별도의 boilerplate 코드를 작성할 필요가 없음
- 직관적

## 54 ~ 56. Static Routes + Nested Routes
### 포함 강의
54. Adding A First Page
55. Adding a Named / Static Route File
56. Working with Nested Paths & Routes

### 예시
- 간단한 예시로 라우팅을 설명한다.
```
pages/index.js        // mydomain.com/
pages/about.js        // mydomain.com/about
pages/about/index.js  // mydomain.com/about
pages/about/list.js   // mydomain.com/about/list
```

## 57 ~ 59. Dynamic Routes + Nested Routes 
### 포함 강의
57. Adding Dynamic Paths & Routes
58. Extracting Dynamic Path Segment Data (Dynamic Routes)
59. Building Nested Dynamic Routes & Paths

### Dynamic Route
- 여러 게시글 중 특정 게시글을 보고 싶을 때, 우리는 그 게시글의 상세 페이지로 접근한다.
- 게시글의 상세 페이지의 디자인은 모두 같고, 게시글이 가지고 있는 데이터를 기반으로 화면에 출력되는 정보만 다르게 된다.
- 각 게시글은 자신을 구분하는 고유 식별자가 존재한다. 해당 식별자의 값을 통해 동일 레이아웃에서 고유의 데이터를 바인딩 시키게 된다.
- Next.js에서는 `[식별자]`형식의 폴더/파일을 `pages` 디렉토리의 하위 요소로 생성하여 라우팅을 진행한다.
- 예시로, `pages/portfolio/[projectId].js`는 mydomain.com/portfolio/something 에 해당하는 파일이며, 이 때, something은 projectId key에 대한 값으로 매핑된다.

### useRouter
- `next/router` 패키지에서 `useRouter` hook을 import 해서 사용할 수 있다.
- useRouter()가 반환하는 객체에는 path 및 query 등의 라우팅 관련 프로퍼티와 메서드가 들어있다.
- `path`프로퍼티를 통해 현재 path(/portfolio/[projectId])의 정보를 얻을 수 있다.
- `query`프로퍼티를 통해 현재 url의 파라미터 및 쿼리 정보를 얻을 수 있다. `pages/portfolio/[id]`로 설정되어 있는 라우팅 설정값에 `mydomain.com/portfolio/4`를 통해 접근한다면, query 에는 `{ id: '4' }` 형식의 객체가 담겨있게 된다.
- 여기서 얻은 정보를 이용해 server와 통신하는 등 활용이 가능하다.

### Nested Dynamic Routes
- Static Route 방식과 동일하게 square bracket을 이용한 Dynamic Route 역시 Nested Route 사용이 가능하다.
- useRouter를 통해 얻어낸 query 객체에는 최종 path까지의 모든 dynamic parameter가 key-value 형태로 보관된다.
  예를 들어, `pages/clients/[clientId]/[projectId]` 파일 형태로 설정되어 있는 라우팅 베이스에 `mydomain.com/clients/harry/3`이 매칭됐다면 `{ clientId: 'harry', projectId: '3' }` 객체를 얻어낼 수 있다.

## 60. Adding Catch-All Routes
### Catch-All Routes?
- 파라미터의 수에 제한을 두지 않는 경우의 라우팅을 허용하기 위해 사용한다.
- `[...keyword]` 형식의 파일을 만들어 사용한다.
- useRouter 반환 객체의 query 프로퍼티를 찍어보면 `{ keyword: Array(n) }` 의 형태로 parameter 들이 보관된다.

### 언제 사용할까?
- 만약 등록된 전체 포스트 중, 특정 연도에 발행된 게시글만 보고 싶다면 `post/2020` 의 형태로 필터링 할 수 있다. 그런데, 특정 연도뿐 아니라 특정 월까지 필터 항목에 넣고 싶다면 어떻게 할까? `post/2020/7`의 형태로 라우팅을 할 수 있다.
- 이렇듯, 동적으로 path의 depth를 조절하면서 원하는 작업을 할 수 있다.
- nomad coder 강의를 들을 때, SEO를 위해서도 사용할 수 있다고 들었던 것 같다. 예를 들어, 게시글의 고유 idx가 n이라는 숫자일 경우 `post/n`을 통해 게시글 상세 화면으로 넘어갈 수 있다. 하지만, `post/(게시글제목)/n` 의 형태로 라우팅을 한다면 n의 값도 챙길 수 있고 url에 게시글 제목이 있으므로 SEO에도 좋다는 것이다. (그렇게 학습했던 것 같은데, 다시 한 번 알아보고 수정하겠다.)

## 61 ~ 64. Navigation
### 포함 강의
61. Navigating with the "Link" Component
62. Navigating To Dynamic Routes
63. A Different Way Of Setting Link Hrefs
64. Navigating Programmatically

### 라우팅 방법 1. Link Component (href value: string)
```jsx
import Link from 'next/link'; // export default

<Link href=`/project/${project.id}`>{project.name}</Link>
```
### 왜 Link를 사용하는가?
- a tag를 통해 라우팅시 HTML 재호출
- a tag를 통해 라우팅시 보관하고 있던 상태 초기화
- 기타 여러가지 Link만의 이점이 있다고 한다. (Link에 해당하는 부분 hover시 사용될 데이터를 미리 fetch 한다던지)

### replace props
- 현재 페이지를 대체한다. (현재 페이지는 뒤로가기를 통해 다시 못돌아온다.)
- props에 대해서는 추후에 다시 학습한다.

### 라우팅 방법 2. Link Component (href value: object)
- 실제 파일 구조대로 pathname을 지정할 수 있고, query 값도 key-value 형태로 직접 넣어줄 수 있다.
```jsx
import Link from 'next/link'; // export default

<Link href={{
  pathname: '/project/[id]',
  query: { id: project.id }
}}>{project.name}</Link>
```

### 언제 사용하는가?
- href props가 길어질 때 사용할 수 있다.

### 라우팅 방법 3. Navigating Programmatically
- useRouter 반환 객체의 push 등의 메서드를 이용해서 (replace 등도 존재) 직접 라우팅한다.
```jsx
function pushHandler(id) {
  router.push({
    pathname: '/clients/[id]',
    query: { id }
  });
}
```

### 언제 사용할까?
- 대체로 Link 컴포넌트를 필요로 하지 않을 때 사용한다.
- 예를들어, form 제출 후 직접 라우팅이 필요할 때
- Nomad Coder에서는 여러 element를 자식으로 가지는 Link 태그에 href를 붙일 때 사용할 수 있다고도 한다. (a 태그는 자식으로 div를 가져서는 안된다는 스펙 요구사항이 있기 때문에)

## 65. Adding a Custom 404 Page
- `pages` 디렉토리에 `404.js` 파일 하나 만들고 내부에서 커스텀 해주면 됩니다.