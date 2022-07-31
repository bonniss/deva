---
title: Tối ưu hình ảnh trong Hugo
description: Hugo được trang bị sẵn khả năng xử lý ảnh cho phép tự động tối ưu hình ảnh trong trang
draft: false
date: 2021-07-26 09:32:08
categories:
  - Lập trình
tags:
  - jamstack
  - hugo
  - ssg
  - cms
  - image-manipulation
---

Một bức ảnh có sức nặng hơn vạn lời nói. Và còn có sức nặng hơn nếu nó nhẹ hơn!

<!--more-->

> [Hugo](https://gohugo.io/) là một bộ sinh trang web tĩnh (SSG - Static Site Generator) mã nguồn mở. Được xây dựng trên ngôn ngữ Go, Hugo nổi tiếng bởi tốc độ build siêu nhanh (< 1ms mỗi trang) và các tính năng hỗ trợ xây dựng nội dung mạnh mẽ. Từ blog cá nhân, trang quảng bá, trang tài liệu đến trang thương mại điện tử, Hugo đáp ứng được đa dạng nhu cầu về nội dung và lĩnh vực. Bài viết sau đây dành cho người đã có kiến thức cơ bản về dựng website với Hugo.

## Tại sao phải tối ưu hình ảnh?

"Trăm nghe không bằng một thấy". Hình ảnh, cùng với video, là tài nguyên được sử dụng nhiều nhất trên Internet. Phần lớn lưu lượng truy cập vào một website tiêu tốn vào việc tải xuống hình ảnh để hiển thị. Với phần đông website, mục đích của hình ảnh là để truyền tải thông tin tiếp nhận qua thị giác. Sự phát triển của các thuật toán nén ảnh số cho phép lưu ảnh ở một dung lượng ngày càng giảm trong khi vẫn lưu giữ được độ nét của ảnh ở mức chấp nhận được. Như trong minh họa trên trang chủ của [TinyPNG](https://tinypng.com/), công cụ tối ưu ảnh online nổi tiếng, bạn có nhận ra sự khác biệt nào giữa hai bức ảnh có dung lượng chênh nhau 300% dưới đây?

{{< im src="images/gallery/hugo-optimize/tinypng.png" width=600 >}}

Do đó, tối ưu hình ảnh trên website chủ yếu nhắm đến việc giảm dung lượng mà vẫn giữ được chất lượng hình ảnh, từ đó, giảm thời gian tải trang, tăng khoái cảm cho người dùng website (>‿◠)✌

## Trước khi bắt đầu

Trong Hugo, thư mục `static` có thể được sử dụng để lưu trữ hình ảnh. Tuy nhiên, các file trong `static` sẽ được "bê" y nguyên không xử lý gì qua thư mục output ở build time.

Để Hugo có thể xử lý ảnh, bạn cần tổ chức hình ảnh dưới 1 trong những dạng sau:

1. Tài nguyên trang (Page resources)
2. Tài nguyên toàn cục (Global resources)

Với cách 1, hình ảnh được gom về cùng chỗ với trang mà nó được sử dụng. Thư mục của từng trang con được Hugo gọi là "page bundle".

```txt
content/
└── posts/
    └── post-1/           <-- page bundle
        ├── index.md
        └── sunset.jpg    <-- page resource
```

Mô tả xử lý hình ảnh chỉ viết được trong Go template, không phải Markdown. Để gọi hình ảnh tài nguyên trang trong template:

```golang
{{ $image := resources.Get "images/sunset.jpg" }}
```

Với cách 2, hình ảnh được lưu trữ theo một trong các cách sau:

- Trong thư mục `assets`
- Trong thư mục được mount tới `assets`
- Trên máy khác truy cập được thông qua HTTP

```txt
assets/
└── images/
    └── sunset.jpg    <-- global resource
```

Để gọi hình ảnh tài nguyên toàn cục trong template:

```golang
{{ $image := resources.Get "images/sunset.jpg" }}
```

Khi hình ảnh nằm ở máy chủ khác:

```golang
{{ $image := resources.GetRemote "https://gohugo.io/img/hugo-logo.png" }}
```

## Tự động xử lý ảnh với Hugo

Hugo hỗ trợ sẵn [các tác vụ chỉnh sửa ảnh cơ bản](https://gohugo.io/content-management/image-processing/#image-processing-methods) ngay trên object ảnh được đưa vào template. Sử dụng khả năng sẵn có này, ta đặt ra các yêu cầu tự động xử lý như sau:

1. Giảm chất lượng với hình ảnh trong trang xuống 80%
2. Chèn được hình ảnh khi viết Markdown
3. Resize hình ảnh tùy ý trong Markdown.

### Cấu hình xử lý ảnh mặc định

Hugo hỗ trợ khai báo các [tùy chọn mặc định cho xử lý hình ảnh](https://gohugo.io/content-management/image-processing/) trong file config với tên section là `imaging`:

```yml
# config.yml
imaging:
  anchor: Smart
  bgColor: '#ff0000'
  hint: photo
  quality: 80   # Chất lượng hình ảnh theo %
  resampleFilter: MitchellNetravali   # Thuật toán lấy mẫu
  exif:
    disableDate: false
    disableLatLong: false
    excludeFields: ""
    includeFields: ""
```

### Khai báo xử lý ảnh trong Markdown

Do các phương thức xử lý ảnh chỉ gọi được trong Go template, ta cần viết 1 shortcode để chèn được ảnh vào Markdown. Shortcode dưới đây có cú pháp sử dụng gần giống với thẻ `img` trong HTML.

```html
<!-- layouts/shortcodes/im.html -->
<!--
  Shortcode to insert image into .md files.
  - Support image caption
  - Support build-time image sizes
  - Support image `config` options.
  - Can be used with positional params, named params or both
-->

{{ $src := or (.Get "src") (.Get 0) }}
{{ $alt := or (.Get "alt") (.Get 1) }}
{{ $width := or (.Get "width") (.Get 2) }}
{{ $height := or (.Get "height") (.Get 3) }}
{{ $img := resources.Get ($src) }}

{{ with $img }}
  {{ $width = or $width $img.Width }}
  {{ $height = or $height $img.Height }}

  {{
    $size := printf "%vx%v"
      (cond (eq $width $img.Width) "" $width)
      (cond (eq $height $img.Height) "" $height)
  }}

  {{ with ne $size "x" }}
    {{ $img = $img.Resize $size }}
  {{ end }}

  <figure class="my3 center">
    <img style="max-width: 100%; height: auto; margin: 0 auto;"
      src="{{ $img.RelPermalink }}"
      {{ with $alt }} alt="{{$alt}}" {{ end }}
      {{ with $width }} width="{{$width}}" {{ end }}
      {{ with $height }} height="{{$height}}" {{ end }}
    />
    {{ with $alt }}
    <figcaption style="font-weight: 400; font-style: italic;">
      <small>{{ $alt }}</small>
    </figcaption>
    {{ end }}
  </figure>
{{ end }}
```

Phiên bản shortcode trên cho phép:

- Tự động căn giữa hình ảnh.
- Tự động hiện title khi truyền vào `alt`.
- Resize hình ảnh đến kích thước chỉ định khi truyền vào cả `width` và `height`.
- Resize hình ảnh giữ tỷ lệ khi chỉ 1 trong 2 tham số `width` hoặc `height` được khai báo.
- Không resize khi không truyền `width` và `height`, hoặc `width` và `height` bằng với kích thước gốc của ảnh.

Sử dụng shortcode như sau:

```golang
{{</* im src="images/sunset.jpg" alt="Hoàng hôn biển vắng" width=400 */>}}
```

{{< im src="images/sunset.jpg" alt="Hoàng hôn biển vắng w200" width=200 >}}

{{< im src="images/sunset.jpg" alt="Hoàng hôn biển vắng w400" width=400 >}}

{{< im src="images/sunset.jpg" alt="Hoàng hôn biển vắng w600" width=600 >}}

Bạn có thể tùy chỉnh shortcode trên theo yêu cầu để có thể chọn lượng chất lượng ảnh, thuật toán lấy mẫu, etc. Khi không chỉ định, các tùy chọn mặc định trong file `config` sẽ được sử dụng.

## Tham khảo

- [Image processing - Hugo docs](https://gohugo.io/content-management/image-processing)
