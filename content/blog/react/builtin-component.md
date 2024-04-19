---
title: "Về Component được trang bị sẵn trong React"
description: "React tích hợp sẵn một số <Component /> mà bạn có thể dùng với JSX."
date: 2023-04-30T18:57:13+07:00
cover:
  image: "https://source.unsplash.com/Ry9WBo3qmoc"
  alt: "Canon, EOS 5D Mark IV"
  caption: "Photo by Jean-Philippe Delberghe on Unplash"
draft: false
categories:
  - Lập trình
tags:
  - javascript
  - reactjs
  - new-reactjs-docs
  - react.dev
  - react-suspense
  - react-strict-mode
summary: Code kỹ lắm rồi mà API cứ bị gọi 2 lần là sao?
---

{{< alert icon="circle-info" >}}
Phiên bản React trong bài này là 18.2.0.
{{< /alert >}}

## Fragment

### Cú pháp

[Fragment](https://react.dev/reference/react/Fragment) cho phép gom nhóm nhiều element mà không cần đến thêm một node cha.

```jsx
import { Fragment } from 'react';

<Fragment>
  <OneChild />
  <AnotherChild />
</Fragment>
```

`Fragment` có một cú pháp rút gọn, phổ biến hơn và không cần import đó là `<>...</>`:

```jsx
<>
  <OneChild />
  <AnotherChild />
</>
```

### Cách dùng

#### Trả về nhiều phần tử

`Fragment` hữu ích khi không tạo thêm DOM element để bao lấy một nhóm phần tử, nên không ảnh hưởng đến layout hay style.

```jsx
function Post() {
  return (
    <>
      <PostTitle />
      <PostBody />
    </>
  );
}
```

#### Gán nhiều phần tử vào chung một biến

Như với node thật, bạn có thể dùng `Fragment` để gán nhiều phần tử vào một biến.

```jsx
function CloseDialog() {
  const buttons = (
    <>
      <OKButton />
      <CancelButton />
    </>
  );
  return (
    <AlertDialog buttons={buttons}>
      Are you sure you want to leave this page?
    </AlertDialog>
  );
}
```

Tương tự, bạn có thể gom nhóm lẫn lộn cả text và phần tử:

```jsx
function DateRangePicker({ start, end }) {
  return (
    <>
      From
      <DatePicker date={start} />
      to
      <DatePicker date={end} />
    </>
  );
}
```

#### Render một danh sách `Fragment`

Trường hợp duy nhất cú pháp đầy đủ phát huy tác dụng là khi mỗi nhóm cần có `key` riêng như khi render một list:

```jsx
function Blog() {
  return posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
}
```

## Profiler

[Profiler](https://react.dev/reference/react/Profiler) được dùng để đo hiệu năng render của cây React.

### Cú pháp

```jsx
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>
```

__Props__

- `id`: dùng để nhận diện phần UI đang được đo đạc
- `onRender`: callback được gọi mỗi khi cây React bên trong được update. Hàm này nhận được thông tin về thứ được render và thời gian tiêu tốn.

```js
function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Aggregate or log render timings...
}
```

__Hạn chế__

Không quá khó để nhận thấy React sẽ phải làm thêm việc mỗi khi render trong `Profile` thông qua `onRender`, nên _profiling mặc định bị tắt trong `production`_.

### Cách dùng

#### Bọc phần UI muốn đo hiệu năng trong `Profiler`

{{< highlight jsx "linenos=true,hl_lines=2 4 5 7,linenostart=1" >}}
<App>
  <Profiler id="Sidebar" onRender={onRender}>
    <Sidebar />
  </Profiler>
  <Profiler id="Content" onRender={onRender}>
    <Content />
  </Profiler>
</App>
{{</ highlight >}}

#### Profiler lồng nhau

```jsx
<App>
  <Profiler id="Sidebar" onRender={onRender}>
    <Sidebar />
  </Profiler>
  <Profiler id="Content" onRender={onRender}>
    <Content>
      <Profiler id="Editor" onRender={onRender}>
        <Editor />
      </Profiler>
      <Preview />
    </Content>
  </Profiler>
</App>
```

React DevTools có tab Profiler cung cấp chức năng tương tự với khả năng tương tác trên giao diện. Với `Profiler` trong code, chỉ nên sử dụng ở/khi thực sự cần thiết.

## StrictMode

[StrictMode](https://react.dev/reference/react/StrictMode) giúp phát hiện sớm các bug thường gặp khi phát triển.

### Cú pháp

```jsx
<StrictMode>
  <App />
</StrictMode>
```

`StrictMode` thêm vào môi trường dev các hành vi sau:

- Component sẽ render thêm một lần nữa để bộc lộ các bug [component không thuần khiết](/blog/react/pure-component).
- Component sẽ chạy effect thêm một lần nữa để bộc lộ bug không cleanup effect.
- Component sẽ được cảnh báo nếu sử dụng các deprecated API.

`StrictMode` chỉ có tác dụng khi `development`, và bị tắt trong `production`.

### Cách dùng

#### Bật StrictMode cho toàn bộ app

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

#### Bật StrictMode cho một phần app

```jsx
import { StrictMode } from 'react';

function App() {
  return (
    <>
      <Header />
      <StrictMode>
        <main>
          <Sidebar />
          <Content />
        </main>
      </StrictMode>
      <Footer />
    </>
  );
}
```

#### Fix bug liên quan đến component không thuần khiết

[React cho rằng mỗi component bạn viết đều là hàm thuần khiết](/blog/react/pure-component). Component vi phạm luật này sẽ có hành vi bất thường và gây bug. Để phát hiện bug kiểu này sớm, StrictMode gọi những hàm sau hai lần khi `development`:

- Thân hàm của Component (chỉ logic trên cùng, không bao gồm code bên trong event handler).
- Hàm đưa vào `useState`, các hàm `set`, `useMemo`, `useReducer`.
- Một số method trong class component như `constructor`, `render`, `shouldComponentUpdate` (Xem [danh sách đầy đủ](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)).

App dưới đây minh họa cho khả năng này.

```jsx
// index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// App.jsx
import { useState } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState(initialStories)
  return (
    <div>
      <StoryTray stories={stories} />
    </div>
  );
}

// StoryTray.jsx
export default function StoryTray({ stories }) {
  const items = stories;
  items.push({ id: 'create', label: 'Create Story' });
  return (
    <ul>
      {items.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

Logic render chính của `StoryTray` thực hiện `push` vào mảng `stories`, dẫn đến mỗi khi render lại, output JSX đều thay đổi với cùng prop `stories`. `StoryTray` vì thế là một hàm không thuần khiết.Với StrictMode bọc toàn bộ app, `StoryTray` sẽ được render 2 lần, kết quả là có 2 phần tử có cùng `id` là `create`, và lỗi được thông báo ngay lập tức:

```sh
Warning: Encountered two children with the same key, `create`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.
    at ul
    at StoryTray (https://1e4ad8f7.sandpack-bundler-4bw.pages.dev/StoryTray.js:12:5)
    at div
    at App (https://1e4ad8f7.sandpack-bundler-4bw.pages.dev/App.js:29:51)
```

#### Fix bug không cleanup Effect

Mỗi Effect cần có phần code để setup, và có thể có code để cleanup.

- Khi component mount (được thêm vào màn hình), phần  setup được gọi.
- Khi component unmount (bị xóa khỏi màn hình), phần cleanup được gọi.
- Ở lần render sau, React sẽ thực hiện cleanup rồi setup lại.

Trong StrictMode, React luôn chạy thêm một chu kỳ setup + cleanup với mỗi Effect: _setup → cleanup → setup_, để phát hiện sớm bug. Xét ví dụ sau:

```jsx
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'general';

export default function ChatRoom() {
  useEffect(() => {
    // Tạo kết nối mới
    const connection = createConnection(serverUrl, roomId);

    // Và thêm vào connection pool
    connection.connect();
  }, []);

  return <h1>Welcome to the {roomId} room!</h1>;
}
```

Đoạn code trên có vấn đề, nhưng chưa rõ ở đâu. Với `StrictMode`, vấn đề memory leak được phát hiện ngay:

```sh
✅ Connecting to "general" room at https://localhost:1234...
Active connections: 1
✅ Connecting to "general" room at https://localhost:1234...
Active connections: 2
```

StrictMode chạy Effect 2 lần, và ta nhận thấy khi kết nối tới 1 room mới, connection của room cũ không bị ngắt, nên pool có 2 kết nối. Ta cleanup connection cũ để giải quyết vấn đề:

{{< highlight js "linenos=true,hl_lines=4,linenostart=1" >}}
useEffect(() => {
  const connection = createConnection(serverUrl, roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);
{{</ highlight >}}

#### Cảnh báo deprecated API

React sẽ cảnh báo nếu bạn sử dụng các API đã lỗi thời như: `findDOMNode`, `UNSAFE_componentWillMount`, chủ yếu là API của class component, trong `StrictMode`.

## Suspense

[Suspense](https://react.dev/reference/react/Suspense) cho phép bạn hiển thị phương án dự phòng (fallback) cho tới khi các con của nó tải xong.

```jsx
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

### Cú pháp

__Props__

- `children`: UI chính
- `fallback`: UI dự phòng, được hiển thị khi UI chính bị "đình chỉ". Chấp nhận bất cứ phần tử React hợp lệ nào, dù trong thực tế, `fallback` thường gọn nhẹ kiểu một vòng xoay spinner thể hiện trạng thái "loading". Nếu `fallback` cũng bị "đình chỉ", nó sẽ kích hoạt `Suspense` cha gần nhất.

__Hạn chế__

- React không đảm bảo state cho các quá trình render bị "đình chỉ" cho tới khi chúng được mount lần đầu tiên. Khi component tải xong, React mới thực hiện render component từ zero.

### Cách dùng

#### Hiện UI dự phòng cho tới khi component chính tải xong

```jsx
<Suspense fallback={<Loading />}>
  <Albums />
</Suspense>
```

Trong ví dụ trên, `Albums` sẽ bị "đình chỉ" khi dữ liệu đang được tải về, React sẽ hoán đổi `Suspense` gần nhất hành phương án dự phòng `Loading`. Sau đó, khi dữ liệu đã sẵn sàng, React ẩn `Loading` và render `Albums` với dữ liệu đã có.

Làm thế nào để `Suspense` biết được dữ liệu "đang tải" hay "đã sẵn sàng"? Hai nguồn dữ liệu sau đây có thể kích hoạt được `Suspense`:

- Dữ liệu kéo về trong các framework hỗ trợ Suspense như [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) hay [Next.js](https://nextjs.org/docs/advanced-features/react-18/overview).
- Component được khai báo bởi [lazy](https://react.dev/reference/react/lazy).

`Suspense` không có khả năng phát hiện dữ liệu kéo về trong Effect hay Event handler. Tính đến thời điểm viết bài, API để lấy dữ liệu hỗ trợ Suspense chưa thống nhất và ổn định, chủ yếu phụ thuộc vào framework cụ thể.

#### Hiển thị nội dung đồng loạt

Mặc định, toàn bộ cây trong `Suspense` được xem như một đơn vị duy nhất. Nghĩa là dù cho chỉ có 1 thành phần đợi dữ liệu thôi, tất cả đều bị thay thế bởi `Loading`:

```jsx
<Suspense fallback={<Loading />}>
  <Biography />
  <Panel>
    <Albums />
  </Panel>
</Suspense>
```

Component không nhất thiết phải là con trực tiếp của `Suspense`, nên chỉnh lại code như sau để khắc phục:

```jsx
<Suspense fallback={<Loading />}>
  <Details artistId={artist.id} />
</Suspense>

function Details({ artistId }) {
  return (
    <>
      <Biography artistId={artistId} />
      <Panel>
        <Albums artistId={artistId} />
      </Panel>
    </>
  );
}
```

#### Hiển thị nội dung lồng nhau từng cấp một

Khi một component bị "đình chỉ", `Suspense` gần nhất với nó sẽ hiển thị phương án dự phòng. Vì vậy `BigSpinner` sẽ hiển thị trước, sau đó, `Biography` hiển thị, còn `Panel` thì `AlbumsGlimmer` sẽ hiển thị.

```jsx
<Suspense fallback={<BigSpinner />}>
  <Biography />
  <Suspense fallback={<AlbumsGlimmer />}>
    <Panel>
      <Albums />
    </Panel>
  </Suspense>
</Suspense>
```

Xem thêm chi tiết các trường hợp sử dụng của `Suspense` [tại đây](https://react.dev/reference/react/Suspense).

---

## Tài liệu tham khảo

React đã viết lại [tài liệu](https://react.dev) với nhiều cải tiến:

- Tất cả diễn giải __sử dụng Hook__ thay cho class.
- Tăng graphic trực quan và ví dụ tương tác.
- Có câu hỏi (kèm lời giải!) để kiểm tra mức độ hiểu bài của độc giả.

Bài viết này dựa phần lớn trên bài gốc [tại đây](https://react.dev/reference/react/components).
