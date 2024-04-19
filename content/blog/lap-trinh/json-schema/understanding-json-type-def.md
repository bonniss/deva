---
title: 'Vỡ lòng về mô tả dữ liệu - Phần 2: JSON Type Definition'
date: 2022-09-29 06:11:48
categories:
  - Lập trình
tags:
  - javascript
  - json-schema
  - jtd
series:
  - JSON Schema
series_order: 2
summary: Để lái xe giỏi thì cần tập lái nhiều hay trở thành kỹ sư kỹ thuật ô tô?
---

Để lái xe giỏi thì cần tập lái nhiều hay trở thành [kỹ sư kỹ thuật ô tô](https://www.howacarworks.com/)?

> Mô tả và xác minh dữ liệu là nhu cầu cần thiết với hầu hết mọi ứng dụng. Bài viết sau đây giới thiệu về JSON Type Definition - một ngôn ngữ mô tả dữ liệu như JSON Schema. Nếu bạn chưa từng nghe tới JSON hay ngôn ngữ mô tả dữ liệu, hãy xem [phần 1: giới thiệu về JSON và JSON Schema](/blog/lap-trinh/json-schema/understanding-json-schema).

## JSON Type Definition là gì?

[JSON Type Definition hay JSON Type Def hay JTD](https://github.com/jsontypedef/jsontypedef.com), có tên đặc tả là [RFC 8927](https://tools.ietf.org/html/rfc8927), là một ngôn ngữ được chuẩn hóa để mô tả dữ liệu JSON. JTD có thể được sử dụng để xác minh dữ liệu JSON, sinh dữ liệu giả, sinh code với nhiều ngôn ngữ lập trình.

Tương tự như JSON Schema, JTD sử dụng chính JSON để mô tả dữ liệu JSON. Dưới đây là một ví dụ:

```json
{
  "properties": {
    "name": { "type": "string" },
    "isAdmin": { "type": "boolean" }
  }
}
```

Viết schema bằng YAML, rồi chuyển đổi sang JSON, cũng là một cách làm hay được sử dụng trong thực tế.

```yaml
properties:
  name:
    type: string
  isAdmin:
    type: boolean
```

## Tạo schema trong JTD

Tính đến tháng 9/2022 - thời điểm viết bài này, một schema viết bằng JTD thuộc, và phải thuộc, một trong 8 kiểu sau:

1. Rỗng: chấp nhận bất cứ kiểu dữ liệu nào, giống `Object` Java hay `any` TypeScript.

```json
{}
```

2. `type`: chấp nhận các kiểu dữ liệu nguyên thủy trong Java hay Typescript.

```json
{ "type": "boolean" }

{ "type": "timestamp" }

{ "type": "float64" }
```

3. `enum`: chấp nhận một tập hợp giá trị được định nghĩa sẵn, giống `enum` trong Java hay Typescript.

```json
{ "enum": ["FOO", "BAR", "BAZ"] }
```

4. `elements`: chấp nhận một mảng, giống `List<T>` Java hay `T[]` TypeScript.

```json
{ "elements": { "type": "string" } }

// accepts: ["foo", "bar"]
// rejects: [1, 2, 3]
```

5. `properties`: chấp nhận dữ liệu có cấu trúc được định nghĩa, giống `class` Java hoặc `interface` TypeScript.

```json
{
    "properties": {
        "name": { "type": "string" },
        "isAdmin": { "type": "boolean" }
    }
}

// accepted
{ "name": "Abraham Lincoln", "isAdmin": true }

// rejected
{ "name": "Abraham Lincoln", "isAdmin": true, "extra": "stuff" }
```

6. `values`: chấp nhận dữ liệu kiểu key-value, giống `Map<String, T>` Java hay `{ [key: string]: T}` TypeScript.

```json
{ "values": { "type": "boolean" }}

// accepted
{"a": true, "b": false}

// rejected
{"a": 123}
```

7. `discriminator`: mô tả cấu trúc phức hợp, tham khảo [tagged union](https://www.wikiwand.com/en/Tagged_union).

```json
{
    "discriminator": "eventType",
    "mapping": {
        "USER_CREATED": {
            "properties": {
                "id": { "type": "string" }
            }
        },
        "USER_PAYMENT_PLAN_CHANGED": {
            "properties": {
                "id": { "type": "string" },
                "plan": { "enum": ["FREE", "PAID"]}
            }
        },
        "USER_DELETED": {
            "properties": {
                "id": { "type": "string" },
                "softDelete": { "type": "boolean" }
            }
        }
    }
}

// possible accepted data
{ "eventType": "USER_CREATED", "id": "users/123" }
{ "eventType": "USER_CREATED", "id": "users/456" }
{ "eventType": "USER_PAYMENT_PLAN_CHANGED", "id": "users/789", "plan": "PAID" }
{ "eventType": "USER_PAYMENT_PLAN_CHANGED", "id": "users/123", "plan": "FREE" }
{ "eventType": "USER_DELETED", "id": "users/456", "softDelete": false }
```

8. `ref`: tham chiếu đến một schema khác nhằm dùng lại schema (DRY).

```json
{
    "definitions": {
        "coordinates": {
            "properties": {
                "lat": { "type": "float32" },
                "lng": { "type": "float32" }
            }
        }
    },
    "properties": {
        "userLoc": { "ref": "coordinates" },
        "serverLoc": { "ref": "coordinates" }
    }
}

// accepted
{ "userLoc": { "lat": 50, "lng": -90 }, "serverLoc": { "lat": -15, "lng": 50 }}
```

Muốn biết chi tiết hơn? Bắt đầu ngay [học JTD trong 5 phút](https://jsontypedef.com/docs/jtd-in-5-minutes/).

## So sánh với JSON Schema

<table>
<thead>
<tr>
<th></th>
<th>JSON Schema</th>
<th>JTD</th>
</tr>
</thead>

<tbody>
<tr>
<th>Ưu điểm</th>
<td>
{{% md %}}
- Được sử dụng rộng rãi
- Được dùng trong đặc tả kỹ thuật của OpenAPI
- Hỗ trợ nhiều kịch bản phức tạp
  - Untagged union và logic boolean
  - Schema có điều kiện, schema phụ thuộc
  - Ràng buộc kích thước number, string, array và object theo định dạng và pattern
  - Định nghĩa dữ liệu trải trên nhiều schema với `unevaluatedProperties`
- Hiệu quả trong xác minh object Javascript hoặc file cấu hình
{{% /md %}}
</td>
<td>
{{% md %}}
- Tích hợp với type system của nhiều ngôn ngữ phổ biến, nên tối ưu cho sinh type, tạo parser/serializer từ/cho các ngôn ngữ này.
- Nhiều tool tích hợp sẵn: ngoài sinh type còn có sinh schema từ object, tạo data giả
- Đơn giản từ thiết kế, dễ dàng thực thi, bảo đảm ổn định giữa các phiên bản
- Hỗ trợ sẵn cho tagged union
- Tập trung mô tả hình dạng của dữ liệu JSON thông qua các kiểu mẫu định nghĩa có cú pháp chặt chẽ, thay vì mô tả ràng buộc
- Thiết kế để với tôn chỉ hạn chế sai sót từ người dùng
- Đặc tả được chấp thuận là RFC8927
{{% /md %}}
</td>
</tr>
<tr>
<th>Nhược điểm</th>
<td>
{{% md %}}
- Tập trung vào mô tả các ràng buộc hơn là mô tả hình dạng của dữ liệu
- Không hỗ trợ sẵn tagged union
- Phức tạp và dễ sai với người mới sử dụng
- Đặc tả kỹ thuật dạng Internet Draft, không phải RFC
- Một số phần trong đặc tả rất khó để thực thi
{{% /md %}}
</td>
<td>
{{% md %}}
- Còn khá mới, cộng đồng còn hạn chế
- Đặc tả không nêu rõ về meta-schema
- Ít tính năng hơn, nghĩa là không hỗ trợ nhiều kịch bản phức tạp như JSON Schema
{{% /md %}}
</td>
</tr>
</tbody>
</table>

## Tham khảo

- [[Official website] Schemas for JSON optimized for code generation](https://jsontypedef.com/)
- [[ajv] Choosing schema language](https://ajv.js.org/guide/schema-language.html#comparison)
