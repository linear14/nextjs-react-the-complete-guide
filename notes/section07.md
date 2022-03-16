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
