---
title: 'Vỡ lòng về mô tả dữ liệu - Phần 1: JSON Schema'
date: 2022-09-27 06:11:48
categories:
  - Lập trình
tags:
  - javascript
  - json-schema
series:
  - JSON Schema
series_order: 1
summary: Để lái xe giỏi thì cần tập lái nhiều hay trở thành kỹ sư kỹ thuật ô tô?
---

Để lái xe giỏi thì cần tập lái nhiều hay trở thành [kỹ sư kỹ thuật ô tô](https://www.howacarworks.com/)?

> JSON Schema là một công cụ mạnh mẽ để mô tả và xác minh cấu trúc dữ liệu JSON. Bài viết sau đây giới thiệu sơ lược về công cụ này, tham khảo chính từ cuốn sách [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/index.html).

## JSON là gì?

JSON là viết tắt của “JavaScript Object Notation”, là một định dạng văn bản đơn giản cho phép lưu trữ và trao đổi dữ liệu. Dựa trên Javascript nên JSON dễ dàng tích hợp và sử dụng trong môi trường web, nhưng ưu điểm dễ dùng và linh hoạt giúp JSON được đón nhận rộng rãi trong nhiều môi trường khác ngoài web.

JSON có 7 kiểu dữ liệu:

- object

```json
{ "key1": "value1", "key2": "value2" }
```

- array

```json
["first", "second", "third"]
```

- number

```json
42
3.1415926
```

- string

```json
"This is a string"
```

- boolean

```json
true
false
```

- `null`

Các ngôn ngữ lập trình về cơ bản đều có các kiểu dữ liệu này, chỉ khác tên gọi.

|JSON|Python|Ruby|
|---|---|---|
|string|string|String|
|number|int/float|Integer/Float|
|object|dict|Hash|
|array|list|Array|
|boolean|bool|TrueClass/FalseClass|
|null|None|NilClass|

Mọi dữ liệu có cấu trúc đều có thể xây dựng được từ những kiểu dữ liệu nguyên tử kể trên.

## Tại sao phải mô tả dữ liệu?

Giả sử, ta cần lưu dữ liệu về nhân sự của một công ty gồm các thông: tên, sinh nhật và địa chỉ. Hai cách biểu diễn sau đây đều đáp ứng được yêu cầu.

```json
// #1
{
  "name": "George Washington",
  "birthday": "February 22, 1732",
  "address": "Mount Vernon, Virginia, United States"
}

// #2
{
  "first_name": "George",
  "last_name": "Washington",
  "birthday": "1732-02-22",
  "address": {
    "street_address": "3200 Mount Vernon Memorial Highway",
    "city": "Mount Vernon",
    "state": "Virginia",
    "country": "United States"
  }
}
```

Vậy thiết kế nào là đúng? Câu trả lời là không có đúng hay sai, tất cả phụ thuộc vào yêu cầu của ứng dụng. Tuy vậy, một điều quan trọng để ứng dụng có thể xử lý được dữ liệu đó là nó cần biết chính xác cấu trúc của dữ liệu đó. Nếu ứng dụng Quản lý nhân sự công ty nhận được dữ liệu của một nhân viên, _địa chỉ là string hay object? Sinh nhật biểu diễn theo định dạng nào? Lưu tên đầy đủ (`name` theo cách 1) hay tách riêng ra tên và họ (`first_name` và `last_name` theo cách 2)?_ Cần có một cách để mô tả lại cấu trúc dữ liệu và đánh giá tính hợp lệ của dữ liệu dựa trên mô tả đó.

Lập trình viên nào cũng có một thời "code trên giấy", hay sử dụng "giả mã" (pseudo-code) để mô tả thuật toán. Giờ ta thử dùng ngôn ngữ tự nhiên để mô tả cấu trúc số 1.

```yaml
- name:
  - kiểu: string
- birthday:
  - kiểu: string
  - định dạng: MMMM DD, YYYY
- address:
  - kiểu: string
```

Soi vào bản mô tả này sẽ đánh giá được:

- Hình dạng của dữ liệu: có đủ các 3 trường `name`, `birthday`, `address` không?
- Kiểu của từng trường dữ liệu có đúng ko?
- Định dạng có đúng không?

## JSON Schema

Đây là lúc mà JSON Schema xuất hiện để viết lại bản mô tả ta tự làm ở trên theo một cú pháp chặt chẽ và chuẩn hóa, đảm bảo dễ đọc cho người và dễ hiểu cho máy. Thiết kế số 2 được mô tả theo JSON Schema như sau:

```json
{
  "type": "object",
  "properties": {
    "first_name": { "type": "string" },
    "last_name": { "type": "string" },
    "birthday": { "type": "string", "format": "date" },
    "address": {
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" },
        "country": { "type" : "string" }
      }
    }
  }
}
```

Xác minh theo schema này sẽ "đánh trượt" dữ liệu theo thiết kế số 1 ngay khi không nhìn thấy trường nào tên là `first_name` cả!

Điểm thú vị ở JSON Schema nằm ở chỗ ta đang __dùng chính JSON để mô tả lại cấu trúc của một dữ liệu JSON khác__. Do đó, JSON Schema không thể viết tùy tiện, mà phải tuân thủ theo các ràng buộc được mô tả chi tiết trong [đặc tả kỹ thuật](https://github.com/json-schema-org/json-schema-spec). Các công cụ xác minh dữ liệu (data validation) theo JSON Schema cần thực hiện ở 2 mức:

1. [Xác minh schema](https://www.jsonschemavalidator.net/)
2. Xác minh dữ liệu theo schema

Hy vọng bài viết này giúp bạn có hình dung chung về sự cần thiết của ngôn ngữ mô tả dữ liệu như JSON Schema.
