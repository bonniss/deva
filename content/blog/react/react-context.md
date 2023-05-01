---
title: "Sử dụng Context trong React"
date: 2023-03-22T10:42:24+07:00
draft: true
---

Trong React, component cha đưa cho component con dữ liệu bằng props. Với cây component có rất nhiều lớp cần dùng chung một dữ liệu nào đó, tất cả các component trung gian đều phải có prop để nhận dữ liệu đó và truyền cho con của nó, dẫn đến dài dòng và bất tiện. Context được sinh ra để giải quyết vấn đề này, giúp bạn "teleport" đến dữ liệu mình cần mà ko cần truyền prop từ lớp này sang lớp khác.

## Context là gì

Context cho phép component cha cung cấp dữ liệu cho toàn bộ cây ở dưới nó. Xét:

```jsx
// Heading.js
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}

// Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}

// App.js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Heading level={2}>Heading</Heading>
      <Heading level={3}>Sub-heading</Heading>
      <Heading level={4}>Sub-sub-heading</Heading>
      <Heading level={5}>Sub-sub-sub-heading</Heading>
      <Heading level={6}>Sub-sub-sub-sub-heading</Heading>
    </Section>
  );
}
```

## Trước khi dùng Context

Context tạo cảm giác rất dễ sử dụng, và cũng dễ bị lạm dụng. Nếu bạn chỉ cần truyền vài props xuống sâu một vài lớp không đồng nghĩa với việc bạn phải dùng Context, thay vào đó, bạn có thể:

1. Bắt đầu bằng truyền props: có thể liệt kê các props ra sẽ dài dòng một chút, nhưng nó lại chỉ ra rõ ràng component nào dùng dữ liệu gì. Người maintain code sau bạn có thể sẽ cảm ơn bạn.
2. Chia nhỏ component và truyền JSX vào `children`: Nếu bạn phải truyền data qua rất nhiều lớp trung gian không dùng đến data đó (mục đích chỉ để truyền xuống lớp dưới), có thể bạn đã quên không tách nhỏ component rồi.

## Khi nào nên dùng Context

- Theming: Nếu người dùng được phép thay đổi "ngoại hình" app của bạn (dark mode là ví dụ điển hình), bạn có thể đặt Context provider ở component gốc, và dùng context trong các component để điều chỉnh ngoại hình dựa trên theme mode đang sử dụng.
- Account hiện tại: Rất nhiều component cần biết ai đang đăgn nhập.
- Routing: gần như mọi giải pháp về routing đều sử dụng context để lưu route hiện tại.
- Quản lý state: khi app lớn lên, bạn có thể muốn đưa rất nhiều state lên ngọn cây component.
