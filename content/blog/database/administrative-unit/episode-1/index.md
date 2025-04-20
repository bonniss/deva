---
title: Lược sử hành chính cấp tỉnh tại Việt Nam sau 1975
date: 2025-04-19T23:58:07+07:00
draft: true
categories:
  - Database
  - Lịch sử
tags:
  - Data modelling
  - Đơn vị hành chính
  - Slowly Changing Dimensions
series:
  - Phân cấp hành chính Việt Nam dưới góc nhìn dữ liệu
series_order: 1
summary: '❝Một bản đồ hành chính không chỉ ghi nhận thực tế; nó phản ánh một ý chí cầm quyền.❞ — Benedict Anderson, Imagined Communities'
---

## Về series này

Đầu năm 2025, `"sáp nhập"` trở thành một từ khoá phổ biến trên các phương tiện truyền thông cũng như các công cụ tìm kiếm tại Việt Nam. Theo [Google trends](https://trends.google.com.vn/trends/explore?cat=16&date=2025-01-01%202025-12-31&geo=VN&q=s%C3%A1p%20nh%E1%BA%ADp&hl=en) ở thời điểm viết bài này (4/2025), các tìm kiếm liên quan đến `"sáp nhập"` khởi phát từ tất cả các tỉnh thành của Việt Nam, nhiều từ khoá còn phổ biến ở mức độ [`Breakout` (mức độ tìm kiếm đã tăng hơn 5000% so với trước đó – báo hiệu đang cực kỳ hot)](https://newsinitiative.withgoogle.com/resources/trainings/google-trends-understanding-the-data/).

{{< gallery >}}
  <img src="ggtrend-sapnhap-2025.png" class="grid-w50" />
  <img src="ggtrend-sapnhap-rising.png" class="grid-w50" />
  <img src="ggtrend-sapnhap-subregion.png" class="grid-w50" />
{{< /gallery >}}

Ngày 14 tháng 4 năm 2025, Thủ tướng chính phủ đã ban hành [Quyết định số `759/QĐ-TTg` về việc "Phê duyệt đề án sắp xếp, tổ chức lại đơn vị hành chính các cấp và xây dựng mô hình tổ chức chính quyền địa phương 02 cấp"](https://thuvienphapluat.vn/van-ban/Bo-may-hanh-chinh/Quyet-dinh-759-QD-TTg-2025-phe-duyet-De-an-sap-xep-to-chuc-lai-don-vi-hanh-chinh-cac-cap-651583.aspx#)(📎 [Tải về](759-qd-ttg.pdf)), với một nội dung quan trọng là tổ chức lại đơn vị hành chính cấp tỉnh thành từ 63 xuống chỉ còn 34 đơn vị, _giảm 29 đầu mối_. Tuy nhiên, trong lịch sử hiện đại, Việt Nam từng có một lần điều chỉnh tổ chức hành chính **có quy mô lớn hơn, giảm tới 34 đầu mối, bạn có biết không?**

Series này xuất phát từ nhu cầu cá nhân là ghi chép tổng hợp lại _lịch sử biến động của các đơn vị hành chính tại Việt Nam sau giải phóng_, từ đó đặt ra một số câu hỏi kỹ thuật liên quan đến việc tổ chức và lưu trữ dữ liệu hành chính sao cho có thể _truy xuất theo thời gian_, _phản ánh chính xác sự thay đổi_, và _thích ứng với các cải cách liên tục của thời đại_.

Một số câu hỏi và yêu cầu kỹ thuật mà loạt bài viết này hướng tới giải quyết, bao gồm:

- Vì sao các thay đổi về tổ chức đơn vị hành chính lại diễn ra?
- Các nguyên tắc và yếu tố quyết định việc phân cấp hành chính theo từng thời kỳ là gì?
- Có những phương pháp luận nào phổ biến trong việc tổ chức dữ liệu hành chính tại cấp quốc gia?
- Thiết kế dữ liệu như thế nào để có thể truy vết và phản ánh đúng mọi thay đổi qua các giai đoạn lịch sử?
- Minh hoạ kết quả mô hình hoá dữ liệu bằng giao diện tương tác ngay trong bài viết.

Bài viết mở đầu này tập trung vào việc tổng hợp lịch sử thay đổi lớn với đơn vị hành chính cấp tỉnh thành, nhằm đặt nền cho các phân tích dữ liệu lịch sử và thiết kế hệ thống lưu trữ hành chính trong các bài sau.

---

## Lịch sử biến động ĐVHC cấp tỉnh

### Tóm tắt nhanh

| Mốc năm | Thay đổi                                 | Số tỉnh thành |
|---------|-------------------------------------------|---------------|
| 1975    | Trước cải cách, giữ nguyên 72 tỉnh thành              | 72             |
| 1976    | Giảm mạnh sau thống nhất                 | 38            |
| 1978    | Tách Cao Bằng, Lạng Sơn                   | 39            |
| 1979    | Đặc khu Vũng Tàu – Côn Đảo                | 40            |
| 1989    | Tách Bình Trị Thiên, Phú Khánh, Nghĩa Bình thành 6 tỉnh mới| 44            |
| 1991    | Tách Vĩnh Phú, Hà Sơn Bình, Nghệ Tĩnh, Hải Hưng, Nam Hà…  | 53             |
| 1997    | Tách Hà Bắc, Bắc Thái, Nam Hà, thêm Bắc Ninh, Thái Nguyên…| 61             |
| 2004    | Tách Đắk Lắk, Cần Thơ, Lai Châu           | 64            |
| 2008    | Sáp nhập Hà Tây vào Hà Nội                | 63            |
| 2025    | Đề án sắp xếp, tổ chức lại đơn vị hành chính           | 34            |

<!-- ### Nay (2025) -->

### 1975

Sau giải phóng miền Nam, thống nhất đất nước 30/4/1975, cả nước có 72 đơn vị hành chính cấp tỉnh, trong đó ở miền Bắc có 28 tỉnh, thành phố và đặc khu, miền Nam có 44 tỉnh, thành phố.

|STT|Tỉnh|Miền|
|--|--|--|
|1|Cà Mau|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|2|Bạc Liêu|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|3|Hà Tiên|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|4|Long Xuyên|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|5|Tân An|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|6|Châu Đốc|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|7|Long Châu Hà|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|8|Rạch Giá|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|9|Cần Thơ|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|10|Sóc Trăng|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|11|Vĩnh Long|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|12|Trà Vinh|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|13|Long Châu Tiền|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|14|Sa Đéc|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|15|Kiến Tường|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|16|Mỹ Tho|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|17|Gò Công|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|18|Long An|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|19|Tây Ninh|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|20|Bến Tre|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|21|Bình Phước Long|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|22|Thủ Dầu Một|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|23|Biên Hoà|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|24|Bà Rịa|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|25|Long Khánh|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|26|Bình Tuy|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|27|Lâm Đồng|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|28|Tuyên Đức|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|29|Bình Thuận|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|30|Ninh Thuận|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|31|Phú Yên|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|32|Khánh Hoà|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|33|Quảng Ngãi|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|34|Bình Định|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|35|Đắc Lắc|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|36|Gia Lai|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|37|Kon Tum|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|38|Quảng Nam|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|39|Quảng Đà|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|40|Quảng Trị|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|41|Thừa Thiên|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|42|Gia Định|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|43|Chợ Lớn|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|44|Sài Gòn|{{< keyword icon="music" >}} Nam {{< /keyword >}}|
|45|Cao Bằng|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|46|Lạng Sơn|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|47|Hà Giang|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|48|Tuyên Quang|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|49|Yên Bái|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|50|Lào Cai|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|51|Nghĩa Lộ|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|52|Sơn La|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|53|Lai Châu|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|54|Hoà Bình|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|55|Hà Tây|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|56|Vĩnh Phú|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|57|Bắc Thái|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|58|Hà Bắc|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|59|Hải Hưng|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|60|Nam Hà|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|61|Ninh Bình|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|62|Thanh Hoá|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|63|Nghệ An|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|64|Hà Tĩnh|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|65|Quảng Bình|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|66|Quảng Ninh|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|67|Hải Phòng|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|68|Thái Bình|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|69|Hà Nội|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|70|[Khu Vĩnh Linh](https://vi.wikipedia.org/wiki/%C4%90%E1%BA%B7c_khu_V%C4%A9nh_Linh)|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|71|[Khu tự trị Việt Bắc](https://vi.wikipedia.org/wiki/Khu_t%E1%BB%B1_tr%E1%BB%8B_Vi%E1%BB%87t_B%E1%BA%AFc)|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|
|72|[Khu tự trị Tây Bắc](https://vi.wikipedia.org/wiki/Khu_t%E1%BB%B1_tr%E1%BB%8B_T%C3%A2y_B%E1%BA%AFc)|{{< keyword icon="lightbulb" >}} Bắc {{< /keyword >}}|

Ngày 20/9/1975, Bộ Chính trị ban hành Nghị quyết số 245-NQTW về việc bỏ khu, hợp tỉnh nêu rõ: “Việc hợp các tỉnh nhỏ hiện nay thành những tỉnh mới là nhằm xây dựng các tỉnh thành những đơn vị kinh tế, kế hoạch và đơn vị hành chính có khả năng giải quyết đến mức cao nhất những yêu cầu về đẩy mạnh sản xuất, tổ chức đời sống vật chất, văn hóa của nhân dân, về củng cố quốc phòng, bảo vệ trị an và các khả năng đóng góp tốt nhất vào sự nghiệp chung của cả nước; đồng thời cũng để giảm bớt cấp trung gian, giảm bớt đầu mối trực thuộc Trung ương”.

{{< gallery >}}
  <img src="245-nqtw/1.jpg" class="grid-w50" />
  <img src="245-nqtw/2.jpg" class="grid-w50" />
{{< /gallery >}}

 Kết quả sáp nhập là 33 tỉnh thành gồm 21 tỉnh mới (_chưa đặt tên_), 8 tỉnh giữ nguyên và 4 thành phố trực thuộc Trung ương.

| STT | Loại đơn vị                     | Thành phần cụ thể                                                                 |
|-----|----------------------------------|------------------------------------------------------------------------------------|
| 1   | Cụm sáp nhập                     | Tỉnh Cà Mau, tỉnh Bạc Liêu, và 2 huyện Vĩnh Thuận, An Biên (tỉnh Rạch Giá), trừ 2 xã Đông Yên và Tây Yên |
| 2   | Cụm sáp nhập                     | Tỉnh Long Châu Hà, tỉnh Rạch Giá, huyện Thốt Nốt (tỉnh Cần Thơ)                  |
| 3   | Cụm sáp nhập                     | Các tỉnh: Cần Thơ, Sóc Trăng, Vĩnh Long, Trà Vinh                                 |
| 4   | Cụm sáp nhập                     | Các tỉnh: Long Châu Tiền, Sa Đéc, Kiến Tường                                      |
| 5   | Cụm sáp nhập                     | Các tỉnh: Mỹ Tho, Gò Công, Long An, Bến Tre                                       |
| 6   | Cụm sáp nhập                     | Các tỉnh: Tây Ninh, Bình Phước Long, Thủ Dầu Một (trừ 2 huyện Tân Uyên, Dĩ An); cộng thêm huyện Củ Chi và huyện Độc Lập |
| 7   | Cụm sáp nhập                     | Các tỉnh: Biên Hòa, Bà Rịa, Long Khánh, Bình Tuy; và 3 huyện: Định Quán, Tân Uyên, Dĩ An |
| 8   | Cụm sáp nhập                     | Các tỉnh: Lâm Đồng, Tuyên Đức, Bình Thuận, Ninh Thuận                             |
| 9   | Cụm sáp nhập                     | Các tỉnh: Phú Yên, Khánh Hòa                                                      |
| 10  | Cụm sáp nhập                     | Các tỉnh: Quảng Ngãi, Bình Định                                                   |
| 11  | Cụm sáp nhập                     | Tỉnh Đắk Lắk; cộng thêm huyện Cheo Reo và huyện Đức Lập                           |
| 12  | Cụm sáp nhập                     | Các tỉnh: Kon Tum, Gia Lai                                                        |
| 13  | Cụm sáp nhập                     | Các tỉnh: Quảng Nam, Quảng Đà                                                     |
| 14  | Cụm sáp nhập                     | Các tỉnh: Quảng Trị, Thừa Thiên, Quảng Bình; cộng thêm khu vực Vĩnh Linh         |
| 15  | Cụm sáp nhập                     | Các tỉnh: Nghệ An, Hà Tĩnh                                                        |
| 16  | Cụm sáp nhập                     | Các tỉnh: Nam Hà, Ninh Bình                                                       |
| 17  | Cụm sáp nhập                     | Các tỉnh: Hà Tây, Hòa Bình                                                        |
| 18  | Cụm sáp nhập                     | Các tỉnh: Cao Bằng, Lạng Sơn                                                      |
| 19  | Cụm sáp nhập                     | Các tỉnh: Tuyên Quang, Hà Giang                                                   |
| 20  | Cụm sáp nhập                     | Tỉnh Sơn La và 2 huyện: Bắc Yên, Phù Yên (thuộc tỉnh Nghĩa Lộ)                    |
| 21  | Cụm sáp nhập                     | Các tỉnh: Yên Bái, Lào Cai, Nghĩa Lộ                                              |
| 22  | Tỉnh giữ nguyên                  | Bắc Thái                                                                          |
| 23  | Tỉnh giữ nguyên                  | Hải Hưng                                                                          |
| 24  | Tỉnh giữ nguyên                  | Thanh Hóa                                                                         |
| 25  | Tỉnh giữ nguyên                  | Thái Bình                                                                         |
| 26  | Tỉnh giữ nguyên                  | Vĩnh Phú                                                                          |
| 27  | Tỉnh giữ nguyên                  | Hà Bắc                                                                            |
| 28  | Tỉnh giữ nguyên                  | Quảng Ninh                                                                        |
| 29  | Tỉnh giữ nguyên                  | Lai Châu                                                                          |
| 30  | Thành phố trực thuộc Trung ương | Hà Nội                                                                            |
| 31  | Thành phố trực thuộc Trung ương | Sài Gòn                                                                           |
| 32  | Thành phố trực thuộc Trung ương | Hải Phòng                                                                         |
| 33  | Thành phố trực thuộc Trung ương | Đà Lạt                                                                            |

#### Tài liệu tham khảo

1. [Đề tài khoa học: Phân tích đánh giá công tác điều chỉnh địa giới hành chính trong những năm gần đây (1975 - 1992) - Lê Quang Thọ](./brief_24411_27866_29345.pdf)

https://vi.wikipedia.org/wiki/Ph%C3%A2n_c%E1%BA%A5p_h%C3%A0nh_ch%C3%ADnh_Vi%E1%BB%87t_Nam#Th%E1%BB%9Di_k%E1%BB%B3_1954_-_1975

https://archives.org.vn/gioi-thieu-tai-lieu-nghiep-vu/ky-iv-dia-gioi-hanh-chinh-viet-nam-tu-nam-1975-den-nay.htm

https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/ho-tro-phap-luat/tu-van-phap-luat/80341/chi-tiet-ban-do-hanh-chinh-viet-nam-nam-1976-voi-38-tinh-thanh

https://znews.vn/tu-72-tinh-thanh-nuoc-ta-giam-con-38-sau-sap-nhap-50-nam-truoc-post1537980.html

https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/sap-nhap-con-33-tinh-thanh-viet-nam-tai-nghi-quyet-245nqtw-ngay-2091975-gom-nhung-dia-phuong-nao-206627.html
