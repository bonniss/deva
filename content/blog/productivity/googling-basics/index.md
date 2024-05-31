---
title: 'Sổ tay Gúc-thủ: Kỹ thuật xây dựng từ khóa'
description: '"Googling" hay "gúc", chỉ hoạt động tìm kiếm thông tin thông qua Google; Tìm kiếm hiệu quả hơn thông qua các kỹ thuật xây dựng từ khóa hiệu quả.'
date: 2023-02-08T0:17:53+07:00
math: true
draft: false
categories:
  - Hiệu suất
tags:
  - productivity
  - googling
summary: "\"Bạn có thể thấy Google ngon, chứ tôi vẫn thấy nó tệ vl.\" - Larry Page"
series:
  - Sổ tay Gúc-thủ
series_order: 1
cover:
  image: "https://source.unsplash.com/45sDm4wCOWc"
  alt: "A natural hole towards the sky, from the sea."
  caption: "Photo by Alev Takil on Unplash"
---

{{< lead >}}
__Lời dẫn__
{{< /lead >}}

Google - đế chế Internet lớn nhất hành tinh, đã đi [một chặng đường dài](https://www.google.com/search/howsearchworks/our-history/) để phát triển từ một dự án nghiên cứu của hai nhà khoa học máy tính Larry Page và Sergei Brin đến cỗ máy tìm kiếm điều khiển hoạt động của nhân loại. Sẽ thật khó tưởng tượng cuộc sống của một công dân hiện đại sẽ ra sao nếu các sản phẩm đến từ hệ sinh thái của Google đột nhiên biến mất.

Với công cụ tìm kiếm của mình, từ lâu tên của đế chế Internet này đã trở thành một động từ chỉ hành động "tìm kiếm câu trả lời trên Internet". Dễ dàng bắt gặp ở bất cứ đâu cuộc nói chuyện kiểu:

> "Làm sao để hack được 4G Việt ten dùng tẹt nhỉ?" ~ "Dễ ẹc, google không tính phí!".

Tìm kiếm Google là thứ gần với ChatGPT nhất cho đến gần đây. Kể cả AI có bành trướng, tìm kiếm Google vẫn có chỗ đứng của riêng nó, và việc tìm kiếm sao cho đúng, đủ, nhanh vẫn luôn là kỹ năng mà bất cứ công dân số nào nên trang bị.

{{< alert >}}
Lưu ý công cụ tìm kiếm Google thay đổi theo thời gian. Các tính năng trình bày trong bài viết này hoạt động ở thời điểm viết bài.
{{</ alert>}}

---

## Cung cấp từ khoá hiệu quả

### Không cần viết hoa

Mặc định, Google không phân biệt hoa thường.

### Chỉ nhập từ quan trọng

- Tập trung vào từ mang thông tin
- Tìm từ đồng nghĩa ngắn gọn
- Bỏ qua mạo từ, trạng từ, túc từ, đại từ, giới từ không mang tin

Bởi đó cũng là cách Google trích rút thông tin trong từ khoá nhận được.

❌ `cách cài đặt windows trên máy tính macbook`

✅ `cài windows trên macbook`

### "Phải chứa cụm từ"

Bỏ cụm từ vào dấu nháy kép `""`.

- `phần mềm chỉnh sửa ảnh "windows 11"`

### A hoặc B `OR`

Dùng toán tử `OR` (phải viết hoa) hoặc `|`.

- `climate change OR global warming`
- `jobs | gates`

### A và B `AND`

Dùng toán tử `AND` (phải viết hoa) hoặc `&`.

- `jobs AND gates`
- `climate change & global warming`

### Khớp bất kỳ `*`

- `david * liverpool`
- `nguyễn sinh * nghệ an`

### -"Không chứa cụm từ"

Đặt dấu trừ `-` ngay trước từ muốn loại ra. Với cụm từ nhớ sử dụng dấu nháy kép.

- `loài gặm nhấm -chuột`
- `nhạc trẻ hay -"hồ quang hiếu"`

### Gom (nhóm)

- `(tủ lạnh OR máy giặt) samsung`

có thể xem như tương đương

- `tủ lạnh samsung OR máy giặt samsung`

### Có khoảng..số

Sử dụng hai dấu chấm liên tiếp `..`.

- `sơ mi 100k..300k`
- `quần 160..170 cm`
- `gà 1..3 kg`

## Thu gọn kết quả hiệu quả

### Chỉ hiện kết quả ở trang `site:`

Sử dụng bộ lọc `site:` với giá trị có thể là tên miền đầy đủ hoặc đuôi tên miền.

- `explain like im 5 site:reddit.com`
- `css tools site:dev.to`
- `site:gov "George Washington"`
- `site:co.uk tech`
- `site:lifewire.com OR site:nasa.gov "electric vehicles"`

Lưu ý sau bộ lọc `site:` không có dấu cách.

❌ `center a div site: stackoverflow.com`

✅ `center a div site:stackoverflow.com`

### Lọc kết quả theo `filetype:`

Dùng bộ lọc `filetype:` hoặc `ext:`.

Tìm tài liệu PDF về xác suất thống kê.

- `xác suất thống kê filetype:pdf`

### Lọc kết quả theo thời gian

Sử dụng bộ lọc `before:`, `after:`.

- `gia vang before:2010`
- `ngo bao chau after:2016`
- `covid after:2020 before:2022`

Hoặc sử dụng công cụ lọc thời gian trên giao diện.

![Công cụ lọc thời gian](gg/tools.png)

### Lọc kết quả có từ khoá trong…

#### Đường dẫn của trang

- `inurl:apple`: chứa một từ khoá trong đường dẫn (URL) của trang.
- `allinurl:apple iphone`: chứa nhiều từ khoá trong đường dẫn (URL) của trang.

#### Tiêu đề

Tiêu đề thường là nội dung `title` hoặc `h1` trong HTML.

- `intitle:apple`: chứa một từ khoá trong tiêu đề.
- `allintitle:apple iphone`: chứa nhiều từ khoá trong tiêu đề.

#### Văn bản

- `intext:apple`: chứa một từ khoá trong văn bản thân bài.
- `allintext:apple iphone`: chứa nhiều từ khoá trong văn bản thân bài.

#### Liên kết

- `inanchor:apple`: chứa một từ khoá trong liên kết trong thân bài.
- `allinanchor:apple iphone`: chứa nhiều từ khoá trong liên kết trong thân bài.

## Tài liệu tham khảo

- [[Ahrefs] Google advanced search operators](https://ahrefs.com/blog/google-advanced-search-operators/)
- [[GoogleGuide] Sharpening queries](https://www.googleguide.com/sharpening_queries.html)
- [[Google blog] Refine Google searches](https://support.google.com/websearch/answer/2466433)
