---
title: "Đừng làm vẩn đục component"
description: Tại sao giữ cho component "thuần khiết" (pure) lại quan trọng với React.
date: 2023-03-18T11:57:53+07:00
math: true
draft: false
categories:
  - Lập trình
  - React
tags:
  - javascript
  - reactjs
  - new-reactjs-docs
  - useEffect
cover:
  image: "https://source.unsplash.com/B2mq60Ksrsg"
  alt: "Pulau Papan Togean"
  caption: "Photo by Pahala Basuki on Unplash"
---

Mình cứ trong veo thì sợ gì.

<!--more-->

## Hàm thuần khiết

Trong khoa học máy tính (đặc biệt trong giới lập trình hướng hàm - functional programming), [hàm thuần khiết](https://wikipedia.org/wiki/Pure_function) là hàm có các đặc tính sau:

- __Chỉ quan tâm đến nghiệp vụ của riêng nó__: nó không đụng chạm gì đến các biến hoặc object tồn tại trước khi nó được gọi.
- __Cùng input cho cùng output__: khi truyền input giống nhau cho hàm thuần khiết, ta luôn nhận được cùng output.

Công thức toán học là một ví dụ về hàm thuần khiết.

Xét hàm $y=2x$.

Nếu $x=2$ thì $y=4$. Luôn như thế.

Nếu $x=3$ thì $y=6$. Luôn như thế.

Nếu $x=4$, $y$ sẽ không phải lúc thì bằng $-1$, lúc thì bằng $9$, phụ thuộc vào cổ phiếu FLC có bị ngừng giao dịch hay không. Với $y=2x$ và $x=4$, $y$ _luôn luôn_ bằng 8.

Viết hàm trên trong JS:

```js
function double(number) {
  return 2 * number;
}
```

## Component giống như công thức toán

React giả định rằng __mọi component mà bạn viết đều là hàm thuần khiết__. Điều này có nghĩa mọi component của bạn đều trả về kết quả JSX như nhau với cùng input:

```jsx
function Recipe({ drinkers }) {
  return (
    <ol>
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
```

Truyền `drinkers={2}` vào `Recipe`, ta luôn nhận được JSX có `2 cups of water`. Luôn như vậy.

Truyền `drinkers={4}` vào `Recipe`, ta luôn nhận được JSX có `4 cups of water`. Luôn như vậy.

Y như công thức toán.

## Hiệu ứng phụ: hệ quả (không) chủ đích

Quá trình render của React luôn luôn thuần khiết. Component chỉ nên trả về JSX của nó, và không thay đổi bất cứ object hay biến nào tồn tại trước quá trình render - bởi điều này sẽ làm component mất tính thuần khiết. Dưới đây là một ví dụ như thế:

```jsx
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}

/**
 * Output
 *
 * Tea cup for guest #2
 * Tea cup for guest #4
 * Tea cup for guest #6
 *
/
```

Component này đọc và ghi vào biến `guest` được khai báo bên ngoài, dẫn đến gọi component này mỗi lần sẽ cho một kết quả JSX khác nhau! Khó lường hơn nữa, nếu có component khác cũng đang dùng `guest`, JSX của nó cũng bị thay đổi theo lần render luôn.

Khắc phục component này bằng cách truyền `guest` qua prop:


```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

Một cách tổng quát, component thuần khiết không bị phụ thuộc vào thứ tự gọi. Với công thức toán, bạn không cần quan tâm xem cần gọi $y=2x$ trước hay sau $y=5x$: hai hàm này xử lý độc lập với nhau. Tương tự, component chỉ nên "nghĩ cho mình nó" mà không phụ thuộc vào bất cứ tác nhân bên ngoài trong quá trình render. Việc render giống như kỳ thi học kỳ vậy: mỗi component phải tự làm "bài thi" JSX của nó!

## Khi nào thì hiệu ứng phụ hữu ích?

Trong khi lập trình hướng hàm phụ thuộc lớn vào tính thuần khiết, ở đâu đó sẽ có _thứ gì đó_ cần phải thay đổi, đó chính là thứ ta muốn trong lập trình! Những thay đổi có thể như cập nhật UI trên màn hình, khởi tạo animation, xử lý data - đều được gọi là __hiệu ứng phụ__ hay __hiệu ứng bên lề__ (side effect). Những việc này xảy ra "bên lề", không phải trong quá trình render.

Trong React, __hiệu ứng bên lề__ thường nằm trong event handler. Event handler là các hàm chỉ được React chạy khi bạn làm một hành động - chẳng hạn bấm nút. Mặc dù event handler được khai báo trong component, chúng không chay khi render! Vì thế __event handler không cần phải thuần khiết__.

Trong trường hợp event handler không đáp ứng được, bạn có thể sử dụng `useEffect` để chỉ dẫn React thực hiện chúng sau khi render. Tuy vậy, chỉ khi bần cùng lắm mới sử dụng cách này.

__Hãy cố gắng trình bày logic nhiều nhất có thể trong quá trình render.__

## Tại sao React quan tâm tới tính thuần khiết?

Viết hàm thuần khiết đòi hòi thói quen và tính kỷ luật. Đổi lại nó mở ra nhiều lợi ích kỳ thú:

- Component có chạy được trên môi trường khác, điển hình là phía server! Vì chúng trả về cùng một kết quả cho cùng input, một component có thể phục vụ nhiều request.
- Cải thiện được hiệu năng bằng cách bỏ qua render các component mà input không thay đổi. Cách làm này an toàn bởi hàm thuần khiết vẫn trả về kết quả như vậy, nên có thể cache được.
- Nếu data thay đổi lưng chừng quá trình render một cây component sâu, React có thể chạy lại ngay mà không cần chờ chạy xong quá trình render cũ: tính thuần khiết đảm bảo việc dừng tính toàn bất cứ thời điểm nào cũng luôn an toàn.

Bất cứ tính năng mới nào được thêm vào React đều tận dụng tính thuần khiết. Từ data fetching đến animation cho tới hiệu năng, giữ cho component thuần khiết là chìa khoá cho sức mạnh của React.

## Tổng kết

- Component phải thuần khiết, nghĩa là:
  - Nó chỉ lo việc của bản thân nó, không phải thế giới bên ngoài kìa.
  - Input như nhau, kết quả, với component là JSX, giống nhau, luôn như vậy.
- Việc render có thể xảy ra bất cứ thời điểm nào, do đó component không nên phụ thuộc vào thứ tự được render của mình và component khác.
- Không được thay đổi trực tiếp input của component: prop, state và context. Thay vào đó, hãy dùng `"set" state`.
- Thể hiện logic của component trong quá trình render nhiều nhất có thể. Nếu muốn "thay đổi gì đó", dùng event handler. Kế sách cuối cùng mới là `useEffect`.
- Viết hàm thuần khiết đòi hỏi thời gian rèn luyện, đổi lại nó giải phóng sức mạnh cho mô hình React.

## Tài liệu tham khảo

React đã có tài liệu hướng dẫn mới, đáng chú ý:

* Tất cả diễn giải __sử dụng Hook__ thay cho class.
* Tăng graphic trực quan và ví dụ tương tác.
* Có câu hỏi (kèm lời giải!) để kiểm tra mức độ hiểu bài của độc giả.

Bài viết này dựa phần lớn trên bản gốc [Keep components pure](https://react.dev/learn/keeping-components-pure).

## Có thể bạn không cần/quan tâm

- [Có thể bạn không cần đến Effect](/blog/react/you-might-not-need-an-effect)
