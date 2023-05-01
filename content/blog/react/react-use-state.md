---
title: Trạng thái của component trong React
description: Tìm hiểu về `useState` trong React
draft: false
date: 2022-08-14 22:32:08
categories:
  - Lập trình
tags:
  - javascript
  - reactjs
  - new-reactjs-docs
  - react.dev
  - reactjs-basic
  - useState
---

Dalai Lama trong thế giới của component nói: "We don't grow, we change".

<!--more-->

`useState` là một Hook giúp bạn thêm biến state vào một component trong React.

```jsx
const [state, setState] = useState(initialState)
```

## Cách sử dụng

### Thêm state cho component

Gọi `useState` ở ngay đầu component sẽ khai báo các biến state.

```jsx
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(42);
  const [name, setName] = useState('Taylor');
  // ...
```

Một quy ước khi đặt tên biến là `[something, setSomething]` sử dụng [phân rã mảng - array destructuring](https://javascript.info/destructuring-assignment).

`useState` trả về một mảng có đúng hai phần tử:

1. Trạng thái hiện tại của biến state, được khởi tạo với một giá trị ban đầu `initialState`.
2. Hàm `set` dùng để gán giá trị mới cho biến state.

Để cập nhật những gì nhìn thấy trên màn hình, gọi hàm `set` với state mới:

```jsx
function handleClick() {
  setName('Robin');
}
```

React sẽ lưu trữ state mới, render lại component với giá trị mới và làm tươi UI.

> Sai lầm thường gặp
> Gọi hàm `set` không thay đổi ngay lập tức giá trị của state:

```jsx
function handleClick() {
  setName('Robin');
  console.log(name); // Vẫn là "Taylor"!
}
```

> Giá trị mới chỉ được cập nhật ở lần render tiếp theo.

### Cập nhật state dựa trên state trước

Giả sử `age` là `42`. Handler sau gọi `setAge(age + 1)` ba lần:

```jsx
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

Tuy nhiên sau khi bấm nút, `age` sẽ chỉ là `43` chứ không phải `45`! Như đã nói hàm `set` không cập nhật giá trị ngay. Nên mỗi lần gọi `setAge(age + 1)` chỉ thêm cộng thêm vào `age` tại thời điểm hiện tại một đơn vị tức là tương đương `setAge(43)`.

Để giải quyết vấn đề, bạn cần truyền đối số là một hàm thay vì một giá trị:

```jsx
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

Ở đây, `a => a + 1` là hàm cập nhật, nó tính state mới dựa trên state trung gian. React gom các hàm cập nhật và đặt vào một hàng đợi. Sau đó trong lần render tiếp theo, nó sẽ gọi lần lượt theo đúng thứ tự trong code:

1. `a => a + 1` nhận `42` là giá trị trung gian và trả về state mới là `43`.
2. `a => a + 1` nhận `43` là giá trị trung gian và trả về state mới là `44`.
3. `a => a + 1` nhận `44` là giá trị trung gian và trả về state mới là `45`.

Lúc này hàng đợi đã rỗng, React sẽ lưu trữ giá trị cuối cho state bằng `45`.

Một quy ước thường gặp là đặt tên state trung gian bằng chữ cái đầu tiên trong tên biến state, như `a` cho `age`. Tuy nhiên, bạn cũng có thể đặt là `prevAge` gì đó miễn là bạn thấy dễ hiểu.

Ở mode development, React sẽ gọi hàm cập nhật này hai lần để đảm bảo chúng là hàm thuần khiết.

### Cập nhật object và array trong state

State không chỉ là chuỗi hay số, mà còn có thể là object hay array. Trong React, state là read-only, do đó bạn phải _thay thế_ chứ không _thay đổi_ object của state. Chẳng hạn, nếu bạn có một object `form`, không nên cập nhật giá trị như này:

```jsx
form.firstName = 'Taylor';
```

Thay vào đó, thay thế toàn bộ cái cũ bởi một cái mới hoàn toàn:

```jsx
setForm({
  ...form,
  firstName: 'Taylor'
});
```

### Tránh tạo lại state ban đầu

React lưu lại state ban đầu một lần duy nhất và bỏ qua trong những lần render sau.

```jsx
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
```

Mặc dù kết quả `createInitialTodos()` chỉ được dùng cho lần render đầu tiên, _nó vẫn được gọi cho mỗi lần render_. Điều này sẽ tạo ra vấn đề về hiệu năng nếu hàm này tiêu tốn nhiều tài nguyên.

Để khắc phục, hãy sửa lại chút ít:

```jsx
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

Bạn có nhận thấy điểm khác? Đoạn code sau truyền vào `createInitialTodos` không có cặp ngoặc tròn `()`, tức là _bản thân hàm đó như một giá trị_, chứ không phải truyền vào kết quả thực thi của hàm đó khi gọi `createInitialTodos()`. Khi truyền như vậy, React sẽ chỉ gọi nó một lần trong khi khởi tạo.

### Reset state với `key`

Bạn có thể reset toàn bộ state bằng cách thay đổi prop `key` truyền vào một component. Đọc [giữ và reset state](https://beta.reactjs.org/learn/preserving-and-resetting-state).

### Giữ lại dữ liệu từ lần render trước

Thông thường, bạn sẽ update state trong event handler. Tuy nhiên, một vài trường hợp ít gặp sẽ yêu cầu bạn điều chỉnh state ngay khi render - chẳng hạn, bạn sẽ thay đổi state theo thay đổi của props.

Component `CountLabel` hiển thị giá trị `count` được truyền từ ngoài vào:

```jsx
export default function CountLabel({ count }) {
  return <h1>{count}</h1>
}
```

Bạn muốn hiển thị thêm thông tin là bộ đếm này đang _tăng_ hay _giảm_. Để làm được vậy bạn cần theo dõi cả giá trị cũ của `count`, ta gọi là `prevCount`. Tiếp đến ta thêm một state `trend` để lưu trữ thông tin xu hướng của bộ đếm. So sánh `prevCount` và `count`, nếu chúng khác nhau thì cập nhật cả `prevCount` và `trend`.

```jsx
import { useState } from 'react';

export default function CountLabel({ count }) {
  const [prevCount, setPrevCount] = useState(count);
  const [trend, setTrend] = useState(null);
  if (prevCount !== count) {
    setPrevCount(count);
    setTrend(count > prevCount ? 'increasing' : 'decreasing');
  }
  return (
    <>
      <h1>{count}</h1>
      {trend && <p>The count is {trend}</p>}
    </>
  );
}
```

Lưu ý khi bạn gọi hàm `set` trong render, nó phải được đặt trong điều kiện rẽ nhánh như `prevCount !== count`, nếu không component sẽ render vô hạn và boom! Thêm nữa, bạn chỉ có thể cập nhật state của component đang render: lỗi sẽ xảy ra nếu bạn cố gọi hàm `set` của một component khác.

Pattern này nói chung khó hiểu và không nên dùng nhiều. Tuy vậy vẫn tốt hơn là dùng Effect. Khi bạn gọi hàm `set` trong render, React sẽ render lại component ngay sau khi `return`, trước khi render các con. Bằng cách này, component sẽ không phải render hai lần. Phần còn lại của component vấn được thực hiện (dù bị vứt đi ngay sau đó), nên nếu có thể, bạn hãy `return` sớm ngay trong điều kiện rẽ nhánh để kích hoạt việc render lại sớm hơn.

## Câu hỏi thường gặp

### Tôi muốn đặt một hàm làm giá trị cho state, nhưng hàm lại bị gọi liên tục

Bạn không thể đặt một hàm vào state như này:

```jsx
const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

Vì React sẽ hiểu `someFunction` là hàm khởi tạo, và `someOtherFunction` là hàm cập nhật, nên nó sẽ gọi hàm mỗi lần render và lưu lại kết quả. Để thực sự lưu một hàm, bạn cần thêm `() =>` trước cả hai trường hợp. React sẽ lưu hàm như một giá trị vào state thay vì gọi nó.

```jsx
const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

### Tôi gặp lỗi "Too many re-renders. React limits the number of renders to prevent an infinite loop"

Bạn đang đặt hàm `set` trong render mà không có điều kiện dừng, nên component rơi vào vòng lặp vô hạn. Ngoài ra, một lỗi phổ biến là bạn đặt sai event handler:


```jsx
// 🚩 Sai: Gọi handler mỗi lần render
return <button onClick={handleClick()}>Click me</button>

// ✅ Đúng: Truyền handler như giá trị, không gọi
return <button onClick={handleClick}>Click me</button>

// ✅ Đúng: Sử dụng hàm mũi tên, không gọi hàm
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

---

## Tài liệu tham khảo

Reactjs đang viết lại trang tài liệu chính thức. Một vài điểm đáng chú ý về nội dung mới:

* Tất cả diễn giải __sử dụng Hook__ thay cho class.
* Tăng graphic trực quan và ví dụ tương tác.
* Có câu hỏi (kèm lời giải!) để kiểm tra mức độ hiểu bài của độc giả.

Ở thời điểm năm 2022, [bản beta của tài liệu mới tại đây](https://beta.reactjs.org/).

Bài viết này dựa phần lớn trên bản gốc [tại đây](https://beta.reactjs.org/apis/react/useState).
