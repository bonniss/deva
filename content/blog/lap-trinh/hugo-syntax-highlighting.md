---
title: Syntax highlighting trong Hugo
description: Hướng dẫn tạo syntax highlighting cho code block trong website tạo bởi Hugo
draft: false
date: 2021-04-26 22:32:08
categories:
  - Lập trình
tags:
  - cms
  - ssg
  - jamstack
  - hugo
---

Code hay dở chưa biết, nhìn phải đẹp đã.

<!--more-->

> [Hugo](https://gohugo.io/) là một bộ sinh trang web tĩnh (SSG - Static Site Generator) mã nguồn mở. Được xây dựng trên ngôn ngữ Go, Hugo nổi tiếng bởi tốc độ build siêu nhanh (< 1ms mỗi trang) và các tính năng hỗ trợ xây dựng nội dung mạnh mẽ. Từ blog cá nhân, trang quảng bá, trang tài liệu đến trang thương mại điện tử, Hugo đáp ứng được đa dạng nhu cầu về nội dung và lĩnh vực. Bài viết sau đây dành cho người mới bắt đầu sử dụng Hugo.

## Các cách tiếp cận

Có 2 cách tiếp cận khi nói đến highlight code.

1. Thực hiện ở phía browser, sử dụng Javascript ([Highlight.js](https://highlightjs.org/), [Prism.js](https://prismjs.com/)).
2. Thực hiện ở phía server, sinh sẵn mã HTML highlight bằng ngôn ngữ phía server.

### Từ browser

Nhiều theme Hugo hỗ trợ cách tiếp cận đầu tiên, chẳng hạn, theme [Paper](https://github.com/nanxiaobei/hugo-paper) cho phép cấu hình sử dụng Highlight.js.


### Từ server

Cách tiếp cận số 2 trong Hugo sử dụng [Chroma](https://github.com/alecthomas/chroma) để highlight code. Chroma, viết bằng Go, thực hiện chuyển mã nguồn thành mã HTML có highlight cú pháp với hiệu năng cao. Chroma hỗ trợ [nhiều ngôn ngữ](https://github.com/alecthomas/chroma#supported-languages) và [nhiều theme phổ biến](https://xyproto.github.io/splash/docs/all.html). Thử nghiệm highlight code bằng Chroma [tại đây](https://swapoff.org/chroma/playground/).

Ưu điểm của cách tiếp cận này so với cách thứ nhất:

- Sử dụng được với mọi theme, do được hỗ trợ mặc định bởi Hugo
- Hiệu quả hơn, do mã HTML highlight được sinh sẵn ở build time, cũng như không cần tải thêm Javascript ở browser

Phần còn lại của bài viết tập trung hướng dẫn highlight code theo cách tiếp cận số 2.

## Cấu hình mặc định

Ta có thể đặt [cấu hình mặc định cho hightlight code](https://gohugo.io/getting-started/configuration-markup#highlight) trong file `config`.

```yml
# config.yml
markup:
  highlight:
    anchorLineNos: false  # Nếu true, sinh ra link cho từng dòng code
    guessSyntax: false
    hl_Lines: ""
    hl_inline: false      # Nếu true, highlight thẻ `code` markdown
    lineAnchors: ""
    codeFences: true  # Nếu true, cho phép truyền tham số vào code fence trong Markdown
    lineNos: false    # Nếu true, hiện số thứ tự dòng code
    lineNoStart: 1    # Số thứ tự bắt đầu của dòng code
    lineNumbersInTable: true
    noClasses: true   # Nếu false, sử dụng highlight bằng Javascript
    noHl: false
    style: monokai    # Theme
    tabWidth: 4       # Độ rộng tab
```

## Sử dụng shortcode

Hugo hỗ trợ sẵn shortcode `highlight` để làm nhiệm vụ như tên gọi của nó.

```go
{{</* highlight go "linenos=true,hl_lines=11 20-26,linenostart=2" */>}}
// ... code
{{</* / highlight */>}}
```

{{< highlight go "linenos=true,hl_lines=11 20-26,linenostart=2" >}}
package main

import (
    "fmt"
    "math/rand"
    "time"
)

type Moo struct {
    Cow   int
    Sound string
    Tube  chan bool
}

// A cow will moo until it is being fed
func cow(num int, mootube chan Moo) {
    tube := make(chan bool)
    for {
        select {
        case mootube <- Moo{num, "moo", tube}:
            fmt.Println("Cow number", num, "mooed through the mootube")
            <-tube
            fmt.Println("Cow number", num, "is being fed and stops mooing")
            mootube <- Moo{num, "mooh", nil}
            fmt.Println("Cow number", num, "moos one last time out of happyness")
            return
        default:
            fmt.Println("Cow number", num, "mooed through the mootube and was ignored")
            time.Sleep(time.Duration(rand.Int31n(1000)) * time.Millisecond)
        }
    }
}
{{</ highlight >}}

## Sử dụng code fence

Khi cấu hình `codeFences: true` trong file `config`, Hugo cho phép truyền tham số vào cú pháp code fence của Markdown.

~~~txt
```go {linenos=table,hl_lines=[11,"15-17"],linenostart=2}
// ... code
```
~~~

```go {linenos=table,hl_lines=[11,"15-17"],linenostart=2}
package main

import (
    "fmt"
    "math/rand"
    "time"
)

type Moo struct {
    Cow   int
    Sound string
    Tube  chan bool
}

// A cow will moo until it is being fed
func cow(num int, mootube chan Moo) {
    tube := make(chan bool)
    for {
        select {
        case mootube <- Moo{num, "moo", tube}:
            fmt.Println("Cow number", num, "mooed through the mootube")
            <-tube
            fmt.Println("Cow number", num, "is being fed and stops mooing")
            mootube <- Moo{num, "mooh", nil}
            fmt.Println("Cow number", num, "moos one last time out of happyness")
            return
        default:
            fmt.Println("Cow number", num, "mooed through the mootube and was ignored")
            time.Sleep(time.Duration(rand.Int31n(1000)) * time.Millisecond)
        }
    }
}
```

## Tham khảo

- [Configure markup - Highlight - Hugo docs](https://gohugo.io/getting-started/configuration-markup#highlight)
- [Syntax highlighting - Hugo docs](https://gohugo.io/content-management/syntax-highlighting/)
