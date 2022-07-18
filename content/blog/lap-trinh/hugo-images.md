---
title: Hugo images manipulation
description: Hugo images manipulation
draft: true
date: 2021-07-15 22:32:08
categories:
  - Lập trình
tags:
  - cms
  - ssg
  - jamstack
  - hugo
config:
  markup:
    highlight:
      lineNos: false
---

Resources:

- [Different ways to access your image resources](https://www.markusantonwolf.com/blog/guide-for-different-ways-to-access-your-image-resources/)
- [Page resources](https://gohugo.io/content-management/page-resources/)
- [Hugo directory structure](https://gohugo.io/getting-started/directory-structure/)
- [Hugo image plugins](https://www.lkhrs.com/blog/2022/03/one-image-two-days/)
- [Diagram](https://gohugo.io/content-management/diagrams/)
- [GoAT examples](https://github.com/bep/goat)
- [ASCII Diagrams](https://arthursonzogni.com/Diagon/#Sequence)
- [Medium-like image loading](https://discourse.gohugo.io/t/medium-like-lazy-loading-of-images/16016)
- [Lozad - lazyload images, iframe (~ 1Kb)](https://github.com/ApoorvSaxena/lozad.js)
- [Google web dev - lazy load](https://web.dev/fast/#lazy-load-images-and-video)

## `assets` vs `static`

```txt
.
└── ...
└── assets
└── static
└── ...
```

### `assets`

`assets`: Stores all the files which need be processed by Hugo Pipes. Only the files whose `.Permalink` or `.RelPermalink` are used will be published to the public directory.

Tài nguyên trong `assets` chỉ có thể access trong template (`.html`) như layout hoặc shortcode, không access được bởi markdown.

> Note: assets directory is not created by default.

### `static`

`static`: Stores all the static content: images, CSS, JavaScript, etc. When Hugo builds your site, all assets inside your static directory are copied over as-is. A good example of using the static folder is for verifying site ownership on Google Search Console, where you want Hugo to copy over a complete HTML file without modifying its content.

Multiple static directories are allowed by setting `staticDir` in `config` file. All the files in all the static directories will form a union filesystem.

```yml
staticDir:
  - static
  - data-files
```

> From Hugo 0.31 you can have multiple static directories.

Files inside `static` get served statically (as-is, **no modification**) on the site root. As a result, they can be accessed easily inside markdown posts or in layouts, just by using a slash `/`.

For examples, using the following `static` directory structure,

```txt
static
└── monalisa.jpg
└── books
    └── le-petit-prince.pdf
```

You can insert `/monalisa.jpg` and `/books/le-petit-prince.pdf` into your markdown or layout files.

As downside of leaving files intact, _the larger the images, the longer they take to load_.

### Image optimization with `assets`

Hugo hỗ trợ sẵn các tác vụ chỉnh sửa ảnh cơ bản ngay trên object ảnh được load vào template. Yêu cầu ảnh phải là global resources (nằm trong thư mục `assets`) hoặc page resources (nằm trong thư mục của bài viết, truy cập thông qua page bundle).

Người viết muốn giữ văn bản và tài nguyên của một bài viết được tách riêng: văn bản trong `content` và hình ảnh trong `assets`.

- `assets` sẽ chứa hình ảnh của bài viết, hay chung hơn, các tài nguyên cần được xử lý ở build time.
- `static` sẽ chứa các hình ảnh như favicon hoặc các định dạng khác như pdf, hay chung hơn, các tài nguyên nguyên bản, không cần xử lý gì thêm.

Vậy làm sao để insert hình ảnh trong `assets` vào markdown?

Như đã nói, hình ảnh trong `assets` chỉ access được trong template, ta sẽ tạo một shortcode để đọc hình ảnh đã xử lý và nhúng shortcode vào markdown.

```txt
markdown --- shortcode --- images in `assets`
```

## Demo
