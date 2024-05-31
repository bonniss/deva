---
title: "Sổ tay Gúc-thủ"
description: Tìm kiếm hiệu quả bằng các kỹ thuật xây dựng từ khoá trên Google.
date: 2023-02-18T4:17:53+07:00
math: true
draft: false
categories:
  - Hiệu suất
tags:
  - productivity
  - googling
summary:
cover:
  image: "https://source.unsplash.com/5h5mpf0ivCg"
  alt: "NIKON CORPORATION, NIKON D80"
  caption: "Photo by JJ Ying on Unplash"
---

Google - đế chế Internet lớn nhất hành tinh, đã đi [một chặng đường dài](https://www.google.com/search/howsearchworks/our-history/) để phát triển từ một dự án nghiên cứu của hai nhà khoa học máy tính Larry Page và Sergei Brin đến cỗ máy tìm kiếm điều khiển hoạt động của nhân loại. Sẽ thật khó tưởng tượng cuộc sống của một công dân hiện đại sẽ ra sao nếu các sản phẩm đến từ hệ sinh thái của Google đột nhiên biến mất.

Với công cụ tìm kiếm của mình, từ lâu tên của đế chế Internet này đã trở thành một động từ chỉ hành động "tìm kiếm câu trả lời trên Internet". Dễ dàng bắt gặp ở bất cứ đâu cuộc nói chuyện kiểu:

> "Làm sao để hack được 4G Việt ten dùng tẹt nhỉ?" ~ "Dễ ẹc, google không tính phí!".

Tìm kiếm Google là thứ gần với ChatGPT nhất cho đến gần đây. Kể cả AI có bành trướng, tìm kiếm Google vẫn có chỗ đứng của riêng nó, và việc tìm kiếm sao cho đúng, đủ, nhanh vẫn luôn là kỹ năng mà bất cứ công dân số nào nên trang bị.

{{< alert >}}
Lưu ý công cụ tìm kiếm Google thay đổi theo thời gian. Các tính năng trình bày trong bài viết này hoạt động ở thời điểm viết bài.
{{</ alert>}}

## Tính năng "Tìm kiếm nâng cao"

[Tìm kiếm nâng cao](https://www.google.com/advanced_search) cung cấp rất nhiều tham số tìm kiếm khác để chuốt lọc nhu cầu tìm kiếm của người dùng.

Truy cập Tìm kiếm nâng cao (TKNC) theo hình dưới đây.

![](gg/as-loc.png)

Giao diện người dùng của tính năng TKNC chia làm 2 phần ứng với 2 nhóm kỹ thuật trong hoạt động tìm kiếm:

1. Cung cấp từ khoá hiệu quả
2. Thu gọn kết quả hiệu quả

![](gg/as-ui.png)

Thông giao diện của TKNC, người dùng có thể lọc kết quả theo:

- Ngôn ngữ.
- Quốc gia & vùng lãnh thổ.
- Theo khoảng thời gian.
- Theo tên miền.
- Theo loại file.
- Theo khu vực chứa từ khoá: địa chỉ web, tiêu đề, văn bản, liên kết trong thân bài.
- Theo quyền sử dụng nội dung.

Có thể xem TKNC như "sổ cái" tổng hợp các tiêu chí tìm kiếm được hỗ trợ bởi Google. Các phần tiếp theo trình bày các kỹ thuật tìm kiếm _không thông qua giao diện TKNC_ mà vẫn đạt được cùng hiệu quả, chú trọng vào các _toán tử, bộ lọc và tiện ích được tích hợp sẵn ở ô nhập văn bản tìm kiếm của Google_.

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

### A hoặc B (`OR`)

Dùng toán tử `OR` (phải viết hoa) hoặc `|`.

- `climate change OR global warming`
- `jobs | gates`

### A và B (`AND`)

Dùng toán tử `AND` (phải viết hoa) hoặc `&`.

- `jobs AND gates`
- `climate change & global warming`

### Khớp bất kỳ (`*`)

- `david * liverpool`
- `nguyễn sinh * nghệ an`

### -"Không chứa cụm từ"

Đặt dấu trừ `-` ngay trước từ muốn loại ra. Với cụm từ nhớ sử dụng dấu nháy kép.

- `loài gặm nhấm -chuột`
- `nhạc trẻ hay -"hồ quang hiếu"`

### Gom nhóm

- `(tủ lạnh OR máy giặt) samsung`

có thể xem như tương đương

- `tủ lạnh samsung OR máy giặt samsung`

### Có khoảng số

Sử dụng hai dấu chấm liên tiếp `..`.

- `sơ mi 100k..300k`
- `quần 160..170 cm`
- `gà 1..3 kg`

## Thu gọn kết quả hiệu quả

### Chỉ hiện kết quả ở ngôn ngũ L



### Chỉ hiện kết quả ở trang Z

Sử dụng bộ lọc `site:` với giá trị có thể là tên miền đầy đủ hoặc đuôi tên miền.

- `explain like im 5 site:reddit.com`
- `css tools site:dev.to`
- `site:gov "George Washington"`
- `site:co.uk tech`
- `site:lifewire.com OR site:nasa.gov "electric vehicles"`

Lưu ý sau bộ lọc `site:` không có dấu cách.

❌ `center a div site: stackoverflow.com`

✅ `center a div site:stackoverflow.com`

### Lọc kết quả là file

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

## Tiện ích

### Thời tiết

- `weather:ho chi minh`: tra thời tiết tại Hồ Chí Minh, có thể yêu cầu mở app thời tiết tương ứng trên từng OS.

### Tra từ

- `define:delicacy`: trả về định nghĩa của từ `delicacy` từ các trang từ điển.

### Bản đồ

- `map:hanoi`: xem Hanoi trên bản đồ, có thể yêu cầu mở app bản đồ tương ứng trên từng OS.

### Đổi đơn vị

{{< alert icon="circle-info">}}
Tìm kiếm Google cung cấp công cụ chuyển đổi đơn vị thông qua từ khoá: __`Unit Converter`__.

![Công cụ chuyển đổi](gg/unitconv.png)
{{</ alert>}}

Nếu không muốn mất thêm một bước gọi công cụ, sử dụng từ khoá `in` có thể đổi đơn vị ngay.

- `$200 in vnd`
- `1.45m in feet`

### Máy tính

{{< alert icon="circle-info">}}
Tìm kiếm Google cung cấp công cụ máy tính thông qua từ khoá: __`Calculator`__.

![Google calculator](gg/calc.png)

{{</ alert>}}

<div style="margin-top: 1rem;">

{{< alert>}}
Công cụ Máy tính hoạt động hiệu quả nhất với từ khoá bằng tiếng Anh. Đại chúng nên giắt lưng các thuật ngữ toán học trong thứ tiếng thượng đẳng này.
{{</ alert>}}

</div>

#### Biểu thức đại số

- `5**5`: tương đương `5^5` nghĩa là `5 luỹ thừa 5`.
- `x^2+6-2=0`: kết quả rất ảo, đại chúng hãy thử.

Máy tính Google hỗ trợ các toán tử nào? Vui lòng xem lại ảnh bên trên hoặc thực hành mở ngay Google.

#### Đồ thị

Google có thể vẽ các loại đồ thị sau:

- Hàm lượng giác.
- Hàm mũ.
- Hàm loga.
- Đồ thị 3 chiều (Yêu cầu trình duyệt hỗ trợ [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API#browser_compatibility)).

Để vẽ đồng thời nhiều đồ thị, nhập phương trình phân cách nhau bởi dấu `,`. Đồ thị kết quả có thể tương tác được (zoom, pan, hiển thị điểm dữ liệu...).

![Ví dụ đồ thị](gg/cgraph.png)

#### Hình học

- Các hình dạng hỗ trợ: Các hình cong hai chiều và ba chiều, các khối đa diện đều, đa giác, lăng trụ, kim tự tháp, tứ giác và tam giác.
- Các công thức và phương trình hỗ trợ: Diện tích, chu vi, định luật sin và cosin, cạnh huyền, chu vi, định lý Pythagoras (Pi-ta-go), diện tích bề mặt, và thể tích.

_Ví dụ_.

- Tìm đường kính hình cầu có thể tích theo gallon: `find the diameter of a sphere whose volume is 524 gallons`
- Chu vi tam giác: `perimeter of triangle`
- Diện tích hình tròn: `area of circle`
- Thể tích hình trụ: `volume of cylinder`
- Tính cạnh huyền theo Pythagoras: `a^2+b^2=c^2 calc a=4 b=7 c=?`

{{< gallery >}}
  <img src="gg/shapes/gallon.png" class="grid-w50" />
  <img src="gg/shapes/acircle.png" class="grid-w50" />
  <img src="gg/shapes/ptriangle.png" class="grid-w50" />
  <img src="gg/shapes/vcylinder.png" class="grid-w50" />
  <img src="gg/shapes/pitago.png" class="grid-w50" />
{{< /gallery >}}

### Tìm màu

{{< alert icon="circle-info">}}
Tìm kiếm Google cung cấp công cụ bảng màu thông qua từ khoá: __`Color Picker`__.

![Bảng màu](gg/colorpkr.png)
{{</ alert>}}

Người dùng có thể chuyển đổi mã màu từ các định dạng:

- Hex
- RGB
- Pantone

sang các định dạng

- Hex
- RGB
- HSV
- HSL
- CMYK

Người dùng có thể tìm màu theo từ khoá:

- `rgb (255, 255, 255)`
- `rgb 255 255 255`
- `#f0f0f0`
- `color f0f0f0`
- `pantone 214 u`
- `pms 200 c`

## Tuỳ biến đường dẫn (nâng cao)

Tuỳ biến tham số truy vấn đường dẫn (URL query param) là một cách nguy hiểm, hắc cơ kiểu kiểu vậy để thay đổi kết quả tìm kiếm. Mỗi tham số truy vấn (TSTV) là một cặp `key=value` được đặt sau dấu `?` trên địa chỉ của trang web. Chẳng hạn khi bạn tìm kiếm `"trái sầu riêng"` thì một yêu cầu với đường dẫn được gắn TSTV `q=trái+sầu+riêng` sẽ được gửi về Google để tra cứu và trả về kết quả.

![Tham số q](gg/qry.png)

Tư duy ngược một chút, nếu ta thay đổi tham số `q` và Enter thì cũng đạt được hiệu quả tìm kiếm tương tự như gõ vào ô tìm kiếm.

{{< alert icon="circle-info">}}
Dấu `+` thân thiện với địa chỉ web hơn là khoảng trắng. Đây chủ yếu là quy ước.
Mời đại chúng thử `q=măng+cụt`, `q=măng cụt`, `q=măng%20cụt` để so sánh.
{{</ alert>}}

Các kỹ thuật trong mục này sẽ tương tác với TSTV.

{{< alert icon="circle-info">}}
Truy vấn theo nhiều tham số được nối với nhau bởi dấu `&`.
{{</ alert>}}

### Lọc kết quả theo thời gian

Tên tham số: `as_qdr`. Các giá trị khả dụng.

|Giá trị|Giải thích|Ví dụ|
|--|--|--|
|`d`|Kết quả của ngày trước|`as_qdr=d`,`as_qdr=d3`|
|`w`|Kết quả của tuần trước|`as_qdr=w`|
|`m`|Kết quả của tháng trước|`as_qdr=m`|
|`y`|Kết quả của năm trước|`as_qdr=y`,`as_qdr=y15`|

## Tài liệu tham khảo

- [[Ahrefs] Google advanced search operators](https://ahrefs.com/blog/google-advanced-search-operators/)
- [[GoogleGuide] Sharpening queries](https://www.googleguide.com/sharpening_queries.html)
- [[Google blog] Refine Google searches](https://support.google.com/websearch/answer/2466433)
