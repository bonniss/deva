---
title: "Ưu tiên undefined hơn null!"
description: "Hiểu được những khác biệt rất ý nhị giữa 2 giá trị \"rỗng\" này có thể giúp lập trình viên ngăn chặn được kha khá bug."
date: 2021-03-20T01:49:32+07:00
draft: false
categories:
  - Lập trình
tags:
  - javascript
  - best-practices
  - eslint
  - linting
cover:
  image: "https://source.unsplash.com/5cC1xs6t2wQ"
  alt: "NIKON CORPORATION, NIKON D80"
  caption: "Photo by Thomas Oxford on Unplash"
---

Lão Tử nói: "Đạo mà diễn tả được thì đó không còn là đạo bất biến nữa, tên mà gọi ra được thì đó không còn là tên bất biến nữa."

<!--more-->

## Sự trống vắng bất ổn

[null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) và [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) là hai giá trị đặc biệt trong Javascript để ám chỉ _sự trống vắng_.

{{< im "/images/gallery/js/null-undefined-funny.png" "" 600 >}}

Nhiều lập trình viên, _vừa yêu thích giấy vệ sinh_, vừa dùng lẫn lộn cả hai giá trị này trong code, thậm chí có người còn coi chúng chỉ là hai tên gọi khác cho cùng một khái niệm _"rỗng"_. Với niềm tin như vậy họ có thể viết code như này:

```js
if (randomValue) {
  // do something
}
```

Rẽ nhánh như vậy sẽ bất ổn bởi ép kiểu ngầm sẽ đưa cả số `0` và `""` về `false`. Nếu ta sửa lại:

```js
if (randomValue == null) {
  // do something
}
```

thì sẽ vi phạm luật so sánh tuyệt đối (dùng `===`) của công cụ lint code như ESLint. Cách viết này cũng không rõ ràng khi thoạt nhìn code có vẻ chỉ kiểm tra `null` mà lại kiểm tra luôn cả `undefined`. Nếu muốn rõ ràng mà viết như sau:

```js
if (randomValue === undefined || randomValue === null) {
  // do something
}
```

thì code lại cồng kềnh.

## So sánh

### Lợi thế của `undefined`

- [Tham số mặc định](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) của hàm chỉ hỗ trợ `undefined`.
- Giá trị mặc định khi [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) chỉ hỗ trợ `undefined`.
- `typeof undefined` là `"undefined"`, không gây bối rối như `typeof null` là `"object"`.
- Thực hiện phép tính toán với giá trị không xác định cho kết quả như dự đoán:
  - `2 + undefined; // NaN`
  - `2 + null; // 2`

### Lợi thế của `null`

- JSON chỉ hỗ trợ `null`.
- Component của React chỉ hỗ trợ trả về `null` khi không render gì (`undefined` không hỗ trợ).
- DOM APIs, như `document.querySelector()`, thường hỗ trợ `null`.
- Hàm có thể phân biệt được giữa `return` và `return null`, khó phân biệt được giữa `return` và `return undefined`.
- Dễ phân biệt được trường nào không tồn tại trong object:
  - `obj.prop === undefined` -> không tồn tại
  - `obj.prop === null` -> tồn tại, chưa có giá trị
- `null` được các database hỗ trợ tốt hơn:
  - SQL có giá trị `NULL` để ánh xạ với `null` trong JS.
  - Prisma coi `null` là một giá trị, còn `undefined` được hiểu là không làm gì! Nghĩa là các trường có kiểu. `undefined` sẽ bị bỏ qua khi INSERT hay UPDATE.

## Quan điểm

Code dùng `null` sẽ tường minh và dễ kiểm soát hơn, bởi khi bạn set một biến là `null`, bạn biết chắc chắn tồn tại một biến như vậy, chỉ là chưa có giá trị mà thôi.

Tuy nhiên, do tham số mặc định chỉ hỗ trợ `undefined`, một lập trình viên React có thể phải viết code như sau để prop có thể nhận giá trị mặc định nếu `null`:

```jsx
<SomeComponent
   a={model.a === null ? undefined : model.a}
   b={model.b === null ? undefined : model.b}
   c={model.c === null ? undefined : model.c}
/>
```

Thực sự xấu xí!

Coding guideline của Typescript [yêu cầu chỉ dùng `undefined`](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined).

Khai báo kiểu dùng `undefined` cũng thân thiện với người dùng Typescript:

```ts
interface PostEntity {
  category?: string;  // có thể là `string` hoặc `undefined`
}

// If you use `null`
interface PostEntity {
  category: string | null;  // dài dòng hơn
}
```

Cộng đồng ESLint cũng khuyến nghị [hạn chế sử dụng `null`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md).

```js
// Fail
let foo = null;

if (bar == null) {}

// Pass
let foo;

const foo = Object.create(null);

if (foo === null) {}
```

Với những trường hợp bắt buộc phải sử dụng `null`, ta có thể đơn giản là disable ESLint rule cho dòng khai báo đó. Để code không bị disable rải rác nhiều nơi, ta có thể lách luật như sau:

```js
// eslint-disable-next-line no-null/no-null
const NULL = null;
export default NULL;
```

JSON tự động loại bỏ các trường `undefined` khi `stringify`. Do JSON chỉ hỗ trợ `null`, bạn cần một replacer để thay thế `undefined` thành `null`:

```js
const user = { name: 'Duy Trung', address: undefined };

const replacer = (key, value) =>
  typeof value === 'undefined' ? null : value;

JSON.stringify(user, replacer); // -> "{\"name\":\"Duy Trung\",\"address\":null}"
```

## Kết luận

- Vì lý do lịch sử mà trong Javascript tồn tại hai giá trị đều ám chỉ sự "rỗng" là `null` và `undefined`. Dù khá giống nhau nhưng hai giá trị này vẫn có những đặc điểm riêng biệt.
- Việc sử dụng lẫn lộn cả `null` và `undefined` trong code mà không có một lý lẽ rõ ràng có thể dẫn đến bug và tạo gánh nặng khi maintain.
- Cộng đồng Typescript và ESLint có xu hướng hạn chế sử dụng `null`, ưu tiên `undefined`, với những lý do chi tiết cho thấy `undefined` mang lại ít phiền phức hơn so với `null`. Brendan Eich - cha đẻ của Javascript - cũng đồng ý như vậy:

{{< im "/images/gallery/js/brendan-eich-undefined.png" "" 600 >}}

## Tham khảo

- [[Github discussion] Intent to stop using null in my JS code](https://github.com/sindresorhus/meta/discussions/7)
