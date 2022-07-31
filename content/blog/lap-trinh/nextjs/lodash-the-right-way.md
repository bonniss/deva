---
title: Tree-shake Lodash trong Next.js
description: Hướng dẫn sử dụng Lodash đúng cách trong Next.js
draft: false
date: 2021-04-26 22:32:08
categories:
  - Lập trình
tags:
  - javascript
  - node.js
  - next.js
---

Lý Tiểu Long nói đại ý: không sợ kẻ biết 1 vạn kiểu đá, chỉ sợ kẻ tập 1 kiểu 1 vạn lần. Vậy kẻ đá được 1 vạn kiểu 1 vạn lần có chắc là vô đối?

<!--more-->

[Lodash](https://lodash.com/), tiền thân là [Underscore.js](http://underscorejs.org/), là một thư viện tổng hợp các hàm phụ trợ giúp giải quyết nhiều tác vụ thường gặp trong lập trình Javascript. Cùng với jQuery, Lodash thần thánh giúp tuổi thọ của lập trình viên Javascript lên chút ít \\( ͡❛ ͜ʖ ͡❛)/ Thế nhưng cũng như jQuery, sự vô đối này có nguy cơ sụp đổ bởi sự tiến hóa không ngừng của Javascript.

Javascript là ngôn ngữ lập trình có lịch sử phát triển với nhiều đứt gãy. ES2015/ES6 ra đời đánh dấu một bước nhảy vọt của Javascript trở thành một ngôn ngữ mạnh mẽ. Nhiều tính năng trong Lodash đã được tích hợp sẵn trong ES6 như `map`, `reduce`, `filter`. Tuy vậy, Lodash vẫn rất hữu ích bởi nhiều lý do:

- Không phải hàm Lodash nào cũng có thay thế tương ứng trong ES6
- Các hàm Lodash đã được phát triển và kiểm thử trong một thời gian dài nên đáng tin cậy
- Chạy phà phà từ IE11 đến Node.js

Nhược điểm lớn nhất khi sử dụng Lodash, cũng như bất cứ thư viện phụ trợ nào, đó là browser sẽ phải kéo thêm tài nguyên về, dẫn đến tăng thời gian tải trang.

{{< im src="images/gallery/next.js/bundlephobia-lodash.png" width=500 >}}

Lodash và ES6 hiển nhiên không cần phải đối đầu một mất một còn. Việc có hiểu biết về cả 2 phương pháp sẽ giúp bạn trở thành một lập trình viên giỏi hơn.

- Nếu bạn chỉ cần một vài hàm phụ trợ đơn giản, hoặc bạn muốn tự xây dựng một thư viện hàm phụ trợ cho riêng mình để dùng lại cho nhiều dự án, [có thể bạn không cần đến Lodash](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore).
- Nếu bạn xử lý dữ liệu thường xuyên trong Javascript và cần một công cụ tin cậy đã được thời gian kiểm chứng, hướng dẫn sử dụng Lodash [tại đây](https://www.blazemeter.com/blog/import-lodash-libraries) có thể hữu ích cho bạn

Nội dung chính của bài viết này là làm 1 PoC về khả năng tree-shaking Lodash trong Next.js

## Chuẩn bị

- Tạo một project Next.js

```bash
npx create-next-app@latest
```

- Di chuyển đến thư mục project, cài đặt dependencies

```bash
npm install next-compose-plugins @next/bundle-analyzer
```

- Tạo biến môi trường

```ini
# .env.production
ANALYZE=true

# .env.development
ANALYZE=false
```

## Thử `lodash`

- Tạo và checkout branch `with-lodash`,

```bash
git checkout -b with-lodash
```

- Cài đặt `lodash`

```bash
npm install lodash
```

- Tại `next.config.js`

```js
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withPlugins([
  [withBundleAnalyzer]
], nextConfig)
```

- Dựng trang chủ tại `pages/index.js`:

```jsx
import { groupBy } from 'lodash'

const data = [
  {
    "hero": "Spider Man",
    "name": "Peter Benjamin Parker",
    "link": "http://marvel.com/characters/54/spider-man",
  },
  {
    "hero": "Captain Marvel",
    "name": "Carol Danvers",
    "link": "http://marvel.com/characters/9/captain_marvel",
  },
  {
    "hero": "Hulk",
    "name": "Robert Bruce Banner",
    "link": "http://marvel.com/characters/25/hulk",
  },
  {
    "hero": "Black Widow",
    "name": "Natalia 'Natasha' Alianovna Romanova",
    "link": "http://marvel.com/characters/6/black_widow",
  },
  {
    "hero": "Daredevil",
    "name": "Matthew Michael Murdock",
    "link": "http://marvel.com/characters/11/daredevil",
  },
  {
    "hero": "Wolverine",
    "name": "James Howlett",
    "link": "http://marvel.com/characters/66/wolverine",
  },
  {
    "hero": "Captain America",
    "name": "Steven Rogers",
    "link": "http://marvel.com/characters/8/captain_america",
  },
  {
    "hero": "Iron Man",
    "name": "Anthony Edward 'Tony' Stark",
    "link": "http://marvel.com/characters/29/iron_man",
  },
  {
    "hero": "Thor",
    "name": "Thor Odinson",
    "link": "http://marvel.com/characters/60/thor",
  }
]

export default function Home() {
  const groups = groupBy(data, x => x.hero.charAt(0));
  return (
    <div>
      <pre>
        {JSON.stringify(groups, null, 2)}
      </pre>
    </div>
  )
}
```

Ta sử dụng hàm `groupBy` của `lodash` để phân nhóm các anh hùng Marvel theo chữ cái đầu tiên trong tên.

- Build project

```
npm run build
```

## Thử `lodash-es`

`lodash-es` là bản build Lodash sử dụng ES6 module, vì vậy có thể tree-shaking bởi module bundler như Webpack. Nói cách khác, thay vì import gần 70K với:

```js
import { join } from 'lodash'
```

thì ta chỉ cần 1K với:

```js
import { join } from 'lodash-es'
```

Tuy nhiên để đạt được hiệu quả này, ta cần cấu hình để Next.js có thể transpile packge trong `node_modules`.

- Checkout branch `with-lodash-es`

```bash
git checkout -b with-lodash-es
```

- Cài đặt [`next-transpile-modules`](https://www.npmjs.com/package/next-transpile-modules)

```bash
npm i next-transpile-modules
```

- Dựng trang chủ tại `pages/index.js` giống mục trước, chỉ thay import:

```jsx {hl_lines=[1]}
import { groupBy } from 'lodash-es'

const data = [
  {
    "hero": "Spider Man",
  ...
```

- Tại `next.config.js`

```js {hl_lines=[5,14]}
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withTM = require('next-transpile-modules')(['lodash-es'])

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withPlugins([
  [withBundleAnalyzer],
  [withTM]
], nextConfig)
```

- Build project:

```bash
npm run build
```

## So sánh

Output build với `lodash`

```ini {hl_lines=[2]}
Page                                       Size     First Load JS
┌ ○ /                                      30 kB           107 kB
├   /_app                                  0 B            77.4 kB
├ ○ /404                                   194 B          77.6 kB
└ λ /api/hello                             0 B            77.4 kB
+ First Load JS shared by all              77.4 kB
  ├ chunks/framework-84154cdd319403d1.js   45.2 kB
  ├ chunks/main-a6a17768821d805e.js        30.8 kB
  ├ chunks/pages/_app-54772c170987db80.js  504 B
  ├ chunks/webpack-cb7634a8b6194820.js     884 B
  └ css/ab44ce7add5c3d11.css               247 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

Output build với `lodash-es`, có thể thấy dung lượng trang chủ giảm 5 lần (30k vs 6k), lượng JS tổng cộng tải xuống giảm 20% (107k vs 84k).

```ini {hl_lines=[2]}
Page                                       Size     First Load JS
┌ ○ /                                      6.16 kB        84.1 kB
├   /_app                                  0 B              78 kB
├ ○ /404                                   186 B          78.2 kB
└ λ /api/hello                             0 B              78 kB
+ First Load JS shared by all              78 kB
  ├ chunks/framework-7d47ac221fb8229a.js   45.7 kB
  ├ chunks/main-e0ddca6ca271803b.js        30.9 kB
  ├ chunks/pages/_app-0e6b46beaaa55ac1.js  498 B
  ├ chunks/webpack-020ac7bd7fa6bb86.js     914 B
  └ css/ab44ce7add5c3d11.css               247 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

So sánh đồ thị analyzer, ta thấy với `lodash-es` chỉ có hàm `groupBy` được đóng gói thay vì toàn bộ package như với `lodash`.

{{< im src="images/gallery/next.js/ana-fullpackage.png" alt="lodash" width=550 >}}

{{< im src="images/gallery/next.js/ana-treeshook.png" alt="lodash-es" width=550 >}}

Xem chi tiết đồ thị analyzer:

- [Với lodash](/misc/analyze_lodash/client.html)
- [Với lodash-es](/misc/analyze_lodash-es/client.html)

Chi tiết source code trong bài [tại đây](https://github.com/bonniss/nextjs-lodash-treeshaking).
