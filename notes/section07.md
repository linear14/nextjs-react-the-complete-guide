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
