---
title: "Tấn công tống tiền MongoDB"
date: 2023-08-29T22:48:49+05:30
categories:
  - Bảo mật
tags:
  - mongodb
  - ransom
  - ransacking
draft: false
summary: Tính tiện lợi không bắt buộc phải đánh đổi bằng tính an toàn.
cover:
  image: "https://source.unsplash.com/O2hWIsGiBhI"
  alt: "The Temple of Flora; or Garden of Nature: The Queen Flower 1812 Philip Reinagle (British, 1749–1833) publisher Dr. Thornton Jany. 1, 1812 England, Late 18th- Early 19th century Etching and aquatint hand-colored with watercolor Gift of Robert Hays Gries 1953.436"
  caption: "Photo by The Cleveland Museum of Art on Unplash"
---

## Triệu chứng

Các test case cuối cùng cũng chạy xong (trong một chiều không gian lý tưởng), bạn háo hức chuẩn bị dữ liệu cho ứng dụng tuyệt vời của mình bằng một bản MongoDB với admin [Mongo Express](https://github.com/mongo-express/mongo-express). Khởi tạo xong xuôi, chưa kịp bung dữ liệu thì bạn tròn mắt khi database (db) ứng dụng đã biến mất, thay vào đó là một db gì đâu đầy mùi đòi tiền:

{{< im "/images/gallery/ransom-mongo/readme-to-recover.png" "Recover what? 💀" 720 >}}

Cái db trời đánh này chỉ có 1 bản ghi, và tất nhiên là xin đểu.

```js
{
    _id: ObjectId('64ee1e791b60b7b540eb9470'),
    content: 'All your data is backed up. You must pay 0.0125 BTC to 19GCf7HvckzroTEQQcAfotci9WDkzpk5jW In 48 hours, your data will be publicly disclosed and deleted. (more information: go to http://iplis.ru/data1)After paying send mail to us: rambler+15v6h@onionmail.org and we will provide a link for you to download your data. Your DBCODE is: 15V6H'
}
```

Sự chậm chạp bung dữ liệu lại khiến bạn thở phào nhẹ nhõm. Tự dưng thấy xót ngang cho sự kém may mắn của một bên là bọn hacker đã ăn cắp một cái db rỗng và một bên các đồng nghiệp khác với db đã bung dữ liệu. Quăng chài mà, trăm chú son một là có tiền rồi.

Nếu db đã có dữ liệu rồi thì rụng tim là thật.

## Bắt bệnh

Khuyến cáo đầu tiên từ các chuyên gia là __không chuyển tiền__. Ở thời điểm viết bài, 0.0125 BTC tương đương 350 USD. Không có gì đảm bảo là hacker sẽ backup db cả, khi đó thì tật vẫn mang mà tiền vẫn mất.

Kẻ tấn công thực hiện quét toàn bộ địa chỉ IP trên Internet vào port mặc định `27017` của MongoDB. Nếu phát hiện có mở port ra Internet, chúng sử dụng script để xâm nhập và xóa dữ liệu của người dùng và để lại một db tống tiền.

{{< im "/images/gallery/ransom-mongo/expose-27017.png" "Mở cửa mời trộm vào" 720 >}}

Database được triển khai với các thiết lập mặc định và bộc lộ port mặc định ra toàn thế giới. Sự hớ hênh này tạo nên miếng mồi ngon cho các nhóm hacker, nổi tiếng nhất phải kể đến nhóm `Kraken` với vài chục ngàn nạn nhân. Đây cũng là nhóm đã từng thực hiện phát tán ransomware Kraken trên Windows, bởi hai sự kiện sử dụng chung email `kraken0@india.com`.

## Thuốc

Nếu bạn không có backup thì xin chia buồn. Hãy thường xuyên backup database như thể chỉ 5 giây sau bạn sẽ mất chúng.

Khẩu quyết lại là "Phòng bệnh hơn chữa bệnh". Một số việc phải làm khi đưa db lên production:

1. Bật access control và authentication.
1. Đảm bảo an ninh cho server db với firewall kiểm soát lưu lượng vào ra.
1. Không cho phép SSH với quyền root.

Tham khảo [checklist bảo mật chi tiết](https://www.mongodb.com/docs/manual/administration/security-checklist) từ MongoDB.

## Tài liệu tham khảo

- [Over 27,000 MongoDB Databases Held For Ransom Within A Week](https://thehackernews.com/2017/01/mongodb-database-security.html)
- [How to Avoid a Malicious Attack That Ransoms Your Data](https://www.mongodb.com/blog/post/how-to-avoid-a-malicious-attack-that-ransoms-your-data)
