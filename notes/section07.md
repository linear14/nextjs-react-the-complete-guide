## 125. Module Summary

### Module Content

- Adding Meta and <head> Tags
- Re-using Components, Logic & Configuration
- Optimizing Images

## 127 ~ 131. "Head" Component

### 포함 강의

127. Configuring the "head" Content
128. Adding Dynamic "head" Content
129. Reusing Logic Inside A Component
130. Merging "head" Content

```jsx
import Head from "next/head";
```

- jsx 컴포넌트 어디에나 사용할 수 있다.
- Next.js는 Head 컴포넌트를 확인 후 head영역에 추가한다.

### Head 태그 Merge 특징

- 페이지 렌더링을 하면서 거치는 모든 Head 컴포넌트를 확인하고 내부 정보를 합친다. (\_app.js의 Head컴포넌트 역시 확인한다.)
- 만약 같은 성질을 가진 (title 혹은 meta의 name 속성) 태그를 발견하면, 흐름상 가장 마지막으로 작성된 속성의 값을 택한다.
- key 속성을 name 속성의 값과 같은 값을 넣어 우선적으로 적용되도록 설정할 수 있다.

## 130. Working with the "\_app.js" File (and Why)

- 페이지가 호출되기 이전에 실행되는 스크립트
- 아래와 같이 페이지 전체에 필요한 정보 넣어두면 좋음

```jsx
<meta name="viewport" content="initial-scale=1.0, width=device-width" />
```

- 또한, 모든 페이지에 사용할 Head 정보들을 한 번의 코드 작성으로 관리할 수 있으니 편하다.

## 132. The "\_document.js" File (And What It Does)

- `_app.js`가 body 영역의 사전 설정에 집중한다면 (물론, Head 컴포넌트를 사용해서 head영역을 컨트롤하지만, 해당 컴포넌트는 Body 내부에서 사용하도록 만들어져 있으니깐 무시해도 된다.) `_document.js`는 HTML 문서 전체의 스타일을 관리한다.

```jsx
// 기본 Structure
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

- 한 예시로, Html lang 속성을 넣어줄 수 있다. (lang='en')
- React Portal을 활용한 작업을 하기 위한 `<div id="overlays"></div>`를 `<body>` 내부에 넣어주는 것도 좋은 활용 방법인 것 같다. (컴포넌트 트리를 벗어난 작업을 할 때 사용)

## 133. A Closer Look At Our Images

### Empty the cache and hard reload

- 신기한 기능이네.. Network 탭 열고, 좌측 상단의 nav 아이콘 중 새로고침 아이콘을 오른쪽 마우스 클릭하면 여러가지 새로고침 옵션들이 존재한다.
- 여기서 `Empty the cache and hard reload` 누르면 페이지 생성에 필요한 모든 데이터를 다시 불러온다.

### 이미지 관련 이슈

- 페이지를 위해 다운로드 받는 이미지의 크기는 MB단위로 매우 클 수 있다.
- 해당 브라우저가 다른 이미지 타입 (더 효율적인)을 지원한다고 한들, public 경로에 있던 이미지 파일 타입을 그대로 가져온다. (Chrome은 이미지 최적화된 webp 타입을 지원한다.)
- production 단계에서는 큰 이미지 파일을 사용하는것이 문제가 될 수 있다.
- Next.js는 이미지 최적화를 간단한 방법으로 지원한다.

## 134. Optimizing Images with the "Next Image" Component & Feature

```jsx
import Image from "next/image";
```

- 운영체제 및 디바이스 크기에 따라 최적화된 여러 버전의 이미지를 생성한다.
- 생성된 이미지는 캐싱되고, 이후 비슷한 환경에서의 요청이 들어왔을 때 캐싱된 이미지를 사용한다.
- 필요하지 않은 이미지(화면에 보이지 않는 이미지)는 다운로드하지 않는다. (lazy-loading)

### width / height

- width와 height props를 추가 사용해야한다.
- 작은 스크린에서 전체 너비를 사용할 것인가 / 넓은 스크린에서 일부의 너비만 사용할 것인가의 2가지 사용처를 생각해야한다.
- 스크린에 보여질 이미지의 width와 height를 stylesheet의 여러 값들의 계산을 통해 적절히 부여한다. (시행 착오가 필요하다.)

### 사용 결과

- 133강에서의 이슈와 연관해서 결과를 비교한다.
- MB 단위의 이미지가 KB 단위까지 줄어들었다. (예로, 2MB 이미지가 19.2KB까지 줄어들었음)
- Chrome에서 webp 파일 형식을 사용한다.
- Quality가 눈에 띄지 않을 만큼 낮아지기는 한다고 한다. (근데 이슈를 보니깐 눈에 띄게 안좋아 지는 것 같기도.. ㅎㅎ 그냥 html 기본 img 태그 쓰는 것도 고려해야겠다.)

## 더 공부하면 좋을 것

- React Portals (모달같은거 만들 때 좋을 듯)
