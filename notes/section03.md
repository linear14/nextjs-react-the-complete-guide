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
- `query`프로퍼티를 통해 현재 url의 파라미터 및 쿼리 정보를 얻을 수 있다. `pages/portfolio/[id]`로 설정되어 있는 라우팅 설정값에 `mydomain.com/portfolio/4`를 통해 접근한다면, query 에는 `{id: '4'}` 형식의 객체가 담겨있게 된다.
- 여기서 얻은 정보를 이용해 server와 통신하는 등 활용이 가능하다.

### Nested Dynamic Routes
- Static Route 방식과 동일하게 square bracket을 이용한 Dynamic Route 역시 Nested Route 사용이 가능하다.
- useRouter를 통해 얻어낸 query 객체에는 최종 path까지의 모든 dynamic parameter가 key-value 형태로 보관된다.
  예를 들어, `pages/clients/[clientId]/[projectId]` 파일 형태로 설정되어 있는 라우팅 베이스에 `mydomain.com/clients/harry/3`이 매칭됐다면 `{ clientId: 'harry', projectId: '3' }` 객체를 얻어낼 수 있다.
