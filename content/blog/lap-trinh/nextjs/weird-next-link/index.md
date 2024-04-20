---
title: Trải nghiệm tồi tệ với Link trong Next.js
description: Khi framework cố gắng out trình developer
draft: false
date: 2022-12-16 19:32:08
categories:
  - Lập trình
tags:
  - javascript
  - react
  - next.js
  - next.js link
  - prefetch
summary: s(ㆆ_ㆆ)s
cover:
  image: "https://source.unsplash.com/ukzHlkoz1IE"
  alt: "White neon wallpaper"
  caption: "Photo by Austin Chan on Unplash"
---

Next.js là một meta-framework cho React - một thư viện UI của Facebook. Next giải quyết nhiều vấn đề mà developer phải đối mặt khi phát triển một ứng dụng React như:

- Code structure
- Routing
- Data fetching
- SEO
- ...

Next.js có thể làm một server framework, một static site generator, hoặc cả hai tuỳ thuộc vào hình thức [data fetching](https://nextjs.org/docs/basic-features/data-fetching/overview) được sử dụng trong các trang. Nhờ những tính năng có tính thực tiễn cao, Next.js mang lại nhiều lợi ích về hiệu năng đi cùng trải nghiệm developer (DX) mượt mà, và nhanh chóng trở thành cái tên được nghĩ đến đầu tiên khi cần xây dựng một ứng dụng React, không chỉ bởi cộng đồng mã nguồn mở mà còn bởi rất nhiều công ty và tập đoàn lớn trên thế giới.

## Lợi ích của Link

Khi người dùng truy cập vào một ứng dụng Next.js bằng browser như [chakra-ui.com/](https://chakra-ui.com/), Next.js sẽ trả về HTML, CSS và một lượng JS (bao gồm React và code phía client của Next.js) đủ để mồi, sau đó React sẽ tiếp quản và dựng lên trang đầy đủ.

Next.js cung cấp component [`<Link/>`](https://nextjs.org/docs/api-reference/next/link) để thay thế cho thẻ `<a/>` truyền thống . Trong khi thẻ `<a/>` khi được nhấn vào sẽ gửi một request lên server, thì với một liên kết `<Link/>` Next.js sẽ chịu trách nhiệm xử lý chuyển trang hoàn toàn ở phía client.

`<Link/>` nâng cao trải nghiệm người dùng bằng prefetch - chuẩn bị trước nội dung. Ngay khi một liên kết `<Link/>` xuất hiện trên màn hình của người dùng, nếu đó là liên kết nội bộ trong ứng dụng hiện tại, Next sẽ prefetch ngay URL mà liên kết đó trỏ tới. Kết quả là khi người dùng nhấn vào liên kết thì trang mới hiện ra ngay lập tức, đem lại một trải nghiệm lướt web ấn tượng.

{{< video src="/media/prefech-on-scrolling.mp4" type="video/mp4" preload="auto" >}}

Các trang được sinh tĩnh ([Static Generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)) sẽ được prefetch dữ liệu `JSON` ngay khi liên kết trỏ đến nó xuất hiện trên màn hình.

> Prefetch chỉ hoạt động ở chế độ production.

## Sự tra tấn của Link

Hiệu ứng tích cực về trải nghiệm người dùng tạo nên bởi prefech sẽ giảm dần nếu trong trang:

1. Có rất nhiều liên kết
2. Liên kết tới các trang chứa nhiều dữ liệu JSON
3. Có cả hai điều trên :fearful:

Việc chuẩn bị trước mọi trang trên màn hình để tạo trải nghiệm chuyển trang ngay lập tức kể cả khi người dùng chỉ ấn vào __một__ liên kết và thoát khỏi ứng dụng sẽ là một cái giá không hề rẻ, và còn đắt dần theo lượng người dùng ứng dụng. Next.js 12 cho phép truyền `prefetch=false` để tắt tính năng này:

```jsx
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        {/* Không chuẩn bị trước liên kết này */}
        <Link prefetch={false} href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  )
}

export default Home
```

Tuy vậy, prefetch còn được kích hoạt _khi bạn rê chuột lên trên (hover) một liên kết_, kể cả khi đã đặt `prefetch=false`. Hành vi này "giúp" người dùng có thể dễ dàng spam vài trăm request lên server trong thời gian tính bằng giây!

{{< video src="/media/hover-chakra-docs.mp4" type="video/mp4" preload="auto" >}}

Kể cả response với code [`304 - Not Modified`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304) chỉ vỏn vẹn vài chục byte, số lượng request kinh khủng như vậy thật khó chấp nhận. Kinh khủng hơn nữa là __Next.js 12 không hỗ trợ cách nào để tắt hoàn toàn hành vi này__. Xem thêm ở [đây](https://github.com/vercel/next.js/discussions/24437), [đây](https://github.com/vercel/next.js/discussions/11793), [đây](https://github.com/vercel/next.js/discussions/20521) và [đây](https://github.com/vercel/next.js/discussions/24120).

## Prefetch thế nào cho đúng?

Không phải ứng dụng nào cũng được xây dựng giống nhau, Next.js nên để developer tự quyết định hành vi cụ thể phù hợp với ứng dụng của anh ta, thay vì giữ một số hành vi "mặc định" như hover ẩn dưới một cái tên rất cụ thể như `prefetch`.

```ts
...
prefetch?: 'viewport' | 'hover' | 'off';
...
```

Nếu vẫn muốn giữ hành vi hover để có trải nghiệm chuyển trang mượt mà, thì thật ra với não người, hành động nào diễn ra trong nhỏ hơn 100ms đều tạo cảm giác "ngay lập tức". Vì thế Next.js có cải tiến để hover một cách "khôn ngoan" kiểu như [instant.page](https://instant.page/).

Trong lúc chờ những phiên bản tiếp từ Next.js, trong các issue Github ở trên cũng có một số workaround như tạo `CustomLink` để tránh sử dụng `Link` của Next:

```jsx
import router from 'next/router';

function CustomLink(props) {
  const linkHref = props.href;

  function onClick(e) {
    e.preventDefault();
    router.push(linkHref);
  }

  return (
    <a href={linkHref} onClick={onClick}>
      {props.children}
    </a>
  );
}

export default CustomLink;
```

_Bạn tự chịu rủi ro với các workaround bạn chọn, do đó hãy test thật kỹ._

Bài học cho các framework là không nên cố gắng làm mọi thứ quá thuận tiện, bởi vấn đề được tạo ra có thể còn lớn hơn vấn đề được giải quyết.
