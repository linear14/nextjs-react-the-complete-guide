# 학습 내용

- 해당 section 에서는 전역 상태로 모달 / 토스트 메시지를 관리하지만, 실제 구현시에는 useState()를 이용해 구현할 수 있다.

### Context API

- 사용하고 싶은 전역 상태를 Context라고 지칭. `createContext`를 이용해 초기 상태 설정 가능

```jsx
import { createContext } from "react";

const SomeContext = createContext({
  key1: value1,
  key2: value2,
});
```

- Context에 접근할 수 있도록 Provider로 Wrapping 해준다.

```jsx
<SomeContext.Provider value={context}>
  <Components />
</SomeContext.Provider>
```

- 해당 강의에서는 Context Provider를 위한 컴포넌트를 제작했다.
- 아래와 같이 설정해두면, setItem이 실행될 때 마다 해당 컴포넌트가 다시 호출되어 props.children에게 새로운 context 정보를 넘겨줄 수 있다.

```jsx
const SomeContext = createContext({
  item: null,
  setItem: function (item) {},
});

export function SomeContextProvider(props) {
  const [item, setItem] = useState();

  const context = {
    item: item,
    setItem: setItem,
  };

  return (
    <SomeContext.Provider value={context}>
      {props.children}
    </SomeContext.Provider>
  );
}
```

- 원하는 곳에서 `useContext`를 꺼내 사용하면 된다.

```jsx
function Component() {
  const someContext = useContext(SomeContext);

  const item = someContext.item;
  const setItem = someContext.setItem;
}
```
